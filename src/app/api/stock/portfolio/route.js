import { NextResponse } from 'next/server'
import { redis } from '../../../../lib/redis'

const PORTFOLIO_KEY = 'stock:portfolio'

// 股票代码映射
const STOCKS = {
  '600519': { name: '贵州茅台' },
  '300750': { name: '宁德时代' },
  '002594': { name: '比亚迪' },
  '513310': { name: '中韩半导体ETF' },
  '603986': { name: '兆易创新' },
  '601138': { name: '工业富联' },
  '002475': { name: '立讯精密' },
  '002156': { name: '通富微电' },
  '601020': { name: '华钰矿业' },
  '600036': { name: '招商银行' },
  '000333': { name: '美的集团' },
  '603191': { name: '望变电气' },
  '600089': { name: '特变电工' },
  '000617': { name: '中油资本' },
  '601318': { name: '中国平安' },
  '601012': { name: '隆基绿能' },
  '600276': { name: '恒瑞医药' },
  '603259': { name: '药明康德' },
  '000858': { name: '五粮液' },
  '600900': { name: '长江电力' },
}

// 初始资金
const INITIAL_CAPITAL = 100000

// GET 获取持仓和历史记录
export async function GET(request) {
  try {
    const portfolio = await redis.hgetall(PORTFOLIO_KEY) || {}
    const records = await redis.lrange('stock:trades', 0, 49)

    // 获取当前周期信息
    const currentWeek = getWeekNumber(new Date())

    return NextResponse.json({
      cash: portfolio.cash ? parseFloat(portfolio.cash) : INITIAL_CAPITAL,
      holdings: portfolio.holdings ? JSON.parse(portfolio.holdings) : null,
      currentPrice: portfolio.currentPrice ? parseFloat(portfolio.currentPrice) : null,
      stockCode: portfolio.stockCode || null,
      stockName: portfolio.stockName || null,
      weekStart: portfolio.weekStart || null,
      currentWeek,
      records: records.map(r => JSON.parse(r)),
      initialCapital: INITIAL_CAPITAL,
    })
  } catch (error) {
    console.error('获取数据失败:', error)
    return NextResponse.json({
      cash: INITIAL_CAPITAL,
      holdings: null,
      records: [],
      initialCapital: INITIAL_CAPITAL,
    })
  }
}

// POST 买入或卖出
export async function POST(request) {
  try {
    const { action, code, shares, price } = await request.json()

    if (!action || !code || !price) {
      return NextResponse.json({ error: '参数不完整' }, { status: 400 })
    }

    const stock = STOCKS[code]
    if (!stock) {
      return NextResponse.json({ error: '无效的股票代码' }, { status: 400 })
    }

    // 获取当前持仓
    const portfolio = await redis.hgetall(PORTFOLIO_KEY) || {}
    let cash = portfolio.cash ? parseFloat(portfolio.cash) : INITIAL_CAPITAL
    let holdings = portfolio.holdings ? JSON.parse(portfolio.holdings) : null

    // 检查是否在新周期（每周一重置）
    const now = new Date()
    const weekStart = getWeekStart(now)
    const savedWeekStart = portfolio.weekStart || null

    // 如果是新周期，重置持仓
    if (savedWeekStart && savedWeekStart !== weekStart) {
      // 保存上周记录
      if (holdings && holdings.shares > 0) {
        const weekRecord = {
          weekStart: savedWeekStart,
          code: portfolio.stockCode,
          name: portfolio.stockName,
          shares: holdings.shares,
          buyPrice: holdings.buyPrice,
          sellPrice: price,
          profit: (price - holdings.buyPrice) * holdings.shares,
          profitPercent: ((price - holdings.buyPrice) / holdings.buyPrice * 100).toFixed(2),
          endTime: now.toISOString(),
        }
        await redis.lpush('stock:trades', JSON.stringify(weekRecord))
        await redis.ltrim('stock:trades', 0, 49)
      }

      // 重置
      cash = INITIAL_CAPITAL
      holdings = null
    }

    const shareCount = parseInt(shares) || 100

    if (action === 'buy') {
      // 买入
      const cost = price * shareCount
      if (cost > cash) {
        return NextResponse.json({ error: '资金不足' }, { status: 400 })
      }

      cash -= cost
      holdings = {
        code,
        name: stock.name,
        shares: shareCount,
        buyPrice: price,
        buyTime: now.toISOString(),
      }

      await redis.hset(PORTFOLIO_KEY, {
        cash: cash.toString(),
        holdings: JSON.stringify(holdings),
        stockCode: code,
        stockName: stock.name,
        currentPrice: price.toString(),
        weekStart,
      })

      return NextResponse.json({
        success: true,
        action: 'buy',
        cash,
        holdings,
        message: `买入 ${stock.name} ${shareCount}股，成本 ¥${cost.toFixed(2)}`,
      })

    } else if (action === 'sell') {
      // 卖出
      if (!holdings || holdings.code !== code) {
        return NextResponse.json({ error: '没有持有该股票' }, { status: 400 })
      }

      if (shareCount > holdings.shares) {
        return NextResponse.json({ error: '持有股份不足' }, { status: 400 })
      }

      const revenue = price * shareCount
      cash += revenue
      holdings.shares -= shareCount

      const profit = (price - holdings.buyPrice) * shareCount

      if (holdings.shares === 0) {
        holdings = null
        await redis.hdel(PORTFOLIO_KEY, 'stockCode', 'stockName', 'holdings')
      } else {
        await redis.hset(PORTFOLIO_KEY, {
          holdings: JSON.stringify(holdings),
        })
      }

      await redis.hset(PORTFOLIO_KEY, {
        cash: cash.toString(),
        currentPrice: price.toString(),
        weekStart,
      })

      return NextResponse.json({
        success: true,
        action: 'sell',
        cash,
        holdings,
        profit,
        message: `卖出 ${stock.name} ${shareCount}股，收入 ¥${revenue.toFixed(2)}，盈亏 ¥${profit.toFixed(2)}`,
      })
    }

    return NextResponse.json({ error: '无效操作' }, { status: 400 })
  } catch (error) {
    console.error('操作失败:', error)
    return NextResponse.json({ error: '操作失败' }, { status: 500 })
  }
}

// 获取本周开始日期（周一）
function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  return d.toISOString().split('T')[0]
}

// 获取周数
function getWeekNumber(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

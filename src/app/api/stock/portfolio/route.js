import { NextResponse } from 'next/server'
import { redis } from '../../../../lib/redis'
import { STOCKS, INITIAL_CAPITAL, REDIS_KEYS, getWeekStart, getWeekNumber } from '../../../../lib'

const { PORTFOLIO, TRADES } = REDIS_KEYS

// GET 获取持仓和历史记录
export async function GET(request) {
  try {
    const portfolio = await redis.hgetall(PORTFOLIO) || {}
    const records = await redis.lrange(TRADES, 0, 49)

    const now = new Date()
    const weekStart = getWeekStart(now)
    const currentWeek = getWeekNumber(now)

    // 解析 holdings (现在是数组)
    let holdings = []
    if (portfolio.holdings) {
      try {
        holdings = typeof portfolio.holdings === 'string' ? JSON.parse(portfolio.holdings) : portfolio.holdings
        if (!Array.isArray(holdings)) {
          holdings = holdings.code ? [holdings] : []
        }
      } catch (e) {
        holdings = []
      }
    }

    // 检查是否需要重置（每周一）
    const savedWeekStart = portfolio.weekStart || null
    let cash = INITIAL_CAPITAL
    let weekProfit = 0
    let weekRecords = []

    if (savedWeekStart === weekStart) {
      // 本周
      cash = portfolio.cash ? parseFloat(portfolio.cash) : INITIAL_CAPITAL
    } else {
      // 新周，结算上周
      if (holdings && holdings.length > 0) {
        // 上周有持仓，需要结算
        for (const holding of holdings) {
          if (holding.shares > 0) {
            const weekRecord = {
              weekStart: savedWeekStart,
              code: holding.code,
              name: holding.name,
              shares: holding.shares,
              buyPrice: holding.buyPrice,
              sellPrice: holding.sellPrice || 0,
              profit: portfolio.weekProfit ? parseFloat(portfolio.weekProfit) : 0,
              endTime: now.toISOString(),
            }
            await redis.lpush(TRADES, JSON.stringify(weekRecord))
            await redis.ltrim(TRADES, 0, 49)
          }
        }
      }
      // 重置
      cash = INITIAL_CAPITAL
      holdings = []
      await redis.hdel(PORTFOLIO, 'holdings', 'stockCode', 'stockName', 'weekProfit')
    }

    // 获取本周交易记录
    const currentRecords = records.filter(r => {
      try {
        const record = typeof r === 'string' ? JSON.parse(r) : r
        return record.weekStart === weekStart
      } catch {
        return false
      }
    })

    // 计算本周总盈亏
    weekProfit = currentRecords.reduce((sum, r) => {
      try {
        const record = typeof r === 'string' ? JSON.parse(r) : r
        return sum + (record.profit || 0)
      } catch {
        return sum
      }
    }, 0)

    return NextResponse.json({
      cash,
      holdings,
      weekStart,
      currentWeek,
      weekProfit,
      // 本周操作记录（持仓 + 已卖出）
      currentWeekOperations: [
        ...holdings.map(h => ({
          type: 'buy',
          code: h.code,
          name: h.name,
          shares: h.shares,
          price: h.buyPrice,
          time: h.buyTime,
        })),
        ...currentRecords.map(r => ({
          type: 'sell',
          code: r.code,
          name: r.name,
          shares: r.shares,
          price: r.sellPrice,
          buyPrice: r.buyPrice,
          profit: r.profit,
          time: r.tradeTime,
        })),
      ].sort((a, b) => new Date(b.time) - new Date(a.time)),
      records: records.map(r => {
        try {
          return typeof r === 'string' ? JSON.parse(r) : r
        } catch {
          return null
        }
      }).filter(Boolean),
      initialCapital: INITIAL_CAPITAL,
    })
  } catch (error) {
    console.error('获取数据失败:', error)
    return NextResponse.json({
      cash: INITIAL_CAPITAL,
      holdings: [],
      weekStart: getWeekStart(new Date()),
      currentWeek: getWeekNumber(new Date()),
      weekProfit: 0,
      currentWeekOperations: [],
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

    const now = new Date()
    const weekStart = getWeekStart(now)

    // 获取当前持仓
    const portfolio = await redis.hgetall(PORTFOLIO) || {}
    let cash = portfolio.cash ? parseFloat(portfolio.cash) : INITIAL_CAPITAL

    // 检查是否新周期
    const savedWeekStart = portfolio.weekStart || null
    if (savedWeekStart !== weekStart) {
      // 新周期，重置
      cash = INITIAL_CAPITAL
      await redis.hset(PORTFOLIO, {
        cash: cash.toString(),
        weekStart,
      })
    }

    // 解析 holdings (现在是数组)
    let holdings = []
    if (portfolio.holdings) {
      try {
        holdings = typeof portfolio.holdings === 'string' ? JSON.parse(portfolio.holdings) : portfolio.holdings
        if (!Array.isArray(holdings)) {
          holdings = holdings.code ? [holdings] : []
        }
      } catch (e) {
        holdings = []
      }
    }

    const shareCount = parseInt(shares) || 100

    if (action === 'buy') {
      // 买入
      const cost = price * shareCount
      if (cost > cash) {
        return NextResponse.json({ error: `资金不足，需要 ¥${cost.toFixed(2)}，可用 ¥${cash.toFixed(2)}` }, { status: 400 })
      }

      // 检查是否已持有该股票，如果是则累加股数并更新成本价
      const existingIndex = holdings.findIndex(h => h.code === code)
      if (existingIndex >= 0) {
        // 累加股数，按加权平均计算新的买入价
        const existingHolding = holdings[existingIndex]
        const totalShares = existingHolding.shares + shareCount
        const newBuyPrice = ((existingHolding.shares * existingHolding.buyPrice) + (shareCount * price)) / totalShares

        holdings[existingIndex] = {
          ...existingHolding,
          shares: totalShares,
          buyPrice: newBuyPrice,
          buyTime: now.toISOString(),
        }

        cash -= cost
      } else {
        cash -= cost
        // 添加新持仓到数组
        const newHolding = {
          code,
          name: stock.name,
          shares: shareCount,
          buyPrice: price,
          buyTime: now.toISOString(),
        }
        holdings.push(newHolding)
      }

      await redis.hset(PORTFOLIO, {
        cash: cash.toString(),
        holdings: JSON.stringify(holdings),
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
      // 卖出 - 查找对应持仓
      const holdingIndex = holdings.findIndex(h => h.code === code)
      if (holdingIndex < 0) {
        return NextResponse.json({ error: '没有持有该股票' }, { status: 400 })
      }

      const holding = holdings[holdingIndex]
      if (shareCount > holding.shares) {
        return NextResponse.json({ error: '持有股份不足' }, { status: 400 })
      }

      const revenue = price * shareCount
      cash += revenue
      const profit = (price - holding.buyPrice) * shareCount

      // 记录这笔交易
      const tradeRecord = {
        weekStart,
        code,
        name: stock.name,
        shares: shareCount,
        buyPrice: holding.buyPrice,
        sellPrice: price,
        profit,
        profitPercent: ((price - holding.buyPrice) / holding.buyPrice * 100).toFixed(2),
        tradeTime: now.toISOString(),
      }
      await redis.lpush(TRADES, JSON.stringify(tradeRecord))
      await redis.ltrim(TRADES, 0, 49)

      // 更新持仓
      holdings[holdingIndex].shares -= shareCount
      if (holdings[holdingIndex].shares === 0) {
        holdings.splice(holdingIndex, 1)
      }

      await redis.hset(PORTFOLIO, {
        cash: cash.toString(),
        holdings: JSON.stringify(holdings),
        weekStart,
      })

      return NextResponse.json({
        success: true,
        action: 'sell',
        cash,
        holdings,
        profit,
        profitPercent: holdings.length > 0 && holdings[holdingIndex] ? ((price - holdings[holdingIndex].buyPrice) / holdings[holdingIndex].buyPrice * 100).toFixed(2) : '0',
        message: `卖出 ${stock.name} ${shareCount}股，收入 ¥${revenue.toFixed(2)}，盈亏 ¥${profit.toFixed(2)}`,
      })
    }

    return NextResponse.json({ error: '无效操作' }, { status: 400 })
  } catch (error) {
    console.error('操作失败:', error)
    return NextResponse.json({ error: '操作失败' }, { status: 500 })
  }
}

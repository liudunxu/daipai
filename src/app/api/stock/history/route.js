import { NextResponse } from 'next/server'
import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance()

// 股票代码映射：显示名称 -> Yahoo Finance 代码
const STOCKS = {
  '600519': { name: '贵州茅台', yahoo: '600519.SS' },
  '300750': { name: '宁德时代', yahoo: '300750.SZ' },
  '002594': { name: '比亚迪', yahoo: '002594.SZ' },
  '600036': { name: '招商银行', yahoo: '600036.SS' },
  '601318': { name: '中国平安', yahoo: '601318.SS' },
  '601012': { name: '隆基绿能', yahoo: '601012.SS' },
  '600276': { name: '恒瑞医药', yahoo: '600276.SS' },
  '603259': { name: '药明康德', yahoo: '603259.SS' },
  '000858': { name: '五粮液', yahoo: '000858.SZ' },
  '600900': { name: '长江电力', yahoo: '600900.SS' },
  '601888': { name: '中国中免', yahoo: '601888.SS' },
  '600030': { name: '中信证券', yahoo: '600030.SS' },
  '000333': { name: '美的集团', yahoo: '000333.SZ' },
  '000001': { name: '平安银行', yahoo: '000001.SZ' },
  '601398': { name: '工商银行', yahoo: '601398.SS' },
  '002475': { name: '立讯精密', yahoo: '002475.SZ' },
  '300059': { name: '东方财富', yahoo: '300059.SZ' },
  '600104': { name: '上汽集团', yahoo: '600104.SS' },
  '601166': { name: '兴业银行', yahoo: '601166.SS' },
}

// GET 获取股票历史数据
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const days = parseInt(searchParams.get('days')) || 7

  if (!code || !STOCKS[code]) {
    return NextResponse.json({ error: '无效的股票代码' }, { status: 400 })
  }

  try {
    const stock = STOCKS[code]
    const now = new Date()

    // 计算日期范围（最近N个交易日）
    const period1 = new Date(now)
    period1.setDate(period1.getDate() - days - 5) // 多取几天确保有足够数据

    const quote = await yahooFinance.historical(stock.yahoo, {
      period1,
      period2: now,
      period: '1d',
    })

    // 只取最近 days 天的数据
    const recentData = quote.slice(-days).map(item => ({
      date: item.date.toISOString().split('T')[0],
      open: item.open,
      close: item.close,
      high: item.high,
      low: item.low,
      volume: item.volume,
    }))

    return NextResponse.json({
      code,
      name: stock.name,
      data: recentData,
    })
  } catch (error) {
    console.error('获取股票数据失败:', error)
    return NextResponse.json({ error: '获取股票数据失败' }, { status: 500 })
  }
}

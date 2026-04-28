import { NextResponse } from 'next/server'
import yahooFinance from 'yahoo-finance2'
import { STOCKS } from '../../../../lib'

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
    period1.setDate(period1.getDate() - days - 10) // 多取几天确保有足够数据

    // 使用 chart API 获取数据
    const quote = await yahooFinance.chart(stock.yahoo, {
      period1: period1.toISOString().split('T')[0],
      period2: now.toISOString().split('T')[0],
      interval: '1d',
    })

    // 解析 chart 返回的数据
    // 数据在 quote.quotes 数组中
    const quotes = quote.quotes || []

    const recentData = quotes.slice(-days).map(item => ({
      date: new Date(item.date).toISOString().split('T')[0],
      open: item.open || 0,
      close: item.close || 0,
      high: item.high || 0,
      low: item.low || 0,
      volume: item.volume || 0,
    })).filter(item => item.close > 0) // 过滤无效数据

    // 同时返回当前价格
    const currentPrice = quote.meta?.regularMarketPrice || (recentData.length > 0 ? recentData[recentData.length - 1].close : null)

    return NextResponse.json({
      code,
      name: stock.name,
      currentPrice,
      data: recentData,
    })
  } catch (error) {
    console.error('获取股票数据失败:', error)
    return NextResponse.json({ error: '获取股票数据失败' }, { status: 500 })
  }
}

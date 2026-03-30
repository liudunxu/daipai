import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60 // 1分钟缓存

const POLYMARKET_API = 'https://gamma-api.polymarket.com'

// 获取市场列表
async function fetchMarkets() {
  try {
    // 使用 events 端点获取活跃事件，按创建时间排序获取最新
    const response = await fetch(`${POLYMARKET_API}/events?limit=50&closed=false`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch Polymarket markets:', error)
    return null
  }
}

export async function GET(request) {
  const data = await fetchMarkets()

  if (!data) {
    return NextResponse.json(
      { error: 'Failed to fetch data from Polymarket', markets: [] },
      { status: 200 }
    )
  }

  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString()
  })
}

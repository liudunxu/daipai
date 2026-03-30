import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // 5分钟缓存

const POLYMARKET_API = 'https://gamma-api.polymarket.com'

// 获取市场列表
async function fetchMarkets() {
  try {
    const response = await fetch(`${POLYMARKET_API}/markets?limit=50`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }
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

// 获取热门市场（按交易量排序）
async function fetchTrendingMarkets() {
  try {
    const response = await fetch(`${POLYMARKET_API}/markets?limit=20&closed=false&orderBy=volume`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch trending markets:', error)
    return null
  }
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'list'

  let data = null

  if (type === 'trending') {
    data = await fetchTrendingMarkets()
  } else {
    data = await fetchMarkets()
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Failed to fetch data from Polymarket', markets: [] },
      { status: 200 }
    )
  }

  return NextResponse.json({
    success: true,
    type,
    data,
    timestamp: new Date().toISOString()
  })
}

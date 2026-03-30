import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60 // 1分钟缓存

const POLYMARKET_API = 'https://gamma-api.polymarket.com'

// 获取热门事件（按交易量排序）
async function fetchTrendingEvents() {
  try {
    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&order=volume&ascending=false&limit=50`,
      {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 }
      }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch trending events:', error)
    return null
  }
}

// 获取最新事件
async function fetchLatestEvents() {
  try {
    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&order=end_date&ascending=true&limit=50`,
      {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 }
      }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch latest events:', error)
    return null
  }
}

// 获取分类标签
async function fetchTags() {
  try {
    const response = await fetch(`${POLYMARKET_API}/tags`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch tags:', error)
    return null
  }
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'trending'

  let data = null

  if (type === 'tags') {
    data = await fetchTags()
  } else if (type === 'latest') {
    data = await fetchLatestEvents()
  } else {
    // 默认获取热门事件（按24小时交易量）
    data = await fetchTrendingEvents()
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Failed to fetch data from Polymarket', events: [] },
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

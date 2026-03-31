import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 缓存1小时

const POLYMARKET_API = 'https://gamma-api.polymarket.com'

// 需要过滤的关键词（不符合中国国内规范的内容）
const BLOCKED_KEYWORDS = [
  'taiwan', 'tibet', 'xinjiang', 'hong kong', 'hk',
  'falun', 'falun gong', 'tiananmen', '1989',
  'uighur', 'uyghur', 'dalai', 'zhonggong',
  'tiananmen square', 'massacre', 'jiang zemin',
  'zheng zhi', 'political prisoner', 'dissident',
  'protest china', 'human rights china',
]

// 需要过滤的分类
const BLOCKED_TAGS = ['2'] // Politics

// 判断是否需要过滤
function shouldFilterEvent(event) {
  const title = (event.title || '').toLowerCase()
  const description = (event.description || '').toLowerCase()
  const question = (event.question || '').toLowerCase()

  // 检查标题、描述、问题
  const allText = `${title} ${description} ${question}`

  for (const keyword of BLOCKED_KEYWORDS) {
    if (allText.includes(keyword.toLowerCase())) {
      return true
    }
  }

  // 检查标签
  if (event.tags) {
    for (const tag of event.tags) {
      if (BLOCKED_TAGS.includes(tag.id) || BLOCKED_TAGS.includes(String(tag))) {
        return true
      }
    }
  }

  return false
}

// 简化标题（使用大模型时可进一步优化）
function simplifyTitle(event) {
  let title = event.title || event.question || ''

  // 简化过长的标题
  if (title.length > 80) {
    title = title.substring(0, 80) + '...'
  }

  return title
}

// 获取热门事件（按交易量排序）
async function fetchTrendingEvents() {
  try {
    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&order=volume&ascending=false&limit=100`,
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()

    // 过滤并整理
    const filtered = (data || []).filter(e => !shouldFilterEvent(e))

    return filtered.map(e => ({
      ...e,
      title: simplifyTitle(e)
    }))
  } catch (error) {
    console.error('Failed to fetch trending events:', error)
    return null
  }
}

// 获取即将到期的市场
async function fetchExpiringEvents() {
  try {
    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&order=end_date&ascending=true&limit=50`,
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()

    // 过滤并整理
    const filtered = (data || []).filter(e => !shouldFilterEvent(e))

    return filtered.map(e => ({
      ...e,
      title: simplifyTitle(e)
    }))
  } catch (error) {
    console.error('Failed to fetch expiring events:', error)
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

// 获取体育元数据
async function fetchSports() {
  try {
    const response = await fetch(`${POLYMARKET_API}/sports`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch sports:', error)
    return null
  }
}

// 按标签获取事件
async function fetchEventsByTag(tagId) {
  try {
    // 过滤政治相关标签
    if (BLOCKED_TAGS.includes(tagId)) {
      return []
    }

    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&tag_id=${tagId}&order=volume&ascending=false&limit=50`,
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()

    // 过滤并整理
    const filtered = (data || []).filter(e => !shouldFilterEvent(e))

    return filtered.map(e => ({
      ...e,
      title: simplifyTitle(e)
    }))
  } catch (error) {
    console.error('Failed to fetch events by tag:', error)
    return null
  }
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'trending'
  const tagId = searchParams.get('tagId')

  let data = null

  if (type === 'tags') {
    data = await fetchTags()
  } else if (type === 'sports') {
    data = await fetchSports()
  } else if (type === 'expiring') {
    data = await fetchExpiringEvents()
  } else if (type === 'byTag' && tagId) {
    data = await fetchEventsByTag(tagId)
  } else {
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
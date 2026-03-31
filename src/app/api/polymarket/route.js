import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 缓存1小时

const POLYMARKET_API = 'https://gamma-api.polymarket.com'

// OpenRouter 配置
const openrouterClient = process.env.OPENROUTER_API_KEY ? new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
}) : null

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'

// MiniMax 配置（备用）
const minimax = new OpenAI({
  apiKey: process.env.MINIMAX_API_KEY,
  baseURL: 'https://api.longcat.chat/openai/v1',
})

const MINIMAX_MODEL = 'LongCat-Flash-Chat'

// 需要过滤的关键词（不符合中国国内规范的内容）
const BLOCKED_KEYWORDS = [
  'taiwan', 'tibet', 'xinjiang', 'hong kong', 'hk',
  'falun', 'falun gong', 'tiananmen', '1989',
  'uighur', 'uyghur', 'dalai', 'zhonggong',
  'tiananmen square', 'massacre', 'jiang zemin',
  'zheng zhi', 'political prisoner', 'dissident',
  'protest china', 'human rights china', 'trump',
]

// 需要过滤的分类
const BLOCKED_TAGS = ['2'] // Politics

// 判断是否需要过滤
function shouldFilterEvent(event) {
  const title = (event.title || '').toLowerCase()
  const description = (event.description || '').toLowerCase()
  const question = (event.question || '').toLowerCase()

  const allText = `${title} ${description} ${question}`

  for (const keyword of BLOCKED_KEYWORDS) {
    if (allText.includes(keyword.toLowerCase())) {
      return true
    }
  }

  if (event.tags) {
    for (const tag of event.tags) {
      if (BLOCKED_TAGS.includes(tag.id) || BLOCKED_TAGS.includes(String(tag))) {
        return true
      }
    }
  }

  return false
}

// 使用大模型简化标题
async function simplifyTitleWithLLM(event) {
  const originalTitle = event.title || event.question || ''

  // 如果标题已经比较短，直接返回
  if (originalTitle.length <= 60) {
    return originalTitle
  }

  const prompt = `简化以下预测市场事件的标题，使其更简洁易懂（20-40字），保留核心信息：

原始标题：${originalTitle}

要求：
1. 用中文输出
2. 保留核心事件信息
3. 去除冗余词汇
4. 直接返回简化后的标题，不要任何解释

简化后的标题：`

  try {
    let result
    if (openrouterClient) {
      const completion = await openrouterClient.chat.completions.create({
        model: OPENROUTER_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        extra_headers: {
          'HTTP-Referer': 'https://www.zkwatcher.top',
          'X-Title': '极客观察 标题简化'
        }
      })
      result = completion.choices[0].message.content
    } else {
      const completion = await minimax.chat.completions.create({
        model: MINIMAX_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100
      })
      result = completion.choices[0].message.content
    }

    // 清理结果
    const simplified = result?.trim().replace(/^["']|["']$/g, '')
    return simplified || originalTitle
  } catch (error) {
    console.error('标题简化失败:', error.message)
    return originalTitle
  }
}

// 获取热门事件
async function fetchTrendingEvents() {
  try {
    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&order=volume&ascending=false&limit=50`,
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()

    const filtered = (data || []).filter(e => !shouldFilterEvent(e))

    // 简化标题
    const simplified = await Promise.all(
      filtered.map(async (event) => ({
        ...event,
        title: await simplifyTitleWithLLM(event)
      }))
    )

    return simplified
  } catch (error) {
    console.error('Failed to fetch trending events:', error)
    return null
  }
}

// 获取即将到期的市场
async function fetchExpiringEvents() {
  try {
    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&order=end_date&ascending=true&limit=30`,
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()

    const filtered = (data || []).filter(e => !shouldFilterEvent(e))

    // 简化标题
    const simplified = await Promise.all(
      filtered.map(async (event) => ({
        ...event,
        title: await simplifyTitleWithLLM(event)
      }))
    )

    return simplified
  } catch (error) {
    console.error('Failed to fetch expiring events:', error)
    return null
  }
}

// 获取分类标签
async function fetchTags() {
  try {
    // 过滤掉政治标签
    const response = await fetch(`${POLYMARKET_API}/tags`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const tags = await response.json()

    // 过滤政治相关标签
    return (tags || []).filter(t => t.id !== '2' && t.name !== 'Politics')
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
    if (BLOCKED_TAGS.includes(tagId)) {
      return []
    }

    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&tag_id=${tagId}&order=volume&ascending=false&limit=30`,
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()

    const filtered = (data || []).filter(e => !shouldFilterEvent(e))

    // 简化标题
    const simplified = await Promise.all(
      filtered.map(async (event) => ({
        ...event,
        title: await simplifyTitleWithLLM(event)
      }))
    )

    return simplified
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
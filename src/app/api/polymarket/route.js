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

// 使用大模型翻译和优化
async function processEventWithLLM(event) {
  const originalTitle = event.title || event.question || ''
  const originalDescription = event.description || ''

  // 敏感词检查（不翻译直接过滤）
  const sensitivePatterns = [
    /台湾|台独|台湾省|台海|两岸|统一|独立|分裂|政权更迭|六四|天安门事件|文革|三年困难|三年饥荒/,
    /新疆|西藏|内蒙古|香港|澳门|一国两制|五十年不变/,
    /法轮功|全能神|呼喊派|门徒会/,
    /特朗普|拜登|哈里斯|共和党|民主党|美国选举/,
    /习近|胡锦涛|江泽民|温家宝|朱镕基|李克强/,
    /抗议|示威|游行|罢工|暴动|叛乱|起义/,
  ]

  for (const pattern of sensitivePatterns) {
    if (pattern.test(originalTitle) || pattern.test(originalDescription)) {
      console.log(`[Filter] 过滤敏感内容: ${originalTitle}`)
      return null
    }
  }

  const prompt = `你是一个内容审核和翻译专家。

原始标题：${originalTitle}
原始描述：${originalDescription || '无'}

请执行以下任务：

1. **内容审核**：检查这个预测市场事件是否包含以下不适合在中国展示的内容：
   - 政治敏感内容（台湾、西藏、香港、新疆、法轮功、美国选举、中国领导人等）
   - 争议性政治事件
   - 如果有任何不适合的内容，直接返回 "FILTERED"

2. **翻译成中文**：如果内容适合，将标题翻译成中文并简化（20-40字），描述也翻译成中文（保留核心信息）

输出格式（JSON）：
- 如果需要过滤：{"filtered": true}
- 如果可以展示：{"title": "翻译后的中文标题", "description": "翻译后的中文描述"}

请处理：`

  try {
    let result
    if (openrouterClient) {
      const completion = await openrouterClient.chat.completions.create({
        model: OPENROUTER_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        extra_headers: {
          'HTTP-Referer': 'https://www.zkwatcher.top',
          'X-Title': '极客观察 内容审核与翻译'
        }
      })
      result = completion.choices[0].message.content
    } else {
      const completion = await minimax.chat.completions.create({
        model: MINIMAX_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500
      })
      result = completion.choices[0].message.content
    }

    // 检查是否需要过滤
    if (result?.toUpperCase().includes('FILTERED') || result?.includes('"filtered": true')) {
      console.log(`[Filter] LLM建议过滤: ${originalTitle}`)
      return null
    }

    // 解析 JSON 结果
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        if (parsed.title) {
          return {
            ...event,
            title: parsed.title,
            description: parsed.description || event.description
          }
        }
      }
    } catch (e) {
      console.error('JSON解析失败，使用原始内容')
    }

    // 解析失败时返回原事件
    return event
  } catch (error) {
    console.error('LLM处理失败:', error.message)
    return event
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

    // LLM 处理
    const processed = await Promise.all(
      (data || []).map(async (event) => await processEventWithLLM(event))
    )

    return processed.filter(e => e !== null)
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

    // LLM 处理
    const processed = await Promise.all(
      (data || []).map(async (event) => await processEventWithLLM(event))
    )

    return processed.filter(e => e !== null)
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
    if (tagId === '2') return []

    const response = await fetch(
      `${POLYMARKET_API}/events?active=true&closed=false&tag_id=${tagId}&order=volume&ascending=false&limit=30`,
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()

    // LLM 处理
    const processed = await Promise.all(
      (data || []).map(async (event) => await processEventWithLLM(event))
    )

    return processed.filter(e => e !== null)
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
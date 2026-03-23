import { NextResponse } from 'next/server'
import { redis } from '../../../../lib/redis'
import { verifyRequest } from '../../../../lib/seo/auth'

const SEO_KEYWORDS_KEY = 'seo:keywords:plan'

// 验证token
async function authCheck(request) {
  const result = await verifyRequest(request)
  if (!result.valid) {
    return { error: result.error, response: NextResponse.json({ error: result.error }, { status: 401 }) }
  }
  return { user: result.payload }
}

// GET 获取今日任务
export async function GET(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

  try {
    const today = new Date().toISOString().split('T')[0]

    let keywords = await redis.lrange(SEO_KEYWORDS_KEY, 0, -1)
    let list = keywords.map(k => {
      try {
        return JSON.parse(k)
      } catch {
        return null
      }
    }).filter(Boolean)

    // 找出今日任务（status为today或scheduledDate为今天且status为pending）
    let todayTasks = list.filter(k =>
      k.status === 'today' ||
      (k.scheduledDate === today && k.status === 'pending')
    )

    // 如果没有今日任务，自动设置一个pending的关键词为today
    if (todayTasks.length === 0) {
      const pendingTasks = list.filter(k => k.status === 'pending')
      if (pendingTasks.length > 0) {
        const nextTask = pendingTasks[0]
        const todayStr = new Date().toISOString().split('T')[0]

        // 更新状态为today
        for (let i = 0; i < keywords.length; i++) {
          try {
            const parsed = JSON.parse(keywords[i])
            if (parsed.id === nextTask.id) {
              parsed.status = 'today'
              parsed.scheduledDate = todayStr
              parsed.updatedAt = new Date().toISOString()
              await redis.lrem(SEO_KEYWORDS_KEY, i, keywords[i])
              await redis.lpush(SEO_KEYWORDS_KEY, JSON.stringify(parsed))

              // 重新获取列表
              keywords = await redis.lrange(SEO_KEYWORDS_KEY, 0, -1)
              list = keywords.map(k => {
                try {
                  return JSON.parse(k)
                } catch {
                  return null
                }
              }).filter(Boolean)
              break
            }
          } catch {}
        }
      }
    }

    // 再次获取今日任务
    todayTasks = list.filter(k =>
      k.status === 'today' ||
      (k.scheduledDate === today && k.status === 'pending')
    )

    return NextResponse.json({
      success: true,
      date: today,
      tasks: todayTasks,
      total: todayTasks.length,
      allKeywords: list.length
    })
  } catch (error) {
    console.error('获取每日任务失败:', error)
    return NextResponse.json({ success: false, error: '获取失败' }, { status: 500 })
  }
}

// POST 设置今日任务
export async function POST(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

  try {
    const { keywordId } = await request.json()

    if (!keywordId) {
      return NextResponse.json({ error: '关键词ID不能为空' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]
    const keywords = await redis.lrange(SEO_KEYWORDS_KEY, 0, -1)

    // 先把所有today状态改为done
    for (let i = 0; i < keywords.length; i++) {
      try {
        const parsed = JSON.parse(keywords[i])
        if (parsed.status === 'today') {
          parsed.status = 'done'
          parsed.updatedAt = new Date().toISOString()
          await redis.lrem(SEO_KEYWORDS_KEY, i, keywords[i])
          await redis.lpush(SEO_KEYWORDS_KEY, JSON.stringify(parsed))
        }
      } catch {}
    }

    // 设置指定关键词为today
    for (let i = 0; i < keywords.length; i++) {
      try {
        const parsed = JSON.parse(keywords[i])
        if (parsed.id === keywordId) {
          parsed.status = 'today'
          parsed.scheduledDate = today
          parsed.updatedAt = new Date().toISOString()
          await redis.lrem(SEO_KEYWORDS_KEY, i, keywords[i])
          await redis.lpush(SEO_KEYWORDS_KEY, JSON.stringify(parsed))
          return NextResponse.json({ success: true, data: parsed })
        }
      } catch {}
    }

    return NextResponse.json({ error: '关键词不存在' }, { status: 404 })
  } catch (error) {
    console.error('设置今日任务失败:', error)
    return NextResponse.json({ success: false, error: '设置失败' }, { status: 500 })
  }
}

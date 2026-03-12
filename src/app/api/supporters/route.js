import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// 初始化 Redis 客户端
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const SUPPORTERS_KEY = 'supporters:list'

// GET 获取声援者列表
export async function GET() {
  try {
    // 从 Redis 获取支持者列表
    const supporters = await redis.lrange(SUPPORTERS_KEY, 0, 99)

    // 解析并去重
    const list = supporters.map(s => JSON.parse(s))
    const uniqueMap = new Map()
    list.forEach(s => uniqueMap.set(s.name, s))
    const unique = Array.from(uniqueMap.values())

    return NextResponse.json(unique)
  } catch (error) {
    console.error('获取失败:', error)
    return NextResponse.json([])
  }
}

// POST 添加声援者
export async function POST(request) {
  try {
    const { name } = await request.json()

    if (!name || !name.trim()) {
      return NextResponse.json({ error: '姓名不能为空' }, { status: 400 })
    }

    const trimmedName = name.trim().slice(0, 50)

    // 检查是否已存在
    const supporters = await redis.lrange(SUPPORTERS_KEY, 0, -1)
    const existing = supporters.find(s => JSON.parse(s).name === trimmedName)

    if (existing) {
      // 更新：删除旧的，添加新的到最前面
      await redis.lrem(SUPPORTERS_KEY, 0, existing)
    }

    // 添加新的
    const newSupporter = JSON.stringify({
      name: trimmedName,
      created_at: new Date().toISOString()
    })
    await redis.lpush(SUPPORTERS_KEY, newSupporter)

    // 保留最多200条
    await redis.ltrim(SUPPORTERS_KEY, 0, 199)

    return NextResponse.json({
      success: true,
      name: trimmedName,
      message: '声援成功！'
    })
  } catch (error) {
    console.error('提交失败:', error)
    return NextResponse.json({ error: '提交失败' }, { status: 500 })
  }
}

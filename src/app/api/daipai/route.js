import { NextResponse } from 'next/server'
import { redis } from '../../../lib/redis'

const COUNTER_KEY = 'daipai:counter'

// GET 获取带派次数
export async function GET() {
  try {
    const count = await redis.get(COUNTER_KEY)
    return NextResponse.json({ count: count || 0 })
  } catch (error) {
    console.error('获取失败:', error)
    return NextResponse.json({ count: 0 })
  }
}

// POST 增加带派次数
export async function POST() {
  try {
    // 使用 Redis INCR 命令原子性增加计数
    const newCount = await redis.incr(COUNTER_KEY)

    return NextResponse.json({ count: newCount, message: '带派成功！' })
  } catch (error) {
    console.error('提交失败:', error)
    return NextResponse.json({ error: '提交失败' }, { status: 500 })
  }
}

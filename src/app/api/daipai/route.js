import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

// GET 获取带派次数
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: '数据库未配置' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('daipai_counter')
      .select('count')
      .single()

    if (error) throw error

    return NextResponse.json({ count: data.count || 0 })
  } catch (error) {
    console.error('获取失败:', error)
    return NextResponse.json({ count: 0 })
  }
}

// POST 增加带派次数
export async function POST() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: '数据库未配置' }, { status: 500 })
    }

    // 获取当前次数
    const { data: current } = await supabase
      .from('daipai_counter')
      .select('count')
      .single()

    const newCount = (current?.count || 0) + 1

    // 更新次数
    const { error } = await supabase
      .from('daipai_counter')
      .update({ count: newCount, updated_at: new Date().toISOString() })
      .eq('id', current?.id || 1)

    if (error) throw error

    return NextResponse.json({ count: newCount, message: '带派成功！' })
  } catch (error) {
    console.error('提交失败:', error)
    return NextResponse.json({ error: '提交失败' }, { status: 500 })
  }
}

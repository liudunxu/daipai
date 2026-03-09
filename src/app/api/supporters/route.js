import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET 获取声援者列表
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: '数据库未配置' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('supporters')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    // 按姓名去重
    const uniqueMap = new Map()
    data.forEach(s => uniqueMap.set(s.name, s))
    const unique = Array.from(uniqueMap.values())

    return NextResponse.json(unique)
  } catch (error) {
    console.error('获取失败:', error)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}

// POST 添加声援者
export async function POST(request) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: '数据库未配置' }, { status: 500 })
    }

    const { name } = await request.json()

    if (!name || !name.trim()) {
      return NextResponse.json({ error: '姓名不能为空' }, { status: 400 })
    }

    const trimmedName = name.trim().slice(0, 50)

    // 检查是否已存在
    const { data: existing } = await supabase
      .from('supporters')
      .select('*')
      .eq('name', trimmedName)
      .single()

    if (existing) {
      // 已存在，更新时间
      await supabase
        .from('supporters')
        .update({ created_at: new Date().toISOString() })
        .eq('id', existing.id)
    } else {
      // 新增
      await supabase
        .from('supporters')
        .insert([{ name: trimmedName }])
    }

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

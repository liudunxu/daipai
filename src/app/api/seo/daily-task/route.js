import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'

const TABLE_KEYWORDS = 'seo_keywords'

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

    // 先把scheduledDate为今天且status为pending的设为today
    await supabase
      .from(TABLE_KEYWORDS)
      .update({ status: 'today', updated_at: new Date().toISOString() })
      .eq('scheduled_date', today)
      .eq('status', 'pending')

    // 获取今日任务
    const { data, error } = await supabase
      .from(TABLE_KEYWORDS)
      .select('*')
      .in('status', ['today', 'pending'])
      .order('status', { ascending: false })

    if (error) {
      console.error('获取每日任务失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // 如果没有今日任务，取一个pending的设为today
    let todayTasks = (data || []).filter(k => k.status === 'today')

    if (todayTasks.length === 0) {
      const pendingTasks = (data || []).filter(k => k.status === 'pending')
      if (pendingTasks.length > 0) {
        await supabase
          .from(TABLE_KEYWORDS)
          .update({ status: 'today', updated_at: new Date().toISOString() })
          .eq('id', pendingTasks[0].id)

        // 重新获取
        const { data: newData } = await supabase
          .from(TABLE_KEYWORDS)
          .select('*')
          .in('status', ['today', 'pending'])

        todayTasks = (newData || []).filter(k => k.status === 'today')
      }
    }

    // 转换为旧格式
    const tasks = todayTasks.map(item => ({
      id: item.id,
      keyword: item.keyword,
      category: item.category,
      status: item.status,
      scheduledDate: item.scheduled_date,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))

    // 获取总数
    const { count } = await supabase
      .from(TABLE_KEYWORDS)
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      date: today,
      tasks,
      total: tasks.length,
      allKeywords: count || 0
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

    // 先把所有today状态改为done
    await supabase
      .from(TABLE_KEYWORDS)
      .update({ status: 'done', updated_at: new Date().toISOString() })
      .eq('status', 'today')

    // 设置指定关键词为today
    const { data, error } = await supabase
      .from(TABLE_KEYWORDS)
      .update({
        status: 'today',
        scheduled_date: today,
        updated_at: new Date().toISOString()
      })
      .eq('id', keywordId)
      .select()
      .single()

    if (error) {
      console.error('设置今日任务失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        keyword: data.keyword,
        category: data.category,
        status: data.status,
        scheduledDate: data.scheduled_date,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    })
  } catch (error) {
    console.error('设置今日任务失败:', error)
    return NextResponse.json({ success: false, error: '设置失败' }, { status: 500 })
  }
}

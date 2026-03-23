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

// GET 获取关键词列表
export async function GET(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from(TABLE_KEYWORDS)
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('获取关键词失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // 转换为旧格式
    const list = (data || []).map(item => ({
      id: item.id,
      keyword: item.keyword,
      category: item.category,
      status: item.status,
      scheduledDate: item.scheduled_date,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      generatedAt: item.generated_at,
      pagePath: item.page_path,
      analysisResult: item.analysis_result || null,
      analyzedAt: item.analyzed_at || null
    }))

    // 按日期排序（今天的优先）
    const today = new Date().toISOString().split('T')[0]
    list.sort((a, b) => {
      if (a.scheduledDate === today && b.scheduledDate !== today) return -1
      if (b.scheduledDate === today && a.scheduledDate !== today) return 1
      return 0
    })

    return NextResponse.json({
      success: true,
      data: list,
      total: list.length
    })
  } catch (error) {
    console.error('获取关键词失败:', error)
    return NextResponse.json({ success: false, error: '获取失败' }, { status: 500 })
  }
}

// POST 添加关键词
export async function POST(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

  try {
    const { keyword, category, scheduledDate, status } = await request.json()

    if (!keyword) {
      return NextResponse.json({ error: '关键词不能为空' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]

    // 如果设置为today，先把其他的today改为done
    if (status === 'today') {
      await supabase
        .from(TABLE_KEYWORDS)
        .update({ status: 'done', updated_at: new Date().toISOString() })
        .eq('status', 'today')
    }

    const newKeyword = {
      keyword,
      category: category || '未分类',
      status: status || 'pending',
      scheduled_date: scheduledDate || today,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from(TABLE_KEYWORDS)
      .insert(newKeyword)
      .select()
      .single()

    if (error) {
      console.error('添加关键词失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    const result = {
      id: data.id,
      keyword: data.keyword,
      category: data.category,
      status: data.status,
      scheduledDate: data.scheduled_date,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('添加关键词失败:', error)
    return NextResponse.json({ success: false, error: '添加失败' }, { status: 500 })
  }
}

// PUT 更新关键词状态
export async function PUT(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID不能为空' }, { status: 400 })
    }

    const updateData = {
      updated_at: new Date().toISOString()
    }
    if (updates.status) updateData.status = updates.status
    if (updates.scheduledDate) updateData.scheduled_date = updates.scheduledDate
    if (updates.generatedAt) updateData.generated_at = updates.generatedAt
    if (updates.pagePath) updateData.page_path = updates.pagePath
    if (updates.analysisResult) updateData.analysis_result = updates.analysisResult
    if (updates.analyzedAt) updateData.analyzed_at = updates.analyzedAt

    const { data, error } = await supabase
      .from(TABLE_KEYWORDS)
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('更新关键词失败:', error)
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
    console.error('更新关键词失败:', error)
    return NextResponse.json({ success: false, error: '更新失败' }, { status: 500 })
  }
}

// DELETE 删除关键词
export async function DELETE(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID不能为空' }, { status: 400 })
    }

    const { error } = await supabase
      .from(TABLE_KEYWORDS)
      .delete()
      .eq('id', id)

    if (error) {
      console.error('删除关键词失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除关键词失败:', error)
    return NextResponse.json({ success: false, error: '删除失败' }, { status: 500 })
  }
}

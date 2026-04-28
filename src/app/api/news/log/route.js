import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

const TABLE = 'news_logs'

export async function POST(request) {
  try {
    const { news } = await request.json()

    if (!Array.isArray(news) || news.length === 0) {
      return NextResponse.json({ success: false, error: 'news数据为空' }, { status: 400 })
    }

    // 只保留 title 和 source
    const items = news.map(item => ({
      title: item.title,
      source: item.source
    }))

    // 查询已有标题用于去重
    const { data: existing } = await supabase
      .from(TABLE)
      .select('title')
      .in('title', items.map(i => i.title))

    const existingTitles = new Set((existing || []).map(r => r.title))

    // 过滤掉已存在的标题
    const newItems = items.filter(item => !existingTitles.has(item.title))

    if (newItems.length === 0) {
      return NextResponse.json({ success: true, message: '无新数据', inserted: 0 })
    }

    const { error } = await supabase
      .from(TABLE)
      .insert(newItems)

    if (error) {
      console.error('写入新闻日志失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: '记录成功',
      inserted: newItems.length
    })
  } catch (error) {
    console.error('处理请求失败:', error)
    return NextResponse.json({ success: false, error: '处理失败' }, { status: 500 })
  }
}
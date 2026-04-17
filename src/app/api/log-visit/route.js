import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

const TABLE = 'request_logs'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)

    // 获取所有查询参数
    const params = Object.fromEntries(searchParams.entries())

    // 获取来源IP
    const sourceIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || request.headers.get('cf-connecting-ip')
      || 'unknown'

    // 获取其他请求头信息
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || 'unknown'
    const requestUrl = request.url

    // 写入 supabase
    const { error } = await supabase
      .from(TABLE)
      .insert({
        params: JSON.stringify(params),
        source_ip: sourceIp,
        user_agent: userAgent,
        referer: referer,
        request_url: requestUrl
      })

    if (error) {
      console.error('写入日志失败:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: '记录成功',
      data: {
        source_ip: sourceIp,
        params_count: Object.keys(params).length
      }
    })
  } catch (error) {
    console.error('处理请求失败:', error)
    return NextResponse.json({ success: false, error: '处理失败' }, { status: 500 })
  }
}

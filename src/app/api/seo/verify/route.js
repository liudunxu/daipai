import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ success: false, error: '密码不能为空' }, { status: 400 })
    }

    // 验证密码（从环境变量读取）
    const correctPassword = process.env.SEO_ADMIN_PASSWORD

    if (!correctPassword) {
      // 如果没有配置密码，默认使用简单密码（仅作为备用）
      if (password === 'seo2024') {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ success: false, error: '未配置密码' }, { status: 401 })
    }

    if (password === correctPassword) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: '密码错误' }, { status: 401 })
  } catch (error) {
    console.error('验证失败:', error)
    return NextResponse.json({ success: false, error: '验证失败' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { username, password, remember } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: '用户名和密码不能为空' }, { status: 400 })
    }

    // 从环境变量读取验证信息
    const correctUsername = process.env.SEO_ADMIN_USERNAME || 'admin'
    const correctPassword = process.env.SEO_ADMIN_PASSWORD

    // 验证
    if (username === correctUsername && password === correctPassword) {
      // 如果选择记住登录，生成一个token
      const loginToken = remember
        ? Buffer.from(`${username}:${Date.now()}`).toString('base64')
        : null

      return NextResponse.json({
        success: true,
        token: loginToken,
        username: username
      })
    }

    return NextResponse.json({ success: false, error: '用户名或密码错误' }, { status: 401 })
  } catch (error) {
    console.error('验证失败:', error)
    return NextResponse.json({ success: false, error: '验证失败' }, { status: 500 })
  }
}

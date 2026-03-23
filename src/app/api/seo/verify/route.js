import { NextResponse } from 'next/server'
import { generateToken } from '../../../../lib/seo/auth'

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: '用户名和密码不能为空' }, { status: 400 })
    }

    // 从环境变量读取验证信息
    const correctUsername = process.env.SEO_ADMIN_USERNAME || 'admin'
    const correctPassword = process.env.SEO_ADMIN_PASSWORD

    // 验证
    if (username === correctUsername && password === correctPassword) {
      // 生成动态token
      const token = generateToken(username)

      return NextResponse.json({
        success: true,
        token,
        username,
        expiresIn: 24 * 60 * 60 // 24小时
      })
    }

    return NextResponse.json({ success: false, error: '用户名或密码错误' }, { status: 401 })
  } catch (error) {
    console.error('验证失败:', error)
    return NextResponse.json({ success: false, error: '验证失败' }, { status: 500 })
  }
}

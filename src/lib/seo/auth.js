// 简单的token验证工具
// 注意：生产环境建议使用JWT或类似的成熟方案

const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24小时

/**
 * 生成动态token
 */
export function generateToken(username) {
  const payload = {
    username,
    exp: Date.now() + TOKEN_EXPIRY
  }
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

/**
 * 验证token
 */
export function verifyToken(token) {
  try {
    if (!token) return null

    const payload = JSON.parse(Buffer.from(token, 'base64').toString())

    // 检查是否过期
    if (Date.now() > payload.exp) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

/**
 * 从请求头获取token
 */
export function getTokenFromRequest(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return null

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null

  return parts[1]
}

/**
 * 验证请求的token
 */
export function verifyRequest(request) {
  const token = getTokenFromRequest(request)
  if (!token) {
    return { valid: false, error: '未提供token' }
  }

  const payload = verifyToken(token)
  if (!payload) {
    return { valid: false, error: 'token无效或已过期' }
  }

  return { valid: true, payload }
}

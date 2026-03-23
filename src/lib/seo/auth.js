import { redis } from '../redis'
import { randomBytes } from 'crypto'

const TOKEN_PREFIX = 'seo:token:'
const TOKEN_EXPIRY = 24 * 60 * 60 // 24小时（秒）

/**
 * 生成动态token并存储到Redis
 */
export async function generateToken(username) {
  const token = randomBytes(32).toString('hex')
  const tokenKey = `${TOKEN_PREFIX}${token}`

  await redis.set(tokenKey, JSON.stringify({
    username,
    createdAt: Date.now()
  }), { EX: TOKEN_EXPIRY })

  return token
}

/**
 * 验证token（从Redis查询）
 */
export async function verifyToken(token) {
  if (!token) return null

  try {
    const tokenKey = `${TOKEN_PREFIX}${token}`
    const data = await redis.get(tokenKey)

    if (!data) return null

    const payload = typeof data === 'string' ? JSON.parse(data) : data
    return payload
  } catch {
    return null
  }
}

/**
 * 移除token（登出）
 */
export async function removeToken(token) {
  if (!token) return false
  const tokenKey = `${TOKEN_PREFIX}${token}`
  await redis.del(tokenKey)
  return true
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
export async function verifyRequest(request) {
  const token = getTokenFromRequest(request)
  if (!token) {
    return { valid: false, error: '未提供token' }
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return { valid: false, error: 'token无效或已过期' }
  }

  return { valid: true, payload }
}

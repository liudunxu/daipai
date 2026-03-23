import { redis } from '../redis'
import { HttpsProxyAgent } from 'https-proxy-agent'

const WECHAT_TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token'
const TOKEN_CACHE_KEY = 'wechat:access_token'

/**
 * 获取代理配置
 */
function getProxyConfig() {
  const proxyUrl = process.env.WECHAT_API_PROXY
  console.log('[Wechat Auth] WECHAT_API_PROXY 环境变量:', proxyUrl ? '已设置' : '未设置')
  console.log('[Wechat Auth] WECHAT_API_PROXY 值:', proxyUrl)
  if (!proxyUrl) return null

  try {
    return proxyUrl // 返回字符串
  } catch {
    console.warn('[Wechat Auth] 代理配置格式错误，忽略')
    return null
  }
}

/**
 * 带代理的 fetch
 */
function proxyFetch(url, options = {}) {
  const proxyUrl = getProxyConfig()

  if (!proxyUrl) {
    console.log('[Wechat Auth] 不使用代理，直接请求')
    return fetch(url, options)
  }

  console.log('[Wechat Auth] 使用代理:', proxyUrl)
  const agent = new HttpsProxyAgent(proxyUrl)
  console.log('[Wechat Auth] agent 对象:', typeof agent, agent.constructor.name)
  const finalOptions = {
    ...options,
    agent
  }
  console.log('[Wechat Auth] fetch options:', Object.keys(finalOptions))
  return fetch(url, finalOptions)
}

/**
 * 获取微信 access_token（优先从 Redis 缓存获取）
 */
export async function getAccessToken() {
  // 1. 尝试从 Redis 缓存获取
  try {
    const cached = await redis.get(TOKEN_CACHE_KEY)
    if (cached) {
      const { token, expireAt } = typeof cached === 'string' ? JSON.parse(cached) : cached
      // 提前 10 分钟刷新
      if (Date.now() < expireAt - 600000) {
        return token
      }
    }
  } catch (error) {
    console.error('[Wechat Auth] Redis 获取缓存失败:', error)
  }

  // 2. 缓存不存在或即将过期，重新获取
  const { appid, secret } = getWechatConfig()

  const response = await proxyFetch(
    `${WECHAT_TOKEN_URL}?grant_type=client_credential&appid=${appid}&secret=${secret}`
  )
  const data = await response.json()

  if (data.errcode) {
    throw new Error(`获取 access_token 失败: ${data.errmsg} (${data.errcode})`)
  }

  // 3. 缓存新 token
  const tokenData = {
    token: data.access_token,
    expireAt: Date.now() + (data.expires_in * 1000)
  }

  try {
    // 缓存到过期时间前 10 分钟
    const cacheExpiry = data.expires_in - 600
    await redis.set(TOKEN_CACHE_KEY, JSON.stringify(tokenData), { EX: cacheExpiry > 0 ? cacheExpiry : 600 })
  } catch (error) {
    console.error('[Wechat Auth] Redis 缓存失败:', error)
  }

  return data.access_token
}

function getWechatConfig() {
  const appid = process.env.WECHAT_APP_ID
  const secret = process.env.WECHAT_APP_SECRET

  if (!appid || !secret) {
    throw new Error('缺少微信公众号配置：WECHAT_APP_ID 或 WECHAT_APP_SECRET')
  }

  return { appid, secret }
}

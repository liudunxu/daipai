/**
 * 共享代理工具
 * 提供统一的代理配置和 fetch 封装
 */

import { HttpsProxyAgent } from 'https-proxy-agent'

/**
 * 获取代理配置
 */
export function getProxyAgent() {
  const proxyUrl = process.env.WECHAT_API_PROXY || process.env.HTTP_PROXY
  if (!proxyUrl) return null
  try {
    return new HttpsProxyAgent(proxyUrl)
  } catch {
    return null
  }
}

/**
 * 带代理的 fetch
 */
export async function proxyFetch(url, options = {}) {
  const agent = getProxyAgent()
  const fetchOptions = agent ? { ...options, agent } : options
  return fetch(url, fetchOptions)
}

/**
 * Wikipedia 专用 fetch（不使用代理，需要 User-Agent）
 * 遵循 Wikipedia API User-Agent 策略
 */
export async function wikipediaFetch(url) {
  return fetch(url, {
    headers: {
      'User-Agent': 'SeoArticleBot/1.0 (https://www.zkwatcher.top; mailto:contact@zkwatcher.top)'
    }
  })
}

/**
 * 带超时的 Promise race
 */
export function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
  ])
}

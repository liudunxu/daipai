import { Redis } from '@upstash/redis'

// 验证环境变量
const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env

if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('缺少 Upstash Redis 环境变量配置，请设置 UPSTASH_REDIS_REST_URL 和 UPSTASH_REDIS_REST_TOKEN')
}

// 创建并导出 Redis 客户端实例
export const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
})

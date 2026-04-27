import { Redis } from '@upstash/redis'

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || ''
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || ''

const redisConfig = {
  url: UPSTASH_REDIS_REST_URL || 'https://placeholder.upstash.io',
  token: UPSTASH_REDIS_REST_TOKEN || 'placeholder',
}

export const redis = new Redis(redisConfig)

export const isRedisConfigured = !!(UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN)
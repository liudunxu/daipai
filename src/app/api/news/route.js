// 资讯API - 获取经济、科技/AI资讯
import { NextResponse } from 'next/server'
import { redis } from '../../../lib/redis'

// RSS转JSON的服务
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json'

// Redis缓存键名
const CACHE_KEY = 'geekwatch:news'

// 资讯源配置
const NEWS_SOURCES = [
  // 经济资讯 - 凤凰网财经
  {
    name: '凤凰财经',
    tag: '经济',
    color: 'emerald',
    feedUrl: 'https://finance.ifeng.com/rss/',
    type: 'rss'
  },
  // 科技/AI资讯
  {
    name: '36氪',
    tag: '科技',
    color: 'orange',
    feedUrl: 'https://36kr.com/feed',
    type: 'rss'
  },
  {
    name: '虎嗅',
    tag: '科技',
    color: 'red',
    feedUrl: 'https://rss.huxiu.com/',
    type: 'rss'
  },
  {
    name: 'IT之家',
    tag: '科技',
    color: 'blue',
    feedUrl: 'https://www.ithome.com/rss',
    type: 'rss'
  }
]

// 缓存时间（秒）- 5分钟
const CACHE_TTL = 300

// 解析日期
function parseDate(dateStr) {
  if (!dateStr) return new Date(0)
  try {
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? new Date(0) : date
  } catch {
    return new Date(0)
  }
}

// 获取RSS数据
async function fetchRSSNews(source) {
  try {
    const res = await fetch(`${RSS2JSON_API}?rss_url=${encodeURIComponent(source.feedUrl)}`, {
      next: { revalidate: CACHE_TTL }
    })
    if (!res.ok) return []
    const data = await res.json()
    if (data.status === 'ok' && data.items) {
      return data.items.slice(0, 10).map((item, idx) => ({
        id: item.guid || item.link || `${source.name}-${idx}`,
        title: item.title,
        desc: item.description ? item.description.replace(/<[^>]*>/g, '').slice(0, 100) : item.title,
        url: item.link,
        date: item.pubDate,
        source: source.name,
        tag: source.tag,
        color: source.color
      }))
    }
    return []
  } catch (error) {
    console.error(`Error fetching ${source.name}:`, error)
    return []
  }
}

// 获取所有资讯
async function fetchAllNews() {
  const results = await Promise.all(
    NEWS_SOURCES.map(async (source) => {
      return fetchRSSNews(source)
    })
  )

  // 合并所有资讯
  const allNews = results.flat()

  // 按日期排序（最新的在前）
  allNews.sort((a, b) => parseDate(b.date) - parseDate(a.date))

  return allNews
}

export async function GET() {
  try {
    // 尝试从Redis获取缓存
    const cached = await redis.get(CACHE_KEY)
    if (cached) {
      return NextResponse.json({
        success: true,
        data: cached,
        count: cached.length,
        cached: true
      })
    }

    // 获取最新资讯
    const news = await fetchAllNews()

    // 存入Redis缓存
    if (news.length > 0) {
      await redis.set(CACHE_KEY, JSON.stringify(news), { ex: CACHE_TTL })
    }

    return NextResponse.json({
      success: true,
      data: news,
      count: news.length,
      cached: false
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({
      success: false,
      error: '获取资讯失败',
      data: []
    }, { status: 500 })
  }
}

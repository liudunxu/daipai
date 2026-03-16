// 资讯API - 获取经济、科技/AI资讯
import { NextResponse } from 'next/server'
import { redis } from '../../../lib/redis'

// RSS转JSON的服务
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json'

// Redis缓存键名
const CACHE_KEY = 'geekwatch:news'

// 资讯源配置
const NEWS_SOURCES = [
  // 经济资讯 - 财联社
  {
    name: '财联社',
    tag: '经济',
    color: 'emerald',
    feedUrl: 'https://newsnow.busiyi.world/api/s?id=cls-telegraph',
    type: 'api'
  },
  // 经济资讯
  {
    name: '凤凰财经',
    tag: '经济',
    color: 'green',
    feedUrl: 'https://finance.ifeng.com/rss/'
  },
  // 科技/AI资讯
  {
    name: '36氪',
    tag: '科技',
    color: 'orange',
    feedUrl: 'https://36kr.com/feed'
  },
  {
    name: '虎嗅',
    tag: '科技',
    color: 'red',
    feedUrl: 'https://rss.huxiu.com/'
  },
  {
    name: 'IT之家',
    tag: '科技',
    color: 'blue',
    feedUrl: 'https://www.ithome.com/rss'
  },
  {
    name: '爱范儿',
    tag: '科技',
    color: 'purple',
    feedUrl: 'https://www.ifanr.com/feed'
  },
  {
    name: '少数派',
    tag: '科技',
    color: 'cyan',
    feedUrl: 'https://sspai.com/feed'
  },
  {
    name: '腾讯科技',
    tag: '科技',
    color: 'indigo',
    feedUrl: 'https://new.qq.com/omf/RSS/tech.xml'
  },
  {
    name: '网易科技',
    tag: '科技',
    color: 'pink',
    feedUrl: 'https://tech.163.com/special/cm_yaowen20200213/'
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

// 获取财联社API数据
async function fetchCLSNews(source) {
  try {
    const res = await fetch(source.feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: CACHE_TTL }
    })
    if (!res.ok) return []
    const data = await res.json()
    if (data.items && Array.isArray(data.items)) {
      return data.items.slice(0, 15).map((item) => ({
        id: item.id || item.url,
        title: item.title,
        desc: item.title,
        url: item.url,
        date: new Date(item.pubDate).toISOString(),
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

// 交错排列资讯，确保经济科技交叉展示
function interleaveNews(news) {
  if (news.length <= 2) return news

  // 按日期排序
  news.sort((a, b) => parseDate(b.date) - parseDate(a.date))

  // 按标签分组
  const economy = news.filter(n => n.tag === '经济')
  const tech = news.filter(n => n.tag === '科技')

  // 按来源再细分，每个来源取最新的一条轮询
  const econBySource = {}
  economy.forEach(item => {
    if (!econBySource[item.source]) econBySource[item.source] = []
    econBySource[item.source].push(item)
  })

  const techBySource = {}
  tech.forEach(item => {
    if (!techBySource[item.source]) techBySource[item.source] = []
    techBySource[item.source].push(item)
  })

  const econSources = Object.keys(econBySource)
  const techSources = Object.keys(techBySource)

  const result = []
  let eIdx = Array(econSources.length).fill(0)
  let tIdx = Array(techSources.length).fill(0)

  let eTotal = economy.length
  let tTotal = tech.length

  // 经济:科技 = 1:3 交替
  while (eTotal > 0 || tTotal > 0) {
    // 取1条经济
    for (let i = 0; i < 1 && eTotal > 0; i++) {
      for (let j = 0; j < econSources.length && eTotal > 0; j++) {
        if (eIdx[j] < econBySource[econSources[j]].length) {
          result.push(econBySource[econSources[j]][eIdx[j]++])
          eTotal--
        }
      }
    }
    // 取3条科技
    for (let i = 0; i < 3 && tTotal > 0; i++) {
      for (let j = 0; j < techSources.length && tTotal > 0; j++) {
        if (tIdx[j] < techBySource[techSources[j]].length) {
          result.push(techBySource[techSources[j]][tIdx[j]++])
          tTotal--
        }
      }
    }
  }

  return result
}

// 获取所有资讯
async function fetchAllNews() {
  const results = await Promise.all(
    NEWS_SOURCES.map(async (source) => {
      if (source.type === 'api') {
        return fetchCLSNews(source)
      }
      return fetchRSSNews(source)
    })
  )

  // 合并所有资讯
  const allNews = results.flat()

  // 交错排列
  return interleaveNews(allNews)
}

export async function GET() {
  try {
    // 尝试从Redis获取缓存
    const cached = await redis.get(CACHE_KEY)
    if (cached) {
      let data = cached
      // 如果是字符串，尝试解析
      if (typeof cached === 'string') {
        try {
          data = JSON.parse(cached)
        } catch {
          // 解析失败，忽略缓存
          data = null
        }
      }
      if (data && Array.isArray(data)) {
        return NextResponse.json({
          success: true,
          data: data,
          count: data.length,
          cached: true
        })
      }
    }

    // 获取最新资讯
    const news = await fetchAllNews()

    // 存入Redis缓存（不转JSON，Upstash会自动处理）
    if (news.length > 0) {
      await redis.set(CACHE_KEY, news, { ex: CACHE_TTL })
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

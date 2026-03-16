// 主动刷新缓存API - 供定时任务调用
import { NextResponse } from 'next/server'
import { redis } from '../../../../lib/redis'

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json'
const CACHE_KEY = 'geekwatch:news'
const CACHE_TTL = 600 // 10分钟

// 资讯源配置
const NEWS_SOURCES = [
  { name: '财联社', tag: '经济', color: 'emerald', feedUrl: 'https://newsnow.busiyi.world/api/s?id=cls-telegraph', type: 'api' },
  { name: '凤凰财经', tag: '经济', color: 'green', feedUrl: 'https://finance.ifeng.com/rss/' },
  { name: '36氪', tag: '科技', color: 'orange', feedUrl: 'https://36kr.com/feed' },
  { name: '虎嗅', tag: '科技', color: 'red', feedUrl: 'https://rss.huxiu.com/' },
  { name: 'IT之家', tag: '科技', color: 'blue', feedUrl: 'https://www.ithome.com/rss' },
  { name: '爱范儿', tag: '科技', color: 'purple', feedUrl: 'https://www.ifanr.com/feed' },
  { name: '少数派', tag: '科技', color: 'cyan', feedUrl: 'https://sspai.com/feed' },
  { name: '腾讯科技', tag: '科技', color: 'indigo', feedUrl: 'https://new.qq.com/omf/RSS/tech.xml' },
  { name: '网易科技', tag: '科技', color: 'pink', feedUrl: 'https://tech.163.com/special/cm_yaowen20200213/' }
]

function parseDate(dateStr) {
  if (!dateStr) return new Date(0)
  try {
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? new Date(0) : date
  } catch { return new Date(0) }
}

async function fetchRSSNews(source) {
  try {
    const res = await fetch(`${RSS2JSON_API}?rss_url=${encodeURIComponent(source.feedUrl)}`)
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
  } catch { return [] }
}

async function fetchCLSNews(source) {
  try {
    const res = await fetch(source.feedUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
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
  } catch { return [] }
}

function interleaveNews(news) {
  if (news.length <= 2) return news
  news.sort((a, b) => parseDate(b.date) - parseDate(a.date))
  const economy = news.filter(n => n.tag === '经济')
  const tech = news.filter(n => n.tag === '科技')
  const econBySource = {}
  economy.forEach(item => { if (!econBySource[item.source]) econBySource[item.source] = []; econBySource[item.source].push(item) })
  const techBySource = {}
  tech.forEach(item => { if (!techBySource[item.source]) techBySource[item.source] = []; techBySource[item.source].push(item) })
  const econSources = Object.keys(econBySource)
  const techSources = Object.keys(techBySource)
  const result = []
  let eIdx = Array(econSources.length).fill(0)
  let tIdx = Array(techSources.length).fill(0)
  let eTotal = economy.length
  let tTotal = tech.length
  while (eTotal > 0 || tTotal > 0) {
    for (let i = 0; i < 1 && eTotal > 0; i++) {
      for (let j = 0; j < econSources.length && eTotal > 0; j++) {
        if (eIdx[j] < econBySource[econSources[j]].length) {
          result.push(econBySource[econSources[j]][eIdx[j]++]); eTotal--
        }
      }
    }
    for (let i = 0; i < 3 && tTotal > 0; i++) {
      for (let j = 0; j < techSources.length && tTotal > 0; j++) {
        if (tIdx[j] < techBySource[techSources[j]].length) {
          result.push(techBySource[techSources[j]][tIdx[j]++]); tTotal--
        }
      }
    }
  }
  return result
}

async function fetchAllNews() {
  const results = await Promise.all(NEWS_SOURCES.map(async (source) => {
    if (source.type === 'api') return fetchCLSNews(source)
    return fetchRSSNews(source)
  }))
  return interleaveNews(results.flat())
}

// 定时任务secret
const CRON_SECRET = process.env.CRON_SECRET || 'your-secret-key'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // 验证访问密码
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[Cron] 开始刷新资讯缓存...')
    const news = await fetchAllNews()

    if (news.length > 0) {
      await redis.set(CACHE_KEY, news, { ex: CACHE_TTL })
      console.log(`[Cron] 缓存刷新成功，共 ${news.length} 条资讯`)
    }

    return NextResponse.json({
      success: true,
      count: news.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[Cron] 缓存刷新失败:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

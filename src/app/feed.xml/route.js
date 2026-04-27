import { supabase } from '../../lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  const baseUrl = 'https://www.zkwatcher.top'

  const staticItems = [
    { title: '今日运势', url: '/today', desc: '查看今日运势查询' },
    { title: '星座运势', url: '/xingzuo', desc: '十二星座今日运势详解' },
    { title: '八字算命', url: '/bazi', desc: '生辰八字在线查询' },
    { title: '塔罗牌测试', url: '/tarot', desc: '在线塔罗牌解读' },
    { title: '老黄历', url: '/huangli', desc: '今日黄历吉凶宜忌' },
    { title: 'A股预测', url: '/stock/predict', desc: '智能预测A股走势' },
    { title: '密码生成器', url: '/tool/password', desc: '安全随机密码生成' },
    { title: 'BMI计算器', url: '/tool/bmi', desc: '在线体质指数计算' },
    { title: '单位换算', url: '/tool/unit', desc: '长度重量温度换算' },
    { title: '运势测算', url: '/tool/lucky', desc: '2026年运势测算' },
  ]

  let articleItems = []
  try {
    const { data: articles } = await supabase
      .from('seo_articles')
      .select('keyword, description, generated_at')
      .order('generated_at', { ascending: false })
      .limit(50)

    if (articles && articles.length > 0) {
      articleItems = articles.map(a => ({
        title: a.keyword,
        url: `/article/${encodeURIComponent(a.keyword)}`,
        desc: a.description || `关于${a.keyword}的专业解读`,
        pubDate: a.generated_at ? new Date(a.generated_at).toUTCString() : new Date().toUTCString(),
      }))
    }
  } catch (e) {
    // ignore
  }

  const allItems = [
    ...staticItems.map(item => ({
      ...item,
      pubDate: new Date().toUTCString(),
    })),
    ...articleItems,
  ]

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>极客观察 - AI科技经济资讯</title>
    <link>${baseUrl}</link>
    <description>极客观察 - 混排AI、科技、经济相关资讯，提供运势查询、实用工具等</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <copyright>Copyright ${new Date().getFullYear()} 极客观察</copyright>
    <managingEditor>contact@zkwatcher.top (极客观察)</managingEditor>
    <webMaster>contact@zkwatcher.top (极客观察)</webMaster>
    ${allItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${baseUrl}${item.url}</link>
      <description><![CDATA[${item.desc}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid>${baseUrl}${item.url}</guid>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
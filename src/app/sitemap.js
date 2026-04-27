import { MetadataRoute } from 'next'
import { supabase } from '../lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://www.zkwatcher.top'

  const now = new Date()
  const weekly = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthly = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/nav`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.9 },

    // 玄学命理
    { url: `${baseUrl}/today`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/xingzuo`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/shengxiao`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/chouqian`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/bazi`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/chenggu`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/fate`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/huangli`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/tarot`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/jiemeng`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/personality`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/guoxue/shouqianshou`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },

    // 爱情配对
    { url: `${baseUrl}/match`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/phone`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/mind`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },

    // 生活娱乐
    { url: `${baseUrl}/birthday`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/dice`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/names`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/cake`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/wedding`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/couple`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/avatar`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/face`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/blessing`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },

    // AI 工具
    { url: `${baseUrl}/ai`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ai/deepseek`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/ai/claude`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/ai/coze`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/ai/perplexity`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/prompt`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/maic`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/llm-leaderboard`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },

    // 股票财经
    { url: `${baseUrl}/stock`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/stock/predict`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/stock/hk-predict`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/stock/us-predict`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/guru`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },

    // 资讯热点
    { url: `${baseUrl}/trending`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/trend/2026`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/todayinhistory`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/nvidia`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/alibaba`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/news/openclaw`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/news/openclaw/check`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/github-rank`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },

    // 实用工具
    { url: `${baseUrl}/tool`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tool/password`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/tool/lucky`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tool/huoxing`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/tool/bmi`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tool/height`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tool/sleep`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tool/unit`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/tool/countdown`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/lunar`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/zhaori`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },

    // SEO 文章
    { url: `${baseUrl}/seo`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.5 },

    // 专题内容
    { url: `${baseUrl}/claude-code-leak`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/harness`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },

    // 其他页面
    { url: `${baseUrl}/share`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/guoxue`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/pua`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/pua/chat`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/daipai`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },

    // 静态页面
    { url: `${baseUrl}/features`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/about`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/contact`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.3 },
  ]

  let articlePages = []
  try {
    const { data: articles } = await supabase
      .from('seo_articles')
      .select('keyword, generated_at, page_path')
      .order('generated_at', { ascending: false })
      .limit(200)

    if (articles && articles.length > 0) {
      articlePages = articles
        .filter(a => a.keyword)
        .map(article => ({
          url: `${baseUrl}/article/${encodeURIComponent(article.keyword)}`,
          lastModified: article.generated_at ? new Date(article.generated_at) : weekly,
          changeFrequency: 'weekly',
          priority: 0.6,
        }))
    }
  } catch (error) {
    console.error('Sitemap: 获取文章列表失败', error)
  }

  return [...staticPages, ...articlePages]
}
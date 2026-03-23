import { TavilySearchResults } from '@tavily/core'

const SEARCH_RESULTS_LIMIT = 10

/**
 * 使用 Tavily API 搜索竞品文章
 */
async function searchCompetitors(keyword) {
  try {
    const tavily = new TavilySearchResults({
      apiKey: process.env.TAVILY_API_KEY
    })

    const response = await tavily.search(keyword, {
      maxResults: SEARCH_RESULTS_LIMIT,
      includeImages: true,
      includeImageDescriptions: true
    })

    return {
      results: (response.results || []).map(r => ({
        title: r.title,
        link: r.url,
        snippet: r.content || r.snippet || '',
        img: r.img || null
      })),
      images: response.images || []
    }
  } catch (error) {
    console.error('Tavily 搜索失败:', error)
    return { results: [], images: [] }
  }
}

/**
 * 提取文章结构（标题层级）
 */
function extractStructure(html) {
  const h2Matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || []
  const h3Matches = html.match(/<h3[^>]*>(.*?)<\/h3>/gi) || []

  const h2s = h2Matches.map(h => h.replace(/<[^>]+>/g, '').trim())
  const h3s = h3Matches.map(h => h.replace(/<[^>]+>/g, '').trim())

  return { h2s, h3s }
}

/**
 * 估算文章字数
 */
function estimateWordCount(html) {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length
  return chineseChars + englishWords
}

/**
 * 提取文章概述
 */
function extractSummary(html) {
  const pMatches = html.match(/<p[^>]*>(.*?)<\/p>/gi) || []
  const summaries = pMatches
    .slice(0, 3)
    .map(p => p.replace(/<[^>]+>/g, '').trim())
    .filter(t => t.length > 20)
  return summaries.join(' | ')
}

/**
 * 分析竞品文章
 */
export async function analyzeCompetitors(keyword) {
  const { results: searchResults, images } = await searchCompetitors(keyword)

  const analysis = {
    keyword,
    analyzedAt: new Date().toISOString(),
    competitors: [],
    totalAnalyzed: 0,
    commonTopics: [],
    avgWordCount: 0,
    topStructures: [],
    images: [] // Tavily 获取的相关图片
  }

  let totalWords = 0

  for (const result of searchResults) {
    try {
      const competitor = {
        title: result.title || '',
        url: result.link || '',
        snippet: result.snippet || '',
        structure: { h2s: [], h3s: [] },
        wordCount: 0,
        summary: ''
      }

      totalWords += competitor.wordCount
      analysis.competitors.push(competitor)
      analysis.totalAnalyzed++
    } catch (error) {
      console.error(`分析失败: ${result.link}`, error)
    }
  }

  // 添加 Tavily 图片
  if (images && images.length > 0) {
    analysis.images = images.slice(0, 5).map(img => ({
      url: img.url,
      description: img.description || img.alt || ''
    }))
  }

  analysis.avgWordCount = analysis.totalAnalyzed > 0
    ? Math.round(totalWords / analysis.totalAnalyzed)
    : 0

  // 统计常见主题
  const allH2s = analysis.competitors.flatMap(c => c.structure.h2s)
  const topicCount = {}
  allH2s.forEach(h2 => {
    if (h2.length > 2) {
      topicCount[h2] = (topicCount[h2] || 0) + 1
    }
  })
  analysis.commonTopics = Object.entries(topicCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([topic]) => topic)

  // 收集最常见的结构
  analysis.topStructures = allH2s.slice(0, 5)

  return analysis
}

/**
 * 构建竞品分析报告
 */
export function buildAnalysisReport(analysis) {
  const lines = [
    `# ${analysis.keyword} 竞品分析报告`,
    `分析时间: ${new Date(analysis.analyzedAt).toLocaleString('zh-CN')}`,
    `分析数量: ${analysis.totalAnalyzed} 篇`,
    ``,
    `## 一、竞品概况`,
    ``,
  ]

  analysis.competitors.forEach((comp, idx) => {
    lines.push(`${idx + 1}. **${comp.title}**`)
    lines.push(`   - URL: ${comp.url}`)
    lines.push(`   - 简介: ${comp.snippet.slice(0, 100)}...`)
    lines.push(``)
  })

  lines.push(`## 二、内容统计`)
  lines.push(`- 平均字数: ${analysis.avgWordCount}`)
  lines.push(``)

  if (analysis.commonTopics.length > 0) {
    lines.push(`## 三、常见话题`)
    lines.push(analysis.commonTopics.map(t => `- ${t}`).join('\n'))
    lines.push(``)
  }

  if (analysis.topStructures.length > 0) {
    lines.push(`## 四、推荐覆盖点`)
    lines.push(analysis.topStructures.map(t => `- ${t}`).join('\n'))
    lines.push(``)
  }

  // 添加图片信息
  if (analysis.images && analysis.images.length > 0) {
    lines.push(`## 五、相关图片`)
    analysis.images.forEach((img, idx) => {
      lines.push(`![${img.description}](${img.url})`)
    })
  }

  return lines.join('\n')
}
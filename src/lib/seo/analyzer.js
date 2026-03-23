import { tavily } from '@tavily/core'
import { multiSourceSearch, getSupplementaryKnowledge, buildEnhancedReport } from './multi-search'
import { multiSourceImageSearch } from './image-search'

const SEARCH_RESULTS_LIMIT = 10

/**
 * Tavily 搜索（原有渠道）
 */
async function searchWithTavily(keyword) {
  try {
    const client = tavily({ apiKey: process.env.TAVILY_API_KEY })

    const response = await client.search(keyword, {
      maxResults: SEARCH_RESULTS_LIMIT,
      includeImages: true,
      includeImageDescriptions: true
    })

    return {
      results: (response.results || []).map(r => ({
        title: r.title,
        link: r.url,
        snippet: r.content || r.snippet || '',
        img: r.img || null,
        source: 'tavily'
      })),
      images: response.images || []
    }
  } catch (error) {
    console.error('Tavily 搜索失败:', error)
    return { results: [], images: [] }
  }
}

/**
 * 多源聚合搜索（主要搜索方式）
 */
async function searchCompetitors(keyword) {
  // 并行执行 Tavily 和多源搜索
  const [tavilyData, multiSearchResult] = await Promise.all([
    searchWithTavily(keyword),
    multiSourceSearch(keyword)
  ])

  // 合并结果（将 tavily 结果追加到多源搜索结果）
  const allResults = [
    ...multiSearchResult.results,
    ...tavilyData.results.map(r => ({ ...r, source: 'tavily' }))
  ]

  return {
    results: allResults,
    images: tavilyData.images,
    sources: multiSearchResult.sources
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
  // 并行执行搜索、补充知识获取和图片搜索
  const [searchData, supplementaryKnowledge, imageData] = await Promise.all([
    searchCompetitors(keyword),
    getSupplementaryKnowledge(keyword),
    multiSourceImageSearch(keyword)
  ])

  const { results: searchResults, images: tavilyImages, sources } = searchData

  const analysis = {
    keyword,
    analyzedAt: new Date().toISOString(),
    competitors: [],
    totalAnalyzed: 0,
    commonTopics: [],
    avgWordCount: 0,
    topStructures: [],
    images: [],           // Tavily 图片（原有）
    imageSources: [],     // 多源图片（Pexels/Pixabay 等）
    sources: sources || [],
    supplementaryKnowledge
  }

  let totalWords = 0

  for (const result of searchResults) {
    try {
      const competitor = {
        title: result.title || '',
        url: result.url || result.link || '',
        snippet: result.snippet || '',
        source: result.source || 'unknown',
        structure: { h2s: [], h3s: [] },
        wordCount: 0,
        summary: ''
      }

      totalWords += competitor.wordCount
      analysis.competitors.push(competitor)
      analysis.totalAnalyzed++
    } catch (error) {
      console.error(`分析失败: ${result.link || result.url}`, error)
    }
  }

  // 添加 Tavily 图片（原有）
  if (tavilyImages && tavilyImages.length > 0) {
    analysis.images = tavilyImages.slice(0, 5).map(img => ({
      url: img.url,
      description: img.description || img.alt || ''
    }))
  }

  // 添加多源免费图片（Pexels/Pixabay/Unsplash 等）
  if (imageData && imageData.images && imageData.images.length > 0) {
    analysis.imageSources = imageData.images.slice(0, 6).map(img => ({
      url: img.url,
      thumbnail: img.thumbnail,
      description: img.description,
      credit: img.credit,
      creditUrl: img.creditUrl,
      photographer: img.photographer
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
 * 优先使用多源增强报告，否则降级使用原有格式
 */
export function buildAnalysisReport(analysis) {
  // 如果有补充知识（Wikipedia 等），使用增强报告
  if (analysis.supplementaryKnowledge) {
    return buildEnhancedReport(
      analysis.keyword,
      { results: analysis.competitors, sources: analysis.sources },
      analysis.supplementaryKnowledge,
      { images: analysis.imageSources || [] }  // 传入多源图片
    )
  }

  // 降级：原有报告格式
  const lines = [
    `# ${analysis.keyword} 竞品分析报告`,
    `**数据来源**: ${analysis.sources?.join(', ') || 'Tavily'}`,
    `分析时间: ${new Date(analysis.analyzedAt).toLocaleString('zh-CN')}`,
    `分析数量: ${analysis.totalAnalyzed} 篇`,
    ``,
    `## 一、竞品概况`,
    ``,
  ]

  // 按来源分组显示
  const bySource = {}
  for (const comp of analysis.competitors) {
    const source = comp.source || 'unknown'
    if (!bySource[source]) bySource[source] = []
    bySource[source].push(comp)
  }

  for (const [source, comps] of Object.entries(bySource)) {
    const sourceName = {
      'duckduckgo': 'DuckDuckGo',
      'baidu': '百度',
      'sogou': '搜狗',
      'wikipedia': 'Wikipedia',
      'tavily': 'Tavily',
      'bing': 'Bing',
      'baidu_baike': '百度百科'
    }[source] || source

    lines.push(`### ${sourceName}`)

    for (const comp of comps.slice(0, 5)) {
      if (comp.title && comp.title.length > 3) {
        lines.push(`${comps.indexOf(comp) + 1}. **${comp.title}**`)
        lines.push(`   - URL: ${comp.url}`)
        if (comp.snippet) {
          lines.push(`   - 简介: ${comp.snippet.slice(0, 100)}...`)
        }
        lines.push(``)
      }
    }
  }

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
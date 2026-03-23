const SEARCH_RESULTS_LIMIT = 10

/**
 * 搜索关键词获取竞品文章
 */
async function searchCompetitors(keyword) {
  try {
    // 使用简单搜索API（可以替换为实际可用的搜索服务）
    // 这里使用Bing搜索API格式作为示例
    const response = await fetch(`/api/seo/search?keyword=${encodeURIComponent(keyword)}`)
    if (response.ok) {
      const data = await response.json()
      return (data.results || []).slice(0, SEARCH_RESULTS_LIMIT)
    }
    return []
  } catch (error) {
    console.error('搜索失败:', error)
    return []
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
  const searchResults = await searchCompetitors(keyword)

  const analysis = {
    keyword,
    analyzedAt: new Date().toISOString(),
    competitors: [],
    totalAnalyzed: 0,
    commonTopics: [],
    avgWordCount: 0,
    topStructures: []
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
  lines.push(`## 三、常见话题`)
  lines.push(analysis.commonTopics.map(t => `- ${t}`).join('\n'))
  lines.push(``)
  lines.push(`## 四、推荐覆盖点`)
  lines.push(analysis.topStructures.map(t => `- ${t}`).join('\n'))

  return lines.join('\n')
}

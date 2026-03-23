/**
 * 多源搜索聚合器
 * 整合多个免费搜索/数据源，为SEO文章生成提供更丰富的内容素材
 */

import { proxyFetch, withTimeout } from './proxy'
import { multiSourceImageSearch, buildImageReport } from './image-search'

// 搜索结果限制
const RESULTS_LIMIT = 8

/**
 * 1. DuckDuckGo 搜索 (免费，无需 API Key)
 * 使用 DuckDuckGo HTML 页面解析
 */
async function searchDuckDuckGo(keyword) {
  try {
    const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(keyword)}&kl=zh-cn`

    const response = await proxyFetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })

    const html = await response.text()

    // 解析 DuckDuckGo HTML 结果
    const results = []
    const resultRegex = /<a class="result__a" href="([^"]+)"[^>]*>([^<]+)<\/a>/gi
    const snippetRegex = /<a class="result__snippet"[^>]*>([^<]+)<\/a>/gi

    let match
    const urls = []
    const titles = []
    const snippets = []

    while ((match = resultRegex.exec(html)) !== null && results.length < RESULTS_LIMIT) {
      urls.push(match[1])
      titles.push(match[2].replace(/<[^>]+>/g, ''))
    }

    while ((match = snippetRegex.exec(html)) !== null && snippets.length < RESULTS_LIMIT) {
      snippets.push(match[1].replace(/<[^>]+>/g, ''))
    }

    for (let i = 0; i < Math.min(urls.length, RESULTS_LIMIT); i++) {
      results.push({
        title: titles[i] || '',
        url: urls[i] || '',
        snippet: snippets[i] || '',
        source: 'duckduckgo'
      })
    }

    console.log(`[MultiSearch] DuckDuckGo 获取到 ${results.length} 条结果`)
    return results
  } catch (error) {
    console.error('[MultiSearch] DuckDuckGo 搜索失败:', error.message)
    return []
  }
}

/**
 * 2. Wikipedia API (免费，权威知识库)
 * 适合获取词条定义、背景知识
 */
async function searchWikipedia(keyword) {
  try {
    // 先搜索词条
    const searchUrl = `https://zh.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(keyword)}&limit=${RESULTS_LIMIT}&format=json`

    const response = await proxyFetch(searchUrl)
    const data = await response.json()

    const results = []
    const titles = data[1] || []
    const summaries = data[2] || []
    const urls = data[3] || []

    for (let i = 0; i < titles.length; i++) {
      results.push({
        title: titles[i],
        url: urls[i] || `https://zh.wikipedia.org/wiki/${encodeURIComponent(titles[i])}`,
        snippet: summaries[i] || '',
        source: 'wikipedia'
      })
    }

    console.log(`[MultiSearch] Wikipedia 获取到 ${results.length} 条结果`)
    return results
  } catch (error) {
    console.error('[MultiSearch] Wikipedia 搜索失败:', error.message)
    return []
  }
}

/**
 * 3. 百度搜索 (中文内容必备)
 * 使用百度搜索 API 或 HTML 解析
 */
async function searchBaidu(keyword) {
  try {
    const url = `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}&rn=${RESULTS_LIMIT}`

    const response = await proxyFetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      }
    })

    const html = await response.text()

    // 解析百度搜索结果
    const results = []
    const titleRegex = /<h3 class="c-title[^"]*"[^>]*>.*?<a[^>]*href="([^"]*)"[^>]*>([^<]*(?:<[^>]*>[^<]*)*)<\/a>/gi
    const snippetRegex = /<span class="c-span-last[^"]*"[^>]*>([^<]*(?:<[^>]*>[^<]*)*)<\/span>/gi

    let match
    const matches = []

    // 简单的标题解析
    const titleMatches = html.match(/<h3 class="c-title[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([^<]*(?:<[^>]*>[^<]*)*)<\/a>/gi) || []

    for (const titleBlock of titleMatches.slice(0, RESULTS_LIMIT)) {
      const urlMatch = titleBlock.match(/href="([^"]*)"/)
      const titleMatch = titleBlock.match(/>([^<]*(?:<[^>]*>[^<]*)*)</)

      if (urlMatch) {
        let cleanTitle = (titleMatch ? titleMatch[1] : '')
          .replace(/<[^>]+>/g, '')
          .replace(/&[^;]+;/g, ' ')
          .trim()

        results.push({
          title: cleanTitle,
          url: urlMatch[1],
          snippet: '',
          source: 'baidu'
        })
      }
    }

    // 简化：只保留有意义的标题
    const filteredResults = results
      .filter(r => r.title.length > 5 && !r.title.includes('百度') && !r.title.includes('相关搜索'))
      .slice(0, RESULTS_LIMIT)

    console.log(`[MultiSearch] Baidu 获取到 ${filteredResults.length} 条结果`)
    return filteredResults
  } catch (error) {
    console.error('[MultiSearch] Baidu 搜索失败:', error.message)
    return []
  }
}

/**
 * 4. 百度百科 API (免费，权威中文百科)
 */
async function searchBaiduBaike(keyword) {
  try {
    const url = `https://baike.baidu.com/api/openapi/BaikeLemma?format=json&appid=379020&bk_key=${encodeURIComponent(keyword)}&bk_length=500`

    const response = await proxyFetch(url)
    const data = await response.json()

    const results = []

    if (data.id) {
      results.push({
        title: data.title || keyword,
        url: data.url || `https://baike.baidu.com/item/${encodeURIComponent(keyword)}`,
        snippet: data.abstract || data.desc || '',
        source: 'baidu_baike'
      })
    }

    console.log(`[MultiSearch] BaiduBaike 获取到 ${results.length} 条结果`)
    return results
  } catch (error) {
    console.error('[MultiSearch] BaiduBaike 搜索失败:', error.message)
    return []
  }
}

/**
 * 5. 知乎搜索 (中文问答社区)
 * 通过 RSS 或公开接口获取
 */
async function searchZhihu(keyword) {
  try {
    // 使用知乎搜索的公开接口
    const url = `https://www.zhihu.com/api/v4/search_v3?t=general&q=${encodeURIComponent(keyword)}&correction=1&offset=0&limit=${RESULTS_LIMIT}`

    const response = await proxyFetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'X-API-VERSION': '3.0.91'
      }
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    const results = []

    if (data.data) {
      for (const item of data.data.slice(0, RESULTS_LIMIT)) {
        if (item.object && item.object.title) {
          results.push({
            title: item.object.title || item.object.question?.title || '',
            url: item.object.url || item.object.question?.url || '',
            snippet: item.object.excerpt || item.object.content || '',
            source: 'zhihu'
          })
        }
      }
    }

    console.log(`[MultiSearch] Zhihu 获取到 ${results.length} 条结果`)
    return results
  } catch (error) {
    console.error('[MultiSearch] Zhihu 搜索失败:', error.message)
    return []
  }
}

/**
 * 6. 必应搜索 API (微软，免费额度)
 */
async function searchBing(keyword) {
  const apiKey = process.env.BING_API_KEY
  if (!apiKey) {
    return []
  }

  try {
    const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(keyword)}&count=${RESULTS_LIMIT}`

    const response = await proxyFetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey
      }
    })

    const data = await response.json()
    const results = []

    if (data.webPages && data.webPages.value) {
      for (const item of data.webPages.value) {
        results.push({
          title: item.name || '',
          url: item.url || '',
          snippet: item.snippet || '',
          source: 'bing'
        })
      }
    }

    console.log(`[MultiSearch] Bing 获取到 ${results.length} 条结果`)
    return results
  } catch (error) {
    console.error('[MultiSearch] Bing 搜索失败:', error.message)
    return []
  }
}

/**
 * 7. 获取 Wikipedia 词条详情
 * 用于补充背景知识
 */
async function getWikipediaContent(keyword) {
  try {
    const url = `https://zh.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(keyword)}&prop=extracts&exintro=1&explaintext=1&format=json`

    const response = await proxyFetch(url)
    const data = await response.json()

    const pages = data.query?.pages || {}
    const pageId = Object.keys(pages)[0]

    if (pageId && pageId !== '-1') {
      const page = pages[pageId]
      return {
        title: page.title,
        extract: page.extract || '',
        url: `https://zh.wikipedia.org/wiki/${encodeURIComponent(page.title)}`
      }
    }

    return null
  } catch (error) {
    console.error('[MultiSearch] Wikipedia 内容获取失败:', error.message)
    return null
  }
}

/**
 * 8. 搜狗搜索 (中文内容补充)
 */
async function searchSogou(keyword) {
  try {
    const url = `https://www.sogou.com/web?query=${encodeURIComponent(keyword)}&num=${RESULTS_LIMIT}`

    const response = await proxyFetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })

    const html = await response.text()
    const results = []

    // 解析搜狗结果
    const titleMatches = html.match(/<h3 class="pt[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([^<]*(?:<[^>]*>[^<]*)*)<\/a>/gi) || []

    for (const titleBlock of titleMatches.slice(0, RESULTS_LIMIT)) {
      const urlMatch = titleBlock.match(/href="([^"]*)"/)
      const titleMatch = titleBlock.match(/>([^<]*(?:<[^>]*>[^<]*)*)</)

      if (urlMatch) {
        results.push({
          title: (titleMatch ? titleMatch[1] : '').replace(/<[^>]+>/g, '').trim(),
          url: urlMatch[1],
          snippet: '',
          source: 'sogou'
        })
      }
    }

    console.log(`[MultiSearch] Sogou 获取到 ${results.length} 条结果`)
    return results
  } catch (error) {
    console.error('[MultiSearch] Sogou 搜索失败:', error.message)
    return []
  }
}

/**
 * 聚合多源搜索结果
 * 按优先级去重合并
 */
export async function multiSourceSearch(keyword, options = {}) {
  const {
    includeWikipedia = true,
    includeBaidu = true,
    includeBaiduBaike = true,
    includeZhihu = false,  // 知乎需要登录，默认关闭
    includeBing = true,
    includeSogou = true,
    includeTavily = true,
    tavilyResults = []
  } = options

  console.log(`[MultiSearch] 开始多源搜索: ${keyword}`)

  const allResults = []
  const seenUrls = new Set()

  const searchPromises = []

  if (includeBaidu) {
    searchPromises.push(withTimeout(searchBaidu(keyword), 8000))
  }

  if (includeSogou) {
    searchPromises.push(withTimeout(searchSogou(keyword), 8000))
  }

  if (includeWikipedia) {
    searchPromises.push(withTimeout(searchWikipedia(keyword), 5000))
  }

  if (includeBaiduBaike) {
    searchPromises.push(withTimeout(searchBaiduBaike(keyword), 5000))
  }

  // 收集所有结果
  const resultsArrays = await Promise.allSettled(searchPromises)

  for (const result of resultsArrays) {
    if (result.status === 'fulfilled' && result.value) {
      for (const item of result.value) {
        // 去重（基于 URL 和标题相似度）
        const urlKey = item.url?.split('?')[0] || ''
        const titleKey = item.title?.toLowerCase().slice(0, 30) || ''

        if (!seenUrls.has(urlKey) && item.title && item.title.length > 3) {
          seenUrls.add(urlKey)
          allResults.push(item)
        }
      }
    }
  }

  // 添加 Tavily 结果（如果提供）
  if (includeTavily && tavilyResults.length > 0) {
    for (const item of tavilyResults) {
      const urlKey = item.url?.split('?')[0] || ''
      if (!seenUrls.has(urlKey) && item.title) {
        seenUrls.add(urlKey)
        allResults.push({
          ...item,
          source: 'tavily'
        })
      }
    }
  }

  console.log(`[MultiSearch] 多源搜索完成，共 ${allResults.length} 条结果`)

  return {
    results: allResults.slice(0, RESULTS_LIMIT * 2),
    sourceCount: allResults.filter(r => r.source).length,
    sources: [...new Set(allResults.map(r => r.source))].filter(Boolean)
  }
}

/**
 * 获取补充知识（用于费曼学习法）
 */
export async function getSupplementaryKnowledge(keyword) {
  const knowledge = {
    wikipedia: null,
    baiduBaike: null,
    definitions: [],
    examples: []
  }

  // 并行获取 Wikipedia 和 BaiduBaike
  const [wikiContent, baikeContent] = await Promise.allSettled([
    getWikipediaContent(keyword),
    searchBaiduBaike(keyword).then(r => r[0] || null)
  ])

  if (wikiContent.status === 'fulfilled' && wikiContent.value) {
    knowledge.wikipedia = wikiContent.value
  }

  if (baikeContent.status === 'fulfilled' && baikeContent.value) {
    knowledge.baiduBaike = baikeContent.value
  }

  return knowledge
}

/**
 * 构建增强的分析报告
 * 包含多源数据，更有利于文章生成
 */
export function buildEnhancedReport(keyword, multiSearchResults, supplementaryKnowledge, imageResults = null) {
  const lines = [
    `# ${keyword} 竞品分析报告`,
    ``,
    `**数据来源**: ${multiSearchResults.sources.join(', ') || '多源聚合'}`,
    `**搜索时间**: ${new Date().toLocaleString('zh-CN')}`,
    ``,
  ]

  // 添加 Wikipedia 知识（费曼学习法：先给定义）
  if (supplementaryKnowledge.wikipedia) {
    const wiki = supplementaryKnowledge.wikipedia
    lines.push(`## 📖 基础定义（Wikipedia）`)
    lines.push(`**${wiki.title}**: ${wiki.extract.slice(0, 300)}${wiki.extract.length > 300 ? '...' : ''}`)
    lines.push(``)
  }

  // 添加百度百科知识
  if (supplementaryKnowledge.baiduBaike) {
    const baike = supplementaryKnowledge.baiduBaike
    if (baike.snippet) {
      lines.push(`## 📚 百度百科解读`)
      lines.push(baike.snippet.slice(0, 300))
      lines.push(``)
    }
  }

  // 竞品内容
  if (multiSearchResults.results.length > 0) {
    lines.push(`## 🔍 全网竞品分析`)
    lines.push(``)

    // 按来源分组显示
    const bySource = {}
    for (const result of multiSearchResults.results) {
      if (!bySource[result.source]) {
        bySource[result.source] = []
      }
      bySource[result.source].push(result)
    }

    for (const [source, results] of Object.entries(bySource).slice(0, 4)) {
      const sourceName = {
        'duckduckgo': '🌐 DuckDuckGo',
        'baidu': '🔴 百度',
        'sogou': '🐸 搜狗',
        'wikipedia': '📘 Wikipedia',
        'tavily': '🔮 Tavily',
        'bing': '🟢 Bing',
        'baidu_baike': '📖 百度百科',
        'zhihu': '❓ 知乎'
      }[source] || source

      lines.push(`### ${sourceName}`)

      for (const item of results.slice(0, 3)) {
        if (item.title && item.title.length > 3) {
          lines.push(`- **${item.title}**`)
          if (item.snippet) {
            lines.push(`  - ${item.snippet.slice(0, 100)}${item.snippet.length > 100 ? '...' : ''}`)
          }
        }
      }
      lines.push(``)
    }
  }

  // 添加图片推荐
  if (imageResults && imageResults.images && imageResults.images.length > 0) {
    lines.push(buildImageReport(imageResults))
  }

  // 推荐内容角度（费曼学习法建议）
  lines.push(`## 💡 推荐内容角度（费曼学习法）`)
  lines.push(`- **先给结论**: 用一句话概括 ${keyword} 是什么`)
  lines.push(`- **生活类比**: 用熟悉的事物解释抽象概念`)
  lines.push(`- **拆解概念**: 分步骤解释原理和机制`)
  lines.push(`- **误区澄清**: 列出常见误解和正确认知`)
  lines.push(``)

  return lines.join('\n')
}

/**
 * 综合搜索：文本 + 图片
 */
export async function comprehensiveSearch(keyword, options = {}) {
  // 并行执行文本搜索和图片搜索
  const [searchResult, imageResult] = await Promise.all([
    multiSourceSearch(keyword, options),
    multiSourceImageSearch(keyword, {
      includeUnsplash: true,
      includePexels: true,
      includePixabay: true,
      includeWikipedia: true
    })
  ])

  return {
    text: searchResult,
    images: imageResult
  }
}

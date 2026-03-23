/**
 * 免费图片搜索聚合器
 * 整合多个免费图片源，为SEO文章提供配图
 */

import { proxyFetch, wikipediaFetch, withTimeout } from './proxy'

const IMAGE_RESULTS_LIMIT = 10

/**
 * 1. Pexels API (免费，无需付费)
 * 需要 API Key，免费额度 200图/小时
 */
async function searchPexels(keyword) {
  const apiKey = process.env.PEXELS_API_KEY
  if (!apiKey) {
    console.log('[ImageSearch] Pexels API Key 未配置')
    return []
  }

  try {
    const response = await proxyFetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=${IMAGE_RESULTS_LIMIT}`,
      {
        headers: {
          'Authorization': apiKey
        }
      }
    )

    if (!response.ok) {
      console.error('[ImageSearch] Pexels 请求失败:', response.status)
      return []
    }

    const data = await response.json()
    const results = []

    if (data.photos) {
      for (const photo of data.photos) {
        results.push({
          url: photo.src.large || photo.src.medium || photo.src.original,
          thumbnail: photo.src.medium || photo.src.small,
          description: photo.alt || keyword,
          credit: 'Pexels',
          creditUrl: photo.url,
          photographer: photo.photographer,
          width: photo.width,
          height: photo.height
        })
      }
    }

    console.log(`[ImageSearch] Pexels 获取到 ${results.length} 张图片`)
    return results
  } catch (error) {
    console.error('[ImageSearch] Pexels 搜索失败:', error.message)
    return []
  }
}

/**
 * 2. Pixabay API (免费，无需付费)
 * 需要 API Key，免费额度 5000图/天
 */
async function searchPixabay(keyword) {
  const apiKey = process.env.PIXABAY_API_KEY
  if (!apiKey) {
    console.log('[ImageSearch] Pixabay API Key 未配置')
    return []
  }

  try {
    const response = await proxyFetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(keyword)}&per_page=${IMAGE_RESULTS_LIMIT}&image_type=photo`,
      {
        headers: {
          'User-Agent': 'SEO-Article-Generator/1.0'
        }
      }
    )

    if (!response.ok) {
      console.error('[ImageSearch] Pixabay 请求失败:', response.status)
      return []
    }

    const data = await response.json()
    const results = []

    if (data.hits) {
      for (const photo of data.hits) {
        results.push({
          url: photo.largeImageURL || photo.webformatURL,
          thumbnail: photo.webformatURL,
          description: photo.tags || keyword,
          credit: 'Pixabay',
          creditUrl: photo.pageURL,
          photographer: photo.user,
          width: photo.imageWidth,
          height: photo.imageHeight
        })
      }
    }

    console.log(`[ImageSearch] Pixabay 获取到 ${results.length} 张图片`)
    return results
  } catch (error) {
    console.error('[ImageSearch] Pixabay 搜索失败:', error.message)
    return []
  }
}

/**
 * 3. Wikipedia Commons (免费，CC0)
 * 通过 Wikipedia API 获取相关图片
 */
async function searchWikipediaImages(keyword) {
  try {
    // 先搜索相关页面（Wikipedia 不需要代理）
    const searchUrl = `https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(keyword)}&format=json`

    const searchResponse = await wikipediaFetch(searchUrl)
    const searchData = await searchResponse.json()
    const pageIds = searchData.query?.search?.slice(0, 5).map(p => p.pageid) || []

    if (pageIds.length === 0) return []

    // 获取页面图片
    const imagesUrl = `https://zh.wikipedia.org/w/api.php?action=query&pageids=${pageIds.join('|')}&prop=pageimages&pithumbsize=800&format=json`

    const imagesResponse = await wikipediaFetch(imagesUrl)
    const imagesData = await imagesResponse.json()
    const results = []

    const pages = imagesData.query?.pages || {}
    for (const pageId of pageIds) {
      const page = pages[pageId]
      if (page && page.thumbnail) {
        results.push({
          url: page.thumbnail.source,
          thumbnail: page.thumbnail.source,
          description: page.title,
          credit: 'Wikipedia',
          creditUrl: `https://zh.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
          photographer: 'Wikipedia Commons',
          width: page.thumbnail.width,
          height: page.thumbnail.height
        })
      }
    }

    console.log(`[ImageSearch] Wikipedia Commons 获取到 ${results.length} 张图片`)
    return results
  } catch (error) {
    console.error('[ImageSearch] Wikipedia 图片搜索失败:', error.message)
    return []
  }
}

/**
 * 4. Unsplash API (免费，需注册)
 * 目前最常用的免费高清图源
 */
async function searchUnsplash(keyword) {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_API_KEY
  if (!apiKey) {
    console.log('[ImageSearch] Unsplash API Key 未配置')
    return []
  }

  try {
    const response = await proxyFetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=${IMAGE_RESULTS_LIMIT}`,
      {
        headers: {
          'Authorization': `Client-ID ${apiKey}`
        }
      }
    )

    if (!response.ok) {
      console.error('[ImageSearch] Unsplash 请求失败:', response.status)
      return []
    }

    const data = await response.json()
    const results = []

    if (data.results) {
      for (const photo of data.results) {
        results.push({
          url: photo.urls.full + '&w=800&h=400&fit=crop',
          thumbnail: photo.urls.small,
          description: photo.description || photo.alt_description || keyword,
          credit: 'Unsplash',
          creditUrl: photo.links.html,
          photographer: photo.user.name,
          width: photo.width,
          height: photo.height
        })
      }
    }

    console.log(`[ImageSearch] Unsplash 获取到 ${results.length} 张图片`)
    return results
  } catch (error) {
    console.error('[ImageSearch] Unsplash 搜索失败:', error.message)
    return []
  }
}

/**
 * 5. DuckDuckGo 图片搜索 (免费，无需 API Key)
 * 通过 HTML 解析获取图片
 */
async function searchDuckDuckGoImages(keyword) {
  try {
    const url = `https://duckduckgo.com/?q=${encodeURIComponent(keyword)}&iax=1&ia=images&kl=zh-cn`

    const response = await proxyFetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })

    const html = await response.text()

    // 解析 DuckDuckGo 图片 JSON 数据
    const imageResults = []
    const jsonMatch = html.match(/DDG\.inkeyset\s*=\s*(\{[\s\S]*?\})\s*,\s*DDG\.dangset/) ||
                      html.match(/"image_metadata"\s*:\s*(\[[\s\S]*?\])/)

    // 简单的图片 URL 提取
    const imageUrlPattern = /https?:\/\/[^"'\s]+\.(?:jpg|jpeg|png|gif|webp)/gi
    const matches = html.match(imageUrlPattern) || []

    for (const url of [...new Set(matches)].slice(0, IMAGE_RESULTS_LIMIT)) {
      if (url && !url.includes('icon') && !url.includes('logo')) {
        imageResults.push({
          url: url,
          thumbnail: url,
          description: keyword,
          credit: 'DuckDuckGo',
          creditUrl: '',
          photographer: '',
          width: 0,
          height: 0
        })
      }
    }

    console.log(`[ImageSearch] DuckDuckGo 获取到 ${imageResults.length} 张图片`)
    return imageResults
  } catch (error) {
    console.error('[ImageSearch] DuckDuckGo 图片搜索失败:', error.message)
    return []
  }
}

/**
 * 6. 备用：直接使用 CC0 图片网站
 * 这些图片可以自由使用
 */
async function searchFreeImageFallback(keyword) {
  const results = []

  // 生成基于关键词的占位图（当所有API都失败时使用）
  // 使用 placeholder.com 或 similar 服务
  const placeholderUrl = `https://via.placeholder.com/800x400/667eea/ffffff?text=${encodeURIComponent(keyword)}`

  results.push({
    url: placeholderUrl,
    thumbnail: placeholderUrl,
    description: `关于 ${keyword} 的图片`,
    credit: 'Placeholder',
    creditUrl: 'https://placeholder.com',
    photographer: '',
    width: 800,
    height: 400
  })

  return results
}

/**
 * 聚合多源图片搜索
 */
export async function multiSourceImageSearch(keyword, options = {}) {
  const {
    includeUnsplash = true,
    includePexels = true,
    includePixabay = true,
    includeWikipedia = true,
    includeDuckDuckGo = false
  } = options

  console.log(`[ImageSearch] 开始多源图片搜索: ${keyword}`)

  const allImages = []
  const seenUrls = new Set()

  const searchPromises = []

  if (includeUnsplash) {
    searchPromises.push(withTimeout(searchUnsplash(keyword), 8000))
  }

  if (includePexels) {
    searchPromises.push(withTimeout(searchPexels(keyword), 8000))
  }

  if (includePixabay) {
    searchPromises.push(withTimeout(searchPixabay(keyword), 8000))
  }

  if (includeWikipedia) {
    searchPromises.push(withTimeout(searchWikipediaImages(keyword), 5000))
  }

  if (includeDuckDuckGo) {
    searchPromises.push(withTimeout(searchDuckDuckGoImages(keyword), 8000))
  }

  // 收集所有结果
  const resultsArrays = await Promise.allSettled(searchPromises)

  for (const result of resultsArrays) {
    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
      for (const img of result.value) {
        // 去重
        const urlKey = img.url?.split('?')[0] || ''
        if (!seenUrls.has(urlKey) && img.url && img.url.startsWith('http')) {
          seenUrls.add(urlKey)
          allImages.push(img)
        }
      }
    }
  }

  // 如果没有结果，使用占位图
  if (allImages.length === 0) {
    console.log('[ImageSearch] 所有图片源都失败，使用占位图')
    const fallback = await searchFreeImageFallback(keyword)
    allImages.push(...fallback)
  }

  console.log(`[ImageSearch] 图片搜索完成，共 ${allImages.length} 张图片`)

  return {
    images: allImages,
    totalCount: allImages.length,
    sources: [...new Set(allImages.map(img => img.credit))].filter(Boolean)
  }
}

/**
 * 构建图片推荐报告
 * 将图片信息格式化为 LLM 可读的格式
 */
export function buildImageReport(imageSearchResult) {
  const { images, sources } = imageSearchResult

  if (!images || images.length === 0) {
    return ''
  }

  const lines = [
    `## 📷 推荐配图（共 ${images.length} 张）`,
    ``,
    `图片来源: ${sources.join(', ')}`,
    ``
  ]

  for (let i = 0; i < Math.min(images.length, 6); i++) {
    const img = images[i]
    const imgStyle = getImageStyle(img)

    lines.push(`### 图片 ${i + 1}: ${img.description}`)
    lines.push(`- **URL**: ${img.url}`)
    lines.push(`- **尺寸**: ${img.width}x${img.height}`)
    lines.push(`- **来源**: ${img.credit}`)
    if (img.photographer) {
      lines.push(`- **摄影师**: ${img.photographer}`)
    }
    lines.push(`- **推荐位置**: ${imgStyle.position}`)
    lines.push(``)
  }

  return lines.join('\n')
}

/**
 * 根据图片比例推荐放置位置
 */
function getImageStyle(img) {
  const ratio = img.width / img.height

  if (ratio > 1.5) {
    return { position: '文章开头或每个大节之后', style: '横向大图' }
  } else if (ratio < 0.8) {
    return { position: '侧边栏或小节之间', style: '竖向图' }
  } else {
    return { position: '文章中间任意位置', style: '方图' }
  }
}

/**
 * 随机选择一张适合的图片
 */
export function getRandomImage(imageSearchResult, preferredPosition = 'middle') {
  const { images } = imageSearchResult

  if (!images || images.length === 0) {
    return null
  }

  // 过滤适合该位置的图片
  const ratioMap = { top: 1.5, middle: 1.0, bottom: 0.8 }
  const minRatio = ratioMap[preferredPosition] || 1.0

  const suitable = images.filter(img => (img.width / img.height) >= minRatio)

  if (suitable.length > 0) {
    return suitable[Math.floor(Math.random() * suitable.length)]
  }

  return images[Math.floor(Math.random() * images.length)]
}

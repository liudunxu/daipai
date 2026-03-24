import { NextResponse } from 'next/server'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'
import { getAccessToken } from '../../../../lib/wechat/auth'
import { uploadImage, processArticleImages, replaceImagesWithMediaId } from '../../../../lib/wechat/uploader'
import { convertHtmlForWechat, extractDigest, buildDraftContent } from '../../../../lib/wechat/content'

const TABLE_ARTICLES = 'seo_articles'
const TABLE_KEYWORDS = 'seo_keywords'

// 重试配置
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

// 睡眠函数
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 获取代理 agent
 */
function getProxyAgent() {
  const proxyUrl = process.env.WECHAT_API_PROXY
  if (!proxyUrl) return null
  try {
    return new HttpsProxyAgent(proxyUrl)
  } catch {
    return null
  }
}

/**
 * 根据文章标题搜索封面图片
 * 优先级：文章内容图片 > Wikipedia > Bing > Unsplash > Pexels > 默认图
 */
async function searchCoverImage(article) {
  const { title, keyword, content } = article
  // 默认图片
  const defaultImage = 'https://file.cdn.minimax.io/public/5371344a-1a43-470d-b5ac-e4c81b2a0ea2.png'

  try {
    // 1. 优先从文章内容中提取第一张图片
    if (content) {
      const match = content.match(/!\[([^\]]*)\]\(([^)]+)\)/)
      if (match) {
        const imgUrl = match[2]
        console.log('[Wechat Sync] 使用文章内容第一张图作为封面:', imgUrl)
        return imgUrl
      }
    }

    const searchQuery = keyword || title.replace(/[^\w\u4e00-\u9fa5]/g, ' ').trim().split(' ')[0]

    // 2. 尝试 Wikipedia 图片
    try {
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchQuery)}&prop=pageimages&format=json&pithumbsize=800&origin=*`
      const wikiResponse = await fetch(wikiUrl)
      if (wikiResponse.ok) {
        const wikiData = await wikiResponse.json()
        const pages = wikiData.query?.pages
        if (pages) {
          const pageId = Object.keys(pages)[0]
          if (pageId && pageId !== '-1' && pages[pageId].thumbnail) {
            const imgUrl = pages[pageId].thumbnail.source
            console.log('[Wechat Sync] Wikipedia 找到封面图:', imgUrl)
            return imgUrl
          }
        }
      }
    } catch (e) {
      console.log('[Wechat Sync] Wikipedia 图片搜索失败:', e.message)
    }

    // 3. 尝试 Bing 图片搜索（不需要 API key）
    try {
      const bingUrl = `https://www.bing.com/images/api/search?q=${encodeURIComponent(searchQuery + ' high quality')}&count=1&safeSearch=Strict`
      const bingResponse = await fetch(bingUrl)
      if (bingResponse.ok) {
        const bingText = await bingResponse.text()
        const m = bingText.match(/"murl":"([^"]+)"/)
        if (m) {
          const imgUrl = m[1].replace(/\\:/g, ':').replace(/\\/g, '/')
          console.log('[Wechat Sync] Bing 找到封面图:', imgUrl)
          return imgUrl
        }
      }
    } catch (e) {
      console.log('[Wechat Sync] Bing 图片搜索失败:', e.message)
    }

    // 4. 尝试 Unsplash API
    const unsplashKey = process.env.UNSPLASH_API_KEY
    if (unsplashKey) {
      try {
        const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=3&orientation=landscape`
        const response = await fetch(searchUrl, {
          headers: { 'Authorization': `Client-ID ${unsplashKey}` }
        })
        if (response.ok) {
          const data = await response.json()
          if (data.results && data.results.length > 0) {
            const photo = data.results[0]
            const imgUrl = photo.urls.regular || photo.urls.small || photo.urls.thumb
            console.log('[Wechat Sync] Unsplash 找到封面图:', imgUrl)
            return imgUrl
          }
        }
      } catch (e) {
        console.log('[Wechat Sync] Unsplash 请求失败:', e.message)
      }
    }

    // 5. 尝试 Pexels API
    const pexelsKey = process.env.PEXELS_API_KEY
    if (pexelsKey) {
      try {
        const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=3&orientation=landscape`
        const response = await fetch(searchUrl, {
          headers: { 'Authorization': pexelsKey }
        })
        if (response.ok) {
          const data = await response.json()
          if (data.photos && data.photos.length > 0) {
            const photo = data.photos[0]
            const imgUrl = photo.src.large2x || photo.src.large || photo.src.medium
            console.log('[Wechat Sync] Pexels 找到封面图:', imgUrl)
            return imgUrl
          }
        }
      } catch (e) {
        console.log('[Wechat Sync] Pexels 请求失败:', e.message)
      }
    }

    console.log('[Wechat Sync] 所有图片搜索都失败，使用默认图片')
    return defaultImage
  } catch (error) {
    console.error('[Wechat Sync] 封面图搜索失败:', error.message)
    return defaultImage
  }
}

// 带重试的 fetch（支持代理）
async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  const agent = getProxyAgent()
  const fetchOptions = agent ? { ...options, agent } : options
  let lastError

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, fetchOptions)
      return response
    } catch (error) {
      lastError = error
      console.error(`[Wechat Sync] 请求失败，第 ${i + 1}/${retries} 次:`, error.message)
      if (i < retries - 1) {
        await sleep(RETRY_DELAY * (i + 1))
      }
    }
  }

  throw lastError
}

// 认证检查
async function authCheck(request) {
  const result = await verifyRequest(request)
  if (!result.valid) {
    return {
      error: result.error,
      response: NextResponse.json({ error: result.error }, { status: 401 })
    }
  }
  return { user: result.payload }
}

// POST 同步文章到微信草稿箱
export async function POST(request) {
  const auth = await authCheck(request)
  if (auth.error) return auth.response

  try {
    const { keyword, articleId } = await request.json()

    if (!keyword && !articleId) {
      return NextResponse.json({ error: '关键词或文章ID不能都为空' }, { status: 400 })
    }

    console.log(`[Wechat Sync] 开始同步文章: keyword=${keyword}, articleId=${articleId}`)

    // 1. 从 Supabase 获取文章
    let query = supabase.from(TABLE_ARTICLES).select('*')
    if (articleId) {
      query = query.eq('article_id', articleId)
    } else {
      query = query.eq('keyword', keyword)
    }
    const { data: article, error } = await query.single()

    if (error || !article) {
      console.error('[Wechat Sync] 文章不存在:', keyword)
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    console.log(`[Wechat Sync] 获取文章成功: ${article.title}`)

    // 2. 提取摘要（微信摘要限制54个汉字≈120字符）
    const rawDigest = article.description || article.content
    const digest = extractDigest(rawDigest, 117)

    // 4. 上传封面图到永久素材（thumb_media_id 必须是永久素材）
    console.log('[Wechat Sync] 上传封面图片到永久素材...')
    let thumbMediaId = ''
    try {
      // 根据文章内容/标题搜索相关图片
      const coverUrl = await searchCoverImage({ title: article.title, keyword: article.keyword, content: article.content })
      console.log('[Wechat Sync] 开始下载封面 from:', coverUrl)

      // 先下载图片
      const agent = getProxyAgent()
      const options = agent ? { agent } : {}
      const imgResponse = await fetch(coverUrl, options)
      const imgBuffer = await imgResponse.arrayBuffer()
      const imgBlob = new Blob([imgBuffer])

      // 上传到永久素材（type=image 作为 thumb）
      const accessToken = await getAccessToken()
      const uploadUrl = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=image`

      const formData = new FormData()
      formData.append('media', imgBlob, 'cover.png')

      const uploadResponse = await fetchWithRetry(uploadUrl, {
        method: 'POST',
        body: formData
      })
      const uploadResult = await uploadResponse.json()

      if (uploadResult.errcode) {
        console.error('[Wechat Sync] 永久素材上传失败:', uploadResult)
      } else {
        thumbMediaId = uploadResult.media_id
        console.log('[Wechat Sync] 永久素材上传成功, media_id:', thumbMediaId)
      }
    } catch (err) {
      console.error('[Wechat Sync] 封面上传失败:', err.message)
    }

    console.log('[Wechat Sync] 构建草稿，thumbMediaId:', thumbMediaId)

    // 6. 先将 Markdown 转换为 HTML
    const htmlContent = convertHtmlForWechat(article.content)

    // 调试：打印转换后的 HTML 内容，检查是否包含 img 标签
    console.log('[Wechat Sync] 转换后HTML内容长度:', htmlContent.length)
    const imgMatches = htmlContent.match(/<img[^>]*>/gi)
    console.log('[Wechat Sync] HTML中发现 img 标签数量:', imgMatches ? imgMatches.length : 0)
    if (imgMatches) {
      imgMatches.forEach((img, i) => console.log(`[Wechat Sync] img[${i}]:`, img.slice(0, 200)))
    }

    // 7. 处理内容中的图片（此时已是 HTML，可以提取 <img> 标签）
    console.log('[Wechat Sync] 开始处理内容中的图片...')
    const imageResults = await processArticleImages(htmlContent)
    console.log(`[Wechat Sync] 图片处理结果:`, JSON.stringify(imageResults))
    console.log(`[Wechat Sync] 图片处理完成，成功 ${imageResults.filter(r => r.media_id).length}/${imageResults.length} 张`)

    // 检查每张图片的 url 字段
    for (const r of imageResults) {
      console.log(`[Wechat Sync] 图片 ${r.originalUrl.slice(-30)}...`)
      console.log(`  media_id: ${r.media_id ? '有' : '无'}`)
      console.log(`  url: ${r.url ? r.url : '无'}`)
    }

    // 8. 替换内容中的图片为微信 CDN 地址
    console.log('[Wechat Sync] 开始替换图片...')
    const wechatContent = replaceImagesWithMediaId(htmlContent, imageResults)

    // 调试：检查替换后的 HTML
    const replacedImgMatches = wechatContent.match(/<img[^>]*>/gi)
    console.log('[Wechat Sync] 替换后 img 标签数量:', replacedImgMatches ? replacedImgMatches.length : 0)
    if (replacedImgMatches && replacedImgMatches.length > 0) {
      console.log('[Wechat Sync] 替换后第一个 img:', replacedImgMatches[0].slice(0, 200))
    }

    // 9. 在文章末尾附加主页链接，引导用户访问
    const homepageLink = `<p style="text-align:center;margin-top:32px;"><a href="https://www.zkwatcher.top" style="color:#60a5fa;font-size:14px;text-decoration:underline;">访问更多文章请访问：zkwatcher.top</a></p>`
    const finalContent = wechatContent + homepageLink

    // 调试：检查末尾链接
    console.log('[Wechat Sync] 末尾200字符:', finalContent.slice(-200))

    // 10. 构建草稿内容
    const draftContent = buildDraftContent({
      title: article.title,
      author: 'DeepDrinker',
      digest,
      content: finalContent,
      thumbMediaId,
      showCoverPic: thumbMediaId ? 1 : 0
    })

    console.log('[Wechat Sync] 草稿内容 preview:', JSON.stringify(draftContent).slice(0, 500))

    // 10. 调用微信 API 创建草稿（带重试）
    console.log('[Wechat Sync] 创建微信草稿...')
    const accessToken = await getAccessToken()
    const draftUrl = `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${accessToken}`

    console.log('[Wechat Sync] 发送的 body:', JSON.stringify(draftContent).slice(0, 800))

    const draftResponse = await fetchWithRetry(draftUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draftContent)
    })

    const draftResult = await draftResponse.json()

    if (draftResult.errcode) {
      console.error('[Wechat Sync] 创建草稿失败:', draftResult)
      return NextResponse.json({
        success: false,
        error: `微信API错误: ${draftResult.errmsg}`,
        errcode: draftResult.errcode
      }, { status: 500 })
    }

    console.log('[Wechat Sync] 同步成功!')

    // 11. 更新关键词的微信同步状态
    try {
      await supabase
        .from(TABLE_KEYWORDS)
        .update({
          wechat_synced: true,
          wechat_synced_at: new Date().toISOString()
        })
        .eq('keyword', keyword)
      console.log('[Wechat Sync] 同步状态已更新')
    } catch (err) {
      console.error('[Wechat Sync] 更新同步状态失败:', err)
    }

    return NextResponse.json({
      success: true,
      message: '文章已同步到微信公众号草稿箱',
      data: {
        keyword,
        title: article.title,
        imagesProcessed: imageResults.filter(r => r.media_id).length,
        totalImages: imageResults.length
      }
    })

  } catch (error) {
    console.error('[Wechat Sync] 同步失败:', error)
    return NextResponse.json({
      success: false,
      error: `同步失败: ${error.message}`
    }, { status: 500 })
  }
}

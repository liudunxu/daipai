import { NextResponse } from 'next/server'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'
import { getAccessToken } from '../../../../lib/wechat/auth'
import { uploadImage, processArticleImages, replaceImagesWithMediaId } from '../../../../lib/wechat/uploader'
import { convertHtmlForWechat, extractDigest, buildDraftContent } from '../../../../lib/wechat/content'

const TABLE_ARTICLES = 'seo_articles'

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
    const { keyword } = await request.json()

    if (!keyword) {
      return NextResponse.json({ error: '关键词不能为空' }, { status: 400 })
    }

    console.log(`[Wechat Sync] 开始同步文章: ${keyword}`)

    // 1. 从 Supabase 获取文章
    const { data: article, error } = await supabase
      .from(TABLE_ARTICLES)
      .select('*')
      .eq('keyword', keyword)
      .single()

    if (error || !article) {
      console.error('[Wechat Sync] 文章不存在:', keyword)
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    console.log(`[Wechat Sync] 获取文章成功: ${article.title}`)

    // 2. 提取摘要
    const digest = extractDigest(article.description || article.content)

    // 4. 上传封面图到永久素材（thumb_media_id 必须是永久素材）
    console.log('[Wechat Sync] 上传封面图片到永久素材...')
    let thumbMediaId = ''
    try {
      const coverUrl = 'https://file.cdn.minimax.io/public/5371344a-1a43-470d-b5ac-e4c81b2a0ea2.png'
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

      const uploadResponse = await fetch(uploadUrl, {
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

    // 6. 处理内容中的图片
    console.log('[Wechat Sync] 开始处理内容中的图片...')
    const imageResults = await processArticleImages(article.content)
    console.log(`[Wechat Sync] 图片处理完成，成功 ${imageResults.filter(r => r.media_id).length}/${imageResults.length} 张`)

    // 7. 替换内容中的图片为微信 CDN 地址
    const convertedContent = replaceImagesWithMediaId(article.content, imageResults)

    // 8. 转换 HTML 格式
    const wechatContent = convertHtmlForWechat(convertedContent)

    // 9. 构建草稿内容
    const draftContent = buildDraftContent({
      title: article.title,
      author: '东北雨姐',
      digest,
      content: wechatContent,
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

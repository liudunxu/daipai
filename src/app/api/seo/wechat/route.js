import { NextResponse } from 'next/server'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { supabase } from '../../../../lib/supabase'
import { verifyRequest } from '../../../../lib/seo/auth'
import { getAccessToken } from '../../../../lib/wechat/auth'
import { processArticleImages, replaceImagesWithMediaId } from '../../../../lib/wechat/uploader'
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

    // 2. 处理文章中的图片（上传到微信素材库）
    console.log('[Wechat Sync] 开始处理图片...')
    const imageResults = await processArticleImages(article.content)

    // 3. 替换内容中的图片地址
    const convertedContent = replaceImagesWithMediaId(article.content, imageResults)

    // 4. 转换 HTML 格式
    const wechatContent = convertHtmlForWechat(convertedContent)

    // 5. 提取摘要
    const digest = extractDigest(article.description || article.content)

    // 6. 构建草稿内容（不设置封面）
    const draftContent = buildDraftContent({
      title: article.title,
      author: '东北雨姐',
      digest,
      content: wechatContent,
      showCoverPic: 0
    })

    // 7. 调用微信 API 创建草稿（带重试）
    console.log('[Wechat Sync] 创建微信草稿...')
    const accessToken = await getAccessToken()
    const draftUrl = `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${accessToken}`

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

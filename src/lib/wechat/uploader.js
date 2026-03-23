import { getAccessToken } from './auth'
import { HttpsProxyAgent } from 'https-proxy-agent'

const UPLOAD_URL = 'https://api.weixin.qq.com/cgi-bin/media/upload'

// 重试配置
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // ms

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
 * 带重试的 fetch（支持代理）
 */
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
      console.error(`[Wechat] 请求失败，第 ${i + 1}/${retries} 次:`, error.message)
      if (i < retries - 1) {
        await sleep(RETRY_DELAY * (i + 1)) // 递增延迟
      }
    }
  }

  throw lastError
}

/**
 * 睡眠函数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 上传单张图片到微信素材库
 * @param {string} imageUrl - 图片 URL 或 data:image base64
 * @returns {Promise<{media_id: string, url: string}>}
 */
export async function uploadImage(imageUrl) {
  const accessToken = await getAccessToken()

  // 处理 base64 图片
  if (imageUrl.startsWith('data:')) {
    return uploadBase64Image(imageUrl, accessToken)
  }

  // 下载外链图片
  const imageBuffer = await downloadImage(imageUrl)
  const blob = new Blob([imageBuffer])

  const formData = new FormData()
  formData.append('media', blob, 'image.jpg')

  const response = await fetchWithRetry(
    `${UPLOAD_URL}?access_token=${accessToken}&type=image`,
    {
      method: 'POST',
      body: formData
    }
  )

  const data = await response.json()

  if (data.errcode) {
    throw new Error(`图片上传失败: ${data.errmsg} (${data.errcode})`)
  }

  return {
    media_id: data.media_id,
    url: data.url
  }
}

/**
 * 上传 base64 图片
 */
async function uploadBase64Image(base64Data, accessToken) {
  // 提取 MIME 类型和数据
  const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/)
  if (!matches) {
    throw new Error('无效的 base64 图片格式')
  }

  const mimeType = matches[1]
  const base64 = matches[2]

  // 转换为 Buffer
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  const blob = new Blob([bytes], { type: mimeType })
  const formData = new FormData()
  formData.append('media', blob, 'image.jpg')

  const response = await fetchWithRetry(
    `${UPLOAD_URL}?access_token=${accessToken}&type=image`,
    {
      method: 'POST',
      body: formData
    }
  )

  const data = await response.json()

  if (data.errcode) {
    throw new Error(`base64 图片上传失败: ${data.errmsg} (${data.errcode})`)
  }

  return {
    media_id: data.media_id,
    url: data.url
  }
}

/**
 * 下载外链图片为 ArrayBuffer
 */
async function downloadImage(url) {
  const agent = getProxyAgent()
  const options = agent ? { agent } : {}
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`图片下载失败: ${response.status} ${response.statusText}`)
  }
  return response.arrayBuffer()
}

/**
 * 批量处理文章中的所有图片
 * @param {string} htmlContent - HTML 内容
 * @returns {Promise<{originalUrl: string, media_id: string, url: string}[]>}
 */
export async function processArticleImages(htmlContent) {
  // 提取所有图片 URL
  const imageUrlRegex = /<img[^>]+src=["']([^"']+)["']/gi
  const imageUrls = []
  let match

  while ((match = imageUrlRegex.exec(htmlContent)) !== null) {
    imageUrls.push(match[1])
  }

  // 去重
  const uniqueUrls = [...new Set(imageUrls)]

  if (uniqueUrls.length === 0) {
    return []
  }

  console.log(`[Wechat Uploader] 发现 ${uniqueUrls.length} 张图片待处理`)

  // 并行上传所有图片
  const uploadPromises = uniqueUrls.map(async (url) => {
    try {
      const result = await uploadImage(url)
      return { originalUrl: url, ...result }
    } catch (error) {
      console.error(`[Wechat Uploader] 图片上传失败 [${url}]:`, error.message)
      return { originalUrl: url, error: error.message }
    }
  })

  const results = await Promise.all(uploadPromises)

  // 过滤成功的
  const successful = results.filter(r => r.media_id)

  console.log(`[Wechat Uploader] 成功 ${successful.length}/${uniqueUrls.length} 张`)

  return results
}

/**
 * 替换 HTML 中的图片为微信兼容格式
 * 对于草稿，直接使用原始 URL，不依赖 media_id
 * @param {string} htmlContent - 原始 HTML
 * @param {Array} imageResults - processArticleImages 返回的结果
 * @returns {string} - 替换后的 HTML（图片使用微信 CDN 地址）
 */
export function replaceImagesWithMediaId(htmlContent, imageResults) {
  let content = htmlContent

  for (const result of imageResults) {
    if (result.media_id && result.url) {
      // 替换 src 为微信 CDN 地址（result.url 是微信返回的图片 URL）
      content = content.replace(
        new RegExp(`src=["']${escapeRegex(result.originalUrl)}["']`, 'gi'),
        `src="${result.url}"`
      )
    }
  }

  return content
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

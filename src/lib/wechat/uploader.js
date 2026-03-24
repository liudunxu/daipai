import { getAccessToken } from './auth'
import https from 'https'
import { HttpsProxyAgent } from 'https-proxy-agent'

const UPLOAD_URL = 'https://api.weixin.qq.com/cgi-bin/media/upload'
const UPLOAD_TEMP_URL = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg' // 临时素材接口，返回URL

// 重试配置
const MAX_RETRIES = 5
const RETRY_DELAY = 2000 // ms

/**
 * 使用 Node.js 原生 https 通过代理发送请求
 */
function proxyHttpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const proxyUrl = process.env.WECHAT_API_PROXY

    if (!proxyUrl) {
      console.log('[Wechat Uploader] 不使用代理，直接请求')
      const req = https.request(url, options, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(JSON.parse(data))
          })
        })
      })
      req.on('error', reject)
      req.on('timeout', () => {
        req.destroy()
        reject(new Error('请求超时'))
      })
      req.setTimeout(30000)
      if (options.body) req.write(options.body)
      req.end()
      return
    }

    console.log('[Wechat Uploader] 使用代理:', proxyUrl)
    const agent = new HttpsProxyAgent(proxyUrl)
    const reqOptions = { ...options, agent }

    console.log('[Wechat Uploader] 开始请求:', url)

    const req = https.request(url, reqOptions, (res) => {
      console.log('[Wechat Uploader] 收到响应, status:', res.statusCode)
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(JSON.parse(data))
          })
        } catch (e) {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => { throw new Error('JSON parse error') }
          })
        }
      })
    })

    req.on('socket', (socket) => {
      console.log('[Wechat Uploader] Socket 连接建立')
      socket.on('close', () => console.log('[Wechat Uploader] Socket 关闭'))
      socket.on('error', (err) => console.log('[Wechat Uploader] Socket 错误:', err.message))
    })

    req.on('error', reject)
    req.on('timeout', () => {
      console.error('[Wechat Uploader] 请求超时')
      req.destroy()
      reject(new Error('请求超时'))
    })

    req.setTimeout(30000)
    if (options.body) req.write(options.body)
    req.end()
  })
}

/**
 * 带重试的请求（支持代理）
 * FormData 类型使用原生 fetch，其他类型使用原生 https.request
 */
async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  let lastError
  const isFormData = options.body instanceof FormData

  for (let i = 0; i < retries; i++) {
    try {
      let response

      if (isFormData) {
        // FormData 类型用原生 fetch（可正确处理 FormData + 代理）
        const proxyUrl = process.env.WECHAT_API_PROXY
        if (proxyUrl) {
          const { HttpsProxyAgent } = await import('https-proxy-agent')
          options.agent = new HttpsProxyAgent(proxyUrl)
        }
        const res = await fetch(url, options)
        const text = await res.text()
        response = {
          ok: res.ok,
          status: res.status,
          json: () => {
            try { return Promise.resolve(JSON.parse(text)) }
            catch { return Promise.reject(new Error('JSON parse error')) }
          }
        }
      } else {
        // 非 FormData 用原生 https.request
        response = await proxyHttpsRequest(url, options)
      }

      return response
    } catch (error) {
      lastError = error
      console.error(`[Wechat] 请求失败，第 ${i + 1}/${retries} 次:`, error.message)
      if (i < retries - 1) {
        await sleep(RETRY_DELAY * (i + 1))
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
 * 上传单张图片到微信（使用临时素材接口，直接返回URL）
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

  // 使用临时素材接口上传图片（返回 CDN URL）
  const response = await fetchWithRetry(
    `${UPLOAD_TEMP_URL}?access_token=${accessToken}`,
    {
      method: 'POST',
      body: formData
    }
  )

  const data = await response.json()
  console.log('[uploadImage] 微信返回数据:', JSON.stringify(data))

  if (data.errcode) {
    throw new Error(`图片上传失败: ${data.errmsg} (${data.errcode})`)
  }

  // 临时素材接口直接返回 url
  return {
    media_id: data.media_id || '',
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
 * 下载外链图片为 ArrayBuffer（不走代理，带重试）
 */
async function downloadImage(url) {
  let lastError
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`图片下载失败: ${response.status} ${response.statusText}`)
      }
      return await response.arrayBuffer()
    } catch (error) {
      lastError = error
      console.error(`[Wechat Uploader] 图片下载失败 [${i + 1}/${MAX_RETRIES}]: ${url} - ${error.message}`)
      if (i < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY * (i + 1))
      }
    }
  }
  throw lastError
}

/**
 * 批量处理文章中的所有图片
 * @param {string} htmlContent - HTML 内容
 * @returns {Promise<{originalUrl: string, media_id: string, url: string}[]>}
 */
export async function processArticleImages(htmlContent) {
  // 提取所有图片 URL（增强：支持 src="" src='' src=value 等各种格式）
  const imageUrlRegex = /<img[^>]*\ssrc=["']([^"']*)["'][^>]*>/gi
  const imageUrls = []
  let match

  while ((match = imageUrlRegex.exec(htmlContent)) !== null) {
    const url = match[1]
    // 跳过空 URL 和 data URI（data URI 不需要上传到微信）
    if (url && !url.startsWith('data:')) {
      imageUrls.push(url)
    }
  }

  // 去重
  const uniqueUrls = [...new Set(imageUrls)]

  if (uniqueUrls.length === 0) {
    console.log('[Wechat Uploader] 未发现有效图片')
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
      const originalUrl = result.originalUrl
      const wechatUrl = result.url

      // 调试日志
      console.log('[replaceImages] originalUrl:', originalUrl)
      console.log('[replaceImages] wechatUrl:', wechatUrl)

      // 多种替换模式：src="url" src='url' src=value
      const escapedUrl = escapeRegex(originalUrl)
      console.log('[replaceImages] escapedUrl:', escapedUrl)

      const patterns = [
        new RegExp(`src=["']${escapedUrl}["']`, 'gi'),
        new RegExp(`src=${escapedUrl}`, 'gi')
      ]

      let replaced = false
      for (const pattern of patterns) {
        console.log('[replaceImages] testing pattern:', pattern)
        if (pattern.test(content)) {
          content = content.replace(pattern, `src="${wechatUrl}"`)
          console.log('[replaceImages] 替换成功!')
          replaced = true
          break
        }
      }

      if (!replaced) {
        console.log('[replaceImages] 未找到匹配项，检查 HTML 中是否有该 URL...')
        // 检查 HTML 中是否包含原始 URL
        const urlIndex = content.indexOf(originalUrl)
        console.log('[replaceImages] urlIndex:', urlIndex)
        if (urlIndex >= 0) {
          console.log('[replaceImages] 找到URL，上下文:', content.slice(urlIndex - 20, urlIndex + 80))
        }
      }
    }
  }

  return content
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

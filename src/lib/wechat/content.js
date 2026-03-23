/**
 * 微信公众号富文本内容转换工具
 */

/**
 * 将 HTML 内容转换为微信公众号支持的格式
 * @param {string} htmlContent - 原始 HTML
 * @returns {string} - 转换后的 HTML
 */
export function convertHtmlForWechat(htmlContent) {
  let content = htmlContent

  // 移除 class 属性
  content = content.replace(/\s*class="[^"]*"/gi, '')
  content = content.replace(/\s*className="[^"]*"/gi, '')

  // 移除 data-* 属性（除了 data-media_id）
  content = content.replace(/\s*data-[\w-]+=["'][^"']*["']/gi, (match) => {
    if (match.includes('data-media_id')) return match
    return ''
  })

  // 标题处理
  content = content.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '<h1>$1</h1>')
  content = content.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '<h2>$1</h2>')
  content = content.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '<h3>$1</h3>')
  content = content.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '<h4>$1</h4>')

  // 段落处理
  content = content.replace(/<p[^>]*>/gi, '<p>')

  // 换行处理
  content = content.replace(/<br\s*\/?>/gi, '<br/>')

  // 移除多余的空段落
  content = content.replace(/<p>\s*<\/p>/gi, '')

  // 移除 style 属性
  content = content.replace(/\s*style="[^"]*"/gi, '')

  return content
}

/**
 * 提取纯文本描述
 * @param {string} htmlContent - HTML 内容
 * @param {number} maxLength - 最大长度
 * @returns {string}
 */
export function extractDigest(htmlContent, maxLength = 120) {
  const text = htmlContent
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

/**
 * 生成微信草稿内容结构
 * @param {object} params
 * @returns {object}
 */
export function buildDraftContent({
  title,
  author = '东北雨姐',
  digest,
  content,
  thumbMediaId,
  showCoverPic = 1
}) {
  return {
    articles: [
      {
        title,
        author,
        digest: digest || '',
        content,
        content_source_url: '',
        thumb_media_id: thumbMediaId || '',
        need_open_comment: 1,
        only_fans_can_comment: 0,
        show_cover_pic: showCoverPic
      }
    ]
  }
}

/**
 * 上传封面图片并返回 media_id
 * @param {string} imageUrl - 封面图片 URL
 * @returns {Promise<string>} - media_id
 */
export async function uploadCoverImage(imageUrl) {
  const { uploadImage } = await import('./uploader')

  try {
    const result = await uploadImage(imageUrl)
    return result.media_id
  } catch (error) {
    console.error('[Wechat Content] 封面上传失败:', error)
    return null
  }
}

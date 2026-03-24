/**
 * 微信公众号富文本内容转换工具
 */

import { marked } from 'marked'

/**
 * 将 Markdown 或 HTML 内容转换为微信公众号支持的格式
 * 保留样式实现所见即所得
 * @param {string} content - 原始内容 (Markdown 或 HTML)
 * @returns {string} - 转换后的 HTML
 */
export function convertHtmlForWechat(content) {
  if (!content) return ''

  // 0. 先处理常见的 markdown 格式，确保 **text** 等被正确转换
  // 处理加粗 **text** -> <strong>text</strong>
  content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // 处理斜体 *text* -> <em>text</em>
  content = content.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
  // 处理删除线 ~~text~~ -> <s>text</s>
  content = content.replace(/~~(.+?)~~/g, '<s>$1</s>')
  // 处理分隔线 --- -> <hr/> (marked对---有时解析不稳定)
  content = content.replace(/^---$/gm, '<hr/>')

  // 1. 先把 markdown 图片提取出来，避免 marked 解析时出问题
  // 注意：占位符使用 <<>> 格式，避免被 marked 当作 markdown 语法处理
  // 支持格式: ![alt](url) ![alt](url "title") ![alt](url 'title')
  const imageMap = new Map()
  let imageCounter = 0
  // 修复：正确匹配带 title 的 markdown 图片语法
  content = content.replace(/!\[([^\]]*)\]\(([^)"']*(?:"[^"]*|'[^']*)?)\)/g, (match, alt, urlWithTitle) => {
    // 提取 URL（去掉 title 部分）
    const urlMatch = urlWithTitle.match(/^([^"')\s]+)/)
    const url = urlMatch ? urlMatch[1].trim() : ''

    if (!url) {
      console.warn('[convertHtmlForWechat] 发现空URL图片，跳过:', match)
      return ''
    }

    const placeholder = `<<IMG_PLACEHOLDER_${imageCounter}>>`
    imageMap.set(placeholder, { alt, url })
    imageCounter++
    return placeholder
  })

  // 2. 用 marked 解析剩余的 markdown
  content = marked.parse(content)

  // 3. 把图片占位符替换成真正的 img 标签
  imageMap.forEach((img, placeholder) => {
    const imgHtml = `<img src="${img.url}" alt="${img.alt}" style="width:100%;max-width:100%;border-radius:8px;display:block;margin:16px auto;" />`
    content = content.replace(placeholder, imgHtml)
  })

  // 4. 保留文章中已有的 img 标签（来自生成时直接嵌入的 HTML）
  // 确保所有 img 标签有合适的样式
  content = content.replace(/<img([^>]*)>/gi, (match, attrs) => {
    if (attrs.includes('style=')) return match
    const hasSrc = attrs.match(/src="([^"]*)"/)
    return `<img${attrs} style="width:100%;max-width:100%;border-radius:8px;display:block;margin:16px auto;" />`
  })

  // 5. 将 Tailwind 类转换为内联样式，保留所见即所得
  content = convertTailwindToInlineStyle(content)

  // 6. 清理 HTML（只移除危险的属性）
  content = content
    // 移除 data-* 属性
    .replace(/\s*data-[\w-]+=["'][^"']*["']/gi, '')
    // 移除 id 属性
    .replace(/\s*id="[^"]*"/gi, '')
    // 移除空的 class 属性
    .replace(/\s*class="[^"]*"/gi, '')
    .replace(/\s*className="[^"]*"/gi, '')
    // 换行处理
    .replace(/<br\s*\/?>/gi, '<br/>')
    // 移除多余的空段落
    .replace(/<p>\s*<\/p>/gi, '')
    // 清理多余的空格
    .replace(/\s+/g, ' ')
    .trim()

  return content
}

/**
 * 从文章内容中提取第一张图片 URL
 * @param {string} content - Markdown 内容
 * @returns {string|null} - 第一张图片 URL 或 null
 */
export function extractFirstImage(content) {
  if (!content) return null
  const match = content.match(/!\[([^\]]*)\]\(([^)]+)\)/)
  return match ? match[2] : null
}

/**
 * 将 Tailwind 类转换为内联样式，保留网页显示效果
 */
function convertTailwindToInlineStyle(html) {
  // Tailwind 颜色映射到 CSS 颜色
  const colorMap = {
    'text-white': 'color:#ffffff',
    'text-yellow-400': 'color:#facc15',
    'text-blue-400': 'color:#60a5fa',
    'text-green-400': 'color:#4ade80',
    'text-red-400': 'color:#f87171',
    'text-purple-400': 'color:#c084fc',
    'text-pink-400': 'color:#f472b6',
    'text-orange-400': 'color:#fb923c',
    'text-cyan-400': 'color:#22d3ee',
    'text-gray-400': 'color:#a1a1aa',
    'text-gray-300': 'color:#d1d5db',
    'text-gray-200': 'color:#e5e7eb',
    'text-gray-500': 'color:#6b7280',
    'text-gray-600': 'color:#4b5563',
    'text-gray-700': 'color:#374151',
    'text-black': 'color:#000000',
    'text-red-500': 'color:#ef4444',
    'text-blue-500': 'color:#3b82f6',
    'text-green-500': 'color:#22c55e',
    'text-yellow-500': 'color:#eab308',
    // 透明度变体
    'text-white/80': 'color:rgba(255,255,255,0.8)',
    'text-white/60': 'color:rgba(255,255,255,0.6)',
    'text-white/40': 'color:rgba(255,255,255,0.4)',
    'text-white/90': 'color:rgba(255,255,255,0.9)',
    'text-white/70': 'color:rgba(255,255,255,0.7)',
    'text-white/50': 'color:rgba(255,255,255,0.5)',
    'text-white/30': 'color:rgba(255,255,255,0.3)',
    'text-white/10': 'color:rgba(255,255,255,0.1)',
  }

  // 字体粗细映射
  const fontWeightMap = {
    'font-bold': 'font-weight:700',
    'font-semibold': 'font-weight:600',
    'font-medium': 'font-weight:500',
    'font-normal': 'font-weight:400',
    'font-light': 'font-weight:300',
  }

  // 字号映射
  const fontSizeMap = {
    'text-xs': 'font-size:12px',
    'text-sm': 'font-size:14px',
    'text-base': 'font-size:16px',
    'text-lg': 'font-size:18px',
    'text-xl': 'font-size:20px',
    'text-2xl': 'font-size:24px',
    'text-3xl': 'font-size:30px',
    'text-4xl': 'font-size:36px',
  }

  // 替换 h1, h2, h3, h4 标签并转换样式
  html = html.replace(/<h1([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/h1>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes, 'text-3xl', 'text-white', 'font-bold')
    return `<h1 ${before1}style="${style}" ${before2}>${content}</h1>`
  })

  html = html.replace(/<h2([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/h2>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes, 'text-2xl', 'text-white', 'font-bold')
    // 添加底部边框样式
    const borderStyle = 'border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;'
    return `<h2 ${before1}style="${style}${borderStyle}" ${before2}>${content}</h2>`
  })

  html = html.replace(/<h3([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/h3>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes, 'text-xl', 'text-white', 'font-bold')
    return `<h3 ${before1}style="${style}" ${before2}>${content}</h3>`
  })

  html = html.replace(/<h4([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/h4>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes, 'text-lg', 'text-white', 'font-bold')
    return `<h4 ${before1}style="${style}" ${before2}>${content}</h4>`
  })

  // 处理 p 标签
  html = html.replace(/<p([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/p>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes, 'text-base', 'text-white/80')
    return `<p ${before1}style="${style}" ${before2}>${content}</p>`
  })

  // 处理 strong 标签（保留加粗和黄色）
  html = html.replace(/<strong([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/strong>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes, null, 'text-yellow-400', 'font-bold')
    return `<strong ${before1}style="${style}" ${before2}>${content}</strong>`
  })

  // 处理 em 标签（斜体）
  html = html.replace(/<em([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/em>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes)
    return `<em ${before1}style="${style}" ${before2}>${content}</em>`
  })

  // 处理 a 标签（链接）
  html = html.replace(/<a([^>]*)class="([^"]*)"([^>]*)>/gi, (match, before1, classes, before2) => {
    const style = buildInlineStyle(classes, null, 'text-blue-400')
    return `<a ${before1}style="${style}" ${before2}>`
  })

  // 处理 span 标签
  html = html.replace(/<span([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/span>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes)
    return `<span ${before1}style="${style}" ${before2}>${content}</span>`
  })

  // 处理 div 标签
  html = html.replace(/<div([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/div>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes)
    return `<div ${before1}style="${style}" ${before2}>${content}</div>`
  })

  // 处理 section 标签
  html = html.replace(/<section([^>]*)class="([^"]*)"([^>]*)>([\s\S]*?)<\/section>/gi, (match, before1, classes, before2, content) => {
    const style = buildInlineStyle(classes)
    return `<section ${before1}style="${style}" ${before2}>${content}</section>`
  })

  // 最后移除所有 class 属性（已转换为 style）
  html = html
    .replace(/\s*class="[^"]*"/gi, '')
    .replace(/\s*className="[^"]*"/gi, '')

  return html
}

/**
 * 根据 Tailwind 类名构建内联样式字符串
 */
function buildInlineStyle(classStr, defaultFontSize, defaultColor, defaultFontWeight) {
  const styles = []

  // 字号
  if (defaultFontSize) {
    const fontSizeMap = {
      'text-xs': '12px', 'text-sm': '14px', 'text-base': '16px',
      'text-lg': '18px', 'text-xl': '20px', 'text-2xl': '24px',
      'text-3xl': '30px', 'text-4xl': '36px'
    }
    const size = Object.keys(fontSizeMap).find(c => classStr.includes(c))
    if (size) styles.push(`font-size:${fontSizeMap[size]}`)
    else if (defaultFontSize) {
      const defaultSize = fontSizeMap[defaultFontSize]
      if (defaultSize) styles.push(`font-size:${defaultSize}`)
    }
  }

  // 颜色
  const colorMap = {
    'text-white': '#ffffff', 'text-yellow-400': '#facc15', 'text-blue-400': '#60a5fa',
    'text-green-400': '#4ade80', 'text-red-400': '#f87171', 'text-purple-400': '#c084fc',
    'text-pink-400': '#f472b6', 'text-orange-400': '#fb923c', 'text-cyan-400': '#22d3ee',
    'text-gray-400': '#a1a1aa', 'text-gray-300': '#d1d5db', 'text-gray-200': '#e5e7eb',
    'text-gray-500': '#6b7280', 'text-gray-600': '#4b5563', 'text-gray-700': '#374151',
    'text-black': '#000000', 'text-red-500': '#ef4444', 'text-blue-500': '#3b82f6',
    'text-green-500': '#22c55e', 'text-yellow-500': '#eab308',
  }
  // 检查带透明度的颜色
  const opacityMatch = classStr.match(/text-white\/(\d+)/)
  if (opacityMatch) {
    const opacity = parseInt(opacityMatch[1]) / 100
    styles.push(`color:rgba(255,255,255,${opacity})`)
  } else {
    const colorClass = Object.keys(colorMap).find(c => classStr.includes(c))
    if (colorClass) styles.push(`color:${colorMap[colorClass]}`)
    else if (defaultColor) {
      const defaultColorVal = colorMap[defaultColor]
      if (defaultColorVal) styles.push(`color:${defaultColorVal}`)
    }
  }

  // 字体粗细
  const fontWeightMap = {
    'font-bold': '700', 'font-semibold': '600', 'font-medium': '500',
    'font-normal': '400', 'font-light': '300'
  }
  const weightClass = Object.keys(fontWeightMap).find(c => classStr.includes(c))
  if (weightClass) styles.push(`font-weight:${fontWeightMap[weightClass]}`)
  else if (defaultFontWeight) {
    const defaultWeight = fontWeightMap[defaultFontWeight]
    if (defaultWeight) styles.push(`font-weight:${defaultWeight}`)
  }

  // 行高
  if (classStr.includes('leading-')) {
    const leadingMap = {
      'leading-none': '1', 'leading-tight': '1.25', 'leading-snug': '1.375',
      'leading-normal': '1.5', 'leading-relaxed': '1.625', 'leading-loose': '2'
    }
    const leading = Object.keys(leadingMap).find(c => classStr.includes(c))
    if (leading) styles.push(`line-height:${leadingMap[leading]}`)
  }

  // margin/padding (保留部分常用)
  const marginMap = {
    'mb-0': 'margin-bottom:0', 'mb-1': 'margin-bottom:4px', 'mb-2': 'margin-bottom:8px',
    'mb-4': 'margin-bottom:16px', 'mb-6': 'margin-bottom:24px', 'mb-8': 'margin-bottom:32px',
    'mt-0': 'margin-top:0', 'mt-2': 'margin-top:8px', 'mt-4': 'margin-top:16px',
    'mt-8': 'margin-top:32px', 'mt-10': 'margin-top:40px',
    'pt-0': 'padding-top:0', 'pt-2': 'padding-top:8px', 'pt-4': 'padding-top:16px',
    'pb-0': 'padding-bottom:0', 'pb-2': 'padding-bottom:8px', 'pb-4': 'padding-bottom:16px',
  }
  Object.entries(marginMap).forEach(([cls, css]) => {
    if (classStr.includes(cls)) styles.push(css)
  })

  return styles.join(';')
}

/**
 * 提取纯文本描述
 * @param {string} htmlContent - HTML 内容
 * @param {number} maxLength - 最大长度
 * @returns {string}
 */
export function extractDigest(htmlContent, maxLength = 120) {
  let text = htmlContent || ''

  // 先去除 HTML 标签
  text = text.replace(/<[^>]+>/g, '')

  // 去除 markdown 格式
  text = text.replace(/\*\*(.+?)\*\*/g, '$1')  // **加粗**
  text = text.replace(/\*(.+?)\*/g, '$1')       // *斜体*
  text = text.replace(/~~(.+?)~~/g, '$1')        // ~~删除线~~
  text = text.replace(/`(.+?)`/g, '$1')          // `行内代码`
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // [链接文字](url)

  // 清理空白
  text = text.replace(/\s+/g, ' ').trim()

  // 微信摘要限制约120字符，带...会超限，直接截断
  return text.length > maxLength ? text.slice(0, maxLength) : text
}

/**
 * 生成微信草稿内容结构
 * @param {object} params
 * @returns {object}
 */
export function buildDraftContent({
  title,
  author = 'DeepDrinker',
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

'use client'

import { usePathname } from 'next/navigation'

/**
 * 百度 SEO Meta 组件
 * 处理 canonical 标签和其他百度友好的 meta 信息
 */
export default function BaiduSeoMeta({
  title,
  description,
  canonicalUrl,
  publishedTime,
  author,
  section,
  tags = []
}) {
  const pathname = usePathname()

  // 如果没有提供 canonicalUrl，使用当前路径构建
  const canonical = canonicalUrl || `https://www.zkwatcher.top${pathname}`

  return (
    <>
      {/* Canonical 标签 - 百度 SEO 关键 */}
      <link rel="canonical" href={canonical} />

      {/* 百度站长平台验证 - 需要在百度搜索资源平台申请后填入 */}
      <meta name="baidu-site-verification" content="codeva-XXXXXXXXXX" />

      {/* 360 站长平台验证 */}
      <meta name="360-site-verification" content="XXXXXXXXXX" />

      {/* 搜狗站长平台验证 */}
      <meta name="sogou_site_verification" content="XXXXXXXXXX" />

      {/* 文章发布时间和作者 - 百度新闻友好 */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {author && (
        <meta property="article:author" content={author} />
      )}
      {section && (
        <meta property="article:section" content={section} />
      )}

      {/* 标签 - 百度 SEO 友好 */}
      {tags.length > 0 && (
        <meta name="keywords" content={tags.join(', ')} />
      )}
    </>
  )
}

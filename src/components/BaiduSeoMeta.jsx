/**
 * 百度 SEO Meta 组件
 * 服务端组件 - 确保 meta 标签在 SSR HTML 中输出
 * canonical 标签和其他百度友好的 meta 信息
 */
export default function BaiduSeoMeta({
  canonicalUrl,
  publishedTime,
  author,
  section,
  tags = []
}) {
  return (
    <>
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {author && (
        <meta property="article:author" content={author} />
      )}
      {section && (
        <meta property="article:section" content={section} />
      )}
      {tags.length > 0 && (
        <meta name="keywords" content={tags.join(', ')} />
      )}
    </>
  )
}
// 动态 metadata - 服务端渲染确保爬虫可见
export async function generateMetadata({ params }) {
  const keyword = decodeURIComponent(params?.keyword || '')
  let title = keyword
  let description = `关于${keyword}的专业解读`
  let articleKeyword = keyword

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.zkwatcher.top'
    const res = await fetch(`${baseUrl}/api/seo/article?id=${encodeURIComponent(keyword)}`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const data = await res.json()
      if (data.title) title = data.title
      if (data.description) description = data.description
      if (data.keyword) articleKeyword = data.keyword
    }
  } catch (e) {
    // fallback to defaults
  }

  return {
    title: `${title} - 极客观察`,
    description,
    keywords: articleKeyword,
    openGraph: {
      title: `${title} - 极客观察`,
      description,
      url: `https://www.zkwatcher.top/article/${encodeURIComponent(articleKeyword)}`,
      type: 'article',
      siteName: '极客观察',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - 极客观察`,
      description,
    },
    alternates: {
      canonical: `https://www.zkwatcher.top/article/${encodeURIComponent(articleKeyword)}`,
    },
  }
}

export default function ArticleLayout({ children }) {
  return children
}
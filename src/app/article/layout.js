// 动态 metadata
export function generateMetadata({ params }) {
  return {
    title: 'SEO文章 - 极客观察',
    description: 'SEO优化文章阅读',
    keywords: 'SEO文章,优化',
  }
}

export default function ArticleLayout({ children }) {
  return children
}
export const metadata = {
  title: '八字算命 - 生辰八字在线查询',
  description: '输入出生年月日时，查询生辰八字、五行属性、命理分析，在线八字算命。八字命盘详解，五行相生相克分析。',
  keywords: ['八字算命', '生辰八字', '五行查询', '八字排盘', '命理分析', '八字预测', '命盘查询'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/bazi',
    siteName: '极客观察',
    title: '八字算命 - 生辰八字在线查询',
    description: '生辰八字在线查询，五行命理分析',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '八字算命 - 在线生辰八字查询',
    description: '输入出生时间，在线分析生辰八字和五行属性',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/bazi',
  },
}

export default function Layout({ children }) {
  return children
}

export const metadata = {
  title: '老黄历查询 - 今日黄历吉凶宜忌',
  description: '老黄历今日宜忌查询，查看吉时凶时、冲煞方位、财神方位、每日黄历详解。传统黄历文化，在线黄历查询。',
  keywords: ['老黄历', '黄历查询', '今日宜忌', '吉时凶时', '黄道吉日', '每日黄历', '黄历吉凶'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/huangli',
    siteName: '极客观察',
    title: '老黄历查询 - 今日黄历吉凶宜忌',
    description: '老黄历今日宜忌查询，每日黄历详解',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '老黄历查询 - 今日宜忌吉凶',
    description: '输入日期查询老黄历吉凶宜忌',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/huangli',
  },
}

export default function Layout({ children }) {
  return children
}

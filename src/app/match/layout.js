export const metadata = {
  title: '姓名配对 - 姓名爱情配对测试',
  description: '输入两个人姓名测试爱情配对指数，看看你们的缘分有多少，是否是天生一对。免费姓名配对测试，娱乐测试仅供参考。',
  keywords: ['姓名配对', '爱情配对', '名字配对', '缘分测试', '姓名测试', '配对指数', '情侣配对'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/match',
    siteName: '极客观察',
    title: '姓名配对 - 姓名爱情配对测试',
    description: '输入姓名测试你们的爱情配对指数',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '姓名配对 - 测试你们的缘分配对指数',
    description: '输入两个人姓名，免费测试爱情配对指数',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/match',
  },
}

export default function Layout({ children }) {
  return children
}
export const metadata = {
  title: '今日运势测试 - 每日运势查询',
  description: '输入姓名即可测试今日运势，大吉、吉、小吉、一般、凶、大凶，看看今天的运气怎么样！每日运势更新，免费测试。',
  keywords: ['今日运势', '每日运势', '运势测试', '财运测试', '幸运测试', '今日吉凶', '运势查询'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/today',
    siteName: '极客观察',
    title: '今日运势测试 - 每日运势查询',
    description: '输入姓名测试今日运势，大吉还是大凶？',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '今日运势测试 - 看看今天运气怎么样',
    description: '输入姓名免费测试今日运势',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/today',
  },
}

export default function Layout({ children }) {
  return children
}
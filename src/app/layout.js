import './globals.css'
import BaiduAnalytics from '../components/BaiduAnalytics'
import BaiduAdScript from '../components/BaiduAd'
import GoogleAdSense from '../components/GoogleAdSense'
import GoogleAnalytics from '../components/GoogleAnalytics'

export const metadata = {
  title: '极客观察 - AI科技经济资讯',
  description: '极客观察 - 混排AI、科技、经济相关资讯，36氪、虎嗅、IT之家、经济时报，一站获取最新科技动态',
  keywords: ['极客观察', 'AI', '科技', '经济', '资讯', '36氪', '虎嗅', 'IT之家', 'AI资讯', '科技新闻'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top',
    siteName: '极客观察',
  },
  twitter: {
    card: 'summary',
    title: '极客观察 - AI科技经济资讯',
    description: '混排AI、科技、经济相关资讯',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: '极客观察',
      url: 'https://www.zkwatcher.top',
      description: '混排AI、科技、经济相关资讯',
      publisher: {
        '@type': 'Organization',
        name: '极客观察'
      }
    },
    {
      '@type': 'CollectionPage',
      name: '热门工具',
      url: 'https://www.zkwatcher.top/nav',
      description: '包含摇骰子、股市预测、姓名大全等实用工具'
    }
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <GoogleAdSense />
        <GoogleAnalytics />
        <BaiduAnalytics />
        <BaiduAdScript />
      </body>
    </html>
  )
}

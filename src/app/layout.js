import './globals.css'
import BaiduAnalytics from '../components/BaiduAnalytics'
import GoogleAdSense from '../components/GoogleAdSense'
import GoogleAnalytics from '../components/GoogleAnalytics'

export const metadata = {
  title: 'OpenClaw中文网 | 北京润泽园国学院 | 西海岸手牵手志愿者',
  description: 'OpenClaw资讯第一站、北京润泽园国学院、西海岸手牵手志愿者团队 - 关注2026科技前沿与公益事业',
  keywords: ['OpenClaw', 'AI Agent', '王阳明', '国学', '志愿服务', '公益'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top',
    siteName: '综合资讯平台',
  },
  twitter: {
    card: 'summary',
    title: '综合资讯平台 - OpenClaw中文网 | 国学院 | 公益',
    description: '关注2026科技前沿与公益事业',
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
      name: '综合资讯平台',
      url: 'https://www.zkwatcher.top',
      description: 'OpenClaw资讯第一站、北京润泽园国学院、西海岸手牵手志愿者团队',
      publisher: {
        '@type': 'Organization',
        name: '综合资讯平台'
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
      </body>
    </html>
  )
}

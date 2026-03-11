import './globals.css'
import BaiduAnalytics from '../components/BaiduAnalytics'
import GoogleAdSense from '../components/GoogleAdSense'

export const metadata = {
  title: 'OpenClaw中文网 | 北京润泽园国学院 | 西海岸手牵手志愿者',
  description: 'OpenClaw资讯第一站、北京润泽园国学院、西海岸手牵手志愿者团队 - 关注2026科技前沿与公益事业',
  keywords: ['OpenClaw', 'AI Agent', '王阳明', '国学', '志愿服务', '公益'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top',
    siteName: '综合资讯平台',
    title: '综合资讯平台 - OpenClaw中文网 | 国学院 | 公益',
    description: '关注2026科技前沿与公益事业 - OpenClaw资讯、国学文化、志愿服务',
    images: [
      {
        url: 'https://www.zkwatcher.top/og-image.png',
        width: 1200,
        height: 630,
        alt: '综合资讯平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '综合资讯平台 - OpenClaw中文网 | 国学院 | 公益',
    description: '关注2026科技前沿与公益事业',
    images: ['https://www.zkwatcher.top/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <GoogleAdSense />
        <BaiduAnalytics />
      </body>
    </html>
  )
}

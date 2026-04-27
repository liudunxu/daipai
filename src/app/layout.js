import './globals.css'
import BaiduAnalytics from '../components/BaiduAnalytics'
import BaiduAdScript from '../components/BaiduAd'
import GoogleAdSense from '../components/GoogleAdSense'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { OrganizationSchema, WebSiteSchema } from '../components/SchemaMarkup'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export const metadata = {
  metadataBase: new URL('https://www.zkwatcher.top'),
  title: {
    default: '极客观察 - AI科技经济资讯',
    template: '%s - 极客观察'
  },
  description: '极客观察 - 混排AI、科技、经济相关资讯，36氪、虎嗅、IT之家、经济时报，一站获取最新科技动态',
  keywords: ['极客观察', 'AI', '科技', '经济', '资讯', '36氪', '虎嗅', 'IT之家', 'AI资讯', '科技新闻'],
  authors: [{ name: '极客观察' }],
  creator: '极客观察',
  publisher: '极客观察',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top',
    siteName: '极客观察',
    title: '极客观察 - AI科技经济资讯',
    description: '混排AI、科技、经济相关资讯',
    images: [
      {
        url: '/api/og-image?title=极客观察&desc=AI科技经济资讯平台',
        width: 1200,
        height: 630,
        alt: '极客观察'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '极客观察 - AI科技经济资讯',
    description: '混排AI、科技、经济相关资讯',
    images: ['/api/og-image?title=极客观察&desc=AI科技经济资讯平台'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: [
      'index',
      'follow',
      'max-video-preview: -1',
      'max-image-preview: large',
      'max-snippet: -1',
    ],
    baiduspider: [
      'index',
      'follow',
    ],
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top',
    languages: {
      'zh-CN': 'https://www.zkwatcher.top',
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    baidu: process.env.BAIDU_SITE_VERIFICATION || '',
    yandex: process.env.YANDEX_SITE_VERIFICATION || '',
  },
}

export const viewport = {
  themeColor: '#1e293b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="极客观察" />

        {process.env.BAIDU_SITE_VERIFICATION && (
          <meta name="baidu-site-verification" content={process.env.BAIDU_SITE_VERIFICATION} />
        )}

        {process.env.Z360_SITE_VERIFICATION && (
          <meta name="360-site-verification" content={process.env.Z360_SITE_VERIFICATION} />
        )}

        {process.env.SOGOU_SITE_VERIFICATION && (
          <meta name="sogou_site_verification" content={process.env.SOGOU_SITE_VERIFICATION} />
        )}

        <OrganizationSchema />
        <WebSiteSchema
          name="极客观察"
          url="https://www.zkwatcher.top"
          description="AI科技经济资讯平台"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <GoogleAdSense />
        <GoogleAnalytics />
        <BaiduAnalytics />
        <BaiduAdScript />
      </body>
    </html>
  )
}
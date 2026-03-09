import './globals.css'

export const metadata = {
  title: {
    default: '告别汗脚臭脚 - 专业足部护理产品 | 东北雨姐推荐',
    template: '%s | 东北雨姐足部护理',
  },
  description: '老铁们！雨姐教你整好脚嘎嘎自信！专业足部护理产品，告别汗脚臭脚，轻松拥有干爽舒适的双脚。',
  keywords: ['足部护理', '汗脚', '臭脚', '脚气', '足部问题', '东北雨姐', '护理产品'],
  authors: [{ name: '东北雨姐' }],
  creator: '东北雨姐',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://daipai.vercel.app',
    siteName: '东北雨姐足部护理',
    title: '告别汗脚臭脚 - 专业足部护理产品 | 东北雨姐推荐',
    description: '老铁们！雨姐教你整好脚嘎嘎自信！专业足部护理产品，告别汗脚臭脚。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '东北雨姐足部护理',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '告别汗脚臭脚 - 专业足部护理产品 | 东北雨姐推荐',
    description: '老铁们！雨姐教你整好脚嘎嘎自信！专业足部护理产品，告别汗脚臭脚。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

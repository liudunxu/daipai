import './globals.css'

export const metadata = {
  title: '告别汗脚 - 专业足部护理 | 东北雨姐推荐',
  description: '老铁们！雨姐教你整好脚嘎嘎自信！',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

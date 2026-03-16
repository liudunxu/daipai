export const metadata = {
  title: '密码生成器 - 强密码在线生成',
  description: '在线生成随机强密码，支持自定义长度、数字、大小写字母、特殊字符，确保账号安全。',
  keywords: ['密码生成', '强密码', '随机密码', '密码生成器'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/tool/password',
    siteName: '极客观察',
    title: '密码生成器 - 强密码在线生成',
    description: '在线生成随机强密码',
  },
  twitter: {
    card: 'summary',
    title: '密码生成器 - 强密码在线生成',
    description: '生成安全的强密码',
  },
}

export default function Layout({ children }) {
  return children
}

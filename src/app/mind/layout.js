export const metadata = {
  title: '心理测试 - 趣味心理测试大全',
  description: '各种趣味心理测试，了解你的性格、情绪、爱情观、工作态度，深度解析你的内心世界。免费在线心理测试，5道题测出真实自我。',
  keywords: ['心理测试', '性格测试', '心理测评', '趣味测试', '爱情观测试', '人格测试', '心理健康测试'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/mind',
    siteName: '极客观察',
    title: '心理测试 - 趣味心理测试大全',
    description: '趣味心理测试，了解你的真实性格',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '心理测试 - 5道题测出真实的你',
    description: '趣味心理测试，深度解析你的内心世界',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/mind',
  },
}

export default function Layout({ children }) {
  return children
}
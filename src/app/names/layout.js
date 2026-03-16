export const metadata = {
  title: '中国常用姓名大全 - 100个常见人名',
  description: '收录中国最常用的100个人名，包含男孩女孩姓名大全，是取名参考、姓名测试的实用工具。',
  keywords: ['中国姓名', '常用人名', '100个名字', '取名大全', '男孩名字', '女孩名字', '姓名大全'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/names',
    siteName: '极客观察',
    title: '中国常用姓名大全 - 100个常见人名',
    description: '收录中国最常用的100个人名，是取名参考的实用工具。',
  },
  twitter: {
    card: 'summary',
    title: '中国常用姓名大全 - 100个常见人名',
    description: '100个常见人名取名参考',
  },
}

export default function NamesLayout({ children }) {
  return children
}

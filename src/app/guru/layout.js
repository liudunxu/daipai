export const metadata = {
  title: '投资大佬持仓 - 巴菲特段永平美股持仓追踪',
  description: '追踪巴菲特、凯瑟琳·伍德、段永平等顶级投资人的美股持仓，数据来源于SEC 13F文件披露。查看大佬持仓，学习投资思路。',
  keywords: ['投资大佬持仓', '巴菲特持仓', '段永平持仓', 'ARK持仓', '13F文件', '美股持仓', '机构持仓'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/guru',
    siteName: '极客观察',
    title: '投资大佬持仓 - 巴菲特段永平美股持仓追踪',
    description: '追踪顶级投资人的美股持仓，学习价值投资',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '投资大佬持仓 - 巴菲特段永平美股持仓',
    description: '追踪顶级投资人持仓，学习价值投资思路',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/guru',
  },
}

export default function Layout({ children }) {
  return children
}

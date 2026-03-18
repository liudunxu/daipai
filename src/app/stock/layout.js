export const metadata = {
  title: 'A股涨跌预测 - 今日股市运势预测',
  description: '趣味A股涨跌预测，输入股票代码或名称，预测今日运势！纯属娱乐，仅供消遣。股市有风险，投资需谨慎。',
  keywords: ['A股预测', '股市预测', '股票运势', '今日股市', '趣味测试', '股票涨跌预测', '今日涨停预测'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/stock',
    siteName: '极客观察',
    title: 'A股涨跌预测 - 今日股市运势预测',
    description: '趣味A股涨跌预测，输入股票代码预测今日运势',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A股涨跌预测 - 测测你的股票今日运势',
    description: '输入股票代码，趣味预测今日涨跌',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/stock',
  },
}

export default function StockLayout({ children }) {
  return children
}

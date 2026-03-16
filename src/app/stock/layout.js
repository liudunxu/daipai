export const metadata = {
  title: 'A股涨跌预测 - 今日股市运势预测',
  description: '趣味A股涨跌预测小程序，输入股票代码或名称，预测今日运势！娱乐为主，仅供消遣。',
  keywords: ['A股预测', '股市预测', '股票运势', '今日股市', '趣味测试'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/stock',
    siteName: '极客观察',
    title: 'A股涨跌预测 - 今日股市运势预测',
    description: '趣味A股涨跌预测，输入股票代码预测今日运势',
  },
  twitter: {
    card: 'summary',
    title: 'A股涨跌预测 - 今日股市运势预测',
    description: '趣味股市预测，仅供娱乐',
  },
}

export default function StockLayout({ children }) {
  return children
}

import PolymarketClient from './PolymarketClient'

export const metadata = {
  title: 'Polymarket 预测市场 - 实时热点事件',
  description: '查看Polymarket预测市场的最新事件和赔率，了解全球用户对热点事件的预测分布。',
  keywords: ['Polymarket', '预测市场', '加密货币', '热点事件', '赔率'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/polymarket',
    siteName: '极客观察',
    title: 'Polymarket 预测市场 - 实时热点事件',
    description: '查看Polymarket预测市场的最新事件和赔率',
  },
}

export default function PolymarketPage() {
  return <PolymarketClient />
}

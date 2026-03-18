export const metadata = {
  title: '2026年运势 - 2026年生肖运势预测',
  description: '2026年各生肖运势详解，鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪全年运势预测。包含财运、事业、爱情健康运势分析。',
  keywords: ['2026年运势', '2026年生肖', '2026年财运', '2026年事业', '属相运势', '2026年爱情运势', '生肖运势预测'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/fate',
    siteName: '极客观察',
    title: '2026年运势 - 2026年生肖运势预测',
    description: '2026年各生肖运势详解',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026年运势 - 12生肖全年运势预测',
    description: '2026年各生肖财运、事业、爱情运势全面预测',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/fate',
  },
}

export default function Layout({ children }) {
  return children
}

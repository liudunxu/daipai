import { SoftwareApplicationSchema } from '../../../components/SchemaMarkup'
import FAQSchema, { countdownFAQs } from '../../../components/FAQSchema'

export const metadata = {
  title: '在线倒计时工具 - 重要日子倒数日 | 极客观察',
  description: '免费在线倒计时工具，设置重要日期的倒计时，支持节日、生日、纪念日等多种场景，再也不会错过重要日子。',
  keywords: ['倒计时', '倒数日', '纪念日', '生日倒计时', '在线工具'],
  openGraph: {
    title: '在线倒计时工具 - 重要日子倒数日 | 极客观察',
    description: '免费在线倒计时工具，设置重要日期的倒计时，支持节日、生日、纪念日等多种场景，再也不会错过重要日子。',
    url: 'https://www.zkwatcher.top/tool/countdown',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/tool/countdown',
  },
}

export default function Layout({ children }) {
  return (
    <>
      <SoftwareApplicationSchema
        name="在线倒计时工具"
        description="设置重要日期的倒计时，支持节日、生日、纪念日等多种场景。"
        url="https://www.zkwatcher.top/tool/countdown"
      />
      <FAQSchema faqs={countdownFAQs} />
      {children}
    </>
  )
}
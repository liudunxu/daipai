import { SoftwareApplicationSchema } from '../../../components/SchemaMarkup'
import FAQSchema, { huoxingFAQs } from '../../../components/FAQSchema'

export const metadata = {
  title: '火星文转换器 - 在线文字转换工具 | 极客观察',
  description: '免费在线火星文转换器，支持中文转火星文、繁体字转换、特殊符号生成，让您的文字更加个性有趣。',
  keywords: ['火星文', '火星文转换器', '文字转换', '繁体字', '个性签名'],
  openGraph: {
    title: '火星文转换器 - 在线文字转换工具 | 极客观察',
    description: '免费在线火星文转换器，支持中文转火星文、繁体字转换、特殊符号生成，让您的文字更加个性有趣。',
    url: 'https://www.zkwatcher.top/tool/huoxing',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/tool/huoxing',
  },
}

export default function Layout({ children }) {
  return (
    <>
      <SoftwareApplicationSchema
        name="火星文转换器"
        description="在线火星文转换器，支持中文转火星文和火星文还原。"
        url="https://www.zkwatcher.top/tool/huoxing"
      />
      <FAQSchema faqs={huoxingFAQs} />
      {children}
    </>
  )
}
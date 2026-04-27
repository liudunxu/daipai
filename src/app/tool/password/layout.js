import { SoftwareApplicationSchema, HowToSchema } from '../../../components/SchemaMarkup'
import FAQSchema, { passwordFAQs } from '../../../components/FAQSchema'

export const metadata = {
  title: '在线密码生成器 - 安全随机密码生成工具 | 极客观察',
  description: '免费在线密码生成器，支持自定义密码长度、大小写字母、数字和特殊字符，一键生成安全随机密码，保护您的账户安全。',
  keywords: ['密码生成器', '随机密码', '安全密码', '密码工具', '在线工具'],
  openGraph: {
    title: '在线密码生成器 - 安全随机密码生成工具 | 极客观察',
    description: '免费在线密码生成器，支持自定义密码长度、大小写字母、数字和特殊字符，一键生成安全随机密码，保护您的账户安全。',
    url: 'https://www.zkwatcher.top/tool/password',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/tool/password',
  },
}

export default function Layout({ children }) {
  return (
    <>
      <SoftwareApplicationSchema
        name="在线密码生成器"
        description="免费在线密码生成器，支持自定义密码长度、大小写字母、数字和特殊字符，一键生成安全随机密码。"
        url="https://www.zkwatcher.top/tool/password"
      />
      <HowToSchema
        name="如何使用密码生成器"
        description="一步一步教你生成安全密码"
        steps={[
          { name: '设置密码长度', text: '选择您需要的密码长度，建议12位以上更安全' },
          { name: '选择字符类型', text: '勾选需要包含的字符类型：大写字母、小写字母、数字、特殊字符' },
          { name: '生成密码', text: '点击生成按钮，即可一键生成安全随机密码' },
          { name: '复制使用', text: '点击复制按钮，将生成的密码复制到剪贴板，粘贴到需要的地方' },
        ]}
      />
      <FAQSchema faqs={passwordFAQs} />
      {children}
    </>
  )
}
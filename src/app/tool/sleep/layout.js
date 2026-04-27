import { SoftwareApplicationSchema } from '../../../components/SchemaMarkup'
import FAQSchema, { sleepFAQs } from '../../../components/FAQSchema'

export const metadata = {
  title: '儿童睡眠时间推荐 - 各年龄段最佳睡眠时长 | 极客观察',
  description: '根据儿童年龄推荐最佳睡眠时间和时长，涵盖新生儿到青少年各阶段的睡眠建议，帮助家长科学安排孩子作息。',
  keywords: ['儿童睡眠', '睡眠时间', '婴儿睡眠', '睡眠推荐', '育儿工具'],
  openGraph: {
    title: '儿童睡眠时间推荐 - 各年龄段最佳睡眠时长 | 极客观察',
    description: '根据儿童年龄推荐最佳睡眠时间和时长，涵盖新生儿到青少年各阶段的睡眠建议，帮助家长科学安排孩子作息。',
    url: 'https://www.zkwatcher.top/tool/sleep',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/tool/sleep',
  },
}

export default function Layout({ children }) {
  return (
    <>
      <SoftwareApplicationSchema
        name="儿童睡眠时间推荐"
        description="根据儿童年龄推荐最佳睡眠时间和时长，涵盖新生儿到青少年各阶段。"
        url="https://www.zkwatcher.top/tool/sleep"
      />
      <FAQSchema faqs={sleepFAQs} />
      {children}
    </>
  )
}
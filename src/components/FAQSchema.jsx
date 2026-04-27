/**
 * FAQ 结构化数据组件
 * 服务端组件 - 确保 JSON-LD 在 SSR HTML 中输出，爬虫可见
 */

export default function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export { homePageFAQs, fortuneFAQs, xingzuoFAQs, stockFAQs, chouqianFAQs, tarotFAQs, matchFAQs, shengxiaoFAQs, baziFAQs, fateFAQs, huangliFAQs, chengguFAQs, passwordFAQs, bmiFAQs, heightFAQs, sleepFAQs, unitFAQs, countdownFAQs, huoxingFAQs, luckyFAQs } from '../lib/faqData'
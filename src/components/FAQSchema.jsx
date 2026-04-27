'use client'

import { homePageFAQs, fortuneFAQs, xingzuoFAQs, stockFAQs, chouqianFAQs, tarotFAQs, matchFAQs, shengxiaoFAQs, baziFAQs, fateFAQs, huangliFAQs, chengguFAQs } from '../lib/faqData'

export default function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
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

export { homePageFAQs, fortuneFAQs, xingzuoFAQs, stockFAQs, chouqianFAQs, tarotFAQs, matchFAQs, shengxiaoFAQs, baziFAQs, fateFAQs, huangliFAQs, chengguFAQs }

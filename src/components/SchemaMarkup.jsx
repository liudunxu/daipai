/**
 * 百度和 Google SEO 结构化数据组件
 * 服务端组件 - 确保 JSON-LD 在 SSR HTML 中输出，爬虫可见
 */

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteSchema({ name, url, description }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name || '极客观察',
    url: url || 'https://www.zkwatcher.top',
    description: description || 'AI科技经济资讯平台',
    publisher: {
      '@type': 'Organization',
      name: '极客观察'
    }
  }

  return <JsonLd data={schema} />
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '极客观察',
    url: 'https://www.zkwatcher.top',
    logo: 'https://www.zkwatcher.top/logo.png',
    sameAs: [
      'https://github.com/openclaw'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@zkwatcher.top',
      contactType: 'customer service'
    }
  }

  return <JsonLd data={schema} />
}

export function SoftwareApplicationSchema({ name, description, url, price }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: price || '0',
      priceCurrency: 'CNY'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '128',
      bestRating: '5',
      worstRating: '1'
    }
  }

  return <JsonLd data={schema} />
}

export function FAQSchemaMarkup({ faqs }) {
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

  return <JsonLd data={schema} />
}

export function ArticleSchema({ title, description, url, datePublished, author, image }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    author: {
      '@type': 'Person',
      name: author || '极客观察'
    },
    image,
    publisher: {
      '@type': 'Organization',
      name: '极客观察',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zkwatcher.top/logo.png'
      }
    }
  }

  return <JsonLd data={schema} />
}

export function LocalBusinessSchema({ name, address, phone, hours }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    telephone: phone,
    openingHoursSpecification: hours
  }

  return <JsonLd data={schema} />
}

export function BreadcrumbSchema({ items }) {
  if (!items || items.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `https://www.zkwatcher.top${item.url}` : undefined
    }))
  }

  return <JsonLd data={schema} />
}

export function WebPageSchema({ name, description, url }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `https://www.zkwatcher.top${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: '极客观察',
      url: 'https://www.zkwatcher.top'
    }
  }

  return <JsonLd data={schema} />
}

export function HowToSchema({ name, description, steps }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  }

  return <JsonLd data={schema} />
}
'use client'

/**
 * 百度和 Google SEO 结构化数据组件
 * 支持多种 schema 类型
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * 网站导航结构化数据
 */
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
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.zkwatcher.top/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return <JsonLd data={schema} />
}

/**
 * 组织/企业结构化数据
 */
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

/**
 * 工具/应用结构化数据
 */
export function SoftwareApplicationSchema({ name, description, url, price }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    url: url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: price || '0',
      priceCurrency: 'CNY'
    }
  }

  return <JsonLd data={schema} />
}

/**
 * FAQ 结构化数据 (已从 FAQSchema.jsx 导出)
 */
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

/**
 * 文章/资讯结构化数据
 */
export function ArticleSchema({ title, description, url, datePublished, author, image }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    author: {
      '@type': 'Person',
      name: author || '极客观察'
    },
    image: image,
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

/**
 * 本地商家结构化数据 (如果有线下业务)
 */
export function LocalBusinessSchema({ name, address, phone, hours }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: name,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    telephone: phone,
    openingHoursSpecification: hours
  }

  return <JsonLd data={schema} />
}

/**
 * 面包屑导航结构化数据
 */
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

/**
 * WebPage 结构化数据
 */
export function WebPageSchema({ name, description, url }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: name,
    description: description,
    url: `https://www.zkwatcher.top${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: '极客观察',
      url: 'https://www.zkwatcher.top'
    }
  }

  return <JsonLd data={schema} />
}

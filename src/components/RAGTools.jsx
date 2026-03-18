'use client'

/**
 * RAG 优化组件 - 帮助大模型更好地理解页面内容
 * 添加 HowTo、Q&A 等结构化数据
 */

// HowTo 结构化数据 - 用于教程类页面
export function HowToSchema({ title, description, steps, totalTime }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    title: title,
    description: description,
    totalTime: totalTime || 'PT5M',
    step: steps?.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name || `步骤${index + 1}`,
      text: step.text,
      url: step.url,
      image: step.image
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Q&A 结构化数据 - 用于问答类页面
export function QAPageSchema({ questions }) {
  if (!questions || questions.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      upvoteCount: q.upvotes || 0,
      answerCount: q.answers?.length || 1,
      suggestedAcceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
        dateCreated: q.date,
        author: {
          '@type': 'Person',
          name: q.author || '极客观察'
        }
      },
      ...(q.answers && { suggestedAnswer: q.answers.map(a => ({
        '@type': 'Answer',
        text: a.text,
        author: {
          '@type': 'Person',
          name: a.author || '极客观察'
        }
      }))})
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// WebApplication 结构化数据 - 用于工具类页面
export function WebApplicationSchema({ name, description, url, rating }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name,
    description: description,
    url: url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY'
    },
    browserRequirements: 'Requires JavaScript',
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.value || '5',
        ratingCount: rating.count || '100',
        bestRating: '5',
        worstRating: '1'
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// EntertainmentBrickSchema - 用于娱乐/游戏类页面
export function EntertainmentSchema({ name, description, genre, url }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: name,
    description: description,
    genre: genre || 'Casual Game',
    url: url,
    platform: {
      '@type': 'Thing',
      name: 'Web Browser'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// 玄学/命理类结构化数据
export function FortuneTellingSchema({ name, description, url, provider }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name,
    description: description,
    url: url,
    applicationCategory: 'EntertainmentApplication',
    genre: 'Fortune Telling',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY'
    },
    provider: {
      '@type': 'Organization',
      name: provider || '极客观察'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// 文本内容摘要 - 帮助 RAG 理解页面核心内容
export function PageContentSummary({ title, description, features, category }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    title: title,
    description: description,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      caption: title
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: 'https://www.zkwatcher.top'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: category || '工具',
          item: 'https://www.zkwatcher.top/nav'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title
        }
      ]
    },
    ...(features && {
      about: {
        '@type': 'Thing',
        name: title,
        description: features.join('、')
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// CollectionPage - 用于工具集合页面
export function CollectionPageSchema({ name, description, items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: name,
    description: description,
    hasPart: items?.map(item => ({
      '@type': 'WebPage',
      name: item.name,
      description: item.description,
      url: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

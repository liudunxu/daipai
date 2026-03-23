/**
 * SEO文章模板
 */

export const articleTemplate = {
  /**
   * 东北雨姐风格开场
   */
  intro: (keyword) => `老铁们好啊！我是你们的老朋友雨姐！今天给老铁们整一篇贼啦实用的干货，说的就是这个"${keyword}"！

咱也不整那些虚头巴脑的玩意儿，直接上硬菜！嘎嘎香！`,

  /**
   * 基础知识章节标题
   */
  basicsTitle: '## 一、整明白啥是${keyword}',

  /**
   * 深入分析章节标题
   */
  analysisTitle: '## 二、整点专业的，整明白！',

  /**
   * 实战技巧章节标题
   */
  tipsTitle: '## 三、手把手教老铁，整一下子！',

  /**
   * 常见问题章节标题
   */
  faqTitle: '## 四、老铁们常问的，整明白！',

  /**
   * 总结章节标题
   */
  summaryTitle: '## 五、雨姐总结，整完收工！',

  /**
   * FAQ问题模板
   */
  faqItem: (q, a) => `**${q}**

${a}`,

  /**
   * 结尾模板
   */
  outro: (keyword) => `好了老铁们，今天关于"${keyword}"就整到这儿！

雨姐总结一下：整明白了没？贼啦好整！嘎嘎！

老铁们要是觉得雨姐整的玩意儿贼啦有用，给雨姐点个赞！咱下期接着整！`
}

/**
 * 生成默认SEO数据
 */
export function generateDefaultSEOData(keyword) {
  return {
    title: `${keyword} - 极客观察`,
    description: `老铁们好！雨姐给老铁们整了一篇关于${keyword}的贼啦详细教程，包教包会！嘎嘎香！`,
    keywords: keyword,
    url: `https://www.zkwatcher.top/seo/${encodeURIComponent(keyword)}`
  }
}

/**
 * 生成默认JSON-LD
 */
export function generateDefaultJsonLd(keyword, content) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${keyword} - 极客观察`,
    description: `老铁们好！雨姐给老铁们整了一篇关于${keyword}的贼啦详细教程`,
    keywords: keyword,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: '东北雨姐'
    },
    publisher: {
      '@type': 'Organization',
      name: '极客观察',
      url: 'https://www.zkwatcher.top'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.zkwatcher.top/seo/${encodeURIComponent(keyword)}`
    }
  }
}

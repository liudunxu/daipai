/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.zkwatcher.top',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
  // 百度友好的配置
  additionalPaths: async (config) => {
    const paths = []

    // 添加静态页面路径
    const staticPages = [
      '',
      '/nav',
      '/about',
      '/features',
      '/contact',
      '/privacy',
      '/terms',
    ]

    for (const page of staticPages) {
      paths.push({
        loc: `https://www.zkwatcher.top${page}`,
        changefreq: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        lastmod: new Date().toISOString(),
      })
    }

    return paths
  },
  // 自定义 transform 函数
  transform: async (config, url) => {
    return {
      loc: url, // 必填
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}

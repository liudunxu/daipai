/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // SEO 优化配置
  trailingSlash: false, // 百度推荐不带斜杠的 URL

  // 预渲染优化
  experimental: {
    // 优化图片加载
    optimizePackageImports: ['react'],
  },

  // 安全头配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

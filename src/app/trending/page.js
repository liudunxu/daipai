import { AdBanner } from '@/components/Ads'
import AffiliateLink from '@/components/AffiliateLink'

export const metadata = {
  title: '今日热搜榜 - 微博、知乎、百度热搜合集',
  description: '聚合微博热搜、知乎热榜、百度热搜等平台实时热点，一站式了解全网最热话题。',
  keywords: ['热搜榜', '微博热搜', '知乎热榜', '百度热搜', '今日热点', '实时热点'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/trending',
    siteName: '热点资讯',
    title: '今日热搜榜 - 微博、知乎、百度热搜合集',
    description: '聚合各大平台热搜热点，一站式了解全网最热话题。',
  },
  twitter: {
    card: 'summary',
    title: '今日热搜榜 - 微博、知乎、百度热搜合集',
    description: '聚合各大平台热搜热点，一站式了解全网最热话题。',
  },
}

export default function TrendingPage() {
  // 微博热搜（2026年3月11日）
  const weiboHot = [
    { rank: 1, title: 'OpenClaw获24.8万星标', hot: '512万', url: 'https://weibo.com' },
    { rank: 2, title: '腾讯QClaw内测启动', hot: '486万', url: 'https://weibo.com' },
    { rank: 3, title: 'AI Agent元年来了', hot: '423万', url: 'https://weibo.com' },
    { rank: 4, title: '东北雨姐推荐足部护理', hot: '312万', url: 'https://weibo.com' },
    { rank: 5, title: 'GitHub星标破纪录', hot: '298万', url: 'https://weibo.com' },
    { rank: 6, title: '2026年AI发展趋势', hot: '256万', url: 'https://weibo.com' },
    { rank: 7, title: '小龙虾OpenClaw刷屏', hot: '234万', url: 'https://weibo.com' },
    { rank: 8, title: '微信AI助手来了', hot: '198万', url: 'https://weibo.com' },
    { rank: 9, title: '程序员狂欢节', hot: '176万', url: 'https://weibo.com' },
    { rank: 10, title: '开源项目最新排行', hot: '154万', url: 'https://weibo.com' },
  ]

  // 知乎热榜
  const zhihuHot = [
    { rank: 1, title: 'OpenClaw为什么能超越Next.js？', url: 'https://zhihu.com' },
    { rank: 2, title: 'AI Agent将如何改变我们的生活', url: 'https://zhihu.com' },
    { rank: 3, title: '2026年最值得关注的开源项目', url: 'https://zhihu.com' },
    { rank: 4, title: '腾讯入局AI Agent意味着什么', url: 'https://zhihu.com' },
    { rank: 5, title: '程序员应该如何拥抱AI时代', url: 'https://zhihu.com' },
    { rank: 6, title: '开源许可证选择指南', url: 'https://zhihu.com' },
    { rank: 7, title: 'GitHub星标过20万的项目', url: 'https://zhihu.com' },
    { rank: 8, title: '本地AI助手哪个最好用', url: 'https://zhihu.com' },
    { rank: 9, title: 'AI时代程序员何去何从', url: 'https://zhihu.com' },
    { rank: 10, title: '2026前端技术发展趋势', url: 'https://zhihu.com' },
  ]

  // 百度热搜
  const baiduHot = [
    { rank: 1, title: 'OpenClaw 24.8万星', url: 'https://top.baidu.com' },
    { rank: 2, title: 'QClaw内测', url: 'https://top.baidu.com' },
    { rank: 3, title: 'AI Agent是什么', url: 'https://top.baidu.com' },
    { rank: 4, title: 'GitHub历史第一', url: 'https://top.baidu.com' },
    { rank: 5, title: '腾讯AI布局', url: 'https://top.baidu.com' },
    { rank: 6, title: '开源AI项目', url: 'https://top.baidu.com' },
    { rank: 7, title: '小龙虾是什么', url: 'https://top.baidu.com' },
    { rank: 8, title: '微信AI功能', url: 'https://top.baidu.com' },
    { rank: 9, title: '2026科技热点', url: 'https://top.baidu.com' },
    { rank: 10, title: 'AI工具排行', url: 'https://top.baidu.com' },
  ]

  // 科技圈热点
  const techHot = [
    { rank: 1, title: 'OpenClaw GitHub星标突破24.8万，超越Next.js成为历史第一', url: 'https://github.com/openclaw' },
    { rank: 2, title: '腾讯推出QClaw，基于OpenClaw打造本地AI助手', url: 'https://claw.guanjia.qq.com/' },
    { rank: 3, title: '工信部发布AI Agent安全预警，提示词注入攻击风险', url: 'https://www.lg.gov.cn/' },
    { rank: 4, title: '2026 MWC展会：AI从"陪聊"走向"干活"', url: 'https://zhuanlan.zhihu.com/' },
    { rank: 5, title: '飞书、钉钉首批支持OpenClaw客户端上线', url: 'https://openclaw.cc/' },
    { rank: 6, title: '龙岗区拟出台政策扶持OpenClaw发展', url: 'https://www.lg.gov.cn/' },
    { rank: 7, title: 'OpenClaw创始人加入OpenAI，项目转为基金会运作', url: 'https://www.ithome.com.tw/' },
    { rank: 8, title: '7×24小时主动干活的AI数字员工来了', url: 'https://openclaw.ai/' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🔥 今日热搜榜
          </h1>
          <p className="text-white/60">
            聚合全网热点，一站式了解今日热门
          </p>
        </header>

        {/* 更新时间 */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-white/50 text-sm">
            📅 更新时间：2026年3月11日
          </span>
        </div>

        {/* 微博热搜 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🐦</span>
            <h2 className="text-xl font-bold text-white">微博热搜</h2>
            <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded-full">实时</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
            {weiboHot.map((item, index) => (
              <a
                key={item.rank}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
              >
                <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${
                  item.rank <= 3 ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'
                }`}>
                  {item.rank}
                </span>
                <span className="flex-1 ml-3 text-white font-medium">{item.title}</span>
                <span className="text-orange-400 text-sm">{item.hot}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 知乎热榜 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">💬</span>
            <h2 className="text-xl font-bold text-white">知乎热榜</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
            {zhihuHot.map((item) => (
              <a
                key={item.rank}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500 text-white text-sm font-bold">
                  {item.rank}
                </span>
                <span className="flex-1 ml-3 text-white font-medium">{item.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 百度热搜 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔍</span>
            <h2 className="text-xl font-bold text-white">百度热搜</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
            {baiduHot.map((item) => (
              <a
                key={item.rank}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-500 text-white text-sm font-bold">
                  {item.rank}
                </span>
                <span className="flex-1 ml-3 text-white font-medium">{item.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 科技热点 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">💻</span>
            <h2 className="text-xl font-bold text-white">科技热点</h2>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
            {techHot.map((item) => (
              <a
                key={item.rank}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-500 text-white text-sm font-bold">
                  {item.rank}
                </span>
                <span className="flex-1 ml-3 text-white font-medium">{item.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 广告位 */}
        <div className="mb-8">
          <AdBanner />
        </div>

        {/* 热点相关推荐 */}
        <section className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3 text-center">🛍️ 热点好物推荐</h3>
          <p className="text-white/60 text-sm mb-4 text-center">
            热搜同款好物，点击了解
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <AffiliateLink
              url="https://github.com"
              text="GitHub"
              platform="app"
            />
            <AffiliateLink
              url="https://weibo.com"
              text="微博会员"
              platform="app"
            />
            <AffiliateLink
              url="https://www.zhihu.com"
              text="知乎会员"
              platform="app"
            />
          </div>
        </section>

        {/* 底部 */}
        <footer className="mt-8 text-center">
          <p className="text-white/30 text-xs mb-2">
            ⚠️ 热搜数据为示例，实际数据请访问各平台官网
          </p>
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}

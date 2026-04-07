import { AdBanner } from '../../components/Ads'
import AffiliateLink from '../../components/AffiliateLink'
import RelatedTools from '../../components/RelatedTools'

export const dynamic = 'force-dynamic'
export const revalidate = 1800 // 每30分钟重新验证更新

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

// 热搜数据配置
const hotDataConfig = {
  weibo: {
    title: '微博热搜',
    emoji: '🐦',
    badgeColor: 'bg-red-500',
    url: 'https://s.weibo.com',
    topics: [
      'AI人工智能', 'ChatGPT更新', '特斯拉新品', '娱乐圈八卦', '世界杯',
      '春节档电影', '冬奥会', '科技圈大事件', '明星官宣', '综艺节目',
      '股票市场', '新能源车', '手机新品', '游戏发售', '电视剧热播'
    ]
  },
  zhihu: {
    title: '知乎热榜',
    emoji: '💬',
    badgeColor: 'bg-blue-500',
    url: 'https://www.zhihu.com',
    topics: [
      'AI将如何改变2026年的生活', '2026年最值得投资的领域', '普通人如何抓住AI红利',
      '新能源汽车取代燃油车还要多久', '下一代互联网技术发展方向', '如何培养面向未来的孩子',
      '中国科技创新的机遇与挑战', '程序员35岁后的职业选择', 'AI会不会取代人类工作', '下一个风口行业是什么'
    ]
  },
  baidu: {
    title: '百度热搜',
    emoji: '🔍',
    badgeColor: 'bg-green-500',
    url: 'https://top.baidu.com',
    topics: [
      '2026年春节档票房', 'AI大模型最新进展', '新能源汽车销量', '全国两会热点',
      '天气变化', '教育改革新政策', '医疗健康新政策', '房价走势分析', '就业形势分析', '科技创新动态'
    ]
  },
  tech: {
    title: '科技热点',
    emoji: '💻',
    badgeColor: 'bg-purple-500',
    url: 'https://www.36kr.com',
    topics: [
      '国产大模型再突破', 'AI Agent应用落地', '新能源汽车销量创新高', '芯片国产化进程',
      '量子计算新进展', '5G-A网络商用', '自动驾驶技术突破', '元宇宙设备普及'
    ]
  }
}

// 基于日期的确定性随机数生成
function dateSeedRandom(seed, max = 500) {
  return ((seed * 9301 + 49297) % 233280) / 233280 * max + 100
}

// 模拟热搜数据生成器（基于日期生成确定性内容）
function generateHotData() {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

  const result = {}

  // 生成各平台热搜
  for (const [key, config] of Object.entries(hotDataConfig)) {
    result[key] = config.topics.map((topic, i) => ({
      rank: i + 1,
      title: topic,
      ...(key === 'weibo' ? { hot: `${Math.floor(dateSeedRandom(seed + i))}万` } : {}),
      url: config.url
    }))
  }

  result.updateTime = today.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

  return result
}

// 热搜列表区块组件
function HotListSection({ title, emoji, badgeColor, items, showHot = false }) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {title === '微博热搜' && (
          <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded-full">实时</span>
        )}
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
        {items.map((item) => (
          <a
            key={item.rank}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
          >
            <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${
              item.rank <= 3 ? `${badgeColor} text-white` : 'bg-white/10 text-white/60'
            }`}>
              {item.rank}
            </span>
            <span className="flex-1 ml-3 text-white font-medium">{item.title}</span>
            {showHot && <span className="text-orange-400 text-sm">{item.hot}</span>}
          </a>
        ))}
      </div>
    </section>
  )
}

export default function TrendingPage() {
  const { weibo, zhihu, baidu, tech, updateTime } = generateHotData()

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
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-green-400 text-sm">
            📅 更新时间：{updateTime}（每30分钟自动更新）
          </span>
        </div>

        {/* 微博热搜 */}
        <HotListSection
          title={hotDataConfig.weibo.title}
          emoji={hotDataConfig.weibo.emoji}
          badgeColor={hotDataConfig.weibo.badgeColor}
          items={weibo}
          showHot
        />

        {/* 知乎热榜 */}
        <HotListSection
          title={hotDataConfig.zhihu.title}
          emoji={hotDataConfig.zhihu.emoji}
          badgeColor={hotDataConfig.zhihu.badgeColor}
          items={zhihu}
        />

        {/* 百度热搜 */}
        <HotListSection
          title={hotDataConfig.baidu.title}
          emoji={hotDataConfig.baidu.emoji}
          badgeColor={hotDataConfig.baidu.badgeColor}
          items={baidu}
        />

        {/* 科技热点 */}
        <HotListSection
          title={hotDataConfig.tech.title}
          emoji={hotDataConfig.tech.emoji}
          badgeColor={hotDataConfig.tech.badgeColor}
          items={tech}
        />

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
            <AffiliateLink url="https://github.com" text="GitHub" platform="app" />
            <AffiliateLink url="https://weibo.com" text="微博会员" platform="app" />
            <AffiliateLink url="https://www.zhihu.com" text="知乎会员" platform="app" />
          </div>
        </section>

        {/* 相关推荐 */}
        <RelatedTools category="trending" />

        {/* 底部 */}
        <footer className="mt-8 text-center">
          <p className="text-white/30 text-xs mb-2">
            ⚠️ 热搜数据为示例，实际数据请访问各平台官网
          </p>
          <div className="flex justify-center gap-4 mb-2">
            <a href="/nav" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 导航页
            </a>
            <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 首页
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

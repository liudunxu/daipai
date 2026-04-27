import ShareButtons from '../components/ShareButtons'
import FAQSchema, { homePageFAQs } from '../components/FAQSchema'
import { CollectionPageSchema, PageContentSummary } from '../components/RAGTools'
import { popularTools } from '../lib/relatedTools'
import HomeNews from '../components/HomeNews'

const toolCategories = [
  {
    title: '🔮 玄学命理',
    tools: [
      { href: '/jiemeng', emoji: '🌙', name: '周公解梦', desc: '输入梦境关键词解读寓意' },
      { href: '/personality', emoji: '🧠', name: 'MBTI测试', desc: '16型人格测试' },
      { href: '/xingzuo', emoji: '✨', name: '星座运势', desc: '12星座今日运势详解' },
      { href: '/bazi', emoji: '📖', name: '八字算命', desc: '生辰八字五行查询' },
      { href: '/tarot', emoji: '🔮', name: '塔罗牌', desc: '3张牌解读你的问题' },
      { href: '/chouqian', emoji: '🙏', name: '在线抽签', desc: '观音灵签月老灵签' },
      { href: '/today', emoji: '🎯', name: '今日运势', desc: '每日运势综合查询' },
      { href: '/huangli', emoji: '📅', name: '老黄历', desc: '今日黄历吉凶宜忌' },
    ],
  },
  {
    title: '💒 择日查询',
    tools: [
      { href: '/zhaori', emoji: '🎊', name: '择吉日', desc: '结婚搬家开业选好日子' },
      { href: '/lunar', emoji: '🗓️', name: '农历日历', desc: '公历农历天干地支对照' },
      { href: '/wedding', emoji: '💒', name: '结婚吉日', desc: '挑选结婚好日子' },
      { href: '/fate', emoji: '🔮', name: '2026年运势', desc: '生肖运势预测' },
    ],
  },
  {
    title: '💞 情感配对',
    tools: [
      { href: '/match', emoji: '💕', name: '姓名配对', desc: '测试缘分配对指数' },
      { href: '/phone', emoji: '📱', name: '手机号测运势', desc: '号码吉凶查询' },
      { href: '/mind', emoji: '🧩', name: '心理测试', desc: '5道题了解真实的你' },
      { href: '/couple', emoji: '💑', name: '情侣头像', desc: '生成专属情侣头像' },
    ],
  },
  {
    title: '🎉 生活娱乐',
    tools: [
      { href: '/blessing', emoji: '🎊', name: '祝福语', desc: '节日祝福语生成' },
      { href: '/cake', emoji: '🎂', name: '生日蛋糕', desc: '生日蛋糕许愿生成' },
      { href: '/birthday', emoji: '🎁', name: '生日密语', desc: '生日专属秘密' },
      { href: '/avatar', emoji: '🎨', name: '节日头像', desc: '春节中秋生日头像' },
      { href: '/dice', emoji: '🎲', name: '摇骰子', desc: '在线摇骰子趣味随机' },
    ],
  },
  {
    title: '📊 股票财经',
    tools: [
      { href: '/stock', emoji: '📈', name: '今天会涨吗', desc: 'A股行情娱乐预测' },
      { href: '/stock/predict', emoji: '💹', name: 'A股预测', desc: '智能预测A股走势' },
      { href: '/guru', emoji: '🎯', name: '大佬持仓', desc: '巴菲特/Cathie Wood持仓' },
    ],
  },
  {
    title: '🛠️ 实用工具',
    tools: [
      { href: '/tool/password', emoji: '🔑', name: '密码生成', desc: '安全强密码生成器' },
      { href: '/tool/bmi', emoji: '⚖️', name: 'BMI计算', desc: '体质指数计算' },
      { href: '/tool/unit', emoji: '📐', name: '单位换算', desc: '长度重量温度换算' },
      { href: '/tool/countdown', emoji: '⏳', name: '倒数日', desc: '重要日子倒计时' },
    ],
  },
]

export const metadata = {
  title: '极客观察 - AI科技经济资讯 | 星座运势、八字算命、周公解梦、MBTI测试',
  description: '极客观察提供AI科技经济资讯、星座运势、八字算命、周公解梦、MBTI性格测试、择吉日、农历查询等60+实用工具。混排36氪、虎嗅、IT之家等科技媒体资讯，每日更新。',
  keywords: ['极客观察', '周公解梦', 'MBTI测试', '星座运势', '八字算命', '择吉日', '农历查询', 'AI资讯', '科技新闻', '塔罗牌', '在线抽签', '今日运势'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top',
    siteName: '极客观察',
    title: '极客观察 - AI科技经济资讯 | 60+实用工具',
    description: '提供周公解梦、MBTI测试、星座运势、择吉日等60+实用工具，混排36氪、虎嗅、IT之家科技资讯。',
    images: [
      {
        url: '/api/og-image?title=极客观察&desc=AI科技经济资讯平台',
        width: 1200,
        height: 630,
        alt: '极客观察'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '极客观察 - AI科技经济资讯 | 60+实用工具',
    description: '提供周公解梦、MBTI测试、星座运势、择吉日等60+实用工具',
    images: ['/api/og-image?title=极客观察&desc=AI科技经济资讯平台'],
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top',
  },
}

export default function Home() {
  return (
    <>
      <CollectionPageSchema
        name="极客观察 - AI科技经济资讯"
        description="混排AI、科技、经济相关资讯，36氪、虎嗅、IT之家、经济时报，一站获取最新科技动态。同时提供星座运势、八字算命、塔罗牌、周公解梦、MBTI等60+实用工具。"
        items={popularTools.map(tool => ({
          name: tool.name,
          description: `${tool.name}工具`,
          url: `https://www.zkwatcher.top${tool.href}`
        }))}
      />
      <PageContentSummary
        title="极客观察 - AI科技经济资讯"
        description="混排AI、科技、经济相关资讯，提供周公解梦、MBTI测试、星座运势、八字算命、择吉日、农历查询等60+实用工具。"
        category="综合工具平台"
        features={['AI资讯', '周公解梦', 'MBTI测试', '星座运势', '择吉日', '农历查询', '八字算命', '塔罗牌', '生活工具']}
      />
      <FAQSchema faqs={homePageFAQs} />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="py-12 px-5 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-xl">👁️</span>
              <span className="text-white font-medium">极客观察</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              AI · 科技 · 经济
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> 资讯</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              混排AI、科技、经济相关资讯 · 60+实用工具 · 每日更新
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs">周公解梦</span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs">MBTI测试</span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs">星座运势</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs">择吉日</span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs">八字算命</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs">股票预测</span>
            </div>
          </div>
        </header>

        <HomeNews />

        <section className="py-8 px-5 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              🔥 热门工具
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularTools.map((tool) => (
                <a key={tool.href} href={tool.href} className="bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-colors text-center group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{tool.emoji}</div>
                  <div className="text-white font-medium text-sm">{tool.name}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 px-5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              🧭 全部分类工具
            </h2>
            <div className="space-y-8">
              {toolCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-white font-bold text-lg mb-3">{category.title}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {category.tools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl p-3 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg group-hover:scale-110 transition-transform">{tool.emoji}</span>
                          <span className="text-white font-medium text-sm">{tool.name}</span>
                        </div>
                        <p className="text-white/40 text-xs">{tool.desc}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="/nav" className="inline-block px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
                查看全部工具 →
              </a>
            </div>
          </div>
        </section>

        <section className="py-8 px-5 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              ❓ 常见问题
            </h2>
            <div className="space-y-4">
              {homePageFAQs.map((faq, index) => (
                <details key={index} className="bg-white/5 border border-white/10 rounded-xl group">
                  <summary className="p-4 text-white font-medium cursor-pointer flex justify-between items-center hover:bg-white/5 rounded-xl transition-colors">
                    {faq.question}
                    <span className="text-white/40 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-white/60 text-sm">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 px-5">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 text-center">
              📌 关于极客观察
            </h2>
            <div className="text-white/60 text-sm leading-relaxed space-y-3">
              <p>
                极客观察是一个综合性的在线工具和资讯平台，提供 <strong className="text-white/80">60+</strong> 种实用工具，包括周公解梦、MBTI性格测试、星座运势、八字算命、塔罗牌占卜、择吉日、农历查询等玄学命理工具，以及密码生成器、BMI计算器、单位换算等生活工具。
              </p>
              <p>
                资讯板块混排36氪、虎嗅、IT之家、财联社等主流科技经济媒体的最新报道，每日自动更新，让你不错过任何重要动态。所有工具完全免费，无需注册即可使用。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">周公解梦</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">MBTI性格测试</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">十二星座运势</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">生辰八字</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">塔罗牌占卜</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">择吉日</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">农历日历</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">在线抽签</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">老黄历</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">股票预测</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">密码生成器</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">热搜榜</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-5 text-center border-t border-white/10">
          <div className="max-w-4xl mx-auto mb-6">
            <ShareButtons title="极客观察 - AI科技经济资讯" url="/" />
          </div>
          <p className="text-white/40 text-sm">
            极客观察 · AI 科技 经济资讯
          </p>
          <p className="text-white/30 text-xs mt-2">
            数据来源：36氪、虎嗅、IT之家、财联社 · 每日更新 · 仅供参考
          </p>
        </footer>
      </div>
    </>
  )
}
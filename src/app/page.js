import { cookies } from 'next/headers'
import ShareButtons from '../components/ShareButtons'
import FAQSchema, { homePageFAQs } from '../components/FAQSchema'
import { CollectionPageSchema, PageContentSummary } from '../components/RAGTools'
import { popularTools } from '../lib/relatedTools'
import HomeNews from '../components/HomeNews'
import { t } from '../lib/i18n'

export async function generateMetadata() {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  const isZh = locale === 'zh'
  
  return {
    title: isZh 
      ? '极客观察 - AI科技经济资讯 | 星座运势、八字算命、周公解梦、MBTI测试'
      : 'GeekWatcher - AI Tech Finance News | Horoscope, Dream Interpretation, MBTI Test',
    description: isZh
      ? '极客观察提供AI科技经济资讯、星座运势、八字算命、周公解梦、MBTI性格测试、择吉日、农历查询等60+实用工具。混排36氪、虎嗅、IT之家等科技媒体资讯，每日更新。'
      : 'GeekWatcher provides AI tech finance news, horoscope, dream interpretation, MBTI personality test, and 60+ free tools. Daily updates.',
    keywords: isZh
      ? ['极客观察', '周公解梦', 'MBTI测试', '星座运势', '八字算命', '择吉日', '农历查询', 'AI资讯', '科技新闻']
      : ['GeekWatcher', 'AI News', 'Tech News', 'Horoscope', 'MBTI', 'Dream Interpretation', 'Fortune Telling'],
    openGraph: {
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
      url: 'https://www.zkwatcher.top',
      siteName: isZh ? '极客观察' : 'GeekWatcher',
      title: isZh ? '极客观察 - AI科技经济资讯 | 60+实用工具' : 'GeekWatcher - AI Tech Finance News | 60+ Free Tools',
      description: isZh ? '提供周公解梦、MBTI测试、星座运势、择吉日等60+实用工具' : 'Free tools: dream interpretation, MBTI test, horoscope, and more',
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? '极客观察 - AI科技经济资讯 | 60+实用工具' : 'GeekWatcher - AI Tech Finance News | 60+ Free Tools',
      description: isZh ? '提供周公解梦、MBTI测试、星座运势、择吉日等60+实用工具' : 'Free tools: dream interpretation, MBTI test, horoscope, and more',
    },
    alternates: {
      canonical: 'https://www.zkwatcher.top',
    },
  }
}

export default function Home() {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  const isZh = locale === 'zh'

  const toolCategories = [
    {
      title: t('categories.mysticism', locale),
      tools: [
        { href: '/jiemeng', emoji: '🌙', name: t('nav.dream', locale), desc: isZh ? '输入梦境关键词解读寓意' : 'Interpret your dreams by keywords' },
        { href: '/personality', emoji: '🧠', name: t('nav.mbti', locale), desc: isZh ? '16型人格测试' : '16 personality types test' },
        { href: '/xingzuo', emoji: '✨', name: t('nav.horoscope', locale), desc: isZh ? '12星座今日运势详解' : 'Daily horoscope for 12 zodiac signs' },
        { href: '/bazi', emoji: '📖', name: t('nav.bazi', locale), desc: isZh ? '生辰八字五行查询' : 'BaZi (Eight Characters) fortune telling' },
        { href: '/tarot', emoji: '🔮', name: t('nav.tarot', locale), desc: isZh ? '3张牌解读你的问题' : '3-card tarot reading' },
        { href: '/chouqian', emoji: '🙏', name: t('nav.divination', locale), desc: isZh ? '观音灵签月老灵签' : 'Online fortune sticks drawing' },
        { href: '/today', emoji: '🎯', name: t('nav.fortune', locale), desc: isZh ? '每日运势综合查询' : 'Daily comprehensive fortune' },
        { href: '/huangli', emoji: '📅', name: t('nav.almanac', locale), desc: isZh ? '今日黄历吉凶宜忌' : 'Traditional Chinese almanac' },
      ],
    },
    {
      title: t('categories.dateSelection', locale),
      tools: [
        { href: '/zhaori', emoji: '🎊', name: t('nav.auspicious', locale), desc: isZh ? '结婚搬家开业选好日子' : 'Pick auspicious days for events' },
        { href: '/lunar', emoji: '🗓️', name: t('nav.lunar', locale), desc: isZh ? '公历农历天干地支对照' : 'Gregorian & lunar calendar' },
        { href: '/wedding', emoji: '💒', name: 'Wedding', desc: isZh ? '挑选结婚好日子' : 'Pick wedding dates' },
        { href: '/fate', emoji: '🔮', name: '2026 Fortune', desc: isZh ? '生肖运势预测' : 'Zodiac fortune prediction' },
      ],
    },
    {
      title: t('categories.love', locale),
      tools: [
        { href: '/match', emoji: '💕', name: 'Name Match', desc: isZh ? '测试缘分配对指数' : 'Love compatibility test' },
        { href: '/phone', emoji: '📱', name: 'Phone Fortune', desc: isZh ? '号码吉凶查询' : 'Phone number fortune check' },
        { href: '/mind', emoji: '🧩', name: 'Psych Test', desc: isZh ? '5道题了解真实的你' : '5 questions to know yourself' },
        { href: '/couple', emoji: '💑', name: 'Couple Avatar', desc: isZh ? '生成专属情侣头像' : 'Generate couple avatars' },
      ],
    },
    {
      title: t('categories.entertainment', locale),
      tools: [
        { href: '/blessing', emoji: '🎊', name: 'Blessings', desc: isZh ? '节日祝福语生成' : 'Generate festival greetings' },
        { href: '/cake', emoji: '🎂', name: 'Birthday Cake', desc: isZh ? '生日蛋糕许愿生成' : 'Birthday cake wishes' },
        { href: '/birthday', emoji: '🎁', name: 'Birthday Secret', desc: isZh ? '生日专属秘密' : 'Birthday secrets' },
        { href: '/avatar', emoji: '🎨', name: 'Avatar', desc: isZh ? '春节中秋生日头像' : 'Festival avatars' },
        { href: '/dice', emoji: '🎲', name: 'Dice', desc: isZh ? '在线摇骰子趣味随机' : 'Online dice roller' },
      ],
    },
    {
      title: t('categories.stock', locale),
      tools: [
        { href: '/stock', emoji: '📈', name: 'Stock Today', desc: isZh ? 'A股行情娱乐预测' : 'Stock market fun prediction' },
        { href: '/stock/predict', emoji: '💹', name: t('nav.stockPredict', locale), desc: isZh ? '智能预测A股走势' : 'A-share trend prediction' },
        { href: '/guru', emoji: '🎯', name: t('nav.guru', locale), desc: isZh ? '巴菲特/Cathie Wood持仓' : 'Buffett/Cathie Wood holdings' },
      ],
    },
    {
      title: t('categories.tools', locale),
      tools: [
        { href: '/tool/password', emoji: '🔑', name: t('nav.password', locale), desc: isZh ? '安全强密码生成器' : 'Secure password generator' },
        { href: '/tool/bmi', emoji: '⚖️', name: t('nav.bmi', locale), desc: isZh ? '体质指数计算' : 'Body mass index calculator' },
        { href: '/tool/unit', emoji: '📐', name: t('nav.unit', locale), desc: isZh ? '长度重量温度换算' : 'Length/weight/temperature converter' },
        { href: '/tool/countdown', emoji: '⏳', name: t('nav.countdown', locale), desc: isZh ? '重要日子倒计时' : 'Important day countdown' },
      ],
    },
  ]

  const siteName = t('site.name', locale)
  const tagline = t('site.tagline', locale)

  return (
    <>
      <CollectionPageSchema
        name={`${siteName} - ${tagline}`}
        description={t('site.about', locale)}
        items={popularTools.map(tool => ({
          name: tool.name,
          description: `${tool.name} tool`,
          url: `https://www.zkwatcher.top${tool.href}`
        }))}
      />
      <PageContentSummary
        title={`${siteName} - ${tagline}`}
        description={t('site.about', locale)}
        category={isZh ? '综合工具平台' : 'Comprehensive Tools Platform'}
        features={isZh 
          ? ['AI资讯', '周公解梦', 'MBTI测试', '星座运势', '择吉日', '农历查询', '八字算命', '塔罗牌', '生活工具']
          : ['AI News', 'Dream Interpretation', 'MBTI Test', 'Horoscope', 'Auspicious Days', 'Lunar Calendar', 'Fortune Telling', 'Tarot', 'Life Tools']
        }
      />
      <FAQSchema faqs={homePageFAQs} />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="py-12 px-5 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-xl">👁️</span>
              <span className="text-white font-medium">{siteName}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {t('home.title', locale)}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> {t('home.subtitle', locale)}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              {t('home.description', locale)}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs">{t('nav.dream', locale)}</span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs">{t('nav.mbti', locale)}</span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs">{t('nav.horoscope', locale)}</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs">{t('nav.auspicious', locale)}</span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs">{t('nav.bazi', locale)}</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs">{t('nav.stockPredict', locale)}</span>
            </div>
          </div>
        </header>

        <HomeNews />

        <section className="py-8 px-5 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              {t('home.hotTools', locale)}
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
              {t('home.allTools', locale)}
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
                {t('home.viewAll', locale)}
              </a>
            </div>
          </div>
        </section>

        <section className="py-8 px-5 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              {t('home.faq', locale)}
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
              {t('home.about', locale)}
            </h2>
            <div className="text-white/60 text-sm leading-relaxed space-y-3">
              <p dangerouslySetInnerHTML={{ __html: t('site.about', locale).replace('60+', '<strong class="text-white/80">60+</strong>') }} />
              <p>{t('site.newsDescription', locale)}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.dream', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.mbti', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.horoscope', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.bazi', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.tarot', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.auspicious', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.lunar', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.divination', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.almanac', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.stockPredict', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.password', locale)}</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/50 rounded text-xs">{t('nav.trending', locale)}</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-5 text-center border-t border-white/10">
          <div className="max-w-4xl mx-auto mb-6">
            <ShareButtons title={`${siteName} - ${tagline}`} url="/" />
          </div>
          <p className="text-white/40 text-sm">
            {t('home.footer', locale)}
          </p>
          <p className="text-white/30 text-xs mt-2">
            {t('home.dataSource', locale)}
          </p>
        </footer>
      </div>
    </>
  )
}

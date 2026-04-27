import { cookies } from 'next/headers'
import Link from 'next/link'
import { AdBanner } from '../../components/Ads'
import WechatGroup from '../../components/WechatGroup'
import { t } from '../../lib/i18n'

export async function generateMetadata() {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  const isZh = locale === 'zh'
  
  return {
    title: isZh ? '导航页 - 实用工具集合 - 极客观察' : 'Navigation - All Tools - GeekWatcher',
    description: isZh 
      ? '汇集各种实用工具和资讯页面，包括摇骰子、股市预测、姓名大全、热搜榜、星座运势、塔罗牌测试等。极客观察工具箱一触即达。'
      : 'Collection of useful tools and news pages. GeekWatcher toolbox at your fingertips.',
    keywords: isZh
      ? ['导航', '工具箱', '实用工具', '在线工具', '运势查询', '算命工具', 'AI工具']
      : ['Navigation', 'Tools', 'Toolbox', 'Online Tools', 'AI Tools'],
    openGraph: {
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
      url: 'https://www.zkwatcher.top/nav',
      siteName: isZh ? '极客观察' : 'GeekWatcher',
      title: isZh ? '导航页 - 实用工具集合' : 'Navigation - All Tools',
      description: isZh ? '汇集各种实用工具和资讯页面。' : 'Collection of useful tools and pages.',
    },
    twitter: {
      card: 'summary',
      title: isZh ? '导航页 - 实用工具集合' : 'Navigation - All Tools',
      description: isZh ? '汇集各种实用工具和资讯页面' : 'Collection of useful tools and pages',
    },
    alternates: {
      canonical: 'https://www.zkwatcher.top/nav',
    },
  }
}

export default function NavPage() {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  const isZh = locale === 'zh'

  const navGroups = [
    {
      title: t('navPage.quickAccess', locale),
      items: [
        { name: t('nav.home', locale), url: '/', desc: isZh ? '回到首页' : 'Back to home' },
      ],
    },
    {
      title: t('navPage.mysticism', locale),
      items: [
        { name: t('nav.fortune', locale), url: '/today', desc: isZh ? '每日运势查询' : 'Daily fortune' },
        { name: t('nav.horoscope', locale), url: '/xingzuo', desc: isZh ? '12星座今日运势' : '12 zodiac daily horoscope' },
        { name: t('nav.zodiac', locale), url: '/shengxiao', desc: isZh ? '生肖运势查询' : 'Chinese zodiac fortune' },
        { name: '2026 Fortune', url: '/fate', desc: isZh ? '2026年生肖运势预测' : '2026 zodiac prediction' },
        { name: t('nav.almanac', locale), url: '/huangli', desc: isZh ? '今日黄历吉凶宜忌' : 'Traditional almanac' },
        { name: t('nav.lunar', locale), url: '/lunar', desc: isZh ? '公历农历天干地支对照' : 'Lunar calendar' },
        { name: t('nav.auspicious', locale), url: '/zhaori', desc: isZh ? '结婚搬家开业选好日子' : 'Auspicious day picker' },
        { name: t('nav.divination', locale), url: '/chouqian', desc: isZh ? '观音灵签月老灵签' : 'Fortune sticks' },
        { name: t('nav.bazi', locale), url: '/bazi', desc: isZh ? '生辰八字五行查询' : 'BaZi fortune telling' },
        { name: t('nav.bone', locale), url: '/chenggu', desc: isZh ? '袁天罡称骨算命法' : 'Bone weight fortune' },
        { name: t('nav.tarot', locale), url: '/tarot', desc: isZh ? '3张牌解读问题' : 'Tarot reading' },
        { name: t('nav.dream', locale), url: '/jiemeng', desc: isZh ? '在线免费解梦' : 'Dream interpretation' },
      ],
    },
    {
      title: t('navPage.love', locale),
      items: [
        { name: 'Name Match', url: '/match', desc: isZh ? '测试缘分配对指数' : 'Love compatibility' },
        { name: 'Phone Fortune', url: '/phone', desc: isZh ? '号码吉凶查询' : 'Phone number luck' },
        { name: 'Psych Test', url: '/mind', desc: isZh ? '5道题了解真实的你' : '5-question psychology test' },
        { name: t('nav.mbti', locale), url: '/personality', desc: isZh ? '16型人格测试' : '16 personality types' },
      ],
    },
    {
      title: t('navPage.entertainment', locale),
      items: [
        { name: 'Birthday Secret', url: '/birthday', desc: isZh ? '生日专属秘密' : 'Birthday secrets' },
        { name: 'Birthday Cake', url: '/cake', desc: isZh ? '生日蛋糕许愿生成' : 'Birthday cake wishes' },
        { name: 'Wedding', url: '/wedding', desc: isZh ? '挑选结婚好日子' : 'Wedding date picker' },
        { name: 'Couple Avatar', url: '/couple', desc: isZh ? '生成专属情侣头像' : 'Couple avatars' },
        { name: 'Avatar', url: '/avatar', desc: isZh ? '春节、中秋、生日头像' : 'Festival avatars' },
        { name: 'Face Match', url: '/face', desc: isZh ? '看你像哪个明星' : 'Celebrity face match' },
        { name: 'Dice', url: '/dice', desc: isZh ? '在线摇骰子，趣味随机' : 'Online dice roller' },
        { name: 'Blessings', url: '/blessing', desc: isZh ? '节日祝福语生成' : 'Greeting generator' },
      ],
    },
    {
      title: t('navPage.stock', locale),
      items: [
        { name: 'Stock Today', url: '/stock', desc: isZh ? '股市行情预测，娱乐一下' : 'Stock prediction for fun' },
        { name: t('nav.stockPredict', locale), url: '/stock/predict', desc: isZh ? '智能预测A股走势' : 'A-share prediction' },
        { name: t('nav.hkStock', locale), url: '/stock/hk-predict', desc: isZh ? '智能预测港股走势' : 'HK stock prediction' },
        { name: t('nav.usStock', locale), url: '/stock/us-predict', desc: isZh ? '智能预测美股走势' : 'US stock prediction' },
        { name: t('nav.guru', locale), url: '/guru', desc: isZh ? '巴菲特/Cathie Wood持仓' : 'Guru holdings tracker' },
      ],
    },
    {
      title: t('navPage.ai', locale),
      items: [
        { name: 'AI Tools', url: '/ai', desc: isZh ? 'DeepSeek/Claude/Coze教程' : 'DeepSeek/Claude/Coze guides' },
        { name: t('nav.aiRank', locale), url: '/llm-leaderboard', desc: isZh ? 'AI编程能力排行榜' : 'AI coding leaderboard' },
        { name: 'DeepSeek', url: '/ai/deepseek', desc: isZh ? 'DeepSeek使用教程' : 'DeepSeek guide' },
        { name: 'Claude', url: '/ai/claude', desc: isZh ? 'Claude使用教程' : 'Claude guide' },
        { name: 'Coze', url: '/ai/coze', desc: isZh ? 'Coze使用教程' : 'Coze guide' },
        { name: 'Perplexity', url: '/ai/perplexity', desc: isZh ? 'AI搜索引擎教程' : 'Perplexity guide' },
        { name: 'AI Prompts', url: '/prompt', desc: isZh ? 'ChatGPT提示词大全' : 'AI prompts collection' },
      ],
    },
    {
      title: t('navPage.tools', locale),
      items: [
        { name: t('nav.password', locale), url: '/tool/password', desc: isZh ? '安全强密码生成' : 'Secure password generator' },
        { name: t('nav.unit', locale), url: '/tool/unit', desc: isZh ? '长度/重量/温度/面积转换' : 'Unit converter' },
        { name: t('nav.countdown', locale), url: '/tool/countdown', desc: isZh ? '重要日子倒计时' : 'Countdown timer' },
        { name: t('nav.bmi', locale), url: '/tool/bmi', desc: isZh ? '身体质量指数计算' : 'BMI calculator' },
        { name: 'Height', url: '/tool/height', desc: isZh ? '儿童身高发育评估' : 'Child height assessment' },
        { name: 'Sleep', url: '/tool/sleep', desc: isZh ? '各年龄段睡眠时长' : 'Sleep recommendations' },
        { name: t('nav.lucky', locale), url: '/tool/lucky', desc: isZh ? '2026年运势测算' : '2026 fortune calculation' },
        { name: t('nav.mars', locale), url: '/tool/huoxing', desc: isZh ? '火星文转换器' : 'Mars text converter' },
      ],
    },
    {
      title: t('navPage.news', locale),
      items: [
        { name: t('nav.trending', locale), url: '/trending', desc: isZh ? '微博、知乎、百度热搜' : 'Trending topics' },
        { name: t('nav.github', locale), url: '/github-rank', desc: isZh ? '每周热门开源项目' : 'Weekly trending open source' },
        { name: t('nav.history', locale), url: '/todayinhistory', desc: isZh ? '回顾历史重大事件' : 'Today in history' },
      ],
    },
    {
      title: t('navPage.others', locale),
      items: [
        { name: 'Features', url: '/features', desc: isZh ? '网站功能一览' : 'Site features overview' },
        { name: t('footer.about', locale), url: '/about', desc: isZh ? '关于我们' : 'About us' },
        { name: t('footer.contact', locale), url: '/contact', desc: isZh ? '联系我们' : 'Contact us' },
        { name: t('footer.privacy', locale), url: '/privacy', desc: isZh ? '隐私政策说明' : 'Privacy policy' },
        { name: t('footer.terms', locale), url: '/terms', desc: isZh ? '用户服务协议' : 'Terms of service' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t('navPage.title', locale)}
          </h1>
          <p className="text-white/60">
            {t('navPage.subtitle', locale)}
          </p>
        </header>

        {/* 分组导航 */}
        {navGroups.map((group, groupIndex) => (
          <section key={groupIndex} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              {group.title}
              <span className="text-white/30 text-sm font-normal">({group.items.length})</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {group.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.url}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10"
                >
                  <h3 className="text-white font-bold mb-1 group-hover:text-yellow-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-white/50 text-xs">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* 广告位 */}
        <div className="mt-8">
          <AdBanner className="mx-auto max-w-2xl" />
        </div>

        {/* 社群入口 - 仅中文显示 */}
        {isZh && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-white mb-4 text-center">{t('navPage.joinUs', locale)}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <WechatGroup
                title={t('navPage.wechatGroup', locale)}
                description={t('navPage.wechatDesc', locale)}
              />
              <WechatGroup
                title={t('navPage.knowledgePlanet', locale)}
                description={t('navPage.planetDesc', locale)}
              />
            </div>
          </section>
        )}

        {/* 外部链接 */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4 text-center">{t('navPage.commonSites', locale)}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              {t('navPage.github', locale)}
            </a>
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              {t('navPage.openclaw', locale)}
            </a>
            <a
              href="https://claw.guanjia.qq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              {t('navPage.qclaw', locale)}
            </a>
            {isZh && (
              <>
                <a
                  href="https://weibo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
                >
                  {t('navPage.weibo', locale)}
                </a>
                <a
                  href="https://zhihu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
                >
                  {t('navPage.zhihu', locale)}
                </a>
              </>
            )}
          </div>
        </section>

        {/* 底部 */}
        <footer className="mt-12 text-center">
          <Link href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            {t('navPage.backHome', locale)}
          </Link>
        </footer>
      </div>
    </div>
  )
}

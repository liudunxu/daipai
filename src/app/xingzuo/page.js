import FAQSchema, { xingzuoFAQs } from '../../components/FAQSchema'
import RelatedTools from '../../components/RelatedTools'
import { FortuneTellingSchema, PageContentSummary } from '../../components/RAGTools'
import AffiliateLink from '../../components/AffiliateLink'
import XingzuoCalculator from '../../components/XingzuoCalculator'

export const metadata = {
  title: '星座运势查询 - 十二星座今日运势详解 | 极客观察',
  description: '查看十二星座今日运势，白羊座、金牛座、双子座、巨蟹座、狮子座、处女座、天秤座、天蝎座、射手座、摩羯座、水瓶座、双鱼座运势详解，包括爱情、事业、财运分析。',
  keywords: '星座运势,十二星座,今日运势,星座查询,白羊座,金牛座,双子座,巨蟹座,狮子座,处女座,天秤座,天蝎座,射手座,摩羯座,水瓶座,双鱼座',
  openGraph: {
    title: '星座运势查询 - 十二星座今日运势详解',
    description: '免费在线查看十二星座今日运势，包括爱情、事业、财运全面分析。',
    url: 'https://www.zkwatcher.top/xingzuo',
    siteName: '极客观察',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/xingzuo',
  },
}

const zodiacSignsSEO = [
  { name: '白羊座', dates: '3月21日-4月19日', element: '火', symbol: '♈' },
  { name: '金牛座', dates: '4月20日-5月20日', element: '土', symbol: '♉' },
  { name: '双子座', dates: '5月21日-6月21日', element: '风', symbol: '♊' },
  { name: '巨蟹座', dates: '6月22日-7月22日', element: '水', symbol: '♋' },
  { name: '狮子座', dates: '7月23日-8月22日', element: '火', symbol: '♌' },
  { name: '处女座', dates: '8月23日-9月22日', element: '土', symbol: '♍' },
  { name: '天秤座', dates: '9月23日-10月23日', element: '风', symbol: '♎' },
  { name: '天蝎座', dates: '10月24日-11月22日', element: '水', symbol: '♏' },
  { name: '射手座', dates: '11月23日-12月21日', element: '火', symbol: '♐' },
  { name: '摩羯座', dates: '12月22日-1月19日', element: '土', symbol: '♑' },
  { name: '水瓶座', dates: '1月20日-2月18日', element: '风', symbol: '♒' },
  { name: '双鱼座', dates: '2月19日-3月20日', element: '水', symbol: '♓' },
]

const elementColors = {
  '火': { bg: 'bg-red-500/20', text: 'text-red-400', label: '火象星座' },
  '土': { bg: 'bg-amber-500/20', text: 'text-amber-400', label: '土象星座' },
  '风': { bg: 'bg-sky-500/20', text: 'text-sky-400', label: '风象星座' },
  '水': { bg: 'bg-blue-500/20', text: 'text-blue-400', label: '水象星座' },
}

export default function XingzuoPage() {
  return (
    <>
      <FortuneTellingSchema
        name="星座运势查询"
        description="查看十二星座今日运势，白羊、金牛、双子、巨蟹、狮子、处女、天秤、天蝎、射手、摩羯、水瓶、双鱼今日运势详解。免费在线星座运势查询。"
        url="https://www.zkwatcher.top/xingzuo"
      />
      <PageContentSummary
        title="星座运势查询"
        description="查看十二星座今日运势详解，包括爱情、事业、财运分析。提供白羊座、金牛座、双子座、巨蟹座、狮子座、处女座、天秤座、天蝎座、射手座、摩羯座、水瓶座、双鱼座运势查询。"
        category="玄学命理"
        features={['十二星座运势', '每日更新', '爱情事业财运', '免费在线查询']}
      />
      <FAQSchema faqs={xingzuoFAQs} />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">✨ 星座运势</h1>
            <p className="text-white/60">12星座今日运势查询</p>
          </header>

          <XingzuoCalculator />

          <section className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">📖 什么是星座？</h2>
            <div className="space-y-3 text-white/70 text-sm leading-relaxed">
              <p>
                星座是指天球上被人为划分的区域，现代占星学中通常指黄道十二宫，即太阳在一年中经过的十二个星座区域。
                每个人根据出生日期对应一个太阳星座，被认为会影响性格特征和运势走向。
              </p>
              <p>
                西方占星学起源于古巴比伦，后经古希腊发展完善，至今已成为一种流行的文化现象。
                星座运势是根据行星运行位置推算的娱乐性预测，在全球拥有广泛的爱好者群体。
              </p>
            </div>
          </section>

          <section className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">🌟 十二星座日期与属性</h2>
            <div className="space-y-3">
              {Object.entries(elementColors).map(([element, style]) => (
                <div key={element}>
                  <h3 className={`${style.text} font-medium text-sm mb-2`}>{style.label}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {zodiacSignsSEO.filter(s => s.element === element).map(sign => (
                      <div key={sign.name} className={`${style.bg} rounded-xl p-3 flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{sign.symbol}</span>
                          <span className="text-white font-medium text-sm">{sign.name}</span>
                        </div>
                        <span className="text-white/50 text-xs">{sign.dates}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
            <div className="space-y-4">
              {xingzuoFAQs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
                  <p className="text-white/50 text-xs">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 text-center">
            <AffiliateLink url="https://www.zkwatcher.top/xingzuo" text="查看今日运势" platform="default" />
          </div>

          <RelatedTools category="xingzuo" />

          <footer className="mt-8 text-center">
            <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">
              ← 更多工具
            </a>
          </footer>
        </div>
      </div>
    </>
  )
}

import ShareButtons from '../../components/ShareButtons'
import FAQSchema from '../../components/FAQSchema'
import { baziFAQs } from '../../lib/faqData'
import RelatedTools from '../../components/RelatedTools'
import AffiliateLink from '../../components/AffiliateLink'
import BaziCalculator from '../../components/BaziCalculator'

export const metadata = {
  title: '八字算命 - 生辰八字排盘、五行命理分析 | 极客观察',
  description: '免费在线八字算命，输入出生时间即可查询生辰八字、五行属性和命理分析。了解自己的天干地支、五行缺失，探索命运走向。仅供娱乐参考。',
  keywords: ['八字算命', '生辰八字', '五行查询', '命理分析', '天干地支', '八字排盘', '在线算命'],
  openGraph: {
    title: '八字算命 - 生辰八字排盘分析',
    description: '免费在线八字算命，查询生辰八字和五行属性',
    url: 'https://www.zkwatcher.top/bazi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/bazi',
  },
}

export default function BaziPage() {
  return (
    <>
      <FAQSchema faqs={baziFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">八字算命</h1>
            <p className="text-white/60">输入出生时间，查询生辰八字与五行命理</p>
          </header>

          <BaziCalculator />

          <RelatedTools category="bazi" />
          <ShareButtons title="八字算命 - 生辰八字在线查询" url="/bazi" />

          <section className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">什么是八字算命？</h2>
            <div className="text-white/70 text-sm space-y-3">
              <p>
                八字算命，又称生辰八字或四柱命理，是中国传统命理学的重要组成部分。
                它根据一个人出生的年、月、日、时四个时间点的天干地支组合，共八个字，
                来推算一个人的命运走向和性格特征。
              </p>
              <p>
                <strong>天干</strong>有十个：甲、乙、丙、丁、戊、己、庚、辛、壬、癸；
                <strong>地支</strong>有十二个：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥。
                天干地支相互配合，形成六十甲子循环。
              </p>
              <p>
                <strong>五行</strong>即金、木、水、火、土，是八字命理的核心理论。
                每个天干和地支都有对应的五行属性，通过分析五行的相生相克关系，
                可以了解一个人的性格特点、适合的职业、健康状况等。
              </p>
            </div>
          </section>

          <section className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">五行相生相克</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-green-400 font-bold mb-2">相生关系</h3>
                <ul className="text-white/70 space-y-1">
                  <li>木生火 - 木燃烧产生火</li>
                  <li>火生土 - 灰烬化为土</li>
                  <li>土生金 - 土中蕴含金属</li>
                  <li>金生水 - 金属凝结水珠</li>
                  <li>水生木 - 水滋润树木生长</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-red-400 font-bold mb-2">相克关系</h3>
                <ul className="text-white/70 space-y-1">
                  <li>木克土 - 树根穿破土壤</li>
                  <li>土克水 - 土能阻挡水流</li>
                  <li>水克火 - 水能扑灭火焰</li>
                  <li>火克金 - 火能熔化金属</li>
                  <li>金克木 - 金属能砍伐树木</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">常见问题</h2>
            <div className="space-y-4">
              {baziFAQs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
                  <p className="text-white/50 text-xs">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3 text-center">命理学习资料</h3>
            <p className="text-white/60 text-sm mb-4 text-center">深入了解传统文化智慧</p>
            <div className="flex flex-wrap justify-center gap-3">
              <AffiliateLink url="https://search.jd.com/Search?keyword=易经入门" text="《易经》入门" platform="jingdong" />
              <AffiliateLink url="https://search.jd.com/Search?keyword=风水摆件" text="风水摆件" platform="jingdong" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

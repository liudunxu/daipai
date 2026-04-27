import FAQSchema, { tarotFAQs } from '../../components/FAQSchema'
import { FortuneTellingSchema, PageContentSummary } from '../../components/RAGTools'
import TarotCalculator from '../../components/TarotCalculator'

export const metadata = {
  title: '塔罗牌在线测试 - 免费塔罗牌占卜 | 极客观察',
  description: '免费在线塔罗牌测试，抽取3张塔罗牌解读你的运势、爱情、事业。提供伟特塔罗牌占卜、大阿卡纳与小阿卡纳解读，22张大阿尔卡纳牌面含义详解。仅供娱乐参考。',
  keywords: ['塔罗牌', '塔罗牌测试', '在线塔罗', '塔罗占卜', '塔罗牌解读', '大阿卡纳', '小阿卡纳', '伟特塔罗', '塔罗牌阵', '免费塔罗'],
  openGraph: {
    title: '塔罗牌在线测试 - 免费塔罗牌占卜',
    description: '免费在线塔罗牌测试，抽取3张塔罗牌解读你的运势、爱情、事业',
    url: 'https://www.zkwatcher.top/tarot',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/tarot',
  },
}

export default function TarotPage() {
  return (
    <>
      <FortuneTellingSchema
        name="塔罗牌占卜"
        description="在线塔罗牌占卜测试，抽取塔罗牌解读你的运势、爱情、事业、工作各方面运势。免费塔罗牌在线占卜。"
        url="https://www.zkwatcher.top/tarot"
      />
      <PageContentSummary
        title="塔罗牌占卜"
        description="在线塔罗牌占卜测试，3张牌解读你的运势、爱情、事业。提供伟特塔罗牌、爱情塔罗、事业塔罗免费占卜。"
        category="玄学命理"
        features={['塔罗牌占卜', '3张牌解读', '爱情事业财运', '免费在线测试']}
      />
      <FAQSchema faqs={tarotFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">🔮 塔罗牌测试</h1>
            <p className="text-white/60">3张牌解读你的问题</p>
          </header>

          <TarotCalculator />

          <section className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">什么是塔罗牌？</h2>
            <div className="text-white/70 text-sm space-y-3">
              <p>
                塔罗牌（Tarot）是一套起源于15世纪欧洲的纸牌系统，最初用于意大利的纸牌游戏。
                到18世纪，塔罗牌开始被用于占卜和神秘学研究，逐渐发展成为西方最流行的占卜工具之一。
                如今，塔罗牌已经成为全球范围内广受欢迎的自我探索和心理启发工具。
              </p>
              <p>
                标准的塔罗牌共有78张牌，分为<strong>大阿卡纳</strong>（Major Arcana，22张）和
                <strong>小阿卡纳</strong>（Minor Arcana，56张）两大部分。每张牌都有独特的图案和象征意义，
                通过牌面的组合和位置来传达信息和启示。
              </p>
              <p>
                塔罗牌并不是用来预测确定的未来，而是帮助人们从不同角度思考问题，
                发现潜意识中的想法和感受，从而做出更明智的决定。它更像是一面镜子，
                反映出我们内心深处的智慧。
              </p>
            </div>
          </section>

          <section className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">大阿卡纳（Major Arcana）</h2>
            <div className="text-white/70 text-sm space-y-3">
              <p>
                大阿卡纳共有22张牌，从0号愚人牌到21号世界牌，代表了人生旅程中的重要主题和转折点。
                这些牌通常被视为塔罗牌中最具精神意义的部分，每一张都象征着一个深刻的人生课题。
              </p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-purple-400 font-bold text-xs mb-1">愚人之旅</h3>
                  <p className="text-white/60 text-xs">愚人（0）→ 魔术师（1）→ 女祭司（2）→ 皇后（3）→ 皇帝（4）→ 教皇（5）</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-purple-400 font-bold text-xs mb-1">人生考验</h3>
                  <p className="text-white/60 text-xs">恋人（6）→ 战车（7）→ 力量（8）→ 隐士（9）→ 命运之轮（10）→ 正义（11）</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-purple-400 font-bold text-xs mb-1">内在转化</h3>
                  <p className="text-white/60 text-xs">倒吊人（12）→ 死神（13）→ 节制（14）→ 恶魔（15）→ 塔（16）</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-purple-400 font-bold text-xs mb-1">圆满回归</h3>
                  <p className="text-white/60 text-xs">星星（17）→ 月亮（18）→ 太阳（19）→ 审判（20）→ 世界（21）</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">小阿卡纳（Minor Arcana）</h2>
            <div className="text-white/70 text-sm space-y-3">
              <p>
                小阿卡纳共有56张牌，分为四个花色，每个花色14张牌。
                小阿卡纳更多地反映日常生活中的具体事件和情感状态。
              </p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-blue-400 font-bold text-xs mb-1">权杖（Wands）</h3>
                  <p className="text-white/60 text-xs">代表火元素，象征热情、创造力、行动力和事业发展</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-red-400 font-bold text-xs mb-1">圣杯（Cups）</h3>
                  <p className="text-white/60 text-xs">代表水元素，象征情感、爱情、直觉和人际关系</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-yellow-400 font-bold text-xs mb-1">宝剑（Swords）</h3>
                  <p className="text-white/60 text-xs">代表风元素，象征思想、沟通、冲突和决策</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-green-400 font-bold text-xs mb-1">星币（Pentacles）</h3>
                  <p className="text-white/60 text-xs">代表土元素，象征财富、工作、健康和物质世界</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">常见塔罗牌阵</h2>
            <div className="text-white/70 text-sm space-y-3">
              <p>
                塔罗牌阵（Spread）是指在占卜时牌的摆放方式，不同的牌阵适用于不同的问题类型。
                以下是几种常见的塔罗牌阵：
              </p>
              <div className="space-y-3 mt-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-white font-bold text-xs mb-1">三张牌阵（过去·现在·未来）</h3>
                  <p className="text-white/60 text-xs">最简单的牌阵，左牌代表过去的影响，中牌代表当前状况，右牌代表未来趋势。适合快速了解事情发展方向。</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-white font-bold text-xs mb-1">凯尔特十字牌阵</h3>
                  <p className="text-white/60 text-xs">最经典的牌阵，使用10张牌，从多个角度全面分析问题，包括当前处境、挑战、过去影响、近期未来等。</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-white font-bold text-xs mb-1">关系牌阵</h3>
                  <p className="text-white/60 text-xs">专用于感情问题的牌阵，分别代表你自己、对方以及你们之间的关系动态。</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <h3 className="text-white font-bold text-xs mb-1">单张牌占卜</h3>
                  <p className="text-white/60 text-xs">每天抽取一张牌作为当日的指引和反思，是最简单也最常用的日常练习方式。</p>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">常见问题</h2>
            <div className="space-y-4">
              {tarotFAQs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
                  <p className="text-white/50 text-xs">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <footer className="mt-8 text-center">
            <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">← 更多工具</a>
          </footer>
        </div>
      </div>
    </>
  )
}

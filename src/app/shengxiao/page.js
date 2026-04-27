'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import { AdBanner } from '../../components/Ads'
import RelatedTools from '../../components/RelatedTools'
import FAQSchema, { shengxiaoFAQs } from '../../components/FAQSchema'
import { FortuneTellingSchema, PageContentSummary } from '../../components/RAGTools'

const zodiacYear = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

const zodiacInfo = {
  '鼠': { symbol: '🐭', color: '#9B59B6', desc: '聪明机警，善于理财' },
  '牛': { symbol: '🐮', color: '#E74C3C', desc: '踏实勤奋，脚踏实地' },
  '虎': { symbol: '🐯', color: '#F39C12', desc: '勇敢自信，有领导力' },
  '兔': { symbol: '🐰', color: '#E91E63', desc: '温柔善良，细腻敏感' },
  '龙': { symbol: '🐉', color: '#3498DB', desc: '热情洋溢，气场强大' },
  '蛇': { symbol: '🐍', color: '#27AE60', desc: '智慧深沉，神秘莫测' },
  '马': { symbol: '🐴', color: '#E67E22', desc: '热情奔放，自由奔放' },
  '羊': { symbol: '🐑', color: '#ECF0F1', desc: '温和善良，有艺术气质' },
  '猴': { symbol: '🐵', color: '#F1C40F', desc: '聪明活泼，幽默风趣' },
  '鸡': { symbol: '🐔', color: '#E74C3C', desc: '勤劳准时，注重细节' },
  '狗': { symbol: '🐕', color: '#8E44AD', desc: '忠诚可靠，重情重义' },
  '猪': { symbol: '🐷', color: '#FF6B6B', desc: '真诚善良，热爱生活' },
}

export default function ZodiacYear() {
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))

  const getFortune = (zodiac) => {
    const hash = zodiac.charCodeAt(0) + dayOfYear
    const fortunes = [
      { type: '大吉', love: '98%', work: '95%', money: '92%', desc: '今年运势超旺，机遇连连！' },
      { type: '吉', love: '88%', work: '85%', money: '80%', desc: '运势不错，收获满满~' },
      { type: '中吉', love: '75%', work: '72%', money: '70%', desc: '平稳向上，值得期待' },
      { type: '小吉', love: '65%', work: '60%', money: '58%', desc: '保持节奏，好运自来' },
      { type: '平', love: '55%', work: '52%', money: '50%', desc: '平常心对待~' },
    ]
    return fortunes[hash % fortunes.length]
  }

  const handleSelect = (z) => {
    setSelected({ name: z, ...zodiacInfo[z], fortune: getFortune(z) })
    setShowResult(true)
  }

  return (
    <>
      {/* FAQ 结构化数据 */}
      <FAQSchema faqs={shengxiaoFAQs} />
      {/* RAG 优化结构化数据 */}
      <FortuneTellingSchema
        name="十二生肖运势查询"
        description="查看十二生肖运势，鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪各年份属相性格和运势。在线生肖运势查询免费看。"
        url="https://www.zkwatcher.top/shengxiao"
      />
      <PageContentSummary
        title="十二生肖运势查询"
        description="查看十二生肖运势，了解你的属相性格和今年运势。提供鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪生肖查询。"
        category="玄学命理"
        features={['十二生肖运势', '属相性格分析', '每年运势', '免费在线查询']}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">�十二生肖</h1>
          <p className="text-white/60">查询你的生肖运势</p>
        </header>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {zodiacYear.map((z) => (
            <button
              key={z}
              onClick={() => handleSelect(z)}
              className={`p-3 rounded-xl text-center transition-all ${
                selected?.name === z ? 'bg-white/30 ring-2 ring-yellow-400' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="text-2xl mb-1">{zodiacInfo[z].symbol}</div>
              <div className="text-white text-sm font-medium">{z}</div>
            </button>
          ))}
        </div>

        {showResult && selected && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-6">
            <div className="text-5xl mb-3">{selected.symbol}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{selected.name}年</h2>
            <p className="text-white/50 text-sm mb-4">{selected.desc}</p>

            <div className="text-3xl font-black text-yellow-400 mb-3">
              {selected.fortune.type}
            </div>
            <p className="text-white/70 mb-6">{selected.fortune.desc}</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-pink-500/20 rounded-xl p-3">
                <p className="text-pink-400 text-xs mb-1">爱情</p>
                <p className="text-white font-bold">{selected.fortune.love}</p>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-3">
                <p className="text-blue-400 text-xs mb-1">事业</p>
                <p className="text-white font-bold">{selected.fortune.work}</p>
              </div>
              <div className="bg-green-500/20 rounded-xl p-3">
                <p className="text-green-400 text-xs mb-1">财运</p>
                <p className="text-white font-bold">{selected.fortune.money}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <AdBanner className="mb-6" />
          <ShareButtons title="十二生肖运势 - 查询你的生肖今年运势" url="/shengxiao" />
        </div>

        {/* 相关推荐 - SEO 内部链接 */}
        <RelatedTools category="shengxiao" />

        <div className="mt-8 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">📜 十二生肖的起源</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              十二生肖，又称十二属相，是中国传统文化中用来代表年份的十二种动物，依次为鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪。十二生肖与十二地支相对应，分别为子鼠、丑牛、寅虎、卯兔、辰龙、巳蛇、午马、未羊、申猴、酉鸡、戌狗、亥猪。
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              关于十二生肖的起源，学界普遍认为其形成于先秦时期。1975年出土的云梦睡虎地秦简中已有关于十二生肖的记载，说明至少在战国晚期，十二生肖体系就已初步形成。东汉王充的《论衡》中首次完整记录了与今天相同的十二生肖顺序。
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              十二生肖的选择和排序有多种说法。民间流传最广的是"动物赛跑"传说：玉皇大帝举办动物渡河比赛，按到达顺序排列十二种动物。另一种说法认为生肖的排列与动物的活动时辰有关，如子时老鼠最活跃，丑时牛开始反刍等。
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              十二生肖文化不仅在中国广泛流传，还影响了日本、韩国、越南等东亚国家。每个生肖都被赋予了独特的性格特征和文化寓意，成为中国民俗文化中不可或缺的组成部分。每逢农历新年，当年的生肖动物都会成为节庆装饰和文化创作的主角。
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">🔮 生肖五行对照表</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              五行学说认为万物皆由金、木、水、火、土五种元素构成。十二生肖与五行有着密切的对应关系，不同年份出生的同一生肖因五行不同而性格各异。
            </p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { animals: '鼠、猪', element: '水', color: 'text-blue-400', desc: '水主智，聪明灵活，善于变通' },
                { animals: '虎、兔', element: '木', color: 'text-green-400', desc: '木主仁，温和善良，富有同情心' },
                { animals: '蛇、马', element: '火', color: 'text-red-400', desc: '火主礼，热情开朗，积极向上' },
                { animals: '猴、鸡', element: '金', color: 'text-yellow-400', desc: '金主义，果断刚毅，重视原则' },
                { animals: '牛、龙、羊、狗', element: '土', color: 'text-orange-400', desc: '土主信，踏实稳重，诚实守信' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                  <div className="text-center min-w-[48px]">
                    <div className={`${item.color} font-bold text-lg`}>{item.element}</div>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{item.animals}</div>
                    <div className="text-white/50 text-xs">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">💫 生肖相合与相冲</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              在传统命理学中，十二生肖之间存在相合、相冲、相害、相刑等关系。相合的生肖在一起被认为更加和谐，相冲的生肖则可能产生摩擦。以下是常见的生肖关系：
            </p>
            <div className="space-y-3">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <div className="text-green-400 font-bold text-sm mb-1">六合（最佳搭档）</div>
                <div className="text-white/70 text-xs">鼠牛合、虎猪合、兔狗合、龙鸡合、蛇猴合、马羊合</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                <div className="text-blue-400 font-bold text-sm mb-1">三合（和谐组合）</div>
                <div className="text-white/70 text-xs">猴鼠龙三合、虎马狗三合、蛇鸡牛三合、猪兔羊三合</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <div className="text-red-400 font-bold text-sm mb-1">六冲（需要磨合）</div>
                <div className="text-white/70 text-xs">鼠冲马、牛冲羊、虎冲猴、兔冲鸡、龙冲狗、蛇冲猪</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
                <div className="text-orange-400 font-bold text-sm mb-1">六害（需多注意）</div>
                <div className="text-white/70 text-xs">鼠羊害、牛马害、虎蛇害、兔龙害、猴猪害、鸡狗害</div>
              </div>
            </div>
            <p className="text-white/50 text-xs mt-3 text-center">以上关系仅供参考，人际关系的好坏主要取决于双方的沟通和理解</p>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
          <div className="space-y-4">
            {shengxiaoFAQs.map((faq, index) => (
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

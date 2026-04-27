'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import { AdBanner } from '../../components/Ads'
import RelatedTools from '../../components/RelatedTools'
import FAQSchema, { chouqianFAQs } from '../../components/FAQSchema'

const signs = [
  { id: 1, name: '上上签', level: '大吉', desc: '大吉大利，万事如意！', poem: '鱼龙变化跃天门，凤鸟来仪献瑞祥。' },
  { id: 2, name: '上签', level: '吉', desc: '运气不错，所求遂愿！', poem: '春风得意马蹄疾，一日看尽长安花。' },
  { id: 3, name: '中签', level: '平', desc: '平稳发展，需耐心等待！', poem: '行到水穷处，坐看云起时。' },
  { id: 4, name: '下签', level: '凶', desc: '需谨慎行事，三思后行！', poem: '山高水长路途远，小心使得万年船。' },
  { id: 5, name: '下下签', level: '凶', desc: '诸事不宜，静待时机！', poem: '屋漏偏逢连夜雨，船迟又遇打头风。' },
]

export default function ChouQian() {
  const [question, setQuestion] = useState('')
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState(null)

  const draw = () => {
    if (!question.trim()) {
      alert('请先输入你想问的事情~')
      return
    }
    if (isRolling) return

    setIsRolling(true)
    setResult(null)

    let count = 0
    const interval = setInterval(() => {
      setResult({ ...signs[count % 5], temp: true })
      count++
      if (count > 15) {
        clearInterval(interval)
        const finalSign = signs[Math.floor(Math.random() * 5)]
        setResult(finalSign)
        setIsRolling(false)
      }
    }, 100)
  }

  return (
    <>
      <FAQSchema faqs={chouqianFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🙏 在线抽签</h1>
          <p className="text-white/60">诚心抽签，问问菩萨怎么说</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="你想问什么？如：今天考试顺利吗"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-4"
          />
          <button
            onClick={draw}
            disabled={isRolling}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50"
          >
            {isRolling ? '🧘 诚心抽签中...' : '🙏 诚心抽签'}
          </button>
        </div>

        {result && !result.temp && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">{question}</h2>

            <div className={`text-4xl font-black mb-4 ${
              result.level === '大吉' ? 'text-yellow-400' :
              result.level === '吉' ? 'text-green-400' : 'text-red-400'
            }`}>
              {result.name}
            </div>
            <p className="text-white/70 mb-6">{result.desc}</p>

            <div className="bg-black/30 rounded-xl p-4 mb-6">
              <p className="text-yellow-300 font-medium italic">{result.poem}</p>
            </div>

            <p className="text-white/30 text-xs">
              诚心则灵，仅供娱乐
            </p>
          </div>
        )}

        <div className="mt-6">
          <AdBanner className="mb-6" />
          <ShareButtons title="在线抽签 - 观音灵签月老灵签" url="/chouqian" />
        </div>

        {/* 相关推荐 - SEO 内部链接 */}
        <RelatedTools category="chouqian" />

        <div className="mt-8 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">🙏 什么是抽签？</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              抽签，又称求签、占签，是中国传统民间信仰中一种常见的占卜方式。人们在寺庙或道观中，通过摇动签筒随机抽取一支竹签，根据签上的编号查阅对应的签诗，以此获得神明的指引和启示。
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              抽签的历史可以追溯到唐代，经过千余年的发展，已经成为中国民间文化的重要组成部分。签诗通常以诗歌的形式呈现，语言含蓄优美，寓意深远，需要结合具体问题来解读。
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              在传统观念中，抽签讲究"心诚则灵"。求签者需要在神明面前诚心祈祷，明确自己所问之事，然后通过摇签筒的方式让一支签自然掉落。整个过程强调的是内心的虔诚和对神明的敬畏。如今，数字化的在线抽签为这一传统习俗提供了新的体验方式。
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">📋 常见的签类型</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              中国民间流传着多种灵签体系，每种灵签都有其独特的文化背景和适用范围。以下是几种最为常见的灵签类型：
            </p>
            <div className="space-y-3">
              {[
                { name: '观音灵签', desc: '共有100支签，以观音菩萨的慈悲智慧为基础，适用于各种人生问题的求问，是最广泛使用的灵签之一。' },
                { name: '月老灵签', desc: '专用于求问姻缘感情，共有52支签。月老是中国神话中掌管婚姻的神明，月老灵签在单身求偶和感情问题上尤为流行。' },
                { name: '关帝灵签', desc: '共有100支签，以忠义之神关公为信仰基础，适合求问事业、财运和决策类问题，在商人中尤为盛行。' },
                { name: '妈祖灵签', desc: '共有60支签，源于海神妈祖信仰，在福建、台湾等沿海地区广泛流传，适合求问出行平安和家庭和睦。' },
                { name: '财神灵签', desc: '专用于求问财运和商业事务，反映了人们对财富的追求和对财神的信仰。' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3">
                  <div className="text-yellow-400 font-bold text-sm mb-1">{item.name}</div>
                  <div className="text-white/60 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">⚠️ 抽签的注意事项</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              虽然在线抽签以娱乐为主，但了解传统抽签的礼仪和注意事项，可以帮助您更好地体验这一传统文化：
            </p>
            <div className="space-y-2">
              {[
                '心诚则灵：抽签前先静下心来，明确自己想问的问题，保持诚恳的心态。',
                '一事一签：每次抽签只问一个问题，不要同时询问多件事情。',
                '同一件事不重复问：如果对结果不满意，不宜立即重新抽签，至少间隔一段时间。',
                '尊重结果：无论抽到好签还是坏签，都应以平常心对待，签文仅供参考。',
                '上上签要还愿：传统上如果抽到好签并实现了愿望，需要回到庙里还愿感恩。',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-white/5 rounded-xl p-3">
                  <span className="text-yellow-400 font-bold text-sm mt-0.5">{i + 1}.</span>
                  <span className="text-white/70 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
          <div className="space-y-4">
            {chouqianFAQs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
                <p className="text-white/50 text-xs">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

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

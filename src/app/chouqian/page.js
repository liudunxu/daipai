'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'

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
          <ShareButtons title="在线抽签 - 观音灵签月老灵签" url="/chouqian" />
        </div>

        <footer className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">
            ← 更多工具
          </a>
        </footer>
      </div>
    </div>
  )
}

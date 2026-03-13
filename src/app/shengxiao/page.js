'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'

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
          <ShareButtons title="十二生肖运势 - 查询你的生肖今年运势" url="/shengxiao" />
        </div>

        <footer className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">← 更多工具</a>
        </footer>
      </div>
    </div>
  )
}

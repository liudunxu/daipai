'use client'

import { useState } from 'react'

const zodiacs = [
  { name: '鼠', emoji: '🐭', color: 'from-gray-400 to-gray-600' },
  { name: '牛', emoji: '🐮', color: 'from-amber-600 to-yellow-600' },
  { name: '虎', emoji: '🐯', color: 'from-orange-500 to-red-500' },
  { name: '兔', emoji: '🐰', color: 'from-pink-400 to-rose-400' },
  { name: '龙', emoji: '🐲', color: 'from-purple-500 to-indigo-500' },
  { name: '蛇', emoji: '🐍', color: 'from-green-500 to-emerald-600' },
  { name: '马', emoji: '🐴', color: 'from-amber-500 to-orange-500' },
  { name: '羊', emoji: '🐑', color: 'from-stone-400 to-neutral-500' },
  { name: '猴', emoji: '🐵', color: 'from-yellow-500 to-amber-600' },
  { name: '鸡', emoji: '🐔', color: 'from-yellow-300 to-orange-400' },
  { name: '狗', emoji: '🐕', color: 'from-brown-500 to-amber-700' },
  { name: '猪', emoji: '🐷', from: 'from-pink-400 to-rose-500' },
]

const fortunes = [
  '大吉', '中吉', '小吉', '吉', '末吉', '凶', '大凶'
]

export default function LuckyPage() {
  const [birthday, setBirthday] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!birthday) return
    const hash = birthday.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    const zodiac = zodiacs[hash % 12]
    const fortune = fortunes[hash % fortunes.length]
    const love = Math.floor(Math.random() * 100)
    const money = Math.floor(Math.random() * 100)
    const work = Math.floor(Math.random() * 100)
    setResult({ zodiac, fortune, love, money, work })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🔮 2026年运势测算</h1>
          <p className="text-white/60">输入生日，测测你的新年运势</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <label className="text-white/80 block mb-2">输入你的生日</label>
          <input
            type="text"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="如: 19900101"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white mb-4"
          />
          <button
            onClick={calculate}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl"
          >
            ✨ 开始测算
          </button>
        </div>

        {result && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className={`text-6xl mb-4 ${result.zodiac.color ? '' : ''}`}>
              {result.zodiac.emoji}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">属{result.zodiac.name}的你</h2>
            <p className={`text-3xl font-black mb-6 ${
              result.fortune === '大吉' ? 'text-yellow-400' :
              result.fortune.includes('吉') ? 'text-green-400' : 'text-red-400'
            }`}>
              {result.fortune}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/60 text-xs">爱情运</p>
                <p className="text-pink-400 font-bold">{result.love}%</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/60 text-xs">财运</p>
                <p className="text-yellow-400 font-bold">{result.money}%</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/60 text-xs">事业运</p>
                <p className="text-blue-400 font-bold">{result.work}%</p>
              </div>
            </div>

            <p className="text-white/50 text-sm">
              本测算仅供娱乐，仅供娱乐，仅供娱乐
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

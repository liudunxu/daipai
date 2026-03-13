'use client'

import { useState } from 'react'
import ShareButtons from '../../../components/ShareButtons'

const zodiacSigns = [
  { name: '白羊座', dates: '3.21-4.19', symbol: '♈', element: '火', color: '#FF6B6B' },
  { name: '金牛座', dates: '4.20-5.20', symbol: '♉', element: '土', color: '#4ECDC4' },
  { name: '双子座', dates: '5.21-6.21', symbol: '♊', element: '风', color: '#45B7D1' },
  { name: '巨蟹座', dates: '6.22-7.22', symbol: '♋', element: '水', color: '#96CEB4' },
  { name: '狮子座', dates: '7.23-8.22', symbol: '♌', element: '火', color: '#FFEAA7' },
  { name: '处女座', dates: '8.23-9.22', symbol: '♍', element: '土', color: '#DDA0DD' },
  { name: '天秤座', dates: '9.23-10.23', symbol: '♎', element: '风', color: '#98D8C8' },
  { name: '天蝎座', dates: '10.24-11.22', symbol: '♏', element: '水', color: '#F7DC6F' },
  { name: '射手座', dates: '11.23-12.21', symbol: '♐', element: '火', color: '#BB8FCE' },
  { name: '摩羯座', dates: '12.22-1.19', symbol: '♑', element: '土', color: '#85C1E9' },
  { name: '水瓶座', dates: '1.20-2.18', symbol: '♒', element: '风', color: '#F8B500' },
  { name: '双鱼座', dates: '2.19-3.20', symbol: '♓', element: '水', color: '#F5B7B1' },
]

export default function Constellation() {
  const [selectedSign, setSelectedSign] = useState(null)

  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))

  const getFortune = (sign) => {
    const hash = sign.name.charCodeAt(0) + sign.name.charCodeAt(1) + dayOfYear
    const fortunes = [
      { type: '大吉', desc: '运势超旺，适合表白、签约、投资！', love: '95%', work: '90%', money: '88%' },
      { type: '吉', desc: '运气不错，把握机会会有惊喜！', love: '85%', work: '80%', money: '75%' },
      { type: '小吉', desc: '平稳向上，保持节奏别着急~', love: '70%', work: '72%', money: '68%' },
      { type: '一般', desc: '平常心对待，别期望太高', love: '60%', work: '58%', money: '55%' },
      { type: '注意', desc: '谨慎行事，避免冲动', love: '45%', work: '50%', money: '42%' },
    ]
    return fortunes[hash % fortunes.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">✨ 星座运势</h1>
          <p className="text-white/60">12星座今日运势查询</p>
        </header>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {zodiacSigns.map((sign) => (
            <button
              key={sign.name}
              onClick={() => setSelectedSign({ ...sign, fortune: getFortune(sign) })}
              className={`p-3 rounded-xl text-center transition-all ${
                selectedSign?.name === sign.name
                  ? 'bg-white/30 ring-2 ring-yellow-400'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="text-2xl mb-1">{sign.symbol}</div>
              <div className="text-white text-xs font-medium">{sign.name}</div>
            </button>
          ))}
        </div>

        {selectedSign && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-6">
            <div className="text-4xl mb-2">{selectedSign.symbol}</div>
            <h2 className="text-2xl font-bold text-white mb-1">{selectedSign.name}</h2>
            <p className="text-white/50 text-sm mb-4">{selectedSign.dates} · {selectedSign.element}象</p>

            <div className="text-3xl font-black text-yellow-400 mb-3">
              {selectedSign.fortune.type}
            </div>
            <p className="text-white/70 mb-6">{selectedSign.fortune.desc}</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-pink-500/20 rounded-xl p-3">
                <p className="text-pink-400 text-xs mb-1">爱情</p>
                <p className="text-white font-bold">{selectedSign.fortune.love}</p>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-3">
                <p className="text-blue-400 text-xs mb-1">事业</p>
                <p className="text-white font-bold">{selectedSign.fortune.work}</p>
              </div>
              <div className="bg-green-500/20 rounded-xl p-3">
                <p className="text-green-400 text-xs mb-1">财运</p>
                <p className="text-white font-bold">{selectedSign.fortune.money}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <ShareButtons title="星座运势 - 12星座今日运势查询" url="/xingzuo" />
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

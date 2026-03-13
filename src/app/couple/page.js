'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import { AdBanner } from '../../components/Ads'

const coupleStyles = [
  { id: 1, name: '浪漫韩系', emoji: '💕', bg: 'from-pink-500 to-rose-500' },
  { id: 2, name: '简约北欧', emoji: '🧸', bg: 'from-blue-400 to-cyan-300' },
  { id: 3, name: '动漫卡通', emoji: '🎀', bg: 'from-purple-500 to-pink-400' },
  { id: 4, name: '复古胶片', emoji: '📷', bg: 'from-amber-500 to-orange-400' },
  { id: 5, name: '清新田园', emoji: '🌸', bg: 'from-green-400 to-emerald-300' },
  { id: 6, name: '酷炫街头', emoji: '🔥', bg: 'from-gray-700 to-gray-900' },
]

const quotes = [
  '最好的爱情',
  '余生请多指教',
  '命中注定',
  '你是我的唯一',
  '陪伴是最长情的告白',
  '双向奔赴',
  '从校服到婚纱',
  '永远在一起',
  ' Sweet Love',
  'Love You',
]

export default function CoupleAvatar() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(1)
  const [result, setResult] = useState(null)

  const generate = () => {
    if (!name1.trim() || !name2.trim()) {
      alert('请输入两个人名字~')
      return
    }

    const style = coupleStyles.find(s => s.id === selectedStyle)
    const hash = name1.length + name2.length + name1.charCodeAt(0) + name2.charCodeAt(0)
    const quote = quotes[hash % quotes.length]

    setResult({
      style,
      quote,
      names: `${name1} & ${name2}`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">💑 情侣头像</h1>
          <p className="text-white/60">生成专属情侣头像</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <input
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="你的名字"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-4"
          />
          <div className="text-center text-white/40 mb-4">+</div>
          <input
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="TA的名字"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-4"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-white/60 text-sm mb-3">选择风格</p>
          <div className="grid grid-cols-3 gap-3">
            {coupleStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 rounded-xl text-center transition-all ${
                  selectedStyle === style.id ? 'bg-white/30 ring-2 ring-pink-400' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <div className="text-2xl mb-1">{style.emoji}</div>
                <div className="text-white text-xs">{style.name}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl mb-6"
        >
          💕 生成情侣头像
        </button>

        {result && (
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-center mb-6">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">{result.style.emoji}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{result.names}</h2>
            <p className="text-white/80 text-lg mb-4">{result.quote}</p>
            <p className="text-white/50 text-xs">长按保存图片</p>
          </div>
        )}

        <div className="mt-6">
          <AdBanner className="mb-6" />
          <ShareButtons title="情侣头像生成 - 专属情侣头像" url="/couple" />
        </div>

        <footer className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">← 更多工具</a>
        </footer>
      </div>
    </div>
  )
}

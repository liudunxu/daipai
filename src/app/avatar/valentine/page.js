'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

const colors = [
  { name: '玫瑰红', value: '#ef4444', gradient: 'from-red-500 to-pink-500' },
  { name: '恋爱粉', value: '#f472b6', gradient: 'from-pink-400 to-rose-400' },
  { name: '甜蜜紫', value: '#a855f7', gradient: 'from-purple-500 to-pink-500' },
  { name: '爱心红', value: '#dc2626', gradient: 'from-red-600 to-red-400' },
]

export default function ValentineAvatar() {
  const [text, setText] = useState('我爱你')
  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const avatarRef = useRef(null)

  const displayText = name ? `${text} ${name}` : text

  const handleDownload = async () => {
    if (!avatarRef.current || isGenerating) return
    setIsGenerating(true)
    try {
      const canvas = await html2canvas(avatarRef.current, { backgroundColor: null, scale: 2 })
      const link = document.createElement('a')
      link.download = `情人节头像_${displayText}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      alert('生成失败')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <a href="/avatar" className="text-white/60 hover:text-white mb-4 block">← 返回节日头像</a>
          <h1 className="text-3xl font-black text-white mb-2">💕 情人节头像生成器</h1>
          <p className="text-white/60">生成浪漫情人节头像</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <label className="text-white/80 text-sm font-medium block mb-2">想说的话</label>
            <select
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
            >
              <option value="我爱你">我爱你</option>
              <option value="love">love</option>
              <option value="么么哒">么么哒</option>
              <option value="在一起">在一起</option>
              <option value="永远">永远爱你</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-white/80 text-sm font-medium block mb-2">TA的名字（可选）</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 6))}
              placeholder="输入TA的名字"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`p-2 rounded-lg border-2 ${selectedColor.name === c.name ? 'border-white' : 'border-transparent'}`}
              >
                <div className={`h-8 rounded-lg bg-gradient-to-r ${c.gradient}`}></div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-6">
          <div
            ref={avatarRef}
            className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${selectedColor.value}dd, ${selectedColor.value}88)` }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-4xl mb-2">💕</span>
              <p className="text-white font-black text-xl text-center px-2">{displayText}</p>
            </div>
          </div>
        </div>

        <button onClick={handleDownload} disabled={isGenerating} className="w-full py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-xl">
          {isGenerating ? '生成中...' : '📥 保存头像'}
        </button>
      </div>
    </div>
  )
}

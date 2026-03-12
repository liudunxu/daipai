'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

const colors = [
  { name: '梦幻粉', value: '#ec4899', gradient: 'from-pink-500 to-rose-500' },
  { name: '浪漫紫', value: '#8b5cf6', gradient: 'from-purple-500 to-pink-500' },
  { name: '星空蓝', value: '#3b82f6', gradient: 'from-blue-500 to-indigo-500' },
  { name: '阳光金', value: '#f59e0b', gradient: 'from-yellow-500 to-orange-500' },
  { name: '森林绿', value: '#10b981', gradient: 'from-green-500 to-emerald-500' },
  { name: '奶咖色', value: '#a8a29e', gradient: 'from-stone-400 to-neutral-500' },
]

export default function BirthdayAvatar() {
  const [text, setText] = useState('生日快乐')
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const avatarRef = useRef(null)

  const handleDownload = async () => {
    if (!avatarRef.current || isGenerating) return
    setIsGenerating(true)
    try {
      const canvas = await html2canvas(avatarRef.current, { backgroundColor: null, scale: 2 })
      const link = document.createElement('a')
      link.download = `生日头像_${text}.png`
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
          <h1 className="text-3xl font-black text-white mb-2">🎂 生日头像生成器</h1>
          <p className="text-white/60">生成专属生日祝福头像</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <label className="text-white/80 text-sm font-medium block mb-2">输入文字</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 8))}
              placeholder="生日快乐"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`p-3 rounded-xl border-2 ${selectedColor.name === c.name ? 'border-white' : 'border-transparent'}`}
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
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="absolute top-2 text-2xl">🎂</div>
              <div className="absolute bottom-4 text-xl">🎉</div>
              <p className="text-white font-black text-2xl text-center">{text}</p>
            </div>
          </div>
        </div>

        <button onClick={handleDownload} disabled={isGenerating} className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl">
          {isGenerating ? '生成中...' : '📥 保存头像'}
        </button>
      </div>
    </div>
  )
}

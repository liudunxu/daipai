'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

const colors = [
  { name: '月光蓝', value: '#3b82f6', gradient: 'from-blue-500 to-cyan-500' },
  { name: '温暖橙', value: '#f59e0b', gradient: 'from-orange-500 to-yellow-500' },
  { name: '浪漫粉', value: '#ec4899', gradient: 'from-pink-500 to-rose-500' },
  { name: '清新绿', value: '#10b981', gradient: 'from-green-500 to-emerald-500' },
  { name: '神秘紫', value: '#8b5cf6', gradient: 'from-purple-500 to-violet-500' },
  { name: '纯洁白', value: '#94a3b8', gradient: 'from-gray-400 to-slate-500' },
]

export default function MidAutumnAvatar() {
  const [text, setText] = useState('中秋快乐')
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const avatarRef = useRef(null)

  const handleDownload = async () => {
    if (!avatarRef.current || isGenerating) return
    setIsGenerating(true)
    try {
      const canvas = await html2canvas(avatarRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      })
      const link = document.createElement('a')
      link.download = `中秋头像_${text}_${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('生成失败:', error)
      alert('生成失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <a href="/avatar" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4">
            ← 返回节日头像
          </a>
          <h1 className="text-3xl font-black text-white mb-2">
            🌙 中秋头像生成器
          </h1>
          <p className="text-white/60">
            生成专属中秋祝福头像
          </p>
        </header>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <label className="text-white/80 text-sm font-medium block mb-2">输入文字</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 8))}
              placeholder="中秋快乐"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white/80 text-sm font-medium block mb-2">选择颜色</label>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedColor.name === color.name ? 'border-white scale-105' : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <div className={`h-8 rounded-lg bg-gradient-to-r ${color.gradient}`}></div>
                  <p className="text-white/70 text-xs mt-1">{color.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div
            ref={avatarRef}
            className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${selectedColor.value}dd, ${selectedColor.value}88)`,
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="absolute top-2 left-2 text-2xl">🌙</div>
              <div className="absolute top-2 right-2 text-2xl">⭐</div>
              <div className="absolute bottom-4 left-4 text-xl">🥮</div>
              <div className="absolute bottom-4 right-4 text-xl">🐇</div>
              <p className="text-white font-black text-2xl text-center drop-shadow-lg">{text}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          {isGenerating ? '⏳ 生成中...' : '📥 保存头像'}
        </button>

        <footer className="text-center py-6 mt-8">
          <p className="text-white/30 text-sm">
            <a href="/avatar/lunar-new-year" className="text-yellow-400 hover:underline">春节</a> ·
            <a href="/avatar/national-day" className="text-red-400 hover:underline">国庆</a> ·
            <a href="/avatar/birthday" className="text-pink-400 hover:underline">生日</a>
          </p>
        </footer>
      </div>
    </div>
  )
}

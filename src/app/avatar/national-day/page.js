'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

const colors = [
  { name: '中国红', value: '#dc2626', gradient: 'from-red-600 to-yellow-500' },
  { name: '金秋黄', value: '#f59e0b', gradient: 'from-yellow-500 to-orange-500' },
  { name: '天空蓝', value: '#0ea5e9', gradient: 'from-sky-500 to-blue-500' },
  { name: '军装绿', value: '#15803d', gradient: 'from-green-600 to-emerald-600' },
]

export default function NationalDayAvatar() {
  const [text, setText] = useState('我爱中国')
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
      })
      const link = document.createElement('a')
      link.download = `国庆头像_${text}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      alert('生成失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <a href="/avatar" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4">← 返回节日头像</a>
          <h1 className="text-3xl font-black text-white mb-2">🇨🇳 国庆头像生成器</h1>
          <p className="text-white/60">生成专属国庆祝福头像</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <label className="text-white/80 text-sm font-medium block mb-2">输入文字</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 8))}
              placeholder="我爱中国"
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
              <span className="text-4xl mb-2">🇨🇳</span>
              <p className="text-white font-black text-xl text-center px-4">{text}</p>
            </div>
          </div>
        </div>

        <button onClick={handleDownload} disabled={isGenerating} className="w-full py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-xl">
          {isGenerating ? '生成中...' : '📥 保存头像'}
        </button>

        <footer className="text-center py-6 mt-8">
          <p className="text-white/30 text-sm">
            <a href="/avatar/lunar-new-year" className="text-yellow-400">春节</a> · <a href="/avatar/mid-autumn" className="text-blue-400">中秋</a>
          </p>
        </footer>
      </div>
    </div>
  )
}

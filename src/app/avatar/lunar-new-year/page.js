'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

const colors = [
  { name: '喜庆红', value: '#ef4444', gradient: 'from-red-500 to-orange-500' },
  { name: '富贵金', value: '#f59e0b', gradient: 'from-yellow-500 to-amber-500' },
  { name: '祥云蓝', value: '#3b82f6', gradient: 'from-blue-500 to-cyan-500' },
  { name: '福气紫', value: '#8b5cf6', gradient: 'from-purple-500 to-pink-500' },
  { name: '生机绿', value: '#10b981', gradient: 'from-green-500 to-emerald-500' },
  { name: '浪漫粉', value: '#ec4899', gradient: 'from-pink-500 to-rose-500' },
]

export default function LunarNewYearAvatar() {
  const [text, setText] = useState('恭喜发财')
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
      link.download = `春节头像_${text}_${Date.now()}.png`
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
        {/* 头部 */}
        <header className="text-center mb-8">
          <a href="/avatar" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4">
            ← 返回节日头像
          </a>
          <h1 className="text-3xl font-black text-white mb-2">
            🧧 春节头像生成器
          </h1>
          <p className="text-white/60">
            生成专属春节祝福头像
          </p>
        </header>

        {/* 输入区域 */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <label className="text-white/80 text-sm font-medium block mb-2">输入文字</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 8))}
              placeholder="恭喜发财"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-red-500"
            />
            <p className="text-white/40 text-xs mt-1">限8字以内</p>
          </div>

          <div className="mb-4">
            <label className="text-white/80 text-sm font-medium block mb-2">选择颜色</label>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedColor.name === color.name
                      ? 'border-white scale-105'
                      : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <div className={`h-8 rounded-lg bg-gradient-to-r ${color.gradient}`}></div>
                  <p className="text-white/70 text-xs mt-1">{color.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 预览区域 */}
        <div className="text-center mb-6">
          <p className="text-white/60 text-sm mb-4">预览效果</p>

          {/* 头像预览 */}
          <div
            ref={avatarRef}
            className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${selectedColor.value}dd, ${selectedColor.value}88)`,
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              {/* 装饰图案 */}
              <div className="absolute top-2 left-2 text-2xl">🧧</div>
              <div className="absolute top-2 right-2 text-2xl">✨</div>
              <div className="absolute bottom-4 left-4 text-xl">🎊</div>
              <div className="absolute bottom-4 right-4 text-xl">🧨</div>

              {/* 主文字 */}
              <p className="text-white font-black text-2xl text-center drop-shadow-lg">
                {text}
              </p>
            </div>
          </div>
        </div>

        {/* 下载按钮 */}
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          {isGenerating ? '⏳ 生成中...' : '📥 保存头像'}
        </button>

        {/* 使用提示 */}
        <p className="text-white/40 text-center text-xs mt-4">
          长按保存的图片，设为微信/QQ头像
        </p>

        {/* 底部 */}
        <footer className="text-center py-6 border-t border-white/10 mt-8">
          <p className="text-white/30 text-sm">
            更多节日头像：<a href="/avatar/mid-autumn" className="text-red-400 hover:underline">中秋</a>、
            <a href="/avatar/national-day" className="text-red-400 hover:underline">国庆</a>、
            <a href="/avatar/valentine" className="text-red-400 hover:underline">情人节</a>
          </p>
        </footer>
      </div>
    </div>
  )
}

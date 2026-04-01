'use client'

import { useState, useRef } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'

const cakeColors = [
  { name: '粉色浪漫', bg: 'from-pink-400 to-rose-400', candle: 'pink' },
  { name: '蓝色星空', bg: 'from-blue-400 to-indigo-400', candle: 'blue' },
  { name: '紫色梦幻', bg: 'from-purple-400 to-violet-400', candle: 'purple' },
  { name: '金色祝福', bg: 'from-yellow-400 to-amber-400', candle: 'gold' },
  { name: '绿色清新', bg: 'from-green-400 to-emerald-400', candle: 'green' },
  { name: '红色热情', bg: 'from-red-400 to-orange-400', candle: 'red' },
]

const wishes = [
  '生日快乐！',
  'Happy Birthday!',
  '福如东海，寿比南山',
  '岁岁平安',
  '心想事成',
  '万事如意',
  '天天开心',
  '事业有成',
]

export default function CakePage() {
  const [name, setName] = useState('')
  const [wish, setWish] = useState('生日快乐！')
  const [colorIndex, setColorIndex] = useState(0)
  const [candles, setCandles] = useState(1)
  const cakeRef = useRef(null)

  const color = cakeColors[colorIndex]

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">🎂 生日蛋糕许愿</h1>
            <p className="text-white/60">生成精美生日蛋糕，送祝福</p>
          </header>

          {/* 输入区域 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-sm">生日祝福语</label>
                <input
                  type="text"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="输入祝福语"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="text-white/60 text-sm">选择蛋糕样式</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {cakeColors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setColorIndex(i)}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        colorIndex === i
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-white/60 text-sm">蜡烛数量: {candles}</label>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={candles}
                  onChange={(e) => setCandles(parseInt(e.target.value))}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>

          {/* 蛋糕预览 */}
          <div
            ref={cakeRef}
            className={`bg-gradient-to-br ${color.bg} rounded-2xl p-8 mb-6 text-center relative overflow-hidden`}
          >
            {/* 蛋糕装饰 */}
            <div className="text-8xl mb-4">🎂</div>

            {/* 蜡烛 */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: candles }).map((_, i) => (
                <div key={i} className="relative">
                  <span className="text-3xl animate-pulse">🕯️</span>
                </div>
              ))}
            </div>

            {/* 祝福语 */}
            <div className="bg-white/90 rounded-xl px-6 py-3 mb-4 inline-block">
              <p className="text-black font-bold text-lg">{wish || '生日快乐！'}</p>
            </div>

            {/* 蜡烛火焰动画 */}
            <div className="absolute top-4 right-4 text-2xl animate-pulse">✨</div>
            <div className="absolute top-8 left-4 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
          </div>

          {/* 提示 */}
          <p className="text-white/50 text-sm text-center mb-4">
            📸 截图保存蛋糕图片，分享给朋友！
          </p>

          <RelatedTools category="cake" />

          <ShareButtons title="生日蛋糕许愿 - 生成你的生日祝福" url="/cake" />

          <footer className="mt-8 text-center">
            <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">
              ← 更多工具
            </a>
          </footer>
        </div>
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'

const festivals = {
  'spring': { name: '春节', emoji: '🧧', topics: ['新年快乐', '恭喜发财', '龙年大吉', '万事如意'] },
  'latern': { name: '元宵节', emoji: '🏮', topics: ['团团圆圆', '元宵节快乐', '花好月圆'] },
  'qingming': { name: '清明节', emoji: '🌿', topics: ['清明时节', '思念故人', '缅怀先人'] },
  'labor': { name: '劳动节', emoji: '💪', topics: ['劳动最光荣', '节日快乐', '辛苦了'] },
  'dragon': { name: '端午节', emoji: '🐉', topics: ['端午安康', '粽香万里', '幸福安康'] },
  'midAutumn': { name: '中秋节', emoji: '🌙', topics: ['中秋快乐', '花好月圆', '阖家团圆'] },
  'national': { name: '国庆节', emoji: '🇨🇳', topics: ['祖国万岁', '国庆快乐', '繁荣昌盛'] },
  'newYear': { name: '元旦', emoji: '🎊', topics: ['新年快乐', '元旦快乐', '喜迎新年'] },
  'valentine': { name: '情人节', emoji: '💕', topics: ['情人节快乐', '我爱你', '永远在一起'] },
  'mothers': { name: '母亲节', emoji: '🌸', topics: ['妈妈辛苦了', '我爱妈妈', '永远年轻'] },
  'fathers': { name: '父亲节', emoji: '🎉', topics: ['爸爸辛苦了', '我爱爸爸', '健康长寿'] },
  'christmas': { name: '圣诞节', emoji: '🎄', topics: ['圣诞快乐', 'Merry Christmas', '节日快乐'] },
}

const styles = [
  { name: '传统祝福', prefix: '恭祝', suffix: '，祝您万事如意！' },
  { name: '文艺祝福', prefix: '愿', suffix: '，岁月静好，现世安稳。' },
  { name: '幽默祝福', prefix: '听说', suffix: '，还不快去查收你的祝福！' },
  { name: '温馨祝福', prefix: '亲爱的', suffix: '，愿你每天都有好心情！' },
  { name: '大气祝福', prefix: '衷心祝愿', suffix: '，前程似锦，鹏程万里！' },
  { name: '甜美祝福', prefix: '愿', suffix: '，甜蜜如初，幸福永远！' },
]

export default function BlessingPage() {
  const [selectedFestival, setSelectedFestival] = useState('spring')
  const [customText, setCustomText] = useState('')
  const [generated, setGenerated] = useState([])
  const [copied, setCopied] = useState(false)

  const generateBlessings = () => {
    const festival = festivals[selectedFestival]
    const results = []

    // 基于选择的主题生成祝福语
    styles.forEach((style) => {
      festival.topics.forEach((topic) => {
        const text = style.prefix + topic + style.suffix
        results.push(text)
      })
    })

    // 添加自定义祝福
    if (customText) {
      results.push(`🎉 ${customText} 🎉`)
      results.push(`✨ 送上最真挚的祝福：${customText} ✨`)
    }

    // 去重并随机打乱
    const unique = [...new Set(results)]
    setGenerated(unique.slice(0, 12))
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('复制失败，请重试')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            🎊 节日祝福语生成器
          </h1>
          <p className="text-white/60">
            一键生成精美祝福语，复制发送给朋友
          </p>
        </header>

        {/* 节日选择 */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-4">🎉 选择节日</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {Object.entries(festivals).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedFestival(key)}
                className={`p-3 rounded-xl text-center transition-all ${
                  selectedFestival === key
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <span className="text-xl block mb-1">{value.emoji}</span>
                <span className="text-xs">{value.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 自定义输入 */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-4">✏️ 自定义祝福（可选）</h3>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value.slice(0, 20))}
            placeholder="输入你想说的话..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* 生成按钮 */}
        <button
          onClick={generateBlessings}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform mb-8"
        >
          ✨ 生成祝福语
        </button>

        {/* 生成结果 */}
        {generated.length > 0 && (
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">📝 生成的祝福语</h3>
              <button
                onClick={() => copyToClipboard(generated.join('\n'))}
                className="text-sm text-green-400 hover:text-green-300"
              >
                {copied ? '✅ 已复制' : '📋 复制全部'}
              </button>
            </div>
            {generated.map((text, idx) => (
              <div
                key={idx}
                onClick={() => copyToClipboard(text)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 cursor-pointer transition-colors group"
              >
                <p className="text-white group-hover:text-green-300 transition-colors">{text}</p>
              </div>
            ))}
          </div>
        )}

        {/* 底部 */}
        <footer className="text-center py-6 border-t border-white/10">
          <p className="text-white/30 text-sm">
            节日祝福语生成器 · 原创祝福 · 与众不同
          </p>
        </footer>
      </div>
    </div>
  )
}

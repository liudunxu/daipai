'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import { AdBanner } from '../../components/Ads'
import FAQSchema, { fortuneFAQs } from '../../components/FAQSchema'

export default function TodayLucky() {
  const [name, setName] = useState('')
  const [result, setResult] = useState(null)

  const fortunes = [
    { type: '大吉', color: 'text-yellow-400', desc: '今天运气超好做任何事都顺！' },
    { type: '吉', color: 'text-green-400', desc: '运气不错，适合主动出击！' },
    { type: '小吉', color: 'text-green-300', desc: '平稳的一天，小收获可以有！' },
    { type: '一般', color: 'text-gray-400', desc: '平常心对待就好~' },
    { type: '凶', color: 'text-orange-400', desc: '小心谨慎，低调行事' },
    { type: '大凶', color: 'text-red-400', desc: '今天还是在家宅着吧...' },
  ]

  const calculate = () => {
    if (!name.trim()) {
      alert('请输入你的名字~')
      return
    }
    const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    const hour = new Date().getHours()
    const fortune = fortunes[(hash + hour) % fortunes.length]

    setResult({
      name,
      fortune,
      luckyNumber: (hash % 100) + 1,
      luckyColor: ['红色', '蓝色', '绿色', '黄色', '紫色', '白色'][hash % 6],
      luckyFood: ['火锅', '烧烤', '炸鸡', '奶茶', '寿司', '粤菜'][hash % 6],
    })
  }

  return (
    <>
      <FAQSchema faqs={fortuneFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🎯 今日运势</h1>
          <p className="text-white/60">输入名字，测测今天的运气</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入你的名字"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-4"
          />
          <button
            onClick={calculate}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl"
          >
            ✨ 测一测今日运势
          </button>
        </div>

        {result && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{result.name} 今日运势</h2>

            <div className={`text-4xl font-black mb-4 ${result.fortune.color}`}>
              {result.fortune.type}
            </div>

            <p className="text-white/70 mb-6">{result.fortune.desc}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs">幸运数字</p>
                <p className="text-white font-bold">{result.luckyNumber}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs">幸运颜色</p>
                <p className="text-white font-bold">{result.luckyColor}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs">幸运美食</p>
                <p className="text-white font-bold">{result.luckyFood}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs">今日宜</p>
                <p className="text-white font-bold">分享链接</p>
              </div>
            </div>

            <p className="text-white/30 text-xs">
              纯属娱乐，仅供消遣
            </p>
          </div>
        )}

        <div className="mt-6">
          <AdBanner className="mb-6" />
          <ShareButtons title="今日运势 - 测测你今天的运气如何" url="/today" />
        </div>

        {/* 常见问题 - Google SEO 要求内容必须可见 */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
          <div className="space-y-4">
            {fortuneFAQs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
                <p className="text-white/50 text-xs">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

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

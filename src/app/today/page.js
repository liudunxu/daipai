'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import { AdBanner } from '../../components/Ads'
import FAQSchema, { fortuneFAQs } from '../../components/FAQSchema'
import RelatedTools from '../../components/RelatedTools'

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

        <div className="mt-8 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">🎯 如何查看今日运势？</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              今日运势是一种基于姓名和日期的趣味测试，通过特定的算法将姓名笔画与当日天干地支相结合，生成每日的运势参考。查看今日运势的方法非常简单：只需输入您的名字，系统就会为您计算今日的整体运势指数。
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              运势结果通常包括整体运势等级（大吉、吉、小吉、一般、凶、大凶），以及幸运数字、幸运颜色、幸运美食等趣味参考。这些元素综合起来，为您提供一天的趣味指引。
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              需要注意的是，今日运势仅供娱乐消遣，不具备科学依据。它更多的是一种文化体验和心理暗示，帮助您以积极的心态开始新的一天。无论运势如何，保持乐观向上的心态才是最重要的。
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">📊 运势参考指南</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              每日运势通常会从多个维度为您提供参考。了解每个维度的含义，可以帮助您更好地规划一天的安排：
            </p>
            <div className="space-y-3">
              {[
                { icon: '❤️', title: '爱情运势', desc: '反映当天的感情状态和桃花运。运势好的日子适合表白、约会或处理感情问题；运势一般时则建议多给彼此空间。' },
                { icon: '💼', title: '事业运势', desc: '反映当天的工作状态和职场机遇。运势旺盛时适合推进重要项目或提出新方案；运势一般时建议做好日常事务。' },
                { icon: '💰', title: '财运指数', desc: '反映当天的财富机遇。财运好的日子适合投资理财或开展新的商业合作；财运一般时则建议保守理财。' },
                { icon: '🍀', title: '幸运元素', desc: '包括幸运数字、幸运颜色和幸运美食等。这些元素可以作为一天的小参考，增添生活的仪式感和趣味性。' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm">{item.title}</div>
                    <div className="text-white/60 text-xs">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

        {/* 相关推荐 - SEO 内部链接 */}
        <RelatedTools category="today" />

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

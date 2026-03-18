'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import FAQSchema, { baziFAQs } from '../../components/FAQSchema'

const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const wuxing = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']

const baziDesc = {
  '甲子的': '聪明好学，自信要强，有领导能力，适合创业发展。',
  '乙丑的': '温柔内向，为人实在，有耐心，适合稳定工作。',
  '丙寅的': '热情开朗，精力充沛，适合社交和营销工作。',
  '丁卯的': '细腻敏感，有艺术天赋，适合创意行业。',
  '戊辰的': '稳重踏实，诚信可靠，适合管理岗位。',
  '己巳的': '聪明机智，灵活变通，适合金融和技术工作。',
  '庚午的': '正义感强，果断勇敢，适合法律和执法工作。',
  '辛未的': '温和大方，重情重义，适合教育和公益工作。',
  '壬申的': '思维敏捷，口才优秀，适合媒体和公关工作。',
  '癸酉的': '温柔体贴，心思细腻，适合服务和医疗工作。',
}

function getBazi(year, month, day, hour) {
  // 简化版八字计算（仅供娱乐）
  const yearIndex = (year - 1900) % 10
  const monthIndex = (month + year) % 10
  const dayIndex = (day * 2 + month) % 10
  const hourIndex = (hour + day) % 12

  const gan = tiangan[dayIndex]
  const zhi = dizhi[hourIndex]
  const wux = wuxing[dayIndex]

  return { gan, zhi, wux }
}

// Pre-computed date arrays
const years = Array.from({ length: 100 }, (_, i) => 1950 + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const hours = Array.from({ length: 24 }, (_, i) => i)

// Pre-defined wuxing analysis
const wuxingAnalysis = {
  '木': '你属木，木主仁，个性温和善良，有生发之气。',
  '火': '你属火，火主礼，热情开朗，精力充沛。',
  '土': '你属土，土主信，为人稳重，诚实可靠。',
  '金': '你属金，金主义，性格刚毅，有决断力。',
  '水': '你属水，水主智，聪明灵活，富有创造力。',
}

export default function BaziPage() {
  const [birth, setBirth] = useState({ year: 2000, month: 1, day: 1, hour: 12 })
  const [result, setResult] = useState(null)

  const calculate = () => {
    const bazi = getBazi(birth.year, birth.month, birth.day, birth.hour)
    const key = `${bazi.gan}${bazi.zhi}的`
    const desc = baziDesc[key] || '命运掌握在自己手中，努力创造美好未来！'

    setResult({
      bazi: `${bazi.gan}${bazi.zhi}`,
      wuxing: bazi.wux,
      desc,
      wuxingAnalysis: wuxingAnalysis[bazi.wux],
      year: birth.year,
      month: birth.month,
      day: birth.day,
      hour: birth.hour,
    })
  }

  return (
    <>
      <FAQSchema faqs={baziFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">🔮 八字算命</h1>
            <p className="text-white/60">输入出生时间，查询生辰八字</p>
          </header>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-white/60 text-sm">年份</label>
                <select
                  value={birth.year}
                  onChange={(e) => setBirth({ ...birth, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  {years.map(y => <option key={y} value={y}>{y}年</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">月份</label>
                <select
                  value={birth.month}
                  onChange={(e) => setBirth({ ...birth, month: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  {months.map(m => <option key={m} value={m}>{m}月</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">日期</label>
                <select
                  value={birth.day}
                  onChange={(e) => setBirth({ ...birth, day: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  {days.map(d => <option key={d} value={d}>{d}日</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">时辰</label>
                <select
                  value={birth.hour}
                  onChange={(e) => setBirth({ ...birth, hour: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  {hours.map(h => <option key={h} value={h}>{h}时</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              开始算命
            </button>
          </div>

          {result && (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-white/60 text-sm mb-2">你的生辰八字</div>
                <div className="text-4xl font-black text-yellow-400">{result.bazi}</div>
                <div className="text-purple-400 mt-2">五行属 {result.wuxing}</div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-white font-bold mb-2">📖 命理分析</h3>
                  <p className="text-white/70 text-sm">{result.desc}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-white font-bold mb-2">🔥 五行解读</h3>
                  <p className="text-white/70 text-sm">{result.wuxingAnalysis}</p>
                </div>
              </div>

              <p className="text-white/30 text-xs text-center mt-4">
                纯属娱乐，仅供消遣
              </p>
            </div>
          )}

          <ShareButtons title="八字算命 - 生辰八字在线查询" url="/bazi" />

          {/* 常见问题 */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
            <div className="space-y-4">
              {baziFAQs.map((faq, index) => (
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

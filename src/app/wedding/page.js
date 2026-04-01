'use client'

import { useState, useMemo } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'

// 2026年吉日（简化版）
const goodDays = [
  { month: 1, day: 3, reason: '天恩日，宜嫁娶' },
  { month: 1, day: 8, reason: '天德合，宜婚嫁' },
  { month: 1, day: 10, reason: '天喜神日，宜结婚' },
  { month: 1, day: 15, reason: '上吉日，宜嫁娶' },
  { month: 1, day: 24, reason: '天恩日，宜婚嫁' },
  { month: 2, day: 2, reason: '天喜日，宜结婚' },
  { month: 2, day: 6, reason: '天德合，宜嫁娶' },
  { month: 2, day: 14, reason: '情人节，吉上加吉' },
  { month: 2, day: 20, reason: '天恩日，宜婚嫁' },
  { month: 3, day: 3, reason: '上吉日，宜嫁娶' },
  { month: 3, day: 8, reason: '妇女节，宜结婚' },
  { month: 3, day: 12, reason: '天喜神日，宜婚嫁' },
  { month: 3, day: 18, reason: '天德合，宜嫁娶' },
  { month: 3, day: 28, reason: '上吉日，宜结婚' },
  { month: 4, day: 4, reason: '天恩日，宜嫁娶' },
  { month: 4, day: 8, reason: '天喜日，宜婚嫁' },
  { month: 4, day: 16, reason: '上吉日，宜结婚' },
  { month: 4, day: 22, reason: '天德合，宜嫁娶' },
  { month: 5, day: 1, reason: '劳动节，吉日' },
  { month: 5, day: 5, reason: '天喜神日，宜婚嫁' },
  { month: 5, day: 10, reason: '上吉日，宜嫁娶' },
  { month: 5, day: 20, reason: '520，吉日' },
  { month: 6, day: 1, reason: '儿童节，宜结婚' },
  { month: 6, day: 6, reason: '天德合，宜嫁娶' },
  { month: 6, day: 18, reason: '天恩日，宜婚嫁' },
  { month: 6, day: 28, reason: '上吉日，宜结婚' },
  { month: 7, day: 7, reason: '七夕节，吉日' },
  { month: 7, day: 12, reason: '天喜日，宜嫁娶' },
  { month: 7, day: 18, reason: '天德合，宜婚嫁' },
  { month: 8, day: 8, reason: '818，发财日' },
  { month: 8, day: 16, reason: '天喜神日，宜婚嫁' },
  { month: 8, day: 24, reason: '上吉日，宜嫁娶' },
  { month: 9, day: 9, reason: '重阳节，宜结婚' },
  { month: 9, day: 15, reason: '天恩日，宜婚嫁' },
  { month: 9, day: 20, reason: '天德合，宜嫁娶' },
  { month: 10, day: 1, reason: '国庆节，吉日' },
  { month: 10, day: 6, reason: '天喜日，宜婚嫁' },
  { month: 10, day: 10, reason: '十全十美日' },
  { month: 10, day: 20, reason: '天恩日，宜结婚' },
  { month: 11, day: 11, reason: '1111，脱单日' },
  { month: 11, day: 15, reason: '天喜神日，宜婚嫁' },
  { month: 11, day: 22, reason: '小雪，吉日' },
  { month: 12, day: 2, reason: '天德合，宜嫁娶' },
  { month: 12, day: 8, reason: '天喜日，宜婚嫁' },
  { month: 12, day: 20, reason: '上吉日，宜结婚' },
  { month: 12, day: 24, reason: '平安夜，吉日' },
]

export default function WeddingPage() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(0) // 0 表示全年

  const filteredDays = useMemo(() => {
    return month === 0
      ? goodDays.filter(d => d.month >= new Date().getMonth() + 1)
      : goodDays.filter(d => d.month === month)
  }, [month])

  const years = [2026, 2027, 2028, 2029, 2030]

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">💒 结婚吉日</h1>
            <p className="text-white/60">挑选结婚好日子</p>
          </header>

          {/* 选择年月 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm">选择年份</label>
                <select
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white mt-1"
                >
                  {years.map(y => <option key={y} value={y}>{y}年</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">选择月份</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white mt-1"
                >
                  <option value={0}>全年</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 吉日列表 */}
          <div className="space-y-3 mb-6">
            {filteredDays.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                暂无吉日数据
              </div>
            ) : (
              filteredDays.map((day, index) => (
                <div key={index} className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-black text-pink-400">{day.month}</div>
                      <div className="text-white/50 text-xs">月</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-white">{day.day}</div>
                      <div className="text-white/50 text-xs">日</div>
                    </div>
                  </div>
                  <div className="text-right flex-1">
                    <div className="text-green-400 font-bold text-sm">{day.reason}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 提示 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <p className="text-white/60 text-sm text-center">
              💡 提示：选择吉日还需考虑双方八字，建议咨询专业人士
            </p>
          </div>

          <RelatedTools category="wedding" />

          <ShareButtons title="结婚吉日查询 - 挑选好日子结婚" url="/wedding" />

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

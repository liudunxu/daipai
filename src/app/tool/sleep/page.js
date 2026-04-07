'use client'

import { useState } from 'react'

// 不同年龄段睡眠推荐（小时）
const sleepStandards = [
  { age: '0-3月', min: 14, max: 17, night: '8-9', nap: '7-9(多 次)', note: '新生儿以睡眠为主' },
  { age: '4-11月', min: 12, max: 15, night: '9-11', nap: '3-5(2-3次)', note: '开始建立昼夜规律' },
  { age: '1-2岁', min: 11, max: 14, night: '10-12', nap: '2-3(1-2次)', note: '逐步减少午睡' },
  { age: '3-5岁', min: 10, max: 13, night: '10-12', nap: '1-2(1次)', note: '可开始如厕训练' },
  { age: '6-12岁', min: 9, max: 12, night: '9-11', nap: '0-1(可选)', note: '学业逐渐增加' },
  { age: '13-18岁', min: 8, max: 10, night: '8-10', nap: '0', note: '青少年阶段' },
]

export default function SleepPage() {
  const [selectedAge, setSelectedAge] = useState(2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            😴 儿童睡眠推荐
          </h1>
          <p className="text-white/60">
            不同年龄段建议睡眠时长参考
          </p>
        </header>

        {/* 简介 */}
        <div className="bg-indigo-500/20 rounded-2xl p-5 mb-6 text-center">
          <p className="text-indigo-200">
            良好的睡眠对儿童生长发育至关重要
          </p>
          <p className="text-white/60 text-sm mt-2">
            数据来源：美国睡眠医学会（AASM）建议
          </p>
        </div>

        {/* 年龄选择 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
          <h3 className="text-white font-bold mb-4 text-center">👶 选择孩子年龄段</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {sleepStandards.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedAge(index)}
                className={`py-3 rounded-xl font-medium transition-all ${
                  selectedAge === index
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {item.age}
              </button>
            ))}
          </div>
        </div>

        {/* 详细推荐 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
          {(() => {
            const current = sleepStandards[selectedAge]
            return (
              <div className="text-center">
                {/* 总时长 */}
                <div className="mb-6">
                  <div className="text-white/60 text-sm mb-1">推荐每日睡眠时长</div>
                  <div className="text-5xl font-black text-white">
                    {current.min}-{current.max}
                    <span className="text-2xl font-normal text-white/60">小时</span>
                  </div>
                </div>

                {/* 拆分显示 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-indigo-500/30 rounded-xl p-4">
                    <div className="text-indigo-200 text-sm mb-1">夜间睡眠</div>
                    <div className="text-2xl font-bold text-white">{current.night}</div>
                    <div className="text-indigo-300 text-xs">小时</div>
                  </div>
                  <div className="bg-pink-500/30 rounded-xl p-4">
                    <div className="text-pink-200 text-sm mb-1">午休时间</div>
                    <div className="text-2xl font-bold text-white">{current.nap}</div>
                    <div className="text-pink-300 text-xs">小时/次数</div>
                  </div>
                </div>

                {/* 提示 */}
                <div className="bg-white/10 rounded-xl p-4 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <div className="text-white font-medium">建议</div>
                      <div className="text-white/60 text-sm">{current.note}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>

        {/* 完整参考表 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
          <h3 className="text-white font-bold mb-4 text-center">📋 完整参考表</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/70 border-b border-white/10">
                  <th className="py-2 text-left">年龄段</th>
                  <th className="py-2 text-center">总时长</th>
                  <th className="py-2 text-center">夜间</th>
                  <th className="py-2 text-center">午休</th>
                </tr>
              </thead>
              <tbody>
                {sleepStandards.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-white/5 ${selectedAge === index ? 'bg-purple-500/20' : ''}`}
                  >
                    <td className="py-3 text-white">{item.age}</td>
                    <td className="py-3 text-center text-white/80">{item.min}-{item.max}h</td>
                    <td className="py-3 text-center text-white/80">{item.night}h</td>
                    <td className="py-3 text-center text-white/80">{item.nap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="bg-amber-500/20 rounded-xl p-4 mb-6">
          <h4 className="text-amber-300 font-bold mb-2">⚠️ 注意事项</h4>
          <ul className="text-amber-200 text-sm space-y-1">
            <li>• 每个孩子睡眠需求有差异，仅供参考</li>
            <li>• 睡眠不足可能影响身高、智力发育</li>
            <li>• 睡前避免使用电子设备</li>
            <li>• 保持规律作息有助于睡眠质量</li>
          </ul>
        </div>

        {/* 返回 */}
        <footer className="text-center">
          <div className="flex justify-center gap-4 mb-2">
            <a href="/nav" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 导航页
            </a>
            <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 首页
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
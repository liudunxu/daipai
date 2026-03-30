'use client'

import { useState } from 'react'

// 中国儿童身高参考标准（cm）
const heightStandards = {
  male: {
    3: { min: 88.2, max: 102.8 },
    4: { min: 94.4, max: 110.4 },
    5: { min: 100.2, max: 117.4 },
    6: { min: 106.0, max: 123.8 },
    7: { min: 111.0, max: 131.4 },
    8: { min: 115.3, max: 137.6 },
    9: { min: 119.6, max: 142.6 },
    10: { min: 123.3, max: 148.4 },
    11: { min: 127.1, max: 154.9 },
    12: { min: 131.0, max: 161.3 },
    13: { min: 138.1, max: 169.8 },
    14: { min: 148.8, max: 175.4 },
    15: { min: 158.1, max: 178.5 },
    16: { min: 162.7, max: 179.8 },
    17: { min: 165.2, max: 180.2 },
    18: { min: 166.5, max: 180.7 },
  },
  female: {
    3: { min: 87.4, max: 101.8 },
    4: { min: 93.1, max: 109.5 },
    5: { min: 98.9, max: 116.2 },
    6: { min: 104.6, max: 122.8 },
    7: { min: 109.2, max: 129.6 },
    8: { min: 113.3, max: 136.3 },
    9: { min: 117.5, max: 143.5 },
    10: { min: 121.5, max: 150.0 },
    11: { min: 125.7, max: 156.4 },
    12: { min: 130.2, max: 160.6 },
    13: { min: 140.0, max: 164.0 },
    14: { min: 147.8, max: 167.2 },
    15: { min: 151.8, max: 169.2 },
    16: { min: 153.6, max: 170.0 },
    17: { min: 154.6, max: 170.6 },
    18: { min: 155.2, max: 171.0 },
  },
}

// 生成身高选项
function generateHeightOptions(min, max) {
  const options = []
  for (let h = Math.floor(min - 10); h <= Math.ceil(max + 10); h++) {
    if (h > 0) options.push(h)
  }
  return options
}

// 生成年龄段选项
const ageOptions = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

export default function HeightCheckPage() {
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState(7)
  const [height, setHeight] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const currentStandard = heightStandards[gender][age]
  const heightOptions = generateHeightOptions(currentStandard.min, currentStandard.max)

  const getLevel = (h) => {
    const { min, max } = currentStandard
    const range = max - min
    const p25 = min + range * 0.25
    const p75 = min + range * 0.75
    const p90 = min + range * 0.9

    if (h < min - 5) return { level: '极低', color: 'text-red-600', desc: '低于同龄人较多，建议就医检查' }
    if (h < min) return { level: '偏矮', color: 'text-orange-500', desc: '略低于标准，建议关注营养' }
    if (h < p25) return { level: '偏低', color: 'text-yellow-500', desc: '在正常偏低范围' }
    if (h < p75) return { level: '正常', color: 'text-green-500', desc: '身高正常，保持良好生活习惯' }
    if (h < p90) return { level: '偏高', color: 'text-cyan-500', desc: '高于同龄人平均水平' }
    if (h <= max) return { level: '偏高', color: 'text-blue-500', desc: '高于大多数同龄人' }
    return { level: '极高', color: 'text-purple-500', desc: '明显高于同龄人，注意发育情况' }
  }

  const handleHeightSelect = (h) => {
    setHeight(h)
    setShowResult(true)
  }

  const result = height ? getLevel(height) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📏 儿童身高评估
          </h1>
          <p className="text-white/60">
            选择年龄和身高，评估发育水平
          </p>
        </header>

        {/* 性别选择 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-4">
          <h3 className="text-white font-bold mb-4 text-center">👶 性别</h3>
          <div className="flex gap-4">
            <button
              onClick={() => { setGender('male'); setHeight(null); setShowResult(false); }}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
                gender === 'male'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              👦 男孩
            </button>
            <button
              onClick={() => { setGender('female'); setHeight(null); setShowResult(false); }}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
                gender === 'female'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              👧 女孩
            </button>
          </div>
        </div>

        {/* 年龄选择 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-4">
          <h3 className="text-white font-bold mb-4 text-center">🎂 年龄（岁）</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {ageOptions.map((a) => (
              <button
                key={a}
                onClick={() => { setAge(a); setHeight(null); setShowResult(false); }}
                className={`py-3 rounded-xl font-medium transition-all ${
                  age === a
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* 标准身高范围提示 */}
        <div className="bg-emerald-500/20 rounded-xl p-4 mb-4 text-center">
          <p className="text-emerald-200">
            {age}岁{gender === 'male' ? '男孩' : '女孩'}标准身高范围：
          </p>
          <p className="text-2xl font-bold text-white">
            {currentStandard.min} - {currentStandard.max} cm
          </p>
        </div>

        {/* 身高选择 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-4">
          <h3 className="text-white font-bold mb-4 text-center">📍 实际身高（cm）</h3>
          <p className="text-white/50 text-sm text-center mb-4">点击选择孩子的实际身高</p>
          <div className="grid grid-cols-5 md:grid-cols-8 gap-2 max-h-64 overflow-y-auto">
            {heightOptions.map((h) => (
              <button
                key={h}
                onClick={() => handleHeightSelect(h)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  height === h
                    ? 'bg-emerald-500 text-white'
                    : h >= currentStandard.min && h <= currentStandard.max
                    ? 'bg-green-500/30 text-green-200 hover:bg-green-500/50'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* 评估结果 */}
        {showResult && result && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-4">
            <div className="text-center">
              <div className="text-white/60 text-sm mb-2">评估结果</div>
              <div className={`text-4xl font-black ${result.color} mb-2`}>
                {result.level}
              </div>
              <div className="text-white/80 text-lg mb-2">
                身高 {height} cm
              </div>
              <div className="text-white/60 text-sm">
                {result.desc}
              </div>
            </div>

            {/* 身高进度条 */}
            <div className="mt-6">
              <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
                {/* 刻度标记 */}
                <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white/20"></div>
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20"></div>
                <div className="absolute top-0 left-3/4 w-0.5 h-full bg-white/20"></div>

                {/* 当前位置 */}
                <div
                  className="absolute top-0 h-full bg-emerald-500 transition-all duration-500"
                  style={{
                    left: '0%',
                    width: `${Math.min(100, Math.max(0, ((height - (currentStandard.min - 15)) / (currentStandard.max - currentStandard.min + 30)) * 100))}%`
                  }}
                ></div>

                {/* 当前位置标记 */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-emerald-500 shadow-lg"
                  style={{
                    left: `${Math.min(95, Math.max(5, ((height - (currentStandard.min - 15)) / (currentStandard.max - currentStandard.min + 30)) * 100))}%`
                  }}
                ></div>
              </div>

              {/* 刻度标签 */}
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>偏矮</span>
                <span>正常</span>
                <span>偏高</span>
              </div>
            </div>
          </div>
        )}

        {/* 说明 */}
        <div className="text-center text-white/40 text-sm mt-4">
          <p>数据参考中国九省/市儿童体格发育调查结果</p>
          <p className="mt-1">仅供参考，具体请咨询专业医生</p>
        </div>

        {/* 返回 */}
        <footer className="mt-8 text-center">
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}
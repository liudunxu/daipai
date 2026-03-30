'use client'

import { useState } from 'react'

// metadata 需要放在 layout.js 中，这里只保留组件
export default function BMIPage() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [result, setResult] = useState(null)

  const calculateBMI = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    const a = parseInt(age)

    if (!h || !w || !a || h <= 0 || w <= 0 || a <= 0) {
      setResult(null)
      return
    }

    // BMI = 体重(kg) / 身高(m)²
    const bmi = w / ((h / 100) ** 2)

    let category = ''
    let description = ''
    let color = ''

    // 儿童BMI判断标准（根据年龄）
    if (a < 18) {
      // 儿童BMI参考标准（简化版）
      if (a >= 6 && a <= 18) {
        // 6-18岁儿童BMI参考
        const boyThresholds = {
          6: { under: 14.2, normal: 14.2, over: 17.7, obese: 19.4 },
          7: { under: 14.0, normal: 14.0, over: 18.1, obese: 20.3 },
          8: { under: 13.8, normal: 13.8, over: 18.8, obese: 21.4 },
          9: { under: 13.6, normal: 13.6, over: 19.5, obese: 22.5 },
          10: { under: 13.5, normal: 13.5, over: 20.3, obese: 23.6 },
          11: { under: 13.7, normal: 13.7, over: 21.0, obese: 24.5 },
          12: { under: 14.0, normal: 14.0, over: 21.8, obese: 25.3 },
          13: { under: 14.4, normal: 14.4, over: 22.6, obese: 26.1 },
          14: { under: 14.8, normal: 14.8, over: 23.3, obese: 26.8 },
          15: { under: 15.2, normal: 15.2, over: 23.9, obese: 27.4 },
          16: { under: 15.6, normal: 15.6, over: 24.4, obese: 27.9 },
          17: { under: 16.0, normal: 16.0, over: 24.8, obese: 28.2 },
          18: { under: 16.4, normal: 16.4, over: 25.1, obese: 28.5 },
        }
        const girlThresholds = {
          6: { under: 14.0, normal: 14.0, over: 17.3, obese: 19.0 },
          7: { under: 13.8, normal: 13.8, over: 17.8, obese: 19.9 },
          8: { under: 13.6, normal: 13.6, over: 18.5, obese: 21.0 },
          9: { under: 13.5, normal: 13.5, over: 19.3, obese: 22.2 },
          10: { under: 13.5, normal: 13.5, over: 20.3, obese: 23.5 },
          11: { under: 13.7, normal: 13.7, over: 21.3, obese: 24.8 },
          12: { under: 14.1, normal: 14.1, over: 22.3, obese: 26.0 },
          13: { under: 14.6, normal: 14.6, over: 23.2, obese: 27.0 },
          14: { under: 15.1, normal: 15.1, over: 23.9, obese: 27.7 },
          15: { under: 15.6, normal: 15.6, over: 24.5, obese: 28.3 },
          16: { under: 16.0, normal: 16.0, over: 24.9, obese: 28.7 },
          17: { under: 16.3, normal: 16.3, over: 25.2, obese: 28.9 },
          18: { under: 16.6, normal: 16.6, over: 25.4, obese: 29.1 },
        }

        const thresholds = gender === 'male' ? boyThresholds : girlThresholds
        const ageKey = Math.min(Math.max(a, 6), 18)
        const t = thresholds[ageKey]

        if (bmi < t.under) {
          category = '偏瘦'
          description = '建议适当增加营养，保持均衡饮食'
          color = 'text-blue-400'
        } else if (bmi < t.normal) {
          category = '正常'
          description = '继续保持健康的生活方式'
          color = 'text-green-400'
        } else if (bmi < t.over) {
          category = '偏胖'
          description = '建议适当控制饮食，增加运动'
          color = 'text-yellow-400'
        } else if (bmi < t.obese) {
          category = '超重'
          description = '需要关注体重，加强锻炼'
          color = 'text-orange-400'
        } else {
          category = '肥胖'
          description = '建议咨询医生，制定健康计划'
          color = 'text-red-400'
        }
      } else {
        // 6岁以下儿童
        if (bmi < 14) {
          category = '偏瘦'
          description = '婴幼儿期建议咨询儿科医生'
          color = 'text-blue-400'
        } else if (bmi < 18) {
          category = '正常'
          description = '继续保持'
          color = 'text-green-400'
        } else if (bmi < 22) {
          category = '偏胖'
          description = '注意控制'
          color = 'text-yellow-400'
        } else {
          category = '肥胖'
          description = '建议咨询医生'
          color = 'text-red-400'
        }
      }
    } else {
      // 成人BMI标准
      if (bmi < 18.5) {
        category = '偏瘦'
        description = '建议适当增加营养，保持均衡饮食'
        color = 'text-blue-400'
      } else if (bmi < 24) {
        category = '正常'
        description = '继续保持健康的生活方式'
        color = 'text-green-400'
      } else if (bmi < 28) {
        category = '偏胖'
        description = '建议适当控制饮食，增加运动'
        color = 'text-yellow-400'
      } else {
        category = '肥胖'
        description = '建议咨询医生，制定健康计划'
        color = 'text-red-400'
      }
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      description,
      color,
      isChild: a < 18,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            ⚖️ BMI计算器
          </h1>
          <p className="text-white/60">
            身体质量指数，适合儿童和成人
          </p>
        </header>

        {/* 输入表单 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 年龄 */}
            <div>
              <label className="block text-white/70 text-sm mb-2">年龄（岁）</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="请输入年龄"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* 性别 */}
            <div>
              <label className="block text-white/70 text-sm mb-2">性别</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                    gender === 'male'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  👦 男
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                    gender === 'female'
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  👧 女
                </button>
              </div>
            </div>

            {/* 身高 */}
            <div>
              <label className="block text-white/70 text-sm mb-2">身高（cm）</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="请输入身高"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* 体重 */}
            <div>
              <label className="block text-white/70 text-sm mb-2">体重（kg）</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="请输入体重"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* 计算按钮 */}
          <button
            onClick={calculateBMI}
            className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all transform hover:scale-[1.02]"
          >
            计算BMI
          </button>
        </div>

        {/* 结果展示 */}
        {result && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
            <div className="text-center">
              <div className="text-white/60 text-sm mb-2">您的BMI值</div>
              <div className="text-6xl font-black text-white mb-2">{result.bmi}</div>
              <div className={`text-2xl font-bold ${result.color} mb-2`}>
                {result.category}
              </div>
              <div className="text-white/70 text-sm">{result.description}</div>

              {result.isChild && (
                <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg text-yellow-200 text-sm">
                  ℹ️ 儿童BMI判断标准与成人不同，已根据年龄和性别进行评估
                </div>
              )}
            </div>

            {/* BMI参考表 */}
            <div className="mt-6">
              <h3 className="text-white font-bold mb-3 text-center">BMI参考标准</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                  <div className="text-blue-300 font-medium">偏瘦</div>
                  <div className="text-white/60">&lt;18.5</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-3 text-center">
                  <div className="text-green-300 font-medium">正常</div>
                  <div className="text-white/60">18.5-24</div>
                </div>
                <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
                  <div className="text-yellow-300 font-medium">偏胖</div>
                  <div className="text-white/60">24-28</div>
                </div>
                <div className="bg-red-500/20 rounded-lg p-3 text-center">
                  <div className="text-red-300 font-medium">肥胖</div>
                  <div className="text-white/60">&gt;28</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部说明 */}
        <div className="text-center text-white/40 text-sm">
          <p>BMI计算公式：体重(kg) ÷ 身高(m)²</p>
          <p className="mt-2">儿童判断标准参考中国学生体质标准</p>
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
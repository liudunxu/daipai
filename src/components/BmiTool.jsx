'use client'

import { useState } from 'react'

const ageOptions = Array.from({ length: 78 }, (_, i) => i + 3)
const heightOptions = Array.from({ length: 121 }, (_, i) => i + 100)
const weightOptions = Array.from({ length: 261 }, (_, i) => (i * 0.5 + 20).toFixed(1))

export default function BmiTool() {
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [age, setAge] = useState(18)
  const [gender, setGender] = useState('male')
  const [result, setResult] = useState(null)
  const [showHeightPicker, setShowHeightPicker] = useState(false)
  const [showWeightPicker, setShowWeightPicker] = useState(false)

  const calculateBMI = () => {
    if (!height || !weight) return
    const h = parseFloat(height)
    const w = parseFloat(weight)
    const a = parseInt(age)
    const bmi = w / ((h / 100) ** 2)

    let category = ''
    let description = ''
    let color = ''
    let advice = ''

    if (a < 18 && a >= 6) {
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
        category = '偏瘦'; description = '建议适当增加营养，保持均衡饮食'; color = 'text-blue-400'; advice = '多摄入优质蛋白质和碳水化合物'
      } else if (bmi < t.over) {
        category = '正常'; description = '继续保持健康的生活方式'; color = 'text-green-400'; advice = '保持规律运动和均衡饮食'
      } else if (bmi < t.obese) {
        category = '偏胖'; description = '建议适当控制饮食，增加运动'; color = 'text-yellow-400'; advice = '减少高热量零食，增加户外活动'
      } else {
        category = '肥胖'; description = '建议咨询医生，制定健康计划'; color = 'text-red-400'; advice = '请及时咨询儿科医生'
      }
    } else if (a < 6) {
      if (bmi < 14) {
        category = '偏瘦'; description = '婴幼儿期建议咨询儿科医生'; color = 'text-blue-400'; advice = '请定期体检，遵医嘱喂养'
      } else if (bmi < 18) {
        category = '正常'; description = '继续保持'; color = 'text-green-400'; advice = '按需喂养即可'
      } else {
        category = '偏胖'; description = '建议咨询医生'; color = 'text-yellow-400'; advice = '注意辅食添加的种类和量'
      }
    } else {
      if (bmi < 18.5) {
        category = '偏瘦'; description = '建议适当增加营养，保持均衡饮食'; color = 'text-blue-400'; advice = '增加优质蛋白摄入，配合适量力量训练'
      } else if (bmi < 24) {
        category = '正常'; description = '继续保持健康的生活方式'; color = 'text-green-400'; advice = '坚持每周150分钟中等强度运动'
      } else if (bmi < 28) {
        category = '偏胖'; description = '建议适当控制饮食，增加运动'; color = 'text-yellow-400'; advice = '控制碳水摄入，增加有氧运动'
      } else {
        category = '肥胖'; description = '建议咨询医生，制定健康计划'; color = 'text-red-400'; advice = '建议就医检查，排除代谢疾病'
      }
    }

    setResult({ bmi: bmi.toFixed(1), category, description, color, advice, isChild: a < 18 })
  }

  return (
    <div>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
        <div className="mb-6">
          <label className="block text-white/70 text-sm mb-3">性别</label>
          <div className="flex gap-3">
            <button onClick={() => { setGender('male'); setResult(null); }} className={`flex-1 py-3 rounded-xl font-medium transition-all ${gender === 'male' ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
              男
            </button>
            <button onClick={() => { setGender('female'); setResult(null); }} className={`flex-1 py-3 rounded-xl font-medium transition-all ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
              女
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white/70 text-sm mb-3">年龄（岁）</label>
          <div className="flex flex-wrap gap-2">
            {ageOptions.slice(0, 24).map((a) => (
              <button key={a} onClick={() => { setAge(a); setResult(null); }} className={`w-12 py-2 rounded-lg text-sm font-medium transition-all ${age === a ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                {a}
              </button>
            ))}
            <select
              value={age}
              onChange={(e) => { setAge(Number(e.target.value)); setResult(null); }}
              className="w-16 py-2 rounded-lg text-sm bg-white/10 text-white/60 border border-white/20"
            >
              {ageOptions.map((a) => (
                <option key={a} value={a} className="bg-gray-800">{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white/70 text-sm mb-3">身高（cm）</label>
          <button onClick={() => setShowHeightPicker(!showHeightPicker)} className="w-full py-4 bg-white/10 border border-white/20 rounded-xl text-white text-lg font-medium hover:bg-white/20 transition-all">
            {height ? `${height} cm` : '点击选择身高'}
          </button>
          {showHeightPicker && (
            <div className="mt-3 max-h-48 overflow-y-auto grid grid-cols-5 md:grid-cols-8 gap-2 p-2 bg-black/20 rounded-xl">
              {heightOptions.map((h) => (
                <button key={h} onClick={() => { setHeight(h); setShowHeightPicker(false); setResult(null); }} className={`py-2 rounded-lg text-sm font-medium transition-all ${height === h ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-white/70 text-sm mb-3">体重（kg）</label>
          <button onClick={() => setShowWeightPicker(!showWeightPicker)} className="w-full py-4 bg-white/10 border border-white/20 rounded-xl text-white text-lg font-medium hover:bg-white/20 transition-all">
            {weight ? `${weight} kg` : '点击选择体重'}
          </button>
          {showWeightPicker && (
            <div className="mt-3 max-h-48 overflow-y-auto grid grid-cols-6 md:grid-cols-9 gap-2 p-2 bg-black/20 rounded-xl">
              {weightOptions.map((w) => (
                <button key={w} onClick={() => { setWeight(w); setShowWeightPicker(false); setResult(null); }} className={`py-2 rounded-lg text-xs font-medium transition-all ${weight === w ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                  {w}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={calculateBMI} disabled={!height || !weight} className={`w-full py-4 text-white font-bold rounded-xl transition-all transform ${height && weight ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 hover:scale-[1.02]' : 'bg-white/20 cursor-not-allowed'}`}>
          计算BMI
        </button>
      </div>

      {result && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
          <div className="text-center">
            <div className="text-white/60 text-sm mb-2">您的BMI值</div>
            <div className="text-6xl font-black text-white mb-2">{result.bmi}</div>
            <div className={`text-2xl font-bold ${result.color} mb-2`}>{result.category}</div>
            <div className="text-white/70 text-sm">{result.description}</div>
            <div className="text-white/50 text-sm mt-2">{result.advice}</div>
            {result.isChild && (
              <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg text-yellow-200 text-sm">
                儿童BMI判断标准与成人不同，已根据年龄和性别进行评估
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-white font-bold mb-3 text-center">BMI参考标准（成人）</h3>
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
    </div>
  )
}

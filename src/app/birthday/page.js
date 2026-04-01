'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'
import { AdBanner } from '../../components/Ads'

export default function Birthday() {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [result, setResult] = useState(null)

  const birthdays = {
    '1': { name: '摩羯座', stone: '石榴石', flower: '康乃馨', color: '#8E44AD' },
    '2': { name: '水瓶座', stone: '紫水晶', flower: '水仙', color: '#3498DB' },
    '3': { name: '双鱼座', stone: '海蓝宝', flower: '桃花', color: '#9B59B6' },
    '4': { name: '白羊座', stone: '红宝石', flower: '雏菊', color: '#E74C3C' },
    '5': { name: '金牛座', stone: '祖母绿', flower: '玫瑰', color: '#27AE60' },
    '6': { name: '双子座', stone: '珍珠', flower: '薰衣草', color: '#F39C12' },
    '7': { name: '巨蟹座', stone: '月光石', flower: '百合', color: '#ECF0F1' },
    '8': { name: '狮子座', stone: '红玛瑙', flower: '向日葵', color: '#E67E22' },
    '9': { name: '处女座', stone: '蓝宝石', flower: '波斯菊', color: '#16A085' },
    '10': { name: '天秤座', stone: '橄榄石', flower: '木槿', color: '#D35400' },
    '11': { name: '天蝎座', stone: '托帕石', flower: '菊花', color: '#2C3E50' },
    '12': { name: '射手座', stone: '绿松石', flower: '兰花', color: '#C0392B' },
  }

  const getBirthdayMessage = (m, d) => {
    const hash = parseInt(m) + parseInt(d)
    const messages = [
      '你是一个充满活力的人！',
      '你有着独特的魅力~',
      '你生来就注定不平凡！',
      '你的笑容能治愈一切~',
      '你有着有趣的灵魂！',
      '你注定要做大事的人！',
      '你的温柔让人心动~',
      '你比想象中更强大！',
      '你是最特别的存在！',
      '你的未来充满希望~',
    ]
    return messages[hash % messages.length]
  }

  const calculate = () => {
    const m = parseInt(month)
    const d = parseInt(day)

    if (!m || m < 1 || m > 12) {
      alert('请输入正确的月份(1-12)')
      return
    }
    if (!d || d < 1 || d > 31) {
      alert('请输入正确的日期(1-31)')
      return
    }

    setResult({
      ...birthdays[m],
      message: getBirthdayMessage(m, d),
      day: `${m}月${d}日`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🎂 生日密语</h1>
          <p className="text-white/60">输入生日，解读你的专属秘密</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="月份"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-center"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="日期"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-center"
              />
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-xl"
          >
            🎁 解读我的生日秘密
          </button>
        </div>

        {result && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-6">
            <div className="text-5xl mb-3">🎂</div>
            <h2 className="text-2xl font-bold text-white mb-2">{result.day} 生日花语</h2>

            <div className="text-xl font-bold mb-4" style={{ color: result.color }}>
              {result.name}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs mb-1">守护石</p>
                <p className="text-white font-bold">{result.stone}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs mb-1">幸运花</p>
                <p className="text-white font-bold">{result.flower}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs mb-1">幸运色</p>
                <p className="text-white font-bold" style={{ color: result.color }}>●</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl p-4 mb-4">
              <p className="text-white/80 italic">{result.message}</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <AdBanner className="mb-6" />
          <RelatedTools category="birthday" />
          <ShareButtons title="生日密语 - 输入生日解读你的专属秘密" url="/birthday" />
        </div>

        <footer className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">← 更多工具</a>
        </footer>
      </div>
    </div>
  )
}

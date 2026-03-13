'use client'

import { useState } from 'react'
import ShareButtons from '../../../components/ShareButtons'

export default function PhoneTest() {
  const [phone, setPhone] = useState('')
  const [result, setResult] = useState(null)

  const analyze = () => {
    if (phone.length !== 11) {
      alert('请输入11位手机号码')
      return
    }

    const hash = phone.split('').reduce((a, b) => a + parseInt(b), 0)
    const scores = [
      { score: 95, level: '大吉', desc: '超级好运号码！财源滚滚来~' },
      { score: 85, level: '吉', desc: '运气不错，事业爱情双丰收！' },
      { score: 75, level: '中吉', desc: '平稳向上，值得拥有！' },
      { score: 65, level: '一般', desc: '平常心对待就好~' },
      { score: 55, level: '凶', desc: '注意低调，避免冲动' },
    ]

    const analysis = scores[hash % scores.length]

    setResult({
      phone,
      ...analysis,
      good: ['0', '1', '3', '5', '6', '8', '9'],
      bad: ['2', '4', '7'],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">📱 手机号测运势</h1>
          <p className="text-white/60">输入手机号，测测你的号码运气如何</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
            placeholder="请输入11位手机号码"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-4 text-center text-lg letter-spacing-wider"
          />
          <button
            onClick={analyze}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl"
          >
            🔮 开始分析
          </button>
        </div>

        {result && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-4">分析结果</h2>

            <div className="mb-4">
              <p className="text-white/50 text-sm mb-2">你的号码</p>
              <p className="text-2xl font-mono text-white tracking-widest">{result.phone}</p>
            </div>

            <div className="text-4xl font-black text-yellow-400 mb-4">
              {result.level}
            </div>
            <p className="text-white/70 mb-6">{result.desc}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-500/20 rounded-xl p-3">
                <p className="text-green-400 text-xs mb-1">吉祥数字</p>
                <p className="text-white font-bold">{result.good.join(' ')}</p>
              </div>
              <div className="bg-red-500/20 rounded-xl p-3">
                <p className="text-red-400 text-xs mb-1">注意数字</p>
                <p className="text-white font-bold">{result.bad.join(' ')}</p>
              </div>
            </div>

            <p className="text-white/30 text-xs">
              娱乐测试，仅供参考
            </p>
          </div>
        )}

        <div className="mt-6">
          <ShareButtons title="手机号测运势 - 号码吉凶查询" url="/phone" />
        </div>

        <footer className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">
            ← 更多工具
          </a>
        </footer>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import ShareButtons from '../../../components/ShareButtons'

export default function MatchTest() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!name1.trim() || !name2.trim()) {
      alert('请输入两个人的名字~')
      return
    }

    const hash = name1.split('').reduce((a, b) => a + b.charCodeAt(0), 0) +
                 name2.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    const percent = (hash % 100) + 1

    const results = [
      { level: '天作之合', desc: '你们是天生一对！在一起会非常幸福~', emoji: '💕' },
      { level: '心有灵犀', desc: '默契满分，彼此心领神会！', emoji: '💘' },
      { level: '缘分深厚', desc: '前世修来的缘分，好好珍惜~', emoji: '🌸' },
      { level: '欢喜冤家', desc: '虽然偶尔拌嘴，但感情很好！', emoji: '🥰' },
      { level: '平淡是真', desc: '细水长流的爱情，也很美好~', emoji: '🌊' },
      { level: '还需努力', desc: '需要更多沟通和理解，加油！', emoji: '💪' },
    ]

    const r = results[hash % results.length]
    setResult({ percent, level: r.level, desc: r.desc, emoji: r.emoji })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">💘 姓名配对</h1>
          <p className="text-white/60">输入两个人名字，测试缘分配对指数</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <input
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="你的名字"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-4"
          />
          <div className="text-center text-white/40 mb-4">+</div>
          <input
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="TA的名字"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-4"
          />
          <button
            onClick={calculate}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-xl"
          >
            💕 测试配对指数
          </button>
        </div>

        {result && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-6">
            <div className="text-6xl mb-4">{result.emoji}</div>

            <div className="text-6xl font-black text-yellow-400 mb-4">
              {result.percent}%
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{result.level}</h2>
            <p className="text-white/70 mb-6">{result.desc}</p>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/50 text-sm">
                {name1} & {name2}
              </p>
              <p className="text-white/30 text-xs mt-2">
                纯属娱乐，仅供消遣
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <ShareButtons title="姓名配对 - 测测你们的缘分配对指数" url="/match" />
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

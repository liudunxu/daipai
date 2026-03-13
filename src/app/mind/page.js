'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'

const questions = [
  {
    q: '选择一种颜色代表今天的心情',
    options: ['🔴 红色', '🔵 蓝色', '🟢 绿色', '🟡 黄色', '🟣 紫色'],
  },
  {
    q: '你更倾向于？',
    options: ['🌙 独自思考', '👥 和朋友聊天', '🎯 行动解决问题', '🎵 听音乐放松'],
  },
  {
    q: '如果可以你最想去哪里？',
    options: ['🏔️ 高山', '🌊 大海', '🏙️ 城市', '🌲 森林'],
  },
  {
    q: '你更喜欢哪种生活方式？',
    options: ['💼 拼搏事业', '🏠 享受生活', '🎨 追求艺术', '🤝 帮助他人'],
  },
  {
    q: '面对困难你会？',
    options: ['💪 迎难而上', '🤔 冷静分析', '😢 寻求帮助', '⏰ 先等等看'],
  },
]

const results = [
  {
    type: '行动派领袖',
    desc: '你是一个充满活力和决断力的人！喜欢掌控局面，有领导气质。',
    color: 'text-red-400',
    emoji: '🦁',
  },
  {
    type: '理性思考者',
    desc: '你善于分析，做事稳重。喜欢独立思考，追求真理。',
    color: 'text-blue-400',
    emoji: '🦉',
  },
  {
    type: '温暖治愈者',
    desc: '你善于照顾他人，富有同理心。朋友们都很喜欢你~',
    color: 'text-green-400',
    emoji: '🐰',
  },
  {
    type: '创意梦想家',
    desc: '你思维活跃，创意十足。经常有一些新奇的想法！',
    color: 'text-purple-400',
    emoji: '🦋',
  },
]

export default function MindTest() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers, optionIndex]
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      // 计算结果
      const hash = newAnswers.reduce((a, b) => a + b, 0)
      setResult(results[hash % results.length])
    }
  }

  const reset = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🧠 心理测试</h1>
          <p className="text-white/60">5道题了解真实的你</p>
        </header>

        {!result ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between text-white/40 text-sm mb-6">
              <span>第 {current + 1} 题</span>
              <span>共 {questions.length} 题</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-6 text-center">
              {questions[current].q}
            </h2>

            <div className="space-y-3">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i <= current ? 'bg-white' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-6">
            <div className="text-6xl mb-4">{result.emoji}</div>

            <h2 className={`text-2xl font-black mb-4 ${result.color}`}>
              {result.type}
            </h2>

            <p className="text-white/70 mb-6">{result.desc}</p>

            <button
              onClick={reset}
              className="px-6 py-2 bg-white/20 text-white rounded-lg mb-4"
            >
              重新测试
            </button>
          </div>
        )}

        <div className="mt-6">
          <ShareButtons title="心理测试 - 5道题了解真实的你" url="/mind" />
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

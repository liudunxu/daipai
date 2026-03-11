'use client'

import { useState } from 'react'

const questions = [
  {
    id: 1,
    question: '你的电脑是什么操作系统？',
    options: [
      { text: 'Windows 10/11', score: 2 },
      { text: 'macOS', score: 2 },
      { text: 'Linux (Ubuntu/Debian)', score: 3 },
      { text: '其他系统', score: 0 },
    ],
  },
  {
    id: 2,
    question: '你使用过命令行/终端吗？',
    options: [
      { text: '经常使用，很熟练', score: 3 },
      { text: '偶尔使用，有一些了解', score: 2 },
      { text: '基本没用过', score: 0 },
    ],
  },
  {
    id: 3,
    question: '你的电脑配置如何？',
    options: [
      { text: '16GB以上内存，8核以上CPU', score: 3 },
      { text: '8GB内存，4核CPU', score: 2 },
      { text: '4GB内存或更低', score: 0 },
    ],
  },
  {
    id: 4,
    question: '你想用 OpenClaw 做什么？',
    options: [
      { text: '提高工作效率，自动化任务', score: 3 },
      { text: '学习AI技术，写代码', score: 2 },
      { text: '好奇，想试试看', score: 1 },
    ],
  },
  {
    id: 5,
    question: '你愿意花时间学习和配置吗？',
    options: [
      { text: '愿意，花几个小时没问题', score: 3 },
      { text: '可以花半小时左右', score: 2 },
      { text: '希望打开就能用', score: 0 },
    ],
  },
]

function getResult(score) {
  if (score >= 12) {
    return {
      title: '⭐ 非常适合！',
      desc: '你的环境和技术背景非常适合安装 OpenClaw。它能大幅提升你的工作效率，让你体验AI自动化的强大能力！',
      color: 'from-green-500 to-emerald-500',
      emoji: '🎉',
    }
  } else if (score >= 8) {
    return {
      title: '👍 比较适合',
      desc: '你具备使用 OpenClaw 的基础条件。建议先阅读官方文档，了解基本操作后再开始。需要时也可以先尝试在线版本。',
      color: 'from-blue-500 to-cyan-500',
      emoji: '💪',
    }
  } else if (score >= 5) {
    return {
      title: '⚠️ 可以尝试',
      desc: '你可能需要更多时间来熟悉工具。建议先在业余时间学习基础知识，或者找有经验的朋友帮忙安装配置。',
      color: 'from-yellow-500 to-orange-500',
      emoji: '🤔',
    }
  } else {
    return {
      title: '❌ 暂不建议',
      desc: '当前条件可能不太适合自行安装 OpenClaw。你可以先体验在线版或网页版，或者升级电脑配置后再尝试。',
      color: 'from-red-500 to-pink-500',
      emoji: '😅',
    }
  }
}

export default function OpenClawCheckPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetTest = () => {
    setCurrentQ(0)
    setAnswers([])
    setShowResult(false)
  }

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const result = getResult(totalScore)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🦞</span>
            <span className="text-white font-medium">OpenClaw 适合性测试</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            你适合安装 OpenClaw 吗？
          </h1>
          <p className="text-white/60">
            回答 {questions.length} 道题，快速得出结论
          </p>
        </div>

        {!showResult ? (
          /* 测试题目 */
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            {/* 进度条 */}
            <div className="flex items-center gap-2 mb-6">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    idx <= currentQ ? 'bg-purple-500' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/40 text-sm mb-4">
              第 {currentQ + 1} / {questions.length} 题
            </p>

            <h2 className="text-xl font-bold text-white mb-6">
              {questions[currentQ].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQ].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-[1.01] text-white"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* 测试结果 */
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${result.color} rounded-full mb-6`}>
              <span className="text-4xl">{result.emoji}</span>
            </div>
            <h2 className={`text-3xl font-black bg-gradient-to-r ${result.color} bg-clip-text text-transparent mb-4`}>
              {result.title}
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              {result.desc}
            </p>

            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-white/40 text-sm">得分</p>
              <p className="text-3xl font-black text-white">{totalScore} / {questions.length * 3}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetTest}
                className="flex-1 px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors"
              >
                🔄 重新测试
              </button>
              <a
                href="/news/openclaw"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
              >
                📰 了解更多
              </a>
            </div>
          </div>
        )}

        {/* 底部 */}
        <div className="mt-8 text-center">
          <p className="text-white/30 text-sm">
            本测试仅供参考，实际情况可能有所不同
          </p>
        </div>
      </div>
    </div>
  )
}

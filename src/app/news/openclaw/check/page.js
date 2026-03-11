'use client'

import { useState, useEffect } from 'react'

const questions = [
  {
    id: 1,
    question: '你平时主要用什么电脑？',
    options: [
      { text: 'Windows 电脑（联想、戴尔、华硕等）', score: 2 },
      { text: '苹果电脑（MacBook、iMac）', score: 2 },
      { text: 'Linux 电脑', score: 3 },
      { text: '不太清楚 / 不知道', score: 1 },
    ],
  },
  {
    id: 2,
    question: '你的电脑用了几年了？',
    options: [
      { text: '1-3年，还比较新', score: 3 },
      { text: '4-5年，还能用', score: 2 },
      { text: '5年以上，有点卡', score: 1 },
      { text: '不太清楚', score: 1 },
    ],
  },
  {
    id: 3,
    question: '你平时会自己安装软件吗？',
    options: [
      { text: '经常安装，简单', score: 3 },
      { text: '偶尔安装，百度一下就会', score: 2 },
      { text: '一般找人帮忙装', score: 1 },
      { text: '不太清楚怎么做', score: 0 },
    ],
  },
  {
    id: 4,
    question: '你知道什么是"命令行"或"终端"吗？',
    options: [
      { text: '知道，经常用', score: 3 },
      { text: '听说过，但没用过', score: 2 },
      { text: '完全不知道', score: 1 },
    ],
  },
  {
    id: 5,
    question: '你想用 OpenClaw 做什么？',
    options: [
      { text: '让AI帮我干活，提高效率', score: 3 },
      { text: '学习AI技术，写代码', score: 2 },
      { text: '好奇，想了解一下', score: 1 },
      { text: '不太清楚', score: 1 },
    ],
  },
  {
    id: 6,
    question: '你愿意花时间学习新工具吗？',
    options: [
      { text: '愿意，花1-2小时没问题', score: 3 },
      { text: '可以花半小时试试', score: 2 },
      { text: '希望打开就能用', score: 1 },
      { text: '不太清楚', score: 1 },
    ],
  },
  {
    id: 7,
    question: '你的电脑配置大约是什么水平？',
    options: [
      { text: '16GB以上内存，速度很快', score: 3 },
      { text: '8GB内存，还行', score: 2 },
      { text: '4GB或更少，有点卡', score: 0 },
      { text: '不太清楚配置', score: 1 },
    ],
  },
]

function getResult(score) {
  const maxScore = questions.length * 3
  if (score >= maxScore * 0.7) {
    return {
      title: '⭐ 非常适合！',
      desc: '你的电脑和环境非常适合安装 OpenClaw！它能帮你自动完成很多工作，比如整理文件、写报告、查资料等。大约花1小时配置好，就能体验AI自动化的强大了！',
      color: 'from-green-500 to-emerald-500',
      emoji: '🎉',
    }
  } else if (score >= maxScore * 0.5) {
    return {
      title: '👍 比较适合',
      desc: '你的电脑基本可以运行 OpenClaw。建议先看一下官方教程，花点时间配置一下。如果遇到问题，可以找会安装的朋友帮帮忙。实在不行也可以先用在线版体验。',
      color: 'from-blue-500 to-cyan-500',
      emoji: '💪',
    }
  } else if (score >= maxScore * 0.35) {
    return {
      title: '⚠️ 可以试试',
      desc: '你的电脑配置可能需要升级，或者需要找人帮忙安装。建议先多了解一下，或者让身边懂电脑的朋友帮忙看看。也可以先试试在线版本。',
      color: 'from-yellow-500 to-orange-500',
      emoji: '🤔',
    }
  } else {
    return {
      title: '❌ 暂不建议',
      desc: '目前你的电脑可能不太适合自己安装 OpenClaw。建议先升级一下电脑配置（比如加内存），或者试试在线版本的 AI 工具。等条件具备了再尝试安装。',
      color: 'from-red-500 to-pink-500',
      emoji: '😅',
    }
  }
}

export default function OpenClawCheckPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzeStep, setAnalyzeStep] = useState(0)

  // AI分析动画
  const analyzeSteps = [
    '正在分析你的电脑配置...',
    '正在评估你的技术经验...',
    '正在计算适配指数...',
    '正在生成专业建议...',
  ]

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalyzeStep((prev) => {
          if (prev < analyzeSteps.length - 1) {
            return prev + 1
          }
          return prev
        })
      }, 600)

      const timeout = setTimeout(() => {
        setIsAnalyzing(false)
        setShowResult(true)
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [isAnalyzing])

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setIsAnalyzing(true)
      setAnalyzeStep(0)
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

        {isAnalyzing ? (
          /* AI 分析中 */
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <div className="relative mb-8">
              {/* AI 扫描动画 */}
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-8 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">🤖</span>
                </div>
              </div>
              {/* 扫描线 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              🧠 AI 正在分析中...
            </h2>

            <div className="space-y-2 mb-6">
              {analyzeSteps.map((step, idx) => (
                <p
                  key={idx}
                  className={`text-sm transition-all duration-300 ${
                    idx === analyzeStep
                      ? 'text-purple-400 font-medium scale-105'
                      : idx < analyzeStep
                      ? 'text-green-400'
                      : 'text-white/30'
                  }`}
                >
                  {idx < analyzeStep ? '✓ ' : idx === analyzeStep ? '▸ ' : '○ '}
                  {step}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-white/50">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
              <span className="text-sm ml-2">AI 正在思考中</span>
            </div>
          </div>
        ) : !showResult ? (
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

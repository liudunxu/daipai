'use client'

import { useState, useEffect } from 'react'

export default function DicePage() {
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [particles, setParticles] = useState([])

  // 摇骰子函数
  const rollDice = () => {
    if (isRolling) return

    setIsRolling(true)
    setResult(null)

    // 生成随机结果
    const randomResult = Math.floor(Math.random() * 6) + 1
    const rollDuration = 1500 + Math.random() * 1000 // 1.5-2.5秒

    // 创建粒子效果
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 0.5 + Math.random() * 0.5
    }))
    setParticles(newParticles)

    // 延迟显示结果
    setTimeout(() => {
      setResult(randomResult)
      setHistory(prev => [randomResult, ...prev].slice(0, 10))
      setIsRolling(false)
      setParticles([])
    }, rollDuration)
  }

  // 点击屏幕任意位置摇骰
  useEffect(() => {
    const handleClick = () => rollDice()
    window.addEventListener('click', handleClick, { once: true })
    return () => window.removeEventListener('click', handleClick)
  }, [isRolling])

  // 获取骰子面的点数位置
  const getDotPositions = (num) => {
    const positions = {
      1: [{ top: '50%', left: '50%' }],
      2: [
        { top: '25%', left: '25%' },
        { top: '75%', left: '75%' }
      ],
      3: [
        { top: '25%', left: '25%' },
        { top: '50%', left: '50%' },
        { top: '75%', left: '75%' }
      ],
      4: [
        { top: '25%', left: '25%' },
        { top: '25%', left: '75%' },
        { top: '75%', left: '25%' },
        { top: '75%', left: '75%' }
      ],
      5: [
        { top: '25%', left: '25%' },
        { top: '25%', left: '75%' },
        { top: '50%', left: '50%' },
        { top: '75%', left: '25%' },
        { top: '75%', left: '75%' }
      ],
      6: [
        { top: '20%', left: '25%' },
        { top: '20%', left: '75%' },
        { top: '40%', left: '25%' },
        { top: '40%', left: '75%' },
        { top: '80%', left: '25%' },
        { top: '80%', left: '75%' }
      ]
    }
    return positions[num] || []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* 粒子效果 */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
          style={{
            top: `${p.x}%`,
            left: `${p.y}%`,
            animation: `particle ${p.duration}s ease-out ${p.delay}s forwards`,
          }}
        />
      ))}

      <div className="relative z-10 text-center">
        {/* 标题 */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          🎲 在线摇骰子
        </h1>
        <p className="text-white/60 mb-8">
          {isRolling ? '摇ing...' : '点击任意位置或按钮开始'}
        </p>

        {/* 骰子容器 */}
        <div className="relative w-48 h-48 mx-auto mb-8 perspective-1000">
          <div
            className={`w-full h-full transition-all duration-100 ${
              isRolling ? 'animate-roll' : result ? 'animate-bounce-subtle' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className={`w-40 h-40 mx-auto rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 ${
                isRolling
                  ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                  : 'bg-gradient-to-br from-white to-gray-100'
              } ${result ? 'shadow-yellow-400/50 shadow-[0_0_40px_rgba(250,204,21,0.4)]' : ''}`}
              style={{
                transform: isRolling
                  ? `rotateX(${360 + Math.random() * 720}deg) rotateY(${360 + Math.random() * 720}deg)`
                  : result
                  ? 'rotateX(0deg) rotateY(0deg)'
                  : 'rotateX(-20deg) rotateY(-20deg)',
              }}
            >
              {/* 骰子点数 */}
              <div className="relative w-24 h-24">
                {result && getDotPositions(result).map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-5 h-5 bg-gray-800 rounded-full shadow-inner"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: 'translate(-50%, -50%)',
                      animation: isRolling ? 'none' : `dot-appear 0.3s ease-out ${i * 0.05}s forwards`,
                      opacity: isRolling ? 0 : 1,
                    }}
                  />
                ))}
                {!result && !isRolling && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">🎲</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 光晕效果 */}
          {result && (
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-2xl animate-pulse"></div>
          )}
        </div>

        {/* 结果展示 */}
        {result && (
          <div className="mb-8 animate-scale-in">
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
              <p className="text-3xl font-black text-white">
                {result === 1 && '🔴 一点！'}
                {result === 2 && '🟠 两点！'}
                {result === 3 && '🟡 三点！'}
                {result === 4 && '🟢 四点！'}
                {result === 5 && '🔵 五点！'}
                {result === 6 && '🟣 六点！'}
              </p>
            </div>
          </div>
        )}

        {/* 摇骰按钮 */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
            isRolling ? 'animate-pulse' : ''
          }`}
        >
          {isRolling ? '🎲 摇ing...' : '🎲 开始摇骰'}
        </button>

        {/* 历史记录 */}
        {history.length > 0 && (
          <div className="mt-10">
            <p className="text-white/50 text-sm mb-3">最近记录</p>
            <div className="flex flex-wrap justify-center gap-2">
              {history.map((num, i) => (
                <span
                  key={i}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white font-bold text-sm animate-fade-in"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 提示 */}
        <p className="text-white/30 text-xs mt-10">
          也可以点击屏幕任意位置摇骰
        </p>
      </div>

      {/* 底部 */}
      <footer className="absolute bottom-4 w-full text-center">
        <a href="/" className="text-white/40 hover:text-white/60 text-sm transition-colors">
          ← 返回首页
        </a>
      </footer>

      <style jsx>{`
        @keyframes roll {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          25% { transform: rotateX(180deg) rotateY(90deg); }
          50% { transform: rotateX(360deg) rotateY(180deg); }
          75% { transform: rotateX(540deg) rotateY(270deg); }
          100% { transform: rotateX(720deg) rotateY(360deg); }
        }

        @keyframes particle {
          0% {
            opacity: 1;
            transform: scale(1) translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: scale(0) translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
          }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes dot-appear {
          0% { transform: translate(-50%, -50%) scale(0); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }

        .animate-roll {
          animation: roll 1s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

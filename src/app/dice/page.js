'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function DicePage() {
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [history, setHistory] = useState([])
  const [shake, setShake] = useState(false)
  const [particles, setParticles] = useState([])
  const buttonRef = useRef(null)

  // 创建粒子
  const createParticles = useCallback(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 30
      const velocity = 100 + Math.random() * 150
      return {
        id: i,
        x: 50,
        y: 50,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        delay: Math.random() * 0.1,
        size: 3 + Math.random() * 4,
      }
    })
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1500)
  }, [])

  // 摇骰子 - 简单直接方式
  const rollDice = useCallback(() => {
    if (isRolling) return

    setIsRolling(true)
    setResult(null)
    setShowResult(false)
    setShake(true)

    // 随机结果
    const randomResult = Math.floor(Math.random() * 6) + 1
    const rollDuration = 1500

    // 快速切换数字模拟摇动
    let counter = 0
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1)
      counter += 100
      if (counter >= rollDuration - 300) {
        clearInterval(interval)
        setResult(randomResult)
        setShowResult(true)
        setHistory(prev => [randomResult, ...prev].slice(0, 10))
        setIsRolling(false)
        setShake(false)
        createParticles()
      }
    }, 80)

  }, [isRolling, createParticles])

  // 点击屏幕摇骰
  useEffect(() => {
    const handleClick = (e) => {
      if (buttonRef.current?.contains(e.target)) return
      rollDice()
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [rollDice])

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        rollDice()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [rollDice])

  // 渲染骰子点数
  const renderDice = (num, showAnimation = false) => {
    const dotPositions = {
      1: [{ row: 2, col: 2 }],
      2: [{ row: 1, col: 1 }, { row: 3, col: 3 }],
      3: [{ row: 1, col: 1 }, { row: 2, col: 2 }, { row: 3, col: 3 }],
      4: [{ row: 1, col: 1 }, { row: 1, col: 3 }, { row: 3, col: 1 }, { row: 3, col: 3 }],
      5: [{ row: 1, col: 1 }, { row: 1, col: 3 }, { row: 2, col: 2 }, { row: 3, col: 1 }, { row: 3, col: 3 }],
      6: [{ row: 1, col: 1 }, { row: 1, col: 3 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 1 }, { row: 3, col: 3 }],
    }

    const dots = dotPositions[num] || []

    return (
      <div className="grid grid-cols-3 gap-2 w-28 h-28 p-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const row = Math.ceil(i / 3)
          const col = ((i - 1) % 3) + 1
          const hasDot = dots.some(d => d.row === row && d.col === col)

          return (
            <div
              key={i}
              className={`rounded-full flex items-center justify-center transition-all duration-200 ${
                hasDot ? 'bg-gray-800' : 'bg-transparent'
              }`}
              style={{
                width: '100%',
                height: '100%',
                transform: hasDot ? 'scale(1)' : 'scale(1)',
                opacity: hasDot ? 1 : 0,
              }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* 背景光效 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]"></div>
      </div>

      {/* 粒子 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {particles.map((p) => (
          <circle
            key={p.id}
            cx="50%"
            cy="50%"
            r={p.size}
            fill={p.id % 2 === 0 ? '#fbbf24' : '#f472b6'}
            filter="url(#glow)"
            style={{
              animation: `particleFly 0.8s ease-out ${p.delay}s forwards`,
              '--vx': `${p.vx}px`,
              '--vy': `${p.vy}px`,
            }}
          />
        ))}
      </svg>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
          🎲 在线摇骰子
        </h1>
        <p className="text-white/60 mb-10 text-lg">
          {isRolling ? '摇ing...' : '点击任意位置 / 按空格键 / 点击按钮'}
        </p>

        {/* 骰子 */}
        <div className="relative w-48 h-48 mx-auto mb-10">
          {/* 骰子主体 */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-2xl flex items-center justify-center transition-all duration-200 ${
              isRolling ? 'animate-shake' : ''
            } ${
              showResult
                ? 'bg-gradient-to-br from-white to-gray-100 shadow-[0_0_60px_rgba(251,191,36,0.6)] scale-105'
                : 'bg-gradient-to-br from-gray-100 to-gray-300 shadow-xl'
            }`}
          >
            {result ? renderDice(result, isRolling) : renderDice(1)}
          </div>

          {/* 摇动时的光晕效果 */}
          {isRolling && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-2xl bg-purple-500/30 animate-pulse blur-xl"></div>
          )}
        </div>

        {/* 结果展示 */}
        <div className={`mb-8 transition-all duration-500 ${showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-block px-10 py-5 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform">
            <p className="text-4xl font-black text-white drop-shadow-lg">
              {result === 1 && '🔴 一点！'}
              {result === 2 && '🟠 两点！'}
              {result === 3 && '🟡 三点！'}
              {result === 4 && '🟢 四点！'}
              {result === 5 && '🔵 五点！'}
              {result === 6 && '🟣 六点！'}
            </p>
          </div>
        </div>

        {/* 按钮 */}
        <button
          ref={buttonRef}
          onClick={rollDice}
          disabled={isRolling}
          className={`px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-purple-500/40 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
            isRolling ? 'animate-pulse scale-105' : 'hover:scale-105'
          }`}
          style={{
            boxShadow: isRolling
              ? '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)'
              : '0 10px 40px rgba(168, 85, 247, 0.3)',
          }}
        >
          {isRolling ? (
            <span className="flex items-center gap-3">
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              摇ing...
            </span>
          ) : (
            '🎲 开始摇骰'
          )}
        </button>

        {/* 历史记录 */}
        {history.length > 0 && (
          <div className="mt-12">
            <p className="text-white/40 text-sm mb-4">最近记录</p>
            <div className="flex flex-wrap justify-center gap-3">
              {history.map((num, i) => (
                <span
                  key={i}
                  className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl text-white font-bold text-lg border border-white/10"
                  style={{
                    animation: i === 0 ? `historyPop 0.4s ease-out forwards` : 'none',
                    opacity: i === 0 ? 1 : 0.6,
                  }}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="absolute bottom-6 w-full text-center z-20">
        <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
          ← 返回首页
        </a>
      </footer>

      <style jsx>{`
        @keyframes particleFly {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--vx), var(--vy)) scale(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0); }
          10% { transform: translateX(-8px) translateY(-6px) rotate(-10deg); }
          20% { transform: translateX(8px) translateY(6px) rotate(10deg); }
          30% { transform: translateX(-8px) translateY(6px) rotate(-10deg); }
          40% { transform: translateX(8px) translateY(-6px) rotate(10deg); }
          50% { transform: translateX(-5px) translateY(3px) rotate(-5deg); }
          60% { transform: translateX(5px) translateY(-3px) rotate(5deg); }
          70% { transform: translateX(-3px) translateY(2px) rotate(-3deg); }
          80% { transform: translateX(3px) translateY(-2px) rotate(3deg); }
        }

        @keyframes historyPop {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .animate-shake { animation: shake 0.1s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

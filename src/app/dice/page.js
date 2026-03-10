'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// 骰子6个面的点数配置
const DICE_FACES = {
  1: { rotateX: 0, rotateY: 0 },
  2: { rotateX: 0, rotateY: -90 },
  3: { rotateX: 0, rotateY: -180 },
  4: { rotateX: 0, rotateY: 90 },
  5: { rotateX: -90, rotateY: 0 },
  6: { rotateX: 90, rotateY: 0 },
}

// 点数对应的圆点位置
const DOT_POSITIONS = {
  1: [{ cx: 50, cy: 50 }],
  2: [{ cx: 25, cy: 25 }, { cx: 75, cy: 75 }],
  3: [{ cx: 25, cy: 25 }, { cx: 50, cy: 50 }, { cx: 75, cy: 75 }],
  4: [{ cx: 25, cy: 25 }, { cx: 75, cy: 25 }, { cx: 25, cy: 75 }, { cx: 75, cy: 75 }],
  5: [{ cx: 25, cy: 25 }, { cx: 75, cy: 25 }, { cx: 50, cy: 50 }, { cx: 25, cy: 75 }, { cx: 75, cy: 75 }],
  6: [{ cx: 25, cy: 20 }, { cx: 75, cy: 20 }, { cx: 25, cy: 50 }, { cx: 75, cy: 50 }, { cx: 25, cy: 80 }, { cx: 75, cy: 80 }],
}

export default function DicePage() {
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [history, setHistory] = useState([])
  const [shake, setShake] = useState(false)
  const [particles, setParticles] = useState([])
  const diceRef = useRef(null)
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

  // 摇骰子函数
  const rollDice = useCallback(() => {
    if (isRolling) return

    setIsRolling(true)
    setResult(null)
    setShowResult(false)
    setShake(true)

    // 生成随机结果
    const randomResult = Math.floor(Math.random() * 6) + 1
    const rollDuration = 2000

    // 随机旋转圈数（确保最终面向正确）
    const extraRotationsX = (3 + Math.floor(Math.random() * 3)) * 360
    const extraRotationsY = (3 + Math.floor(Math.random() * 3)) * 360

    // 设置骰子DOM的旋转
    if (diceRef.current) {
      const targetFace = DICE_FACES[randomResult]
      diceRef.current.style.transition = 'none'
      diceRef.current.style.transform = `
        translateZ(-50px)
        rotateX(${extraRotationsX}deg)
        rotateY(${extraRotationsY}deg)
      `
    }

    // 抖动效果
    setTimeout(() => setShake(false), 300)

    // 延迟后显示结果
    setTimeout(() => {
      if (diceRef.current) {
        const targetFace = DICE_FACES[randomResult]
        diceRef.current.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        diceRef.current.style.transform = `
          translateZ(-50px)
          rotateX(${extraRotationsX + targetFace.rotateX}deg)
          rotateY(${extraRotationsY + targetFace.rotateY}deg)
        `
      }
    }, 100)

    // 创建粒子效果
    setTimeout(createParticles, rollDuration - 300)

    // 显示最终结果
    setTimeout(() => {
      setResult(randomResult)
      setShowResult(true)
      setHistory(prev => [randomResult, ...prev].slice(0, 10))
      setIsRolling(false)
    }, rollDuration)
  }, [isRolling, createParticles])

  // 点击屏幕任意位置摇骰
  useEffect(() => {
    const handleClick = (e) => {
      // 排除按钮点击
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

  // 生成随机预览点数
  const previewDots = DOT_POSITIONS[Math.floor(Math.random() * 6) + 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* 背景光效 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]"></div>
      </div>

      {/* 粒子爆炸效果 */}
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
              animation: `particle-fly 0.8s ease-out ${p.delay}s forwards`,
              '--vx': `${p.vx}px`,
              '--vy': `${p.vy}px`,
            }}
          />
        ))}
      </svg>

      <div className="relative z-10 text-center" style={{ zIndex: 10 }}>
        {/* 标题 */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
          🎲 在线摇骰子
        </h1>
        <p className="text-white/60 mb-10 text-lg">
          {isRolling ? '摇ing...' : '点击任意位置 / 按空格键 / 点击按钮'}
        </p>

        {/* 3D骰子舞台 */}
        <div className="relative w-64 h-64 mx-auto mb-10" style={{ perspective: '800px' }}>
          {/* 骰子容器 */}
          <div
            ref={diceRef}
            className={`absolute left-1/2 top-1/2 w-40 h-40 ${shake ? 'animate-shake' : ''}`}
            style={{
              transformStyle: 'preserve-3d',
              marginLeft: '-80px',
              marginTop: '-80px',
            }}
          >
            {/* 骰子6个面 */}
            {Object.entries(DICE_FACES).map(([num, rotation], index) => (
              <div
                key={num}
                className={`absolute inset-0 w-40 h-40 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  showResult && result === parseInt(num)
                    ? 'bg-gradient-to-br from-white to-gray-100 shadow-[0_0_60px_rgba(251,191,36,0.6)]'
                    : 'bg-gradient-to-br from-gray-100 to-gray-300'
                }`}
                style={{
                  transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg) translateZ(50px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  {DOT_POSITIONS[num].map((pos, i) => (
                    <circle
                      key={i}
                      cx={pos.cx}
                      cy={pos.cy}
                      r={10}
                      fill="#1f2937"
                      style={{
                        animation: showResult && result === parseInt(num)
                          ? `dot-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s forwards`
                          : 'none',
                        opacity: showResult && result === parseInt(num) ? 1 : (showResult ? 0.3 : 1),
                        transform: showResult && result === parseInt(num) ? 'scale(0)' : 'scale(1)',
                        transformOrigin: `${pos.cx}% ${pos.cy}%`,
                        transition: 'opacity 0.3s',
                      }}
                    />
                  ))}
                </svg>
              </div>
            ))}

            {/* 骰子边框 */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                transform: 'translateZ(50px)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            />
          </div>

          {/* 摇动时的速度线 */}
          {shake && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-8 bg-white/60 rounded-full"
                    style={{
                      animation: `speed-line 0.3s ease-out forwards`,
                      transform: `rotate(${i * 45}deg) translateY(-70px)`,
                      animationDelay: `${i * 0.03}s`,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 结果展示 */}
        <div
          className={`mb-8 transition-all duration-500 ${showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
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

        {/* 摇骰按钮 */}
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
                    animation: `history-pop 0.3s ease-out ${i * 0.05}s backwards`,
                  }}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 底部 */}
      <footer className="absolute bottom-6 w-full text-center z-20">
        <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
          ← 返回首页
        </a>
      </footer>

      <style jsx>{`
        @keyframes particle-fly {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--vx), var(--vy)) scale(0);
          }
        }

        @keyframes speed-line {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation, 0deg)) translateY(-70px) scaleY(0.5);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation, 0deg)) translateY(-120px) scaleY(1);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-15px) translateY(-10px) rotate(-5deg); }
          20% { transform: translateX(15px) translateY(10px) rotate(5deg); }
          30% { transform: translateX(-15px) translateY(10px) rotate(-5deg); }
          40% { transform: translateX(15px) translateY(-10px) rotate(5deg); }
          50% { transform: translateX(-10px) translateY(5px) rotate(-3deg); }
          60% { transform: translateX(10px) translateY(-5px) rotate(3deg); }
          70% { transform: translateX(-5px) translateY(3px) rotate(-2deg); }
          80% { transform: translateX(5px) translateY(-3px) rotate(2deg); }
          90% { transform: translateX(-2px) translateY(1px); }
        }

        @keyframes dot-pop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        @keyframes history-pop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.4); }
          50% { box-shadow: 0 0 80px rgba(251, 191, 36, 0.8); }
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        .perspective-800 {
          perspective: 800px;
        }
      `}</style>
    </div>
  )
}

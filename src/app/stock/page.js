'use client'

import { useState, useEffect } from 'react'
import AffiliateLink from '../../components/AffiliateLink'
import FAQSchema, { stockFAQs } from '../../components/FAQSchema'

export default function StockPage() {
  const [result, setResult] = useState(null)
  const [isRolling, setIsRolling] = useState(false)
  const [history, setHistory] = useState([])

  // 涨的图片
  const upImages = [
    'https://img2.baidu.com/it/u=2731139033,2856721123&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=500',
    'https://img1.baidu.com/it/u=1405662506,388031220&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500',
  ]

  // 跌的图片
  const downImages = [
    'https://img2.baidu.com/it/u=4089263971,3127396884&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500',
    'https://img0.baidu.com/it/u=2209049682,3316918132&fm=253&fmt=auto&app=120&f=JPEG?w=605&h=500',
  ]

  // 预测文案
  const upMessages = [
    '🚀 涨涨涨！今天梭哈！',
    '💰 红包行情来了！冲！',
    '📈 绿油油的一片，赚麻了！',
    '🎉 大涨的日子，必须庆祝！',
    '💎 钻石底出现，梭哈入！',
  ]

  const downMessages = [
    '📉 跌跌跌，快跑！',
    '😭 绿油油，心凉凉...',
    '⏳ 抄底？再等等！',
    '📊 调整来了，别冲动！',
    '🔻 跌妈不认，休息！',
  ]

  const predict = () => {
    if (isRolling) return
    setIsRolling(true)
    setResult(null)

    // 随机预测涨跌
    const willRise = Math.random() > 0.5
    const duration = 1500

    // 快速切换效果
    let count = 0
    const interval = setInterval(() => {
      setResult({
        willRise: Math.random() > 0.5,
        image: '',
        message: '',
      })
      count += 100
      if (count >= duration - 200) {
        clearInterval(interval)

        const finalResult = {
          willRise,
          image: willRise
            ? upImages[Math.floor(Math.random() * upImages.length)]
            : downImages[Math.floor(Math.random() * downImages.length)],
          message: willRise
            ? upMessages[Math.floor(Math.random() * upMessages.length)]
            : downMessages[Math.floor(Math.random() * downMessages.length)],
        }
        setResult(finalResult)
        setHistory(prev => [{
          ...finalResult,
          time: new Date().toLocaleTimeString()
        }, ...prev].slice(0, 8))
        setIsRolling(false)
      }
    }, 80)
  }

  // 键盘空格预测
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        predict()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRolling])

  return (
    <>
      <FAQSchema faqs={stockFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col items-center p-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-red-500/10 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-md mx-auto mt-8">
        {/* 标题 */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
          📊 今天会涨吗？
        </h1>
        <p className="text-white/60 mb-8 text-lg">
          {isRolling ? '算命中...' : '点击按钮 / 空格键 预测今日行情'}
        </p>

        {/* 结果区域 */}
        <div className="mb-8">
          {result ? (
            <div
              className="transition-all duration-500"
              style={{
                animation: result.willRise
                  ? 'scaleIn 0.5s ease-out forwards'
                  : 'shake 0.5s ease-out',
              }}
            >
              <div className={`inline-block px-8 py-4 rounded-2xl shadow-2xl mb-6 ${
                result.willRise
                  ? 'bg-gradient-to-r from-red-400 to-rose-500'
                  : 'bg-gradient-to-r from-green-400 to-emerald-500'
              }`}>
                <p className="text-3xl font-black text-white">
                  {result.willRise ? '📈 要涨！' : '📉 要跌！'}
                </p>
              </div>
              <p className="text-2xl font-bold text-white mb-4">
                {result.message}
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <div className="text-6xl mb-4">🔮</div>
              <p className="text-white/40">预测一下今日运势</p>
            </div>
          )}
        </div>

        {/* 图片展示 - 只在动画结束后显示 */}
        {result && !isRolling && (
          <div className="mb-8" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
            <img
              src={result.image}
              alt={result.willRise ? '上涨' : '下跌'}
              className="w-full rounded-2xl shadow-2xl border-4 border-white/20"
              loading="lazy"
            />
          </div>
        )}

        {/* 预测按钮 */}
        <button
          onClick={predict}
          disabled={isRolling}
          className={`px-10 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
            isRolling ? 'animate-pulse' : ''
          }`}
          style={{
            boxShadow: isRolling
              ? '0 0 40px rgba(234,179,8,0.6)'
              : '0 10px 40px rgba(234,179,8,0.3)',
          }}
        >
          {isRolling ? '🧐 正在算命...' : '🔮 开始预测'}
        </button>

        {/* 免责声明 */}
        <p className="text-white/30 text-xs mt-6 px-4">
          ⚠️ 纯属娱乐，仅供消遣，不构成投资建议
        </p>

        {/* 历史记录 */}
        {history.length > 0 && (
          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="text-white/40 text-sm mb-4">最近预测</p>
            <div className="flex flex-wrap justify-center gap-2">
              {history.map((item, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.willRise
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {item.willRise ? '📈涨' : '📉跌'}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 联盟推广 */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
        <h3 className="text-white font-bold mb-3 text-center">📈 股票开户推荐</h3>
        <p className="text-white/60 text-sm mb-4 text-center">
          大券商低佣金开户，扫码享专属福利
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <AffiliateLink
            url="https://www.eastmoney.com"
            text="东方财富"
            platform="jingdong"
          />
          <AffiliateLink
            url="https://www.xueqiu.com"
            text="雪球"
            platform="app"
          />
          <AffiliateLink
            url="https://www.10jqka.com.cn"
            text="同花顺"
            platform="app"
          />
        </div>
      </div>

      {/* 常见问题 - Google SEO 要求内容必须可见 */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
        <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
        <div className="space-y-4">
          {stockFAQs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
              <p className="text-white/50 text-xs">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 底部 */}
      <footer className="absolute bottom-4 w-full text-center">
        <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
          ← 返回首页
        </a>
      </footer>

      <style jsx>{`
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
      `}</style>
    </div>
    </>
  )
}

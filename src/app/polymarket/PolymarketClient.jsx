'use client'

import { useState, useEffect } from 'react'

export default function PolymarketClient() {
  const [markets, setMarkets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchMarkets()
  }, [])

  async function fetchMarkets() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/polymarket')
      const result = await response.json()

      if (result.success && result.data) {
        // 提取 markets 数组
        const marketsData = result.data.markets || result.data || []
        setMarkets(marketsData)
        setLastUpdate(new Date(result.timestamp))
      } else {
        setMarkets([])
        setError('暂无数据')
      }
    } catch (err) {
      console.error('Failed to fetch markets:', err)
      setError('加载失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  // 格式化概率显示
  function formatProbability(market) {
    if (!market.outcomes || market.outcomes.length < 2) return null

    const outcomes = market.outcomes
    const prices = market.outcomePrices ? JSON.parse(market.outcomePrices) : null

    return outcomes.map((outcome, i) => {
      const price = prices ? prices[i] : null
      const probability = price ? (parseFloat(price) * 100).toFixed(1) : '—'
      return { outcome, probability }
    })
  }

  // 解析 YES 概率
  function getYesProbability(market) {
    try {
      const prices = market.outcomePrices ? JSON.parse(market.outcomePrices) : null
      if (prices && prices.length > 0) {
        return (parseFloat(prices[0]) * 100).toFixed(1)
      }
    } catch (e) {}
    return null
  }

  // 过滤市场
  const filteredMarkets = markets.filter(market => {
    if (activeTab === 'all') return true
    if (activeTab === 'crypto') {
      const question = (market.question || '').toLowerCase()
      return question.includes('bitcoin') || question.includes('crypto') || question.includes('eth')
    }
    if (activeTab === 'politics') {
      const question = (market.question || '').toLowerCase()
      return question.includes('trump') || question.includes('biden') || question.includes('election') || question.includes('president')
    }
    if (activeTab === 'tech') {
      const question = (market.question || '').toLowerCase()
      return question.includes('ai') || question.includes('tech') || question.includes('google') || question.includes('meta')
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <span className="text-4xl">🎰</span>
            Polymarket 预测市场
          </h1>
          <p className="text-white/60">
            查看全球用户对热点事件的实时预测
          </p>
          {lastUpdate && (
            <p className="text-white/40 text-sm mt-2">
              数据更新时间：{lastUpdate.toLocaleString('zh-CN')}
            </p>
          )}
        </header>

        {/* 免责声明 */}
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-8 max-w-3xl mx-auto">
          <p className="text-yellow-200 text-sm text-center">
            ⚠️ 预测市场仅供参考，不代表任何投资建议。赌博有害健康，请理性参与。
          </p>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin text-6xl mb-4">🌀</div>
            <p className="text-white/60">正在加载预测市场数据...</p>
          </div>
        )}

        {/* 错误状态 */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-white/60 mb-4">{error}</p>
            <button
              onClick={fetchMarkets}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
            >
              重新加载
            </button>
          </div>
        )}

        {/* 市场列表 */}
        {!loading && !error && (
          <>
            {/* 分类标签 */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { key: 'all', label: '全部', emoji: '📊' },
                { key: 'crypto', label: '加密货币', emoji: '₿' },
                { key: 'politics', label: '政治', emoji: '🏛️' },
                { key: 'tech', label: '科技', emoji: '💻' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {tab.emoji} {tab.label}
                </button>
              ))}
            </div>

            {/* 市场卡片 */}
            {filteredMarkets.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-white/60">暂无市场数据</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMarkets.map((market, index) => {
                  const yesProb = getYesProbability(market)

                  return (
                    <div
                      key={market.id || index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors"
                    >
                      {/* 问题标题 */}
                      <h3 className="text-white font-bold text-lg mb-3 line-clamp-2">
                        {market.question || '未知问题'}
                      </h3>

                      {/* 概率显示 */}
                      <div className="flex flex-wrap gap-3 mb-3">
                        {market.outcomes && market.outcomes.map((outcome, i) => {
                          const prob = formatProbability(market)
                          const probability = prob ? prob[i]?.probability : '—'
                          const isYes = outcome.toLowerCase().includes('yes') || outcome === 'Yes'
                          const isNo = outcome.toLowerCase().includes('no') || outcome === 'No'

                          return (
                            <div
                              key={i}
                              className={`px-4 py-2 rounded-xl ${
                                isYes ? 'bg-green-500/30' : isNo ? 'bg-red-500/30' : 'bg-white/10'
                              }`}
                            >
                              <span className="text-white/70 text-sm">{outcome}</span>
                              <span className={`ml-2 font-bold ${
                                isYes ? 'text-green-400' : isNo ? 'text-red-400' : 'text-white'
                              }`}>
                                {probability}%
                              </span>
                            </div>
                          )
                        })}
                      </div>

                      {/* 市场信息 */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                        {market.volume && (
                          <span className="flex items-center gap-1">
                            📊 交易量: ${(parseFloat(market.volume) / 1000000).toFixed(2)}M
                          </span>
                        )}
                        {market.liquidity && (
                          <span className="flex items-center gap-1">
                            💧 流动性: ${(parseFloat(market.liquidity) / 1000000).toFixed(2)}M
                          </span>
                        )}
                        {market.endDate && (
                          <span className="flex items-center gap-1">
                            📅 截止: {new Date(market.endDate).toLocaleDateString('zh-CN')}
                          </span>
                        )}
                        {market.isResolved !== undefined && (
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            market.isResolved ? 'bg-green-500/30 text-green-400' : 'bg-blue-500/30 text-blue-400'
                          }`}>
                            {market.isResolved ? '✅ 已结算' : '🔄 进行中'}
                          </span>
                        )}
                      </div>

                      {/* 跳转链接 */}
                      {market.url && (
                        <a
                          href={market.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm"
                        >
                          查看详情 →
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* 刷新按钮 */}
            <div className="text-center mt-8">
              <button
                onClick={fetchMarkets}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                🔄 刷新数据
              </button>
            </div>
          </>
        )}

        {/* 底部 */}
        <footer className="mt-12 text-center">
          <p className="text-white/40 text-xs mb-2">
            📡 数据来源：Polymarket Gamma API | 仅供娱乐参考，不构成投资建议
          </p>
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}

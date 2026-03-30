'use client'

import { useState, useEffect } from 'react'

export default function PolymarketClient() {
  const [events, setEvents] = useState([])
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

      console.log('Polymarket API result:', JSON.stringify(result, null, 2).substring(0, 3000))

      if (result.success && result.data) {
        // API 直接返回数组或 { events: [...] }
        let eventsData = []
        if (Array.isArray(result.data)) {
          eventsData = result.data
        } else if (result.data.events) {
          eventsData = result.data.events
        } else if (result.data.data) {
          eventsData = result.data.data
        }
        setEvents(eventsData)
        setLastUpdate(new Date(result.timestamp))
      } else {
        setEvents([])
        setError('暂无数据')
      }
    } catch (err) {
      console.error('Failed to fetch markets:', err)
      setError('加载失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  // 解析概率 - outcomes 和 outcomePrices 是字符串格式的 JSON
  function getOutcomesWithProb(market) {
    let outcomes = []
    let probabilities = []

    // 解析 outcomes（可能是字符串或数组）
    if (typeof market.outcomes === 'string') {
      try {
        outcomes = JSON.parse(market.outcomes)
      } catch (e) {
        outcomes = []
      }
    } else if (Array.isArray(market.outcomes)) {
      outcomes = market.outcomes
    }

    // 解析概率
    // 优先使用 outcomePrices（已经在 0-1 范围）
    if (market.outcomePrices) {
      try {
        const prices = typeof market.outcomePrices === 'string'
          ? JSON.parse(market.outcomePrices)
          : market.outcomePrices
        // outcomePrices 是 0-1 的小数，转为百分比
        probabilities = prices.map(p => (parseFloat(p) * 100).toFixed(1))
      } catch (e) {
        console.log('outcomePrices parse error:', e)
        probabilities = []
      }
    }

    // 如果没有 outcomePrices，尝试 probabilities
    if (probabilities.length === 0 && market.probabilities) {
      try {
        const probs = typeof market.probabilities === 'string'
          ? JSON.parse(market.probabilities)
          : market.probabilities
        // probabilities 可能是百分比或小数
        probabilities = probs.map(p => {
          const val = parseFloat(p)
          return val > 1 ? val.toFixed(1) : (val * 100).toFixed(1)
        })
      } catch (e) {
        console.log('probabilities parse error:', e)
        probabilities = []
      }
    }

    console.log('Market outcomes:', outcomes, 'probabilities:', probabilities, 'raw outcomePrices:', market.outcomePrices)

    return outcomes.map((outcome, i) => ({
      outcome,
      probability: probabilities[i] || '—'
    }))
  }

  // 判断 outcome 类型
  function getOutcomeType(outcome) {
    const lower = outcome.toLowerCase()
    if (lower.includes('yes') || lower === 'yes' || lower === 'true') return 'yes'
    if (lower.includes('no') || lower === 'no' || lower === 'false') return 'no'
    return 'other'
  }

  // 过滤事件
  const filteredEvents = events.filter(event => {
    // 优先用 title，其次用 markets[0].question
    const questionText = (event.title || event.markets?.[0]?.question || '').toLowerCase()
    if (activeTab === 'all') return true
    if (activeTab === 'crypto') {
      return questionText.includes('bitcoin') || questionText.includes('crypto') ||
             questionText.includes('eth') || questionText.includes('solana')
    }
    if (activeTab === 'politics') {
      return questionText.includes('trump') || questionText.includes('biden') ||
             questionText.includes('election') || questionText.includes('president') ||
             questionText.includes('congress') || questionText.includes('senate')
    }
    if (activeTab === 'tech') {
      return questionText.includes('ai') || questionText.includes('apple') ||
             questionText.includes('google') || questionText.includes('meta') ||
             questionText.includes('microsoft') || questionText.includes('nvidia')
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

            {/* 事件卡片 */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-white/60">暂无市场数据</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredEvents.map((event, index) => {
                  const markets = event.markets || []
                  const primaryMarket = markets[0] || {}

                  return (
                    <div
                      key={event.id || index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors"
                    >
                      {/* 问题标题 - 优先用 title，否则用 markets[0].question */}
                      <h3 className="text-white font-bold text-lg mb-3 line-clamp-2">
                        {event.title || event.markets?.[0]?.question || '未知问题'}
                      </h3>

                      {/* 描述 */}
                      {event.description && (
                        <p className="text-white/50 text-sm mb-3 line-clamp-2">
                          {event.description.substring(0, 200)}
                        </p>
                      )}

                      {/* 概率显示 - 从第一个市场获取 */}
                      {primaryMarket.outcomes && primaryMarket.outcomes.length > 0 ? (
                        <div className="flex flex-wrap gap-3 mb-3">
                          {getOutcomesWithProb(primaryMarket).map((item, i) => {
                            const type = getOutcomeType(item.outcome)
                            return (
                              <div
                                key={i}
                                className={`px-4 py-2 rounded-xl ${
                                  type === 'yes' ? 'bg-green-500/30' :
                                  type === 'no' ? 'bg-red-500/30' : 'bg-white/10'
                                }`}
                              >
                                <span className="text-white/70 text-sm">{item.outcome}</span>
                                <span className={`ml-2 font-bold ${
                                  type === 'yes' ? 'text-green-400' :
                                  type === 'no' ? 'text-red-400' : 'text-white'
                                }`}>
                                  {item.probability !== '—' ? `${item.probability}%` : '—'}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="text-white/50 text-sm mb-3">暂无概率数据</p>
                      )}

                      {/* 市场信息 */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                        {primaryMarket.volume && (
                          <span className="flex items-center gap-1">
                            📊 交易量: ${(parseFloat(primaryMarket.volume) / 1000000).toFixed(2)}M
                          </span>
                        )}
                        {primaryMarket.liquidity && (
                          <span className="flex items-center gap-1">
                            💧 流动性: ${(parseFloat(primaryMarket.liquidity) / 1000000).toFixed(2)}M
                          </span>
                        )}
                        {event.endDate && (
                          <span className="flex items-center gap-1">
                            📅 截止: {new Date(event.endDate).toLocaleDateString('zh-CN')}
                          </span>
                        )}
                        {event.closed !== undefined && (
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            event.closed ? 'bg-green-500/30 text-green-400' : 'bg-blue-500/30 text-blue-400'
                          }`}>
                            {event.closed ? '✅ 已结束' : '🔄 进行中'}
                          </span>
                        )}
                      </div>

                      {/* 跳转链接 */}
                      {event.url && (
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm"
                        >
                          查看详情 →
                        </a>
                      )}
                      {!event.url && event.id && (
                        <a
                          href={`https://polymarket.com/event/${event.slug || event.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm"
                        >
                          在 Polymarket 查看 →
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

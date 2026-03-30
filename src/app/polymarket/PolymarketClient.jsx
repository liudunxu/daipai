'use client'

import { useState, useEffect } from 'react'

// 预设标签配置（从 Polymarket 文档获取）
const PRESET_TAGS = [
  { id: '2', name: 'Politics', emoji: '🏛️', slug: 'politics' },
  { id: '120', name: 'Finance', emoji: '💰', slug: 'finance' },
  { id: '21', name: 'Crypto', emoji: '₿', slug: 'crypto' },
  { id: '100639', name: 'Sports', emoji: '⚽', slug: 'sports' },
  { id: '100381', name: 'Economics', emoji: '📊', slug: 'economics' },
  { id: '555', name: 'Tech', emoji: '💻', slug: 'tech' },
  { id: '185', name: 'World', emoji: '🌍', slug: 'world' },
  { id: '100100', name: 'Science', emoji: '🔬', slug: 'science' },
]

export default function PolymarketClient() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [sortBy, setSortBy] = useState('trending')
  const [activeTag, setActiveTag] = useState('all')

  useEffect(() => {
    fetchTagsAndEvents()
  }, [sortBy, activeTag])

  async function fetchTagsAndEvents() {
    try {
      setLoading(true)
      setError(null)

      let url = `/api/polymarket?type=${sortBy}`
      if (activeTag !== 'all') {
        const tag = PRESET_TAGS.find(t => t.slug === activeTag)
        if (tag) {
          url = `/api/polymarket?type=byTag&tagId=${tag.id}`
        }
      }

      const response = await fetch(url)
      const result = await response.json()

      if (result.success && result.data) {
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

  function getOutcomesWithProb(market) {
    let outcomes = []
    let probabilities = []

    if (typeof market.outcomes === 'string') {
      try {
        outcomes = JSON.parse(market.outcomes)
      } catch (e) {
        outcomes = []
      }
    } else if (Array.isArray(market.outcomes)) {
      outcomes = market.outcomes
    }

    if (market.outcomePrices) {
      try {
        const prices = typeof market.outcomePrices === 'string'
          ? JSON.parse(market.outcomePrices)
          : market.outcomePrices
        probabilities = prices.map(p => (parseFloat(p) * 100).toFixed(1))
      } catch (e) {
        probabilities = []
      }
    }

    if (probabilities.length === 0 && market.probabilities) {
      try {
        const probs = typeof market.probabilities === 'string'
          ? JSON.parse(market.probabilities)
          : market.probabilities
        probabilities = probs.map(p => {
          const val = parseFloat(p)
          return val > 1 ? val.toFixed(1) : (val * 100).toFixed(1)
        })
      } catch (e) {
        probabilities = []
      }
    }

    return outcomes.map((outcome, i) => ({
      outcome,
      probability: probabilities[i] || '—'
    }))
  }

  function getOutcomeType(outcome) {
    const lower = outcome.toLowerCase()
    if (lower.includes('yes') || lower === 'yes' || lower === 'true') return 'yes'
    if (lower.includes('no') || lower === 'no' || lower === 'false') return 'no'
    return 'other'
  }

  // 统计信息
  const totalVolume24h = events.reduce((sum, e) => sum + (e.volume24hr || 0), 0)
  const totalVolume = events.reduce((sum, e) => sum + (e.volume || 0), 0)
  const totalLiquidity = events.reduce((sum, e) => sum + (e.liquidity || 0), 0)
  const activeMarkets = events.filter(e => !e.closed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <span className="text-4xl">🎰</span>
            Polymarket 预测市场
          </h1>
          <p className="text-white/60">
            全球最大的预测市场 | 查看热点事件交易概率
          </p>
          {lastUpdate && (
            <p className="text-white/40 text-sm mt-2">
              更新于 {lastUpdate.toLocaleString('zh-CN')}
            </p>
          )}
        </header>

        {/* 免责声明 */}
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-8 max-w-3xl mx-auto">
          <p className="text-yellow-200 text-sm text-center">
            ⚠️ 预测市场仅供参考娱乐，不构成投资建议 | 数据来源：Polymarket Gamma API
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
              onClick={fetchTagsAndEvents}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
            >
              重新加载
            </button>
          </div>
        )}

        {/* 市场列表 */}
        {!loading && !error && (
          <>
            {/* 排序选项 */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="text-white/50 text-sm py-2">排序：</span>
              {[
                { key: 'trending', label: '🔥 热门' },
                { key: 'expiring', label: '⏰ 即将到期' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSortBy(tab.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    sortBy === tab.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 分类标签 */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                onClick={() => setActiveTag('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTag === 'all'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                📊 全部
              </button>
              {PRESET_TAGS.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTag === tag.slug
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {tag.emoji} {tag.name}
                </button>
              ))}
            </div>

            {/* 统计概览 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl p-4 border border-orange-500/20">
                <div className="text-orange-400 text-xs mb-1">24h 交易量</div>
                <div className="text-2xl font-bold text-white">
                  ${totalVolume24h > 1000000 ? `${(totalVolume24h / 1000000).toFixed(1)}M` : `${(totalVolume24h / 1000).toFixed(0)}K`}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-4 border border-green-500/20">
                <div className="text-green-400 text-xs mb-1">总交易量</div>
                <div className="text-2xl font-bold text-white">
                  ${totalVolume > 1000000 ? `${(totalVolume / 1000000).toFixed(1)}M` : `${(totalVolume / 1000).toFixed(0)}K`}
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-xl p-4 border border-cyan-500/20">
                <div className="text-cyan-400 text-xs mb-1">流动性</div>
                <div className="text-2xl font-bold text-white">
                  ${totalLiquidity > 1000000 ? `${(totalLiquidity / 1000000).toFixed(1)}M` : `${(totalLiquidity / 1000).toFixed(0)}K`}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/20">
                <div className="text-purple-400 text-xs mb-1">市场数 / 进行中</div>
                <div className="text-2xl font-bold text-white">
                  {events.length} / {activeMarkets}
                </div>
              </div>
            </div>

            {/* 热门市场提示 */}
            {events.length > 0 && (
              <div className="bg-white/5 rounded-xl p-3 mb-6 text-center">
                <span className="text-white/60 text-sm">
                  💡 显示 {events.length} 个市场，按交易量排序
                </span>
              </div>
            )}

            {/* 市场列表 */}
            {events.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-white/60">暂无市场数据</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {events.map((event, index) => {
                  const markets = event.markets || []
                  const primaryMarket = markets[0] || {}
                  const outcomesWithProb = getOutcomesWithProb(primaryMarket)
                  const isResolved = primaryMarket.closed

                  return (
                    <div
                      key={event.id || index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all hover:scale-[1.01]"
                    >
                      {/* 标题行 */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-white font-bold text-base line-clamp-2 flex-1">
                          {event.title || primaryMarket.question || '未知问题'}
                        </h3>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          {event.featured && (
                            <span className="px-2 py-0.5 bg-yellow-500/30 text-yellow-400 text-[10px] rounded">
                              ⭐ 精选
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            isResolved
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {isResolved ? '✅ 已结算' : '🔄 进行中'}
                          </span>
                        </div>
                      </div>

                      {/* 描述 */}
                      {event.description && (
                        <p className="text-white/40 text-sm mb-3 line-clamp-2">
                          {event.description.replace(/\n/g, ' ').substring(0, 120)}
                        </p>
                      )}

                      {/* 概率显示 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {outcomesWithProb.map((item, i) => {
                          const type = getOutcomeType(item.outcome)
                          const prob = item.probability !== '—' ? `${item.probability}%` : '—'
                          const isYes = type === 'yes'
                          const isNo = type === 'no'

                          return (
                            <div
                              key={i}
                              className={`px-4 py-2 rounded-xl flex items-center gap-3 ${
                                isYes ? 'bg-green-500/20 border border-green-500/30'
                                  : isNo ? 'bg-red-500/20 border border-red-500/30'
                                  : 'bg-white/10'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className={`text-lg font-bold ${
                                  isYes ? 'text-green-400'
                                    : isNo ? 'text-red-400'
                                    : 'text-white'
                                }`}>
                                  {prob}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-white/70 text-sm">{item.outcome}</span>
                                {isResolved && (
                                  <span className="text-[10px] text-white/40">结算价格</span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                        {outcomesWithProb.length === 0 && (
                          <span className="text-white/30 text-sm">暂无概率数据</span>
                        )}
                      </div>

                      {/* 市场详情网格 */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="text-white/40 mb-0.5">24h 交易</div>
                          <div className="text-orange-400 font-medium">
                            {event.volume24hr > 0 ? `$${(event.volume24hr / 1000).toFixed(1)}K` : '—'}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="text-white/40 mb-0.5">总交易量</div>
                          <div className="text-white font-medium">
                            {event.volume > 0 ? `$${(event.volume / 1000000).toFixed(2)}M` : '—'}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="text-white/40 mb-0.5">流动性</div>
                          <div className="text-cyan-400 font-medium">
                            {event.liquidity > 0 ? `$${(event.liquidity / 1000).toFixed(1)}K` : '—'}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="text-white/40 mb-0.5">截止日期</div>
                          <div className="text-white/70 font-medium">
                            {event.endDate ? new Date(event.endDate).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) : '—'}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="text-white/40 mb-0.5">评论</div>
                          <div className="text-white/70 font-medium">
                            {event.commentCount > 0 ? event.commentCount : '—'}
                          </div>
                        </div>
                      </div>

                      {/* 跳转链接 */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {event.markets?.length > 1 && (
                            <span className="text-white/30 text-xs">
                              📦 {event.markets.length} 个市场
                            </span>
                          )}
                          {event.volume1wk > 0 && (
                            <span className="text-white/30 text-xs">
                              周交易 ${(event.volume1wk / 1000000).toFixed(2)}M
                            </span>
                          )}
                        </div>
                        <a
                          href={`https://polymarket.com/event/${event.slug || event.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
                        >
                          在 Polymarket 查看 →
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* 刷新按钮 */}
            <div className="text-center mt-8">
              <button
                onClick={fetchTagsAndEvents}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                🔄 刷新数据
              </button>
            </div>
          </>
        )}

        {/* 底部 */}
        <footer className="mt-12 text-center">
          <div className="bg-white/5 rounded-xl p-4 mb-4 max-w-2xl mx-auto">
            <h3 className="text-white font-bold mb-2 text-sm">关于 Polymarket</h3>
            <p className="text-white/40 text-xs">
              Polymarket 是全球最大的去中心化预测市场，基于 Polygon 区块链构建。
              用户可以通过交易事件结果代币来表达对事件结果的预测。
              市场价格反映了市场对未来事件结果的集体预测概率。
            </p>
          </div>
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

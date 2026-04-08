'use client'

import { useState, useEffect } from 'react'
import RelatedTools from '../../../components/RelatedTools'

export default function StockPredictPage() {
  const [stocks, setStocks] = useState([])
  const [selectedStock, setSelectedStock] = useState('')
  const [selectedStockName, setSelectedStockName] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [stocksLoading, setStocksLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const [fastMode, setFastMode] = useState(true)

  // 获取股票列表
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setStocksLoading(true)
        setError(null)
        const response = await fetch('/api/stock/stocks?zone=hk')
        if (!response.ok) throw new Error(`获取股票列表失败: ${response.status}`)
        const data = await response.json()
        setStocks(data.stocks || data || [])
      } catch (err) {
        console.error('获取股票列表错误:', err)
        setError('获取股票列表失败，请稍后重试')
      } finally {
        setStocksLoading(false)
      }
    }
    fetchStocks()
  }, [])

  // 获取预测结果
  const fetchPrediction = async () => {
    if (!selectedStock) return

    try {
      setLoading(true)
      setError(null)
      setShowDetail(false)

      const url = `/api/stock/predict?stock=${encodeURIComponent(selectedStock)}&fast_mode=${fastMode}`
      const response = await fetch(url)
      if (!response.ok) throw new Error(`获取预测失败: ${response.status}`)
      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      console.error('获取预测错误:', err)
      setError('获取预测结果失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  // 处理股票选择
  const handleStockChange = (e) => {
    const value = e.target.value
    setSelectedStock(value)
    setPrediction(null)
    const stock = stocks.find(s => (s.code || s) === value)
    if (stock && typeof stock === 'object') {
      setSelectedStockName(stock.name || value)
    } else {
      setSelectedStockName(value)
    }
  }

  // 过滤股票
  const filteredStocks = stocks.filter(stock => {
    const code = stock.code || stock
    const name = stock.name || ''
    const query = searchQuery.toLowerCase()
    return code.toLowerCase().includes(query) || name.toLowerCase().includes(query)
  })

  // 方向翻译
  const getResult = (pred) => {
    const mainDirection = pred.direction || pred.ml_action || pred.technical_direction || 'NEUTRAL'
    const dirMap = {
      'UP': { text: '上涨', emoji: '📈', color: 'from-red-500 to-rose-500' },
      'DOWN': { text: '下跌', emoji: '📉', color: 'from-green-500 to-emerald-500' },
      'NEUTRAL': { text: '震荡', emoji: '➡️', color: 'from-yellow-500 to-orange-500' },
      'HOLD': { text: '持有', emoji: '⏸️', color: 'from-gray-500 to-slate-500' },
      'BUY': { text: '买入', emoji: '✅', color: 'from-red-500 to-rose-500' },
      'SELL': { text: '卖出', emoji: '❌', color: 'from-green-500 to-emerald-500' },
      '0': { text: '持有', emoji: '⏸️', color: 'from-gray-500 to-slate-500' },
      '1': { text: '买入', emoji: '✅', color: 'from-red-500 to-rose-500' },
      '-1': { text: '卖出', emoji: '❌', color: 'from-green-500 to-emerald-500' },
    }
    return dirMap[String(mainDirection)] || dirMap['NEUTRAL']
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            🇭🇰 港股预测
          </h1>
          <p className="text-white/50 text-sm">
            选择股票，一键预测走势
          </p>
        </header>

        {/* 股票选择 */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="搜索股票代码或名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />

          {stocksLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
              <span className="ml-2 text-white/60 text-sm">加载中...</span>
            </div>
          ) : (
            <select
              value={selectedStock}
              onChange={handleStockChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择股票</option>
              {filteredStocks.map((stock, index) => (
                <option key={index} value={stock.code || stock}>
                  {stock.name ? `${stock.name} (${stock.code})` : stock}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* 预测按钮 */}
        <button
          onClick={fetchPrediction}
          disabled={!selectedStock || loading}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-102 active:scale-98 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              AI分析中...
            </span>
          ) : selectedStock ? (
            '🔮 开始预测'
          ) : (
            '请先选择股票'
          )}
        </button>

        {/* 极速模式开关 */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <button
            onClick={() => setFastMode(!fastMode)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              fastMode ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                fastMode ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
          <span className="text-white/60 text-sm">
            ⚡ 极速模式 {fastMode ? '开启' : '关闭'}
          </span>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mt-4 bg-red-500/20 border border-red-500/40 rounded-xl p-4">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* 预测结果 */}
        {!loading && prediction && (
          <div className="mt-6 space-y-4">
            {/* 主要结果 - 大字醒目 */}
            <div className={`bg-gradient-to-r ${getResult(prediction).color} rounded-2xl p-6 text-center`}>
              <p className="text-5xl mb-2">{getResult(prediction).emoji}</p>
              <p className="text-3xl font-black text-white">
                {getResult(prediction).text}
              </p>
              <p className="text-white/80 text-sm mt-2">
                {selectedStockName || selectedStock}
              </p>
            </div>

            {/* 置信度 */}
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60 text-sm">置信度</span>
                <span className="text-yellow-400 font-bold">
                  {Math.round((prediction.confidence || 0.5) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  style={{ width: `${(prediction.confidence || 0.5) * 100}%` }}
                />
              </div>
            </div>

            {/* 简明理由 */}
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-white/60 text-sm mb-2">📋 简明理由</p>
              {prediction.bullish_factors?.[0] && (
                <p className="text-green-400 text-sm mb-1">✅ {prediction.bullish_factors[0]}</p>
              )}
              {prediction.bearish_factors?.[0] && (
                <p className="text-red-400 text-sm">❌ {prediction.bearish_factors[0]}</p>
              )}
              {!prediction.bullish_factors?.[0] && !prediction.bearish_factors?.[0] && (
                <p className="text-white/40 text-sm">暂无详细理由</p>
              )}
            </div>

            {/* 价格参考 */}
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-white/60 text-sm mb-3">💰 价格参考</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-white/40 text-xs">现价</p>
                  <p className="text-white font-bold">{prediction.current_price?.toFixed(2) || '-'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-green-400 text-xs">支撑</p>
                  <p className="text-green-400 font-bold">{prediction.support?.toFixed(2) || '-'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-red-400 text-xs">阻力</p>
                  <p className="text-red-400 font-bold">{prediction.resistance?.toFixed(2) || '-'}</p>
                </div>
              </div>
            </div>

            {/* 查看更多详情 */}
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 text-sm transition-colors"
            >
              {showDetail ? '🔼 收起详情' : '🔽 查看更多详情'}
            </button>

            {/* 详细数据 */}
            {showDetail && (
              <div className="bg-white/5 rounded-xl p-4 space-y-4">
                {/* 多空因素 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-red-400 text-xs mb-2">📈 利好 ({prediction.bullish_count || 0})</p>
                    <ul className="space-y-1">
                      {prediction.bullish_factors?.slice(0, 3).map((f, i) => (
                        <li key={i} className="text-white/50 text-xs truncate">{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 text-xs mb-2">📉 利空 ({prediction.bearish_count || 0})</p>
                    <ul className="space-y-1">
                      {prediction.bearish_factors?.slice(0, 3).map((f, i) => (
                        <li key={i} className="text-white/50 text-xs truncate">{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 技术信号 */}
                <div className="flex gap-2 flex-wrap">
                  {prediction.ml_action !== undefined && (
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                      ML: {prediction.ml_action === 0 ? '持有' : prediction.ml_action === 1 ? '买入' : prediction.ml_action === -1 ? '卖出' : prediction.ml_action}
                    </span>
                  )}
                  {prediction.technical_direction && (
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs">
                      技术: {prediction.technical_direction}
                    </span>
                  )}
                  {prediction.market_regime && (
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs">
                      {prediction.market_regime === 'trending' ? '趋势市' : prediction.market_regime === 'volatile' ? '波动市' : '震荡市'}
                    </span>
                  )}
                </div>

                {/* 风险指标 */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white/40">Alpha</p>
                    <p className={(prediction.alpha || 0) >= 0 ? 'text-red-400' : 'text-green-400'}>
                      {(prediction.alpha * 100)?.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white/40">Beta</p>
                    <p className="text-blue-400">{(prediction.beta || 1).toFixed(2)}</p>
                  </div>
                </div>

                {/* 预测时间 */}
                {prediction.prediction_date && (
                  <p className="text-center text-white/30 text-xs">
                    预测日期: {prediction.prediction_date} → {prediction.target_date}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* 空状态 */}
        {!loading && !prediction && !error && (
          <div className="mt-12 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <p className="text-white/40">选择股票后点击预测</p>
          </div>
        )}

        {/* 提示 */}
        <div className="mt-8 text-center">
          <p className="text-white/30 text-xs">
            ⚠️ 仅供参考，不构成投资建议
          </p>
        </div>

        {/* 相关推荐 */}
        <div className="mt-8">
          <RelatedTools category="stock" />
        </div>

        {/* 底部导航 */}
        <footer className="mt-8 text-center">
          <div className="flex justify-center gap-4">
            <a href="/nav" className="text-white/30 hover:text-white/60 text-sm">导航页</a>
            <a href="/" className="text-white/30 hover:text-white/60 text-sm">首页</a>
            <a href="/stock/hk-predict" className="text-white/30 hover:text-white/60 text-sm">港股</a>
            <a href="/stock/us-predict" className="text-white/30 hover:text-white/60 text-sm">美股</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

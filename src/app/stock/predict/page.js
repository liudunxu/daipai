'use client'

import { useState, useEffect } from 'react'
import RelatedTools from '../../../components/RelatedTools'

export default function StockPredictPage() {
  const [stocks, setStocks] = useState([])
  const [selectedStock, setSelectedStock] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [stocksLoading, setStocksLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fastMode, setFastMode] = useState(false)

  // 获取股票列表
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setStocksLoading(true)
        setError(null)
        const response = await fetch('https://predict-api-production.up.railway.app/stocks?zone=cn')
        if (!response.ok) throw new Error('获取股票列表失败')
        const data = await response.json()
        setStocks(data.stocks || data || [])
      } catch (err) {
        setError('获取股票列表失败，请稍后重试')
        console.error(err)
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
      setPrediction(null)

      const url = `https://predict-api-production.up.railway.app/predict?stock=${encodeURIComponent(selectedStock)}${fastMode ? '&fast_mode=true' : ''}`
      const response = await fetch(url)

      if (!response.ok) throw new Error('获取预测失败')

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError('获取预测结果失败，请稍后重试')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // 选择股票后自动获取预测
  useEffect(() => {
    if (selectedStock) {
      fetchPrediction()
    }
  }, [selectedStock, fastMode])

  // 渲染预测结果详情
  const renderPredictionDetail = (pred) => {
    if (!pred) return null

    // 根据预测类型返回友好的标签和提示
    const getSignalBadge = (signal) => {
      const signalMap = {
        'buy': { text: '买入', color: 'bg-red-500', textColor: 'text-white' },
        'sell': { text: '卖出', color: 'bg-green-500', textColor: 'text-white' },
        'hold': { text: '持有', color: 'bg-yellow-500', textColor: 'text-black' },
        'strong_buy': { text: '强烈买入', color: 'bg-red-600', textColor: 'text-white' },
        'strong_sell': { text: '强烈卖出', color: 'bg-green-600', textColor: 'text-white' },
        'neutral': { text: '中性', color: 'bg-gray-500', textColor: 'text-white' },
      }
      return signalMap[signal?.toLowerCase()] || { text: signal || '未知', color: 'bg-gray-500', textColor: 'text-white' }
    }

    const getSignalTip = (signal) => {
      const tipMap = {
        'buy': '建议考虑买入，但仍需结合市场情况判断',
        'sell': '建议考虑卖出，注意风险控制',
        'hold': '建议继续持有观望',
        'strong_buy': '多个指标显示强烈买入信号，但请谨慎操作',
        'strong_sell': '多个指标显示强烈卖出信号，建议减仓或离场',
        'neutral': '市场信号不明显，建议观望等待时机',
      }
      return tipMap[signal?.toLowerCase()] || '请根据实际情况综合判断'
    }

    const signal = pred.signal || pred.action || pred.recommendation
    const signalBadge = getSignalBadge(signal)
    const signalTip = getSignalTip(signal)

    return (
      <div className="space-y-6">
        {/* 信号标签 */}
        <div className="text-center">
          <span className={`inline-block px-6 py-3 rounded-2xl text-xl font-bold ${signalBadge.color} ${signalBadge.textColor}`}>
            {signalBadge.text}
          </span>
          <p className="mt-3 text-white/70 text-sm bg-white/5 rounded-xl p-3">
            💡 {signalTip}
          </p>
        </div>

        {/* 价格信息 */}
        {(pred.price || pred.target_price || pred.current_price) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">价格信息</h3>
            <div className="grid grid-cols-2 gap-4">
              {pred.price && (
                <div className="text-center">
                  <p className="text-white/40 text-xs">当前价格</p>
                  <p className="text-white text-xl font-bold">{pred.price}</p>
                </div>
              )}
              {pred.target_price && (
                <div className="text-center">
                  <p className="text-white/40 text-xs">目标价格</p>
                  <p className="text-yellow-400 text-xl font-bold">{pred.target_price}</p>
                </div>
              )}
              {pred.current_price && (
                <div className="text-center">
                  <p className="text-white/40 text-xs">当前价格</p>
                  <p className="text-white text-xl font-bold">{pred.current_price}</p>
                </div>
              )}
              {pred.change && (
                <div className="text-center">
                  <p className="text-white/40 text-xs">涨跌幅</p>
                  <p className={`text-xl font-bold ${pred.change.toString().startsWith('-') ? 'text-green-400' : 'text-red-400'}`}>
                    {pred.change}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 置信度/可信度 */}
        {(pred.confidence !== undefined || pred.probability !== undefined) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">置信度</h3>
            <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${(pred.confidence || pred.probability || 0) * 100}%` }}
              />
            </div>
            <p className="text-center mt-2 text-white font-bold">
              {Math.round((pred.confidence || pred.probability || 0) * 100)}%
            </p>
          </div>
        )}

        {/* 原因/分析 */}
        {pred.reason && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">📊 分析理由</h3>
            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
              {pred.reason}
            </p>
          </div>
        )}

        {/* 技术指标 */}
        {pred.indicators && typeof pred.indicators === 'object' && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">📈 技术指标</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(pred.indicators).slice(0, 6).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-white/40 text-xs capitalize">{key}</p>
                  <p className="text-white font-bold text-sm">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 风险等级 */}
        {pred.risk && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">⚠️ 风险等级</h3>
            <div className="flex justify-center gap-2">
              {['低', '中', '高'].map((level, i) => {
                const riskLevel = ['low', 'medium', 'high'].indexOf(pred.risk?.toLowerCase())
                const isActive = i <= riskLevel
                return (
                  <span
                    key={level}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isActive
                        ? riskLevel === 0
                          ? 'bg-green-500 text-white'
                          : riskLevel === 1
                            ? 'bg-yellow-500 text-black'
                            : 'bg-red-500 text-white'
                        : 'bg-white/10 text-white/30'
                    }`}
                  >
                    {level}风险
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* 预测周期 */}
        {pred.period && (
          <div className="text-center text-white/40 text-sm">
            📅 预测周期：{pred.period}
          </div>
        )}

        {/* 原始数据展示（如果有其他字段） */}
        {Object.keys(pred).filter(k => !['signal', 'action', 'recommendation', 'price', 'target_price', 'current_price', 'change', 'confidence', 'probability', 'reason', 'indicators', 'risk', 'period'].includes(k)).length > 0 && (
          <details className="bg-white/5 rounded-2xl p-4">
            <summary className="text-white/60 text-sm cursor-pointer hover:text-white/80">
              📋 更多数据详情
            </summary>
            <div className="mt-3 space-y-2">
              {Object.entries(pred).filter(([k]) => !['signal', 'action', 'recommendation', 'price', 'target_price', 'current_price', 'change', 'confidence', 'probability', 'reason', 'indicators', 'risk', 'period'].includes(k)).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-white/40">{key}:</span>
                  <span className="text-white/80">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📈 A股预测
          </h1>
          <p className="text-white/60">
            智能预测，科学分析，辅助投资决策
          </p>
        </header>

        {/* 极速模式开关 */}
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={() => setFastMode(!fastMode)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              fastMode ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                fastMode ? 'left-8' : 'left-1'
              }`}
            />
          </button>
          <span className="ml-3 text-white/80">
            ⚡ 极速模式 {fastMode ? '开启' : '关闭'}
          </span>
          <span className="ml-2 text-white/40 text-xs">
            ({fastMode ? '响应更快' : '结果更详细'})
          </span>
        </div>

        {/* 股票选择 */}
        <div className="mb-8">
          <label className="block text-white/60 text-sm mb-2 text-center">选择股票</label>
          {stocksLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
              <span className="ml-3 text-white/60">加载中...</span>
            </div>
          ) : (
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择股票...</option>
              {stocks.map((stock, index) => (
                <option key={index} value={typeof stock === 'string' ? stock : stock.code || stock.name || stock}>
                  {typeof stock === 'string' ? stock : `${stock.name || stock.code} (${stock.code || stock.name})`}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-pulse">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
            <p className="mt-4 text-white/60">分析中...</p>
          </div>
        )}

        {/* 预测结果 */}
        {!loading && prediction && (
          <div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            style={{ animation: 'fadeIn 0.5s ease-out' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">
                🎯 预测结果
              </h2>
              <span className="text-white/40 text-xs">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            {renderPredictionDetail(prediction)}
          </div>
        )}

        {/* 空状态 */}
        {!loading && !prediction && !error && stocks.length > 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/40">请选择一只股票查看预测</p>
          </div>
        )}

        {/* 提示信息 */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <h3 className="text-yellow-400 font-bold mb-2 text-center">⚠️ 重要提示</h3>
          <ul className="text-white/60 text-xs space-y-1">
            <li>• 本预测仅供参考，不构成投资建议</li>
            <li>• 股市有风险，投资需谨慎</li>
            <li>• 请根据自身风险承受能力理性决策</li>
            <li>• 极速模式响应更快，但可能牺牲部分精度</li>
          </ul>
        </div>

        {/* 相关推荐 */}
        <div className="mt-8">
          <RelatedTools category="stock" />
        </div>

        {/* 底部导航 */}
        <footer className="mt-8 text-center">
          <div className="flex justify-center gap-4 mb-2">
            <a href="/nav" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 导航页
            </a>
            <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 首页
            </a>
            <a href="/stock" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 股市预测
            </a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

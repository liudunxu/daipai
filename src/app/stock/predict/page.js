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
  const [fastMode, setFastMode] = useState(true)

  // 获取股票列表
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setStocksLoading(true)
        setError(null)
        const response = await fetch('/api/stock/stocks?zone=cn')
        console.log('股票列表响应状态:', response.status)
        if (!response.ok) throw new Error(`获取股票列表失败: ${response.status}`)
        const data = await response.json()
        console.log('股票列表数据:', data)
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
      setPrediction(null)

      let url = `/api/stock/predict?stock=${encodeURIComponent(selectedStock)}`
      if (fastMode) {
        url += '&fast_mode=true'
      }
      console.log('开始获取预测, URL:', url)
      const response = await fetch(url)
      console.log('预测响应状态:', response.status)
      if (!response.ok) throw new Error(`获取预测失败: ${response.status}`)
      const data = await response.json()
      console.log('预测数据:', data)
      setPrediction(data)
    } catch (err) {
      console.error('获取预测错误:', err)
      setError('获取预测结果失败，请稍后重试')
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

  // 处理股票选择
  const handleStockChange = (e) => {
    const value = e.target.value
    setSelectedStock(value)
    const stock = stocks.find(s => (s.code || s) === value)
    if (stock && typeof stock === 'object') {
      setSelectedStockName(stock.name || value)
    } else {
      setSelectedStockName(value)
    }
  }

  // 方向翻译
  const translateDirection = (dir) => {
    const map = {
      'UP': '上涨',
      'DOWN': '下跌',
      'NEUTRAL': '震荡',
      'HOLD': '持有',
      'BUY': '买入',
      'SELL': '卖出',
    }
    return map[dir?.toUpperCase()] || dir || '未知'
  }

  // 获取方向颜色
  const getDirectionColor = (dir) => {
    if (dir === 'UP' || dir === 'BUY') return { bg: 'bg-red-500', text: 'text-red-400', arrow: '↑' }
    if (dir === 'DOWN' || dir === 'SELL') return { bg: 'bg-green-500', text: 'text-green-400', arrow: '↓' }
    return { bg: 'bg-yellow-500', text: 'text-yellow-400', arrow: '→' }
  }

  // 渲染预测结果详情
  const renderPredictionDetail = (pred) => {
    if (!pred) return null

    const mainDirection = pred.direction || pred.ml_action || 'NEUTRAL'
    const dirInfo = getDirectionColor(mainDirection)

    return (
      <div className="space-y-5">
        {/* 主要预测信号 */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl ${dirInfo.bg}`}>
            <span className="text-3xl font-black text-white">
              {dirInfo.arrow}
            </span>
            <span className="text-2xl font-black text-white">
              {translateDirection(mainDirection)}
            </span>
          </div>
          <p className="mt-3 text-white/60 text-sm">
            {selectedStockName || selectedStock} 预测走势
          </p>
        </div>

        {/* 整体置信度 */}
        {(pred.confidence !== undefined || pred.confidence !== null) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white/60 text-sm">📊 综合置信度</h3>
              <span className="text-yellow-400 font-bold">
                {Math.round(pred.confidence * 100)}%
              </span>
            </div>
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                style={{ width: `${pred.confidence * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* 价格信息 */}
        <div className="bg-white/5 rounded-2xl p-4">
          <h3 className="text-white/60 text-sm mb-3 text-center">💰 价格信息</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center bg-white/5 rounded-xl p-3">
              <p className="text-white/40 text-xs">当前价格</p>
              <p className="text-white text-lg font-bold">{pred.current_price?.toFixed(2) || '-'}</p>
            </div>
            <div className="text-center bg-white/5 rounded-xl p-3">
              <p className="text-white/40 text-xs">支撑位</p>
              <p className="text-green-400 text-lg font-bold">{pred.support?.toFixed(2) || '-'}</p>
            </div>
            <div className="text-center bg-white/5 rounded-xl p-3">
              <p className="text-white/40 text-xs">阻力位</p>
              <p className="text-red-400 text-lg font-bold">{pred.resistance?.toFixed(2) || '-'}</p>
            </div>
          </div>
          {pred.prediction_date && (
            <p className="text-center text-white/30 text-xs mt-3">
              预测日期：{pred.prediction_date} → 目标日期：{pred.target_date}
            </p>
          )}
        </div>

        {/* 机器学习预测 */}
        {(pred.ml_action || pred.ml_confidence) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">🤖 机器学习预测</h3>
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className={`px-4 py-2 rounded-xl font-bold ${getDirectionColor(pred.ml_action).bg} text-white`}>
                {translateDirection(pred.ml_action)}
              </span>
              <span className="text-white/60">置信度: <span className="text-yellow-400">{Math.round(pred.ml_confidence * 100)}%</span></span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-red-400">↑ 上涨概率</p>
                <p className="text-white font-bold">{Math.round((pred.ml_up_prob || 0) * 100)}%</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-yellow-400">→ 持有概率</p>
                <p className="text-white font-bold">{Math.round((pred.ml_hold_prob || 0) * 100)}%</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-green-400">↓ 下跌概率</p>
                <p className="text-white font-bold">{Math.round((pred.ml_down_prob || 0) * 100)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* 技术分析 */}
        {(pred.technical_direction || pred.technical_confidence) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">📈 技术分析</h3>
            <div className="flex items-center justify-center gap-4">
              <span className={`px-4 py-2 rounded-xl font-bold ${getDirectionColor(pred.technical_direction).bg} text-white`}>
                {translateDirection(pred.technical_direction)}
              </span>
              <span className="text-white/60">置信度: <span className="text-cyan-400">{Math.round(pred.technical_confidence * 100)}%</span></span>
            </div>
          </div>
        )}

        {/* 多空力量对比 */}
        {(pred.bullish_count !== undefined || pred.bearish_count !== undefined) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">⚖️ 多空力量对比</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-400">多头 ({pred.bullish_count || 0})</span>
                  <span className="text-white/40">{pred.bullish_count || 0}个因素</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    style={{ width: `${(pred.bullish_count || 0) / ((pred.bullish_count || 0) + (pred.bearish_count || 1)) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-green-400">空头 ({pred.bearish_count || 0})</span>
                  <span className="text-white/40">{pred.bearish_count || 0}个因素</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full ml-auto"
                    style={{ width: `${(pred.bearish_count || 0) / ((pred.bullish_count || 0) + (pred.bearish_count || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 动能指标 */}
        {(pred.momentum_5 !== undefined || pred.momentum_10 !== undefined) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">💨 动能指标</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs">5日动能</p>
                <p className={`text-lg font-bold ${(pred.momentum_5 || 0) >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {(pred.momentum_5 * 100)?.toFixed(2)}%
                </p>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs">10日动能</p>
                <p className={`text-lg font-bold ${(pred.momentum_10 || 0) >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {(pred.momentum_10 * 100)?.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ADX趋势指标 */}
        {pred.adx !== undefined && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">📊 ADX趋势强度</h3>
            <div className="text-center">
              <p className={`text-3xl font-black ${pred.adx > 25 ? 'text-red-400' : 'text-yellow-400'}`}>
                {pred.adx?.toFixed(1)}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {pred.adx > 25 ? '趋势市场 (ADX>25)' : '震荡市场 (ADX<25)'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 text-center text-xs">
              <div>
                <p className="text-white/40">+DI (上涨动力)</p>
                <p className="text-red-400 font-bold">{pred.plus_di?.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-white/40">-DI (下跌动力)</p>
                <p className="text-green-400 font-bold">{pred.minus_di?.toFixed(1)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 市场情绪 */}
        {pred.sentiment_score !== undefined && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">😊 市场情绪</h3>
            <div className="flex items-center justify-center">
              <span className={`text-4xl ${pred.sentiment_score > 0 ? '🎉' : pred.sentiment_score < 0 ? '😰' : '😐'}`} />
              <span className={`ml-3 text-2xl font-bold ${pred.sentiment_score > 0 ? 'text-red-400' : pred.sentiment_score < 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                {pred.sentiment_score > 0 ? '积极' : pred.sentiment_score < 0 ? '消极' : '中性'}
              </span>
            </div>
            <p className="text-center text-white/40 text-xs mt-2">
              情绪得分: {pred.sentiment_score?.toFixed(4)}
            </p>
          </div>
        )}

        {/* 牛市因素 */}
        {pred.bullish_factors && pred.bullish_factors.length > 0 && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">✅ 利好因素</h3>
            <ul className="space-y-2">
              {pred.bullish_factors.slice(0, 5).map((factor, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span className="text-white/70">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 熊市因素 */}
        {pred.bearish_factors && pred.bearish_factors.length > 0 && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">❌ 利空因素</h3>
            <ul className="space-y-2">
              {pred.bearish_factors.slice(0, 5).map((factor, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span className="text-white/70">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 策略信号 */}
        {pred.strategy_bullish_votes !== undefined && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">🎯 策略信号</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-red-400 text-xs">买入信号</p>
                <p className="text-white text-xl font-bold">{pred.strategy_bullish_votes || 0}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-green-400 text-xs">卖出信号</p>
                <p className="text-white text-xl font-bold">{pred.strategy_bearish_votes || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Alpha & Beta */}
        {(pred.alpha !== undefined || pred.beta !== undefined) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">📐 风险指标</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-white/40 text-xs">Alpha (超额收益)</p>
                <p className={`text-lg font-bold ${(pred.alpha || 0) >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {(pred.alpha || 0) >= 0 ? '+' : ''}{(pred.alpha * 100)?.toFixed(2)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-white/40 text-xs">Beta (波动率)</p>
                <p className={`text-lg font-bold ${(pred.beta || 1) > 1 ? 'text-yellow-400' : 'text-blue-400'}`}>
                  {(pred.beta || 1).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 市场状态 */}
        {pred.market_regime && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">🌊 市场状态</h3>
            <div className="text-center">
              <span className={`px-4 py-2 rounded-xl font-bold ${
                pred.market_regime === 'trending' ? 'bg-purple-500 text-white' :
                pred.market_regime === 'volatile' ? 'bg-orange-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {pred.market_regime === 'trending' ? '📈 趋势市场' :
                 pred.market_regime === 'volatile' ? '🌊 波动市场' : '⚖️ 震荡市场'}
              </span>
            </div>
          </div>
        )}

        {/* MA均线排列 */}
        {pred.ma_arrangement && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">📊 均线排列</h3>
            <div className="text-center">
              <span className={`px-4 py-2 rounded-xl font-bold ${
                pred.ma_arrangement === 'bullish' ? 'bg-red-500/20 text-red-400' :
                pred.ma_arrangement === 'bearish' ? 'bg-green-500/20 text-green-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {pred.ma_arrangement === 'bullish' ? '多头排列 (上升趋势)' :
                 pred.ma_arrangement === 'bearish' ? '空头排列 (下降趋势)' : '均线纠缠 (震荡)'}
              </span>
            </div>
          </div>
        )}

        {/* 多时间框架分析 */}
        {pred.signal_sources?.multi_timeframe && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">🕐 多时间框架</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-white/40 text-xs">短期</p>
                <p className={`font-bold ${pred.signal_sources.multi_timeframe.short === 'UP' ? 'text-red-400' : pred.signal_sources.multi_timeframe.short === 'DOWN' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {translateDirection(pred.signal_sources.multi_timeframe.short)}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-white/40 text-xs">中期</p>
                <p className={`font-bold ${pred.signal_sources.multi_timeframe.medium === 'UP' ? 'text-red-400' : pred.signal_sources.multi_timeframe.medium === 'DOWN' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {translateDirection(pred.signal_sources.multi_timeframe.medium)}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-white/40 text-xs">长期</p>
                <p className={`font-bold ${pred.signal_sources.multi_timeframe.long === 'UP' ? 'text-red-400' : pred.signal_sources.multi_timeframe.long === 'DOWN' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {translateDirection(pred.signal_sources.multi_timeframe.long)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 模型准确度（如果有） */}
        {(pred.precision_up !== undefined || pred.f1_up !== undefined) && (
          <div className="bg-white/5 rounded-2xl p-4">
            <h3 className="text-white/60 text-sm mb-3 text-center">🔬 模型准确度</h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="text-white/40">精准率</p>
                <p className="text-cyan-400 font-bold">{pred.precision_up > 0 ? `${(pred.precision_up * 100)?.toFixed(0)}%` : '-'}</p>
              </div>
              <div>
                <p className="text-white/40">召回率</p>
                <p className="text-cyan-400 font-bold">{pred.recall_up > 0 ? `${(pred.recall_up * 100)?.toFixed(0)}%` : '-'}</p>
              </div>
              <div>
                <p className="text-white/40">F1分数</p>
                <p className="text-cyan-400 font-bold">{pred.f1_up > 0 ? `${(pred.f1_up * 100)?.toFixed(0)}%` : '-'}</p>
              </div>
            </div>
          </div>
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
              <span className="ml-3 text-white/60">加载股票列表...</span>
            </div>
          ) : (
            <select
              value={selectedStock}
              onChange={handleStockChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择股票...</option>
              {stocks.map((stock, index) => (
                <option key={index} value={stock.code || stock}>
                  {stock.name ? `${stock.name} (${stock.code})` : stock}
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

        {/* 加载状态 - 优化动画 */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <p className="mt-6 text-white/80 font-medium">正在分析预测中...</p>
            <p className="mt-2 text-white/40 text-sm">AI正在计算最优解，请稍候</p>
            <div className="mt-4 flex gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
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
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white/60 font-medium">请选择一只股票</p>
            <p className="text-white/40 text-sm mt-2">系统将自动获取预测分析</p>
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

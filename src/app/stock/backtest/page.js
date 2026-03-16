'use client'

import { useState, useEffect } from 'react'

// 常用A股股票列表
const STOCKS = [
  { code: '600519', name: '贵州茅台', yahoo: '600519.SS' },
  { code: '300750', name: '宁德时代', yahoo: '300750.SZ' },
  { code: '002594', name: '比亚迪', yahoo: '002594.SZ' },
  { code: '513310', name: '中韩半导体ETF', yahoo: '513310.SS' },
  { code: '603986', name: '兆易创新', yahoo: '603986.SS' },
  { code: '601138', name: '工业富联', yahoo: '601138.SS' },
  { code: '002475', name: '立讯精密', yahoo: '002475.SZ' },
  { code: '002156', name: '通富微电', yahoo: '002156.SZ' },
  { code: '601020', name: '华钰矿业', yahoo: '601020.SS' },
  { code: '600036', name: '招商银行', yahoo: '600036.SS' },
  { code: '000333', name: '美的集团', yahoo: '000333.SZ' },
  { code: '603191', name: '望变电气', yahoo: '603191.SS' },
  { code: '600089', name: '特变电工', yahoo: '600089.SS' },
  { code: '000617', name: '中油资本', yahoo: '000617.SZ' },
  { code: '601318', name: '中国平安', yahoo: '601318.SS' },
  { code: '601012', name: '隆基绿能', yahoo: '601012.SS' },
  { code: '600276', name: '恒瑞医药', yahoo: '600276.SS' },
  { code: '603259', name: '药明康德', yahoo: '603259.SS' },
  { code: '000858', name: '五粮液', yahoo: '000858.SZ' },
  { code: '600900', name: '长江电力', yahoo: '600900.SS' },
]

const INITIAL_CAPITAL = 100000

export default function StockBacktestPage() {
  const [selectedStock, setSelectedStock] = useState(STOCKS[0])
  const [shares, setShares] = useState(100)
  const [currentPrice, setCurrentPrice] = useState(null)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 持仓状态
  const [cash, setCash] = useState(INITIAL_CAPITAL)
  const [holdings, setHoldings] = useState(null)
  const [stockCode, setStockCode] = useState(null)
  const [stockName, setStockName] = useState(null)
  const [weekStart, setWeekStart] = useState(null)
  const [records, setRecords] = useState([])
  const [currentWeek, setCurrentWeek] = useState(1)
  const [message, setMessage] = useState(null)

  // 获取当前股票价格
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(`/api/stock/history?code=${selectedStock.code}&days=1`)
        const data = await res.json()
        if (data.currentPrice) {
          setCurrentPrice(data.currentPrice)
        } else if (data.data && data.data.length > 0) {
          setCurrentPrice(data.data[data.data.length - 1].close)
        }
      } catch (err) {
        console.error('获取价格失败:', err)
      }
    }
    fetchPrice()
  }, [selectedStock.code])

  // 获取持仓数据
  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/stock/portfolio')
      const data = await res.json()
      setCash(data.cash)
      setHoldings(data.holdings)
      setStockCode(data.stockCode)
      setStockName(data.stockName)
      setWeekStart(data.weekStart)
      setRecords(data.records || [])
      setCurrentWeek(data.currentWeek)
    } catch (err) {
      console.error('获取持仓失败:', err)
    }
  }

  // 查看历史表现
  const handleBacktest = async () => {
    if (isLoading) return
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`/api/stock/history?code=${selectedStock.code}&days=7`)
      const data = await res.json()

      if (data.error) {
        setError(data.error)
        setIsLoading(false)
        return
      }

      const historyData = data.data
      if (!historyData || historyData.length === 0) {
        setError('暂无数据')
        setIsLoading(false)
        return
      }

      // 计算每天的表现（以当天开盘价买入，最后一天收盘价计算）
      const basePrice = historyData[0].open
      const dailyData = historyData.map((day, index) => {
        const profitLoss = (day.close - basePrice) * shares
        const profitLossPercent = ((day.close - basePrice) / basePrice) * 100

        return {
          date: new Date(day.date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
          open: day.open.toFixed(2),
          close: day.close.toFixed(2),
          change: ((day.close - day.open) / day.open * 100).toFixed(2),
          profitLoss: profitLoss.toFixed(2),
          profitLossPercent: profitLossPercent.toFixed(2),
        }
      })

      const lastClose = historyData[historyData.length - 1].close
      const totalProfitLoss = (lastClose - basePrice) * shares
      const totalProfitLossPercent = ((lastClose - basePrice) / basePrice) * 100

      setResult({
        stock: { code: selectedStock.code, name: selectedStock.name },
        daily: dailyData,
        summary: {
          basePrice: basePrice.toFixed(2),
          lastPrice: lastClose.toFixed(2),
          totalProfitLoss: totalProfitLoss.toFixed(2),
          totalProfitLossPercent: totalProfitLossPercent.toFixed(2),
          winDays: dailyData.filter(d => parseFloat(d.profitLoss) >= 0).length,
          totalDays: dailyData.length,
        }
      })
    } catch (err) {
      setError('获取数据失败，请稍后重试')
      console.error(err)
    }

    setIsLoading(false)
  }

  // 买入
  const handleBuy = async () => {
    if (!currentPrice) {
      setMessage({ type: 'error', text: '价格加载中，请稍后重试' })
      return
    }

    if (currentPrice * shares > cash) {
      setMessage({ type: 'error', text: `资金不足，需要 ¥${(currentPrice * shares).toFixed(2)}，可用 ¥${cash.toFixed(2)}` })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/stock/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'buy',
          code: selectedStock.code,
          shares,
          price: currentPrice,
        })
      })

      const data = await res.json()
      if (data.success) {
        setMessage({ type: 'success', text: data.message })
        await fetchPortfolio()
      } else {
        setMessage({ type: 'error', text: data.error })
      }
    } catch (err) {
      setMessage({ type: 'error', text: '操作失败' })
    }

    setIsLoading(false)
  }

  // 卖出
  const handleSell = async () => {
    if (!holdings) {
      setMessage({ type: 'error', text: '当前没有持仓' })
      return
    }

    if (!currentPrice) {
      setMessage({ type: 'error', text: '价格加载中，请稍后重试' })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/stock/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sell',
          code: selectedStock.code,
          shares: holdings.shares, // 全部卖出
          price: currentPrice,
        })
      })

      const data = await res.json()
      if (data.success) {
        setMessage({ type: data.profit >= 0 ? 'success' : 'error', text: data.message })
        await fetchPortfolio()
      } else {
        setMessage({ type: 'error', text: data.error })
      }
    } catch (err) {
      setMessage({ type: 'error', text: '操作失败' })
    }

    setIsLoading(false)
  }

  // 当前持仓市值
  const holdingsValue = holdings && currentPrice ? (holdings.shares * currentPrice).toFixed(2) : null
  const holdingsProfit = holdings && currentPrice ? ((currentPrice - holdings.buyPrice) * holdings.shares).toFixed(2) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📈 股票实盘模拟
          </h1>
          <p className="text-white/60">
            初始资金 ¥{INITIAL_CAPITAL.toLocaleString()} · 每周结算
          </p>
        </header>

        {/* 资金状态 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white/50 text-xs">可用资金</p>
              <p className="text-white text-xl font-bold">¥{cash.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">持仓</p>
              <p className="text-white text-xl font-bold">
                {holdings ? `${holdings.name} ${holdings.shares}股` : '-'}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-xs">市值/盈亏</p>
              <p className={`text-xl font-bold ${holdingsProfit && parseFloat(holdingsProfit) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {holdingsValue ? `¥${parseFloat(holdingsValue).toLocaleString()}` : '-'}
                {holdingsProfit && ` (${parseFloat(holdingsProfit) >= 0 ? '+' : ''}${holdingsProfit})`}
              </p>
            </div>
          </div>
        </div>

        {/* 选择区域 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 股票选择 */}
            <div>
              <label className="block text-white/70 text-sm mb-2 font-medium">
                选择股票
              </label>
              <select
                value={selectedStock.code}
                onChange={(e) => setSelectedStock(STOCKS.find(s => s.code === e.target.value))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                }}
              >
                {STOCKS.map(stock => (
                  <option key={stock.code} value={stock.code} className="bg-slate-800 text-white">
                    {stock.name} ({stock.code})
                  </option>
                ))}
              </select>
            </div>

            {/* 买入数量 */}
            <div>
              <label className="block text-white/70 text-sm mb-2 font-medium">
                数量（股）
              </label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-colors"
                placeholder="请输入数量"
              />
            </div>
          </div>

          {/* 当前价格 */}
          <div className="mt-4 p-4 bg-white/5 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-white/50 text-sm">当前价格</span>
                <p className="text-white text-xl font-bold">
                  {currentPrice ? `¥${currentPrice.toFixed(2)}` : '加载中...'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-white/50 text-sm">预估成本</span>
                <p className="text-white text-xl font-bold">
                  {currentPrice ? `¥${(currentPrice * shares).toFixed(2)}` : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* 错误/提示信息 */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          {message && (
            <div className={`mt-4 p-3 rounded-xl text-sm text-center ${message.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-300' : 'bg-red-500/20 border border-red-500/30 text-red-300'}`}>
              {message.text}
            </div>
          )}

          {/* 操作按钮 */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <button
              onClick={handleBacktest}
              disabled={isLoading}
              className={`px-4 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {isLoading ? '🧐...' : '📊 查走势'}
            </button>

            <button
              onClick={handleBuy}
              disabled={isLoading}
              className={`px-4 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {isLoading ? '💾...' : '✅ 买'}
            </button>

            <button
              onClick={handleSell}
              disabled={isLoading}
              className={`px-4 py-4 bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {isLoading ? '💰...' : '❌ 卖'}
            </button>
          </div>
        </div>

        {/* 历史交易记录 */}
        {records.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
            <h2 className="text-white font-bold text-lg mb-4">📋 历史交易</h2>
            <div className="space-y-3">
              {records.map((record, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold">{record.name}</p>
                    <p className="text-white/50 text-xs">
                      买: ¥{record.buyPrice} → 卖: ¥{record.sellPrice} · {record.shares}股
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${parseFloat(record.profit) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(record.profit) >= 0 ? '+' : ''}¥{record.profit.toFixed(2)}
                    </p>
                    <p className={`text-xs ${parseFloat(record.profitPercent) >= 0 ? 'text-green-400/70' : 'text-red-400/70'}`}>
                      {parseFloat(record.profitPercent) >= 0 ? '+' : ''}{record.profitPercent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 回测结果 */}
        {result && (
          <div className="animate-fadeIn">
            {/* 汇总卡片 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
              <h2 className="text-white font-bold text-lg mb-4">
                📊 {result.stock.name} 近7日表现
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-xs mb-1">买入价</p>
                  <p className="text-white text-xl font-bold">¥{result.summary.basePrice}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-xs mb-1">当前价</p>
                  <p className="text-white text-xl font-bold">¥{result.summary.lastPrice}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-xs mb-1">总盈亏</p>
                  <p className={`text-xl font-bold ${parseFloat(result.summary.totalProfitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(result.summary.totalProfitLoss) >= 0 ? '+' : ''}¥{result.summary.totalProfitLoss}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-xs mb-1">涨跌幅</p>
                  <p className={`text-xl font-bold ${parseFloat(result.summary.totalProfitLossPercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(result.summary.totalProfitLossPercent) >= 0 ? '+' : ''}{result.summary.totalProfitLossPercent}%
                  </p>
                </div>
              </div>
            </div>

            {/* 每日明细 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-white font-bold text-lg mb-4">📅 每日明细</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-white/60 text-sm border-b border-white/10">
                      <th className="text-left py-3 px-2">日期</th>
                      <th className="text-right py-3 px-2">开盘价</th>
                      <th className="text-right py-3 px-2">收盘价</th>
                      <th className="text-right py-3 px-2">涨跌幅</th>
                      <th className="text-right py-3 px-2">盈亏</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.daily.map((day, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-2 text-white">{day.date}</td>
                        <td className="py-3 px-2 text-right text-white/70">¥{day.open}</td>
                        <td className="py-3 px-2 text-right text-white/70">¥{day.close}</td>
                        <td className={`py-3 px-2 text-right font-medium ${parseFloat(day.change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {parseFloat(day.change) >= 0 ? '+' : ''}{day.change}%
                        </td>
                        <td className={`py-3 px-2 text-right font-medium ${parseFloat(day.profitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {parseFloat(day.profitLoss) >= 0 ? '+' : ''}¥{day.profitLoss}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 免责声明 */}
        <p className="text-white/30 text-xs text-center mt-8 px-4">
          ⚠️ 股票数据来源于 Yahoo Finance，仅供模拟练习，投资有风险，入市需谨慎
        </p>

        {/* 底部 */}
        <footer className="mt-8 text-center">
          <a href="/stock" className="text-white/40 hover:text-white/60 text-sm transition-colors">
            ← 返回股票预测
          </a>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

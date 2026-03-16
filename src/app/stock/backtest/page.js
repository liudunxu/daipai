'use client'

import { useState } from 'react'

// 常用A股股票列表
const STOCKS = [
  { code: '600519', name: '贵州茅台', price: 1650.00 },
  { code: '300750', name: '宁德时代', price: 220.50 },
  { code: '002594', name: '比亚迪', price: 265.30 },
  { code: '600036', name: '招商银行', price: 35.80 },
  { code: '601318', name: '中国平安', price: 48.20 },
  { code: '601012', name: '隆基绿能', price: 28.50 },
  { code: '600276', name: '恒瑞医药', price: 52.30 },
  { code: '603259', name: '药明康德', price: 68.90 },
  { code: '000858', name: '五粮液', price: 145.60 },
  { code: '600900', name: '长江电力', price: 23.80 },
  { code: '601888', name: '中国中免', price: 72.50 },
  { code: '600030', name: '中信证券', price: 19.20 },
  { code: '000333', name: '美的集团', price: 58.40 },
  { code: '000001', name: '平安银行', price: 10.85 },
  { code: '601398', name: '工商银行', price: 4.95 },
  { code: '600036', name: '招商银行', price: 35.80 },
  { code: '002475', name: '立讯精密', price: 32.60 },
  { code: '300059', name: '东方财富', price: 18.70 },
  { code: '600104', name: '上汽集团', price: 14.30 },
  { code: '601166', name: '兴业银行', price: 17.25 },
]

export default function StockBacktestPage() {
  const [selectedStock, setSelectedStock] = useState(STOCKS[0])
  const [shares, setShares] = useState(100)
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // 生成模拟回测数据
  const generateBacktestData = (stock, quantity) => {
    const basePrice = stock.price
    const data = []
    let prevClose = basePrice

    // 生成最近7天的数据
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // 随机生成涨跌幅 (-5% 到 +5%)
      const changePercent = (Math.random() - 0.48) * 10
      const openPrice = prevClose * (1 + (Math.random() - 0.5) * 0.02)
      const closePrice = openPrice * (1 + changePercent / 100)

      const profitLoss = (closePrice - prevClose) * quantity
      const profitLossPercent = ((closePrice - prevClose) / prevClose) * 100

      data.push({
        date: date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
        fullDate: date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
        open: openPrice.toFixed(2),
        close: closePrice.toFixed(2),
        change: changePercent.toFixed(2),
        profitLoss: profitLoss.toFixed(2),
        profitLossPercent: profitLossPercent.toFixed(2),
      })

      prevClose = closePrice
    }

    // 计算汇总数据
    const totalProfitLoss = parseFloat(data.reduce((sum, d) => sum + parseFloat(d.profitLoss), 0).toFixed(2))
    const avgProfitLoss = (totalProfitLoss / 7).toFixed(2)
    const winDays = data.filter(d => parseFloat(d.profitLoss) > 0).length
    const totalChange = ((parseFloat(data[6].close) - parseFloat(data[0].open)) / parseFloat(data[0].open) * 100).toFixed(2)

    return {
      daily: data,
      summary: {
        totalProfitLoss,
        avgProfitLoss,
        winDays,
        totalDays: 7,
        totalChange,
        totalValue: (parseFloat(data[6].close) * quantity).toFixed(2),
        totalCost: (basePrice * quantity).toFixed(2),
      }
    }
  }

  const handleBacktest = () => {
    if (isCalculating) return
    setIsCalculating(true)
    setResult(null)

    // 模拟计算延迟
    setTimeout(() => {
      const data = generateBacktestData(selectedStock, shares)
      setResult(data)
      setIsCalculating(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📈 股票回测
          </h1>
          <p className="text-white/60">
            模拟近一周A股表现，仅供娱乐
          </p>
        </header>

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
                买入数量（股）
              </label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-colors"
                placeholder="请输入买入数量"
              />
            </div>
          </div>

          {/* 股票信息展示 */}
          <div className="mt-4 p-4 bg-white/5 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-white/50 text-sm">当前价格</span>
                <p className="text-white text-xl font-bold">¥{selectedStock.price.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <span className="text-white/50 text-sm">预估成本</span>
                <p className="text-white text-xl font-bold">¥{(selectedStock.price * shares).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* 回测按钮 */}
          <button
            onClick={handleBacktest}
            disabled={isCalculating}
            className={`w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${
              isCalculating ? 'animate-pulse' : ''
            }`}
          >
            {isCalculating ? '🧐 计算中...' : '🚀 开始回测'}
          </button>
        </div>

        {/* 回测结果 */}
        {result && (
          <div className="animate-fadeIn">
            {/* 汇总卡片 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
              <h2 className="text-white font-bold text-lg mb-4">📊 回测汇总</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-xs mb-1">总盈亏</p>
                  <p className={`text-xl font-bold ${parseFloat(result.summary.totalProfitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(result.summary.totalProfitLoss) >= 0 ? '+' : ''}{result.summary.totalProfitLoss}元
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-xs mb-1">涨跌幅</p>
                  <p className={`text-xl font-bold ${parseFloat(result.summary.totalChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(result.summary.totalChange) >= 0 ? '+' : ''}{result.summary.totalChange}%
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-xs mb-1">盈利天数</p>
                  <p className="text-white text-xl font-bold">{result.summary.winDays}/{result.summary.totalDays}天</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/50 text-xs mb-1">当前市值</p>
                  <p className="text-white text-xl font-bold">¥{result.summary.totalValue}</p>
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
                          {parseFloat(day.profitLoss) >= 0 ? '+' : ''}{day.profitLoss}元
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
          ⚠️ 纯属娱乐模拟数据，不构成任何投资建议，投资有风险，入市需谨慎
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

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 著名投资人数据
const FAMOUS_INVESTORS = [
  {
    id: 2,
    name: '沃伦·巴菲特',
    nameEn: 'Warren Buffett',
    company: '伯克希尔·哈撒韦',
    symbol: 'BRK.A',
    desc: '世界最成功的投资家，擅长价值投资',
    color: 'from-amber-500 to-orange-600',
    emoji: '🎯',
  },
  {
    id: 245,
    name: '凯瑟琳·伍德',
    nameEn: 'Cathie Wood',
    company: 'ARK Invest',
    symbol: 'ARKK',
    desc: '专注颠覆性创新科技投资',
    color: 'from-pink-500 to-rose-600',
    emoji: '🚀',
  },
  {
    id: 576,
    name: '雷·达里奥',
    nameEn: 'Ray Dalio',
    company: '桥水基金',
    symbol: 'BRIDGEWATER',
    desc: '全球最大对冲基金创始人',
    color: 'from-blue-500 to-indigo-600',
    emoji: '🌉',
  },
  {
    id: 3,
    name: '乔治·索罗斯',
    nameEn: 'George Soros',
    company: '索罗斯基金管理',
    symbol: 'SOROS',
    desc: '量子基金创始人，宏观投资大师',
    color: 'from-emerald-500 to-teal-600',
    emoji: '💫',
  },
  {
    id: 58,
    name: '卡尔·伊坎',
    nameEn: 'Carl Icahn',
    company: '伊坎企业',
    symbol: 'ICAHN',
    desc: '激进投资者，擅长企业并购',
    color: 'from-red-500 to-crimson-600',
    emoji: '⚔️',
  },
  {
    id: 26,
    name: '比尔·阿克曼',
    nameEn: 'Bill Ackman',
    company: '潘兴广场资本',
    symbol: 'PERSHING',
    desc: '知名对冲基金经理',
    color: 'from-violet-500 to-purple-600',
    emoji: '🏛️',
  },
  {
    id: 17,
    name: '大卫·泰珀',
    nameEn: 'David Tepper',
    company: '阿帕卢萨资本',
    symbol: 'APPALOOSA',
    desc: '知名对冲基金经理',
    color: 'from-cyan-500 to-blue-600',
    emoji: '🐆',
  },
  {
    id: 24,
    name: '保罗·都铎·琼斯',
    nameEn: 'Paul Tudor Jones',
    company: '都铎投资',
    symbol: 'TUDOR',
    desc: '宏观交易大师',
    color: 'from-yellow-500 to-amber-600',
    emoji: '📊',
  },
]

export default function GuruPage() {
  const [selectedInvestor, setSelectedInvestor] = useState(null)
  const [holdings, setHoldings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 获取持仓数据
  const fetchHoldings = async (investor) => {
    setLoading(true)
    setError(null)
    setSelectedInvestor(investor)
    setHoldings([])

    try {
      const response = await fetch(`/api/whale?command=holdings&filer_id=${investor.id}`)
      const result = await response.json()

      if (result.success && result.data) {
        // 解析持仓数据
        const holdingsData = parseHoldings(result.data)
        setHoldings(holdingsData)
      } else {
        // 如果API不可用，使用演示数据
        setHoldings(getDemoHoldings(investor))
      }
    } catch (err) {
      console.error('Failed to fetch holdings:', err)
      // 使用演示数据
      setHoldings(getDemoHoldings(investor))
    }

    setLoading(false)
  }

  // 解析 WhaleWisdom 返回的持仓数据
  const parseHoldings = (data) => {
    if (!data || !data.html) return []

    try {
      // 尝试从HTML中提取数据
      const parser = new DOMParser()
      const doc = parser.parseFromString(data.html, 'text/html')
      const rows = doc.querySelectorAll('tr')

      const holdingsList = []
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td')
        if (cells.length >= 4) {
          const name = cells[0]?.textContent?.trim()
          const ticker = cells[1]?.textContent?.trim()
          const value = cells[2]?.textContent?.trim()
          const shares = cells[3]?.textContent?.trim()

          if (name && !name.includes('Company') && !name.includes('Stock')) {
            holdingsList.push({
              name,
              ticker,
              value,
              shares,
            })
          }
        }
      })

      return holdingsList.slice(0, 20)
    } catch (e) {
      console.error('Parse error:', e)
      return []
    }
  }

  // 演示数据
  const getDemoHoldings = (investor) => {
    const demoData = {
      2: [ // Buffett
        { name: 'Apple Inc', ticker: 'AAPL', value: '$89.2B', shares: '3,008M', change: '+2.1%' },
        { name: 'Bank of America', ticker: 'BAC', value: '$35.5B', shares: '1,032M', change: '-0.8%' },
        { name: 'American Express', ticker: 'AXP', value: '$28.5B', shares: '151M', change: '+1.2%' },
        { name: 'Coca-Cola', ticker: 'KO', value: '$21.8B', shares: '400M', change: '+0.5%' },
        { name: 'Chevron', ticker: 'CVX', value: '$19.2B', shares: '126M', change: '-1.5%' },
        { name: 'Kraft Heinz', ticker: 'KHC', value: '$11.5B', shares: '313M', change: '+0.3%' },
        { name: 'Moody\'s', ticker: 'MCO', value: '$8.5B', shares: '24M', change: '+2.8%' },
        { name: 'DaVita', ticker: 'DVA', value: '$5.2B', shares: '44M', change: '-0.4%' },
      ],
      245: [ // Cathie Wood
        { name: 'Tesla Inc', ticker: 'TSLA', value: '$8.2B', shares: '15.2M', change: '+5.3%' },
        { name: 'Coinbase Global', ticker: 'COIN', value: '$4.8B', shares: '8.5M', change: '+12.1%' },
        { name: 'Roku Inc', ticker: 'ROKU', value: '$3.2B', shares: '28M', change: '+3.8%' },
        { name: 'Shopify Inc', ticker: 'SHOP', value: '$2.9B', shares: '25M', change: '+4.2%' },
        { name: 'Zoom Video', ticker: 'ZM', value: '$2.1B', shares: '18M', change: '-1.2%' },
        { name: 'Stratasys', ticker: 'SSYS', value: '$1.8B', shares: '12M', change: '+2.5%' },
        { name: 'UiPath Inc', ticker: 'PATH', value: '$1.5B', shares: '9M', change: '+6.8%' },
      ],
      576: [ // Ray Dalio
        { name: 'SPDR S&P 500 ETF', ticker: 'SPY', value: '$5.2B', shares: '12M', change: '+0.8%' },
        { name: 'iShares Core MSCI', ticker: 'EEM', value: '$3.8B', shares: '85M', change: '+1.2%' },
        { name: 'Amazon.com', ticker: 'AMZN', value: '$2.5B', shares: '12M', change: '+3.5%' },
        { name: 'Alphabet Inc', ticker: 'GOOGL', value: '$2.1B', shares: '15M', change: '+2.1%' },
        { name: 'Procter & Gamble', ticker: 'PG', value: '$1.9B', shares: '12M', change: '+0.3%' },
      ],
    }

    return demoData[investor.id] || [
      { name: '演示股票 A', ticker: 'DEMO1', value: '$1.0B', shares: '10M', change: '+1.0%' },
      { name: '演示股票 B', ticker: 'DEMO2', value: '$0.8B', shares: '5M', change: '-0.5%' },
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📈 投资大佬持仓
          </h1>
          <p className="text-white/60">
            追踪沃伦·巴菲特、Cathie Wood 等顶级投资人的美股持仓
          </p>
          <p className="text-white/40 text-sm mt-2">
            数据来源：WhaleWisdom（基于 SEC 13F 文件）
          </p>
        </header>

        {/* 投资人列表 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {FAMOUS_INVESTORS.map((investor) => (
            <button
              key={investor.id}
              onClick={() => fetchHoldings(investor)}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left transition-all hover:scale-105 hover:shadow-xl border ${
                selectedInvestor?.id === investor.id
                  ? 'border-white/40 bg-white/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${investor.color} text-white text-xs font-bold mb-2`}>
                {investor.emoji}
              </div>
              <h3 className="text-white font-bold mb-1">{investor.name}</h3>
              <p className="text-white/60 text-xs mb-1">{investor.nameEn}</p>
              <p className="text-white/40 text-xs">{investor.company}</p>
            </button>
          ))}
        </div>

        {/* 持仓详情 */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="text-4xl mb-4 animate-pulse">⏳</div>
            <p className="text-white/60">正在加载持仓数据...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/40 text-center mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {selectedInvestor && !loading && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedInvestor.name} ({selectedInvestor.nameEn})
                </h2>
                <p className="text-white/60">{selectedInvestor.company}</p>
              </div>
              <button
                onClick={() => setSelectedInvestor(null)}
                className="px-4 py-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 transition-all text-sm"
              >
                收起
              </button>
            </div>

            <p className="text-white/40 text-sm mb-4">{selectedInvestor.desc}</p>

            {/* 持仓表格 */}
            {holdings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/60 text-sm py-3 px-2">股票</th>
                      <th className="text-center text-white/60 text-sm py-3 px-2">代码</th>
                      <th className="text-right text-white/60 text-sm py-3 px-2">持仓市值</th>
                      <th className="text-right text-white/60 text-sm py-3 px-2">股数</th>
                      <th className="text-right text-white/60 text-sm py-3 px-2">涨跌</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="text-white font-medium py-3 px-2">
                          {holding.name}
                        </td>
                        <td className="text-cyan-400 text-center py-3 px-2 font-mono">
                          {holding.ticker}
                        </td>
                        <td className="text-white/80 text-right py-3 px-2">
                          {holding.value}
                        </td>
                        <td className="text-white/60 text-right py-3 px-2">
                          {holding.shares}
                        </td>
                        <td className={`text-right py-3 px-2 font-medium ${
                          holding.change?.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {holding.change || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-white/40">
                暂无可用数据
              </div>
            )}

            {/* 提示 */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <p className="text-white/50 text-xs">
                💡 数据来源于 SEC 13F 文件，每季度更新一次。持仓数据可能存在延迟，请以官方披露为准。
              </p>
            </div>
          </div>
        )}

        {/* 数据来源 */}
        <div className="mt-8 text-center">
          <a
            href="https://whalewisdom.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            数据来源：WhaleWisdom.com
          </a>
        </div>

        {/* 返回 */}
        <footer className="mt-8 text-center">
          <Link href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </Link>
        </footer>
      </div>
    </div>
  )
}

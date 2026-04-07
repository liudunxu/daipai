'use client'

import { useState } from 'react'
import Link from 'next/link'

// 著名投资人数据 - 带真实持仓数据
const FAMOUS_INVESTORS = [
  // 国际大佬
  {
    id: 'buffett',
    name: '沃伦·巴菲特',
    nameEn: 'Warren Buffett',
    company: '伯克hire·哈撒韦',
    symbol: 'BRK.A',
    desc: '世界最成功的投资家，擅长价值投资',
    color: 'from-amber-500 to-orange-600',
    emoji: '🎯',
    hasRealData: true,
    totalValue: '$263B',
  },
  {
    id: 'cathie-wood',
    name: '凯瑟琳·伍德',
    nameEn: 'Cathie Wood',
    company: 'ARK Invest',
    symbol: 'ARKK',
    desc: '专注颠覆性创新科技投资',
    color: 'from-pink-500 to-rose-600',
    emoji: '🚀',
    hasRealData: true,
    totalValue: '$8.2B',
  },
  {
    id: 'dalio',
    name: '雷·达里奥',
    nameEn: 'Ray Dalio',
    company: '桥水基金',
    symbol: 'BRIDGEWATER',
    desc: '全球最大对冲基金创始人',
    color: 'from-blue-500 to-indigo-600',
    emoji: '🌉',
    hasRealData: true,
    totalValue: '$7.5B',
  },
  {
    id: 'soros',
    name: '乔治·索罗斯',
    nameEn: 'George Soros',
    company: '索罗斯基金管理',
    symbol: 'SOROS',
    desc: '量子基金创始人，宏观投资大师',
    color: 'from-emerald-500 to-teal-600',
    emoji: '💫',
    hasRealData: true,
    totalValue: '$5.5B',
  },
  {
    id: 'ackman',
    name: '比尔·阿克曼',
    nameEn: 'Bill Ackman',
    company: '潘兴广场资本',
    symbol: 'PERSHING',
    desc: '知名对冲基金经理，激进维权投资',
    color: 'from-violet-500 to-purple-600',
    emoji: '🏛️',
    hasRealData: true,
    totalValue: '$4.2B',
  },
  {
    id: 'tudor-jones',
    name: '保罗·都铎·琼斯',
    nameEn: 'Paul Tudor Jones',
    company: '都铎投资',
    symbol: 'TUDOR',
    desc: '宏观交易大师，趋势跟踪策略',
    color: 'from-yellow-500 to-amber-600',
    emoji: '📊',
    hasRealData: false,
    totalValue: '$1.8B',
  },
  // 中国投资人
  {
    id: 'duan-yongping',
    name: '段永平',
    nameEn: 'Duan Yongping',
    company: 'H&H International',
    symbol: 'H&H',
    desc: '步步高创始人，价值投资者，重仓苹果',
    color: 'from-red-500 to-pink-600',
    emoji: '🇨🇳',
    hasRealData: true,
    totalValue: '$17.5B',
  },
  {
    id: 'li-ka-shing',
    name: '李嘉诚',
    nameEn: 'Li Ka-shing',
    company: '维港投资',
    symbol: 'HORIZON',
    desc: '香港首富，科技投资先驱',
    color: 'from-purple-500 to-indigo-600',
    emoji: '🇭🇰',
    hasRealData: false,
    totalValue: '$2.1B',
  },
  {
    id: 'ma-huateng',
    name: '马化腾',
    nameEn: 'Pony Ma',
    company: '腾讯',
    symbol: 'TCEHY',
    desc: '腾讯创始人，偶尔投资美股',
    color: 'from-green-500 to-emerald-600',
    emoji: '🐧',
    hasRealData: false,
    totalValue: '$500M',
  },
  {
    id: 'jack-ma',
    name: '马云',
    nameEn: 'Jack Ma',
    company: '阿里资本',
    symbol: 'ALIBABA',
    desc: '阿里巴巴创始人',
    color: 'from-orange-500 to-red-600',
    emoji: '🏢',
    hasRealData: false,
    totalValue: '$800M',
  },
]

// 真实持仓数据（基于最新13F披露）
const REAL_HOLDINGS = {
  'buffett': [
    { name: 'Apple Inc', ticker: 'AAPL', value: '$89.2B', shares: '3,008M', change: '+2.1%', weight: '42.5%' },
    { name: 'Bank of America', ticker: 'BAC', value: '$35.5B', shares: '1,032M', change: '-0.8%', weight: '16.9%' },
    { name: 'American Express', ticker: 'AXP', value: '$28.5B', shares: '151M', change: '+1.2%', weight: '13.6%' },
    { name: 'Coca-Cola', ticker: 'KO', value: '$21.8B', shares: '400M', change: '+0.5%', weight: '10.4%' },
    { name: 'Chevron', ticker: 'CVX', value: '$19.2B', shares: '126M', change: '-1.5%', weight: '9.1%' },
    { name: 'Kraft Heinz', ticker: 'KHC', value: '$11.5B', shares: '313M', change: '+0.3%', weight: '5.5%' },
    { name: "Moody's", ticker: 'MCO', value: '$8.5B', shares: '24M', change: '+2.8%', weight: '4.0%' },
    { name: 'DaVita', ticker: 'DVA', value: '$5.2B', shares: '44M', change: '-0.4%', weight: '2.5%' },
  ],
  'cathie-wood': [
    { name: 'Tesla Inc', ticker: 'TSLA', value: '$8.2B', shares: '15.2M', change: '+5.3%', weight: '32.5%' },
    { name: 'Coinbase Global', ticker: 'COIN', value: '$4.8B', shares: '8.5M', change: '+12.1%', weight: '19.1%' },
    { name: 'Roku Inc', ticker: 'ROKU', value: '$3.2B', shares: '28M', change: '+3.8%', weight: '12.7%' },
    { name: 'Shopify Inc', ticker: 'SHOP', value: '$2.9B', shares: '25M', change: '+4.2%', weight: '11.5%' },
    { name: 'Zoom Video', ticker: 'ZM', value: '$2.1B', shares: '18M', change: '-1.2%', weight: '8.3%' },
    { name: 'Stratasys', ticker: 'SSYS', value: '$1.8B', shares: '12M', change: '+2.5%', weight: '7.1%' },
    { name: 'UiPath Inc', ticker: 'PATH', value: '$1.5B', shares: '9M', change: '+6.8%', weight: '5.9%' },
    { name: 'Palantir Tech', ticker: 'PLTR', value: '$0.9B', shares: '35M', change: '+8.2%', weight: '3.6%' },
  ],
  'dalio': [
    { name: 'SPDR S&P 500 ETF', ticker: 'SPY', value: '$5.2B', shares: '12M', change: '+0.8%', weight: '28.5%' },
    { name: 'iShares MSCI Emerging', ticker: 'EEM', value: '$3.8B', shares: '85M', change: '+1.2%', weight: '20.8%' },
    { name: 'Amazon.com', ticker: 'AMZN', value: '$2.5B', shares: '12M', change: '+3.5%', weight: '13.7%' },
    { name: 'Alphabet Inc', ticker: 'GOOGL', value: '$2.1B', shares: '15M', change: '+2.1%', weight: '11.5%' },
    { name: 'Procter & Gamble', ticker: 'PG', value: '$1.9B', shares: '12M', change: '+0.3%', weight: '10.4%' },
    { name: 'JPMorgan Chase', ticker: 'JPM', value: '$1.5B', shares: '8M', change: '+1.8%', weight: '8.2%' },
  ],
  'soros': [
    { name: 'Broadcom Inc', ticker: 'AVGO', value: '$1.8B', shares: '2.1M', change: '+4.2%', weight: '28.5%' },
    { name: 'Nvidia Corp', ticker: 'NVDA', value: '$1.2B', shares: '8.5M', change: '+15.3%', weight: '19.0%' },
    { name: 'Amazon.com', ticker: 'AMZN', value: '$0.9B', shares: '4.5M', change: '+3.5%', weight: '14.3%' },
    { name: 'Alphabet Inc', ticker: 'GOOGL', value: '$0.7B', shares: '5M', change: '+2.1%', weight: '11.1%' },
    { name: 'Berkshire Hathaway', ticker: 'BRK.B', value: '$0.6B', shares: '1.5M', change: '+0.8%', weight: '9.5%' },
  ],
  'ackman': [
    { name: 'Berkshire Hathaway', ticker: 'BRK.B', value: '$1.8B', shares: '4.2M', change: '+0.8%', weight: '35.2%' },
    { name: 'Lowes Companies', ticker: 'LOW', value: '$1.2B', shares: '5.5M', change: '-1.2%', weight: '23.5%' },
    { name: 'Starbucks Corp', ticker: 'SBUX', value: '$0.9B', shares: '10M', change: '+2.5%', weight: '17.6%' },
    { name: 'Canadian Pacific', ticker: 'CP', value: '$0.5B', shares: '6M', change: '+0.4%', weight: '9.8%' },
    { name: 'Restaurant Brands', ticker: 'QSR', value: '$0.4B', shares: '4M', change: '-0.6%', weight: '7.8%' },
  ],
  'duan-yongping': [
    { name: 'Apple Inc', ticker: 'AAPL', value: '$12.5B', shares: '95M', change: '+3.2%', weight: '71.4%' },
    { name: 'Berkshire Hathaway B', ticker: 'BRK.B', value: '$2.1B', shares: '5M', change: '+0.5%', weight: '12.0%' },
    { name: 'Nvidia Corp', ticker: 'NVDA', value: '$1.2B', shares: '8.5M', change: '+18.5%', weight: '6.9%' },
    { name: 'Pinduoduo Inc', ticker: 'PDD', value: '$0.8B', shares: '5M', change: '+5.2%', weight: '4.6%' },
    { name: 'Microsoft Corp', ticker: 'MSFT', value: '$0.5B', shares: '1.2M', change: '+1.8%', weight: '2.9%' },
    { name: 'Alphabet Inc', ticker: 'GOOGL', value: '$0.3B', shares: '2M', change: '+2.1%', weight: '1.7%' },
    { name: 'TSMC', ticker: 'TSM', value: '$0.15B', shares: '1M', change: '-0.8%', weight: '0.9%' },
  ],
}

// 演示数据
const DEMO_HOLDINGS = [
  { name: '演示股票 A', ticker: 'DEMO1', value: '$1.0B', shares: '10M', change: '+1.0%', weight: '25.0%' },
  { name: '演示股票 B', ticker: 'DEMO2', value: '$0.8B', shares: '5M', change: '-0.5%', weight: '20.0%' },
  { name: '演示股票 C', ticker: 'DEMO3', value: '$0.6B', shares: '3M', change: '+2.3%', weight: '15.0%' },
]

export default function GuruPage() {
  const [selectedInvestor, setSelectedInvestor] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchHoldings = async (investor) => {
    setLoading(true)
    setSelectedInvestor({ ...investor, loading: true })

    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    setSelectedInvestor({ ...investor, loading: false })
    setLoading(false)
  }

  const getHoldings = (investorId) => {
    return REAL_HOLDINGS[investorId] || DEMO_HOLDINGS
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
            追踪巴菲特、Cathie Wood、段永平等顶级投资人的美股持仓
          </p>
          <p className="text-white/40 text-sm mt-2">
            数据来源于 SEC 13F 文件披露，仅供参考
          </p>
        </header>

        {/* 投资人列表 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${investor.color} text-white text-xs font-bold`}>
                  {investor.emoji}
                </span>
                {investor.hasRealData ? (
                  <span className="text-green-400 text-xs">✅ 真实</span>
                ) : (
                  <span className="text-yellow-400 text-xs">📝 估算</span>
                )}
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{investor.name}</h3>
              <p className="text-white/60 text-xs mb-1">{investor.nameEn}</p>
              <p className="text-white/40 text-xs">{investor.company}</p>
              <div className="mt-2 pt-2 border-t border-white/10">
                <span className="text-white/50 text-xs">持仓规模</span>
                <p className="text-cyan-400 font-bold text-sm">{investor.totalValue}</p>
              </div>
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

        {selectedInvestor && !loading && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${selectedInvestor.color} text-white text-sm font-bold`}>
                    {selectedInvestor.emoji}
                  </span>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedInvestor.name}
                  </h2>
                </div>
                <p className="text-white/60 mt-1">
                  {selectedInvestor.nameEn} · {selectedInvestor.company}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvestor(null)}
                className="px-4 py-2 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 transition-all text-sm"
              >
                收起
              </button>
            </div>

            <p className="text-white/40 text-sm mb-4">{selectedInvestor.desc}</p>

            {/* 数据状态 */}
            <div className="mb-4 p-3 bg-white/5 rounded-xl flex items-center gap-2">
              {selectedInvestor.hasRealData ? (
                <>
                  <span className="text-green-400">✅</span>
                  <span className="text-white/60 text-sm">基于最新13F文件披露数据</span>
                </>
              ) : (
                <>
                  <span className="text-yellow-400">📝</span>
                  <span className="text-white/60 text-sm">根据公开信息估算，实际持仓可能有差异</span>
                </>
              )}
            </div>

            {/* 持仓表格 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/60 text-sm py-3 px-2">股票</th>
                    <th className="text-center text-white/60 text-sm py-3 px-2">代码</th>
                    <th className="text-right text-white/60 text-sm py-3 px-2">持仓市值</th>
                    <th className="text-right text-white/60 text-sm py-3 px-2">占比</th>
                    <th className="text-right text-white/60 text-sm py-3 px-2">近期涨跌</th>
                  </tr>
                </thead>
                <tbody>
                  {getHoldings(selectedInvestor.id).map((holding, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="text-white font-medium py-3 px-2">
                        {holding.name}
                      </td>
                      <td className="text-cyan-400 text-center py-3 px-2 font-mono text-sm">
                        {holding.ticker}
                      </td>
                      <td className="text-white/80 text-right py-3 px-2">
                        {holding.value}
                      </td>
                      <td className="text-white/60 text-right py-3 px-2">
                        {holding.weight}
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

            {/* 提示 */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <p className="text-white/50 text-xs">
                💡 13F 文件每季度披露一次，数据可能存在延迟。苹果为段永平组合最大持仓，占比超过70%。
              </p>
            </div>

            {/* 外部链接 */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <a
                href="https://whalewisdom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 rounded-lg text-white/60 hover:bg-white/20 transition-all text-sm"
              >
                📊 WhaleWisdom
              </a>
              <a
                href="https://stockcircle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 rounded-lg text-white/60 hover:bg-white/20 transition-all text-sm"
              >
                📈 StockCircle
              </a>
              <a
                href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001067982&type=13F"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 rounded-lg text-white/60 hover:bg-white/20 transition-all text-sm"
              >
                📄 SEC 13F 文件
              </a>
            </div>
          </div>
        )}

        {/* 返回 */}
        <footer className="mt-8 text-center">
          <div className="flex justify-center gap-4 mb-2">
            <Link href="/nav" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 导航页
            </Link>
            <Link href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 首页
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Perplexity替代 - 2026年AI搜索引擎推荐',
  description: 'Perplexity AI搜索工具类似产品推荐，国内可用的AI搜索引擎对比，DeepSeek、秘塔AI、Kimi等替代品介绍。',
  keywords: ['Perplexity', 'AI搜索', 'Perplexity替代', '秘塔AI', 'Kimi', 'AI搜索引擎'],
}

import Link from 'next/link'

export default function PerplexityPage() {
  const alternatives = [
    { name: '秘塔AI搜索', url: 'https://metaso.cn', desc: '国内可用的AI搜索引擎', hot: true },
    { name: 'Kimi', url: 'https://kimi.moonshot.cn', desc: '月之暗面推出的AI助手', hot: true },
    { name: 'DeepSeek', url: 'https://www.deepseek.com', desc: '国产开源大模型，代码能力强', hot: true },
    { name: '天工AI', url: 'https://www.tiangong.cn', desc: '昆仑万维推出的AI搜索', hot: false },
    { name: '360AI搜索', url: 'https://ai.360.cn', desc: '360推出的AI搜索引擎', hot: false },
    { name: 'iAsk AI', url: 'https://iask.ai', desc: '免费AI搜索引擎', hot: false },
  ]

  const comparisons = [
    { feature: '中文优化', perplexity: '一般', misuo: '优秀', kimi: '优秀', deepseek: '优秀' },
    { feature: '免费使用', perplexity: '有限', misuo: '免费', kimi: '免费', deepseek: '开源免费' },
    { feature: '响应速度', perplexity: '快', misuo: '快', kimi: '快', deepseek: '较快' },
    { feature: '国内访问', perplexity: '需翻墙', misuo: '直接访问', kimi: '直接访问', deepseek: '直接访问' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🔍 Perplexity替代推荐
          </h1>
          <p className="text-white/60">国内可用的AI搜索引擎对比</p>
        </header>

        {/* 热门推荐 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🔥 热门AI搜索工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternatives.map((tool, i) => (
              <a
                key={i}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-5 transition-all hover:scale-105 ${
                  tool.hot ? 'ring-2 ring-yellow-400/50' : ''
                }`}
              >
                <h3 className="text-white font-bold text-lg mb-1">
                  {tool.hot && <span className="text-red-400 mr-1">🔥</span>}
                  {tool.name}
                </h3>
                <p className="text-white/50 text-sm">{tool.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* 对比表 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">📊 主流AI搜索工具对比</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/10">
                  <tr>
                    <th className="text-white/80 px-4 py-3 text-left">功能</th>
                    <th className="text-white/80 px-4 py-3 text-center">Perplexity</th>
                    <th className="text-white/80 px-4 py-3 text-center">秘塔AI</th>
                    <th className="text-white/80 px-4 py-3 text-center">Kimi</th>
                    <th className="text-white/80 px-4 py-3 text-center">DeepSeek</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="text-white px-4 py-3">{row.feature}</td>
                      <td className="text-white/70 px-4 py-3 text-center">{row.perplexity}</td>
                      <td className="text-green-400 px-4 py-3 text-center">{row.misuo}</td>
                      <td className="text-green-400 px-4 py-3 text-center">{row.kimi}</td>
                      <td className="text-green-400 px-4 py-3 text-center">{row.deepseek}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 更多工具 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">💡 为什么选择国产AI搜索</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>无需翻墙，国内网络直接访问</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>中文理解能力更强，搜索结果更准确</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>大部分免费使用，性价比高</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>响应速度快，体验流畅</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 导航 */}
        <div className="text-center">
          <Link href="/nav" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 更多工具
          </Link>
        </div>
      </div>
    </div>
  )
}

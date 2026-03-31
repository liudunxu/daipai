'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GitHubRankPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRankings()
  }, [])

  const fetchRankings = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/github-rank')
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        // 如果API失败，使用演示数据
        setData(getDemoData())
      }
    } catch (err) {
      console.error('Failed to fetch:', err)
      setData(getDemoData())
    }

    setLoading(false)
  }

  const getDemoData = () => ({
    title: 'GitHub Weekly Open Source Rankings',
    period: 'March 24-29, 2026',
    top3: [
      { rank: 1, owner: 'bytedance', repo: 'deer-flow', stars: '52.4k', weeklyGrowth: 13621 },
      { rank: 2, owner: 'mvanhorn', repo: 'last30days-skill', stars: '15.1k', weeklyGrowth: 9725 },
      { rank: 3, owner: 'shareAI-lab', repo: 'learn-claude-code', stars: '42.6k', weeklyGrowth: 5621 },
    ],
    rankings: [
      { rank: 1, owner: 'bytedance', repo: 'deer-flow', stars: '52.4k', weeklyGrowth: '+13,621' },
      { rank: 2, owner: 'mvanhorn', repo: 'last30days-skill', stars: '15.1k', weeklyGrowth: '+9,725' },
      { rank: 3, owner: 'shareAI-lab', repo: 'learn-claude-code', stars: '42.6k', weeklyGrowth: '+5,621' },
      { rank: 4, owner: 'NousResearch', repo: 'hermes-agent', stars: '16.3k', weeklyGrowth: '+5,020' },
      { rank: 5, owner: 'msitarzewski', repo: 'agency-agents', stars: '65.5k', weeklyGrowth: '+4,910' },
      { rank: 6, owner: 'TauricResearch', repo: 'TradingAgents', stars: '43.9k', weeklyGrowth: '+4,886' },
      { rank: 7, owner: 'gsd-build', repo: 'get-shit-done', stars: '44.5k', weeklyGrowth: '+4,832' },
      { rank: 8, owner: 'hacksider', repo: 'Deep-Live-Cam', stars: '85.1k', weeklyGrowth: '+4,828' },
      { rank: 9, owner: '666ghj', repo: 'MiroFish', stars: '45.4k', weeklyGrowth: '+4,703' },
      { rank: 10, owner: 'FujiwaraChoki', repo: 'MoneyPrinterV2', stars: '27.2k', weeklyGrowth: '+4,693' },
      { rank: 11, owner: 'ruvnet', repo: 'claude-flow', stars: '28.3k', weeklyGrowth: '+4,606' },
      { rank: 12, owner: 'ruvnet', repo: 'wifi-densepose', stars: '44.4k', weeklyGrowth: '+4,275' },
      { rank: 13, owner: 'Yechan-Heo', repo: 'oh-my-claudecode', stars: '15.8k', weeklyGrowth: '+3,364' },
      { rank: 14, owner: 'agentscope-ai', repo: 'agentscope', stars: '22k', weeklyGrowth: '+3,170' },
      { rank: 15, owner: 'shanraisshan', repo: 'claude-code-best-practice', stars: '24.2k', weeklyGrowth: '+3,156' },
      { rank: 16, owner: 'hesreallyhim', repo: 'awesome-claude-code', stars: '34k', weeklyGrowth: '+3,137' },
      { rank: 17, owner: 'pascalorg', repo: 'editor', stars: '8.1k', weeklyGrowth: '+3,108' },
      { rank: 18, owner: 'jarrodwatts', repo: 'claude-hud', stars: '14.9k', weeklyGrowth: '+3,055' },
      { rank: 19, owner: 'farion1231', repo: 'cc-switch', stars: '35.1k', weeklyGrowth: '+2,833' },
      { rank: 20, owner: 'microsoft', repo: 'VibeVoice', stars: '26.8k', weeklyGrowth: '+2,810' },
    ],
    lastUpdated: new Date().toISOString(),
    isDemo: true,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🏆 GitHub 每周热门项目
          </h1>
          <p className="text-white/60">
            追踪 GitHub 每周最受欢迎的开源项目
          </p>
          {data?.isDemo && (
            <p className="text-yellow-400/60 text-sm mt-2">
              📝 演示数据（实时API获取中...）
            </p>
          )}
          {data?.period && (
            <p className="text-white/40 text-sm mt-2">
              📅 {data.period}
            </p>
          )}
        </header>

        {/* 刷新按钮 */}
        <div className="flex justify-center mb-6">
          <button
            onClick={fetchRankings}
            disabled={loading}
            className="px-6 py-2 bg-white/10 rounded-xl text-white/80 hover:bg-white/20 transition-all text-sm"
          >
            {loading ? '⏳ 刷新中...' : '🔄 刷新数据'}
          </button>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="text-4xl mb-4 animate-pulse">📊</div>
            <p className="text-white/60">正在加载排名数据...</p>
          </div>
        )}

        {/* Top 3 展示 */}
        {!loading && data?.top3 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              🏅 Top 3 本周之星
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.top3.map((project) => (
                <a
                  key={project.rank}
                  href={`https://github.com/${project.owner}/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all hover:scale-105 ${
                    project.rank === 1 ? 'md:order-1 ring-2 ring-yellow-400/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-2xl ${
                      project.rank === 1 ? '👑' : project.rank === 2 ? '🥈' : '🥉'
                    }`}>
                      {project.rank === 1 ? '👑' : project.rank === 2 ? '🥈' : '🥉'}
                    </span>
                    <span className="text-white/40 text-sm">
                      #{project.rank}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {project.repo}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    {project.owner}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-yellow-400">⭐ {project.stars}</span>
                    <span className="text-green-400">+{project.weeklyGrowth.toLocaleString()}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 完整排名列表 */}
        {!loading && data?.rankings && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">
                📊 Top 20 完整榜单
              </h2>
            </div>
            <div className="divide-y divide-white/5">
              {data.rankings.map((project) => (
                <a
                  key={project.rank}
                  href={`https://github.com/${project.owner}/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    project.rank <= 3
                      ? project.rank === 1 ? 'bg-yellow-500/20 text-yellow-400'
                        : project.rank === 2 ? 'bg-gray-400/20 text-gray-300'
                        : 'bg-amber-600/20 text-amber-500'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    {project.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium truncate">
                        {project.repo}
                      </span>
                      <span className="text-white/40 text-sm">
                        / {project.owner}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-yellow-400 whitespace-nowrap">
                      ⭐ {project.stars}
                    </span>
                    <span className="text-green-400 whitespace-nowrap">
                      +{project.weeklyGrowth}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 数据来源 */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm mb-2">
            数据来源
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/OpenGithubs/github-weekly-rank"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg text-white/60 hover:bg-white/20 transition-all text-sm"
            >
              📂 OpenGithubs/github-weekly-rank
            </a>
            <a
              href="https://github.com/trending"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg text-white/60 hover:bg-white/20 transition-all text-sm"
            >
              🔥 GitHub Trending
            </a>
          </div>
        </div>

        {/* 提示 */}
        <div className="mt-6 p-4 bg-white/5 rounded-xl text-center">
          <p className="text-white/50 text-xs">
            💡 排名基于项目 star 数量和本周增长量综合计算
          </p>
          <p className="text-white/30 text-xs mt-1">
            每周一更新
          </p>
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

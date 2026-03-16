'use client'

import { useState, useEffect } from 'react'

// 标签颜色映射
const tagColors = {
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  red: 'bg-red-500/20 text-red-400 border-red-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
}

// 格式化日期
function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

export default function Home() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const res = await fetch('/api/news')
        const data = await res.json()
        if (data.success && data.data) {
          setNews(data.data)
        } else {
          setError('获取资讯失败')
        }
      } catch (err) {
        setError('网络错误，请稍后重试')
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 头部 */}
      <header className="py-12 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-xl">👁️</span>
            <span className="text-white font-medium">极客观察</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            AI · 科技 · 经济
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> 资讯</span>
          </h1>
          <p className="text-lg text-white/70 mb-8">
            混排AI、科技、经济相关资讯 · 每日更新
          </p>
        </div>
      </header>

      {/* 资讯列表 */}
      <section className="py-8 px-5">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            // 加载状态
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/10 rounded w-20 mb-3"></div>
                      <div className="h-5 bg-white/10 rounded w-full mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // 错误状态
            <div className="text-center py-12">
              <div className="text-4xl mb-4">😢</div>
              <p className="text-white/60 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors"
              >
                点击重试
              </button>
            </div>
          ) : news.length === 0 ? (
            // 空数据状态
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-white/60">暂无资讯数据</p>
            </div>
          ) : (
            // 资讯列表
            <div className="space-y-4">
              {news.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${tagColors[item.color] || tagColors.purple}`}>
                          {item.tag}
                        </span>
                        <span className="text-white/40 text-xs">{item.source}</span>
                        <span className="text-white/30 text-xs">·</span>
                        <span className="text-white/40 text-xs">{formatDate(item.date)}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-white/60 text-sm line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-8 px-5 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">
          极客观察 · AI 科技 经济资讯
        </p>
        <p className="text-white/30 text-xs mt-2">
          数据来源：36氪、虎嗅、IT之家、经济时报 · 每日更新
        </p>
      </footer>
    </div>
  )
}

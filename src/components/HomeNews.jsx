'use client'

import { useState, useEffect } from 'react'
import { AdBanner } from './Ads'
import { useTranslation } from './I18nProvider'

const tagColors = {
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  red: 'bg-red-500/20 text-red-400 border-red-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

function formatDate(dateStr, locale) {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const isZh = locale === 'zh'

    if (hours < 1) return isZh ? '刚刚' : 'Just now'
    if (hours < 24) return isZh ? `${hours}小时前` : `${hours}h ago`
    if (days < 7) return isZh ? `${days}天前` : `${days}d ago`
    return date.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

export default function HomeNews() {
  const { t, locale } = useTranslation()
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
          setError(t('home.loadError'))
        }
      } catch {
        setError(t('home.loadError'))
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [t])

  return (
    <section className="py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          {t('home.latestNews')}
        </h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 animate-pulse">
                <div className="flex items-start gap-4">
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
          <div className="text-center py-12">
            <div className="text-4xl mb-4">😢</div>
            <p className="text-white/60 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors"
            >
              {t('home.retry')}
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-white/60">{t('home.noData')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {news.slice(0, 12).map((item) => (
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
                      <span className="text-white/40 text-xs">{formatDate(item.date, locale)}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              </a>
            ))}
            {news.length > 12 && (
              <div className="text-center pt-2">
                <a href="/trending" className="text-white/50 hover:text-white/80 text-sm transition-colors">
                  {t('home.viewMore')}
                </a>
              </div>
            )}
          </div>
        )}
        <div className="mt-6">
          <AdBanner className="mx-auto max-w-2xl" />
        </div>
      </div>
    </section>
  )
}
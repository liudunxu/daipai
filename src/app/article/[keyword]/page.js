'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function ArticlePage() {
  const params = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [regenerating, setRegenerating] = useState(false)
  const [syncingWechat, setSyncingWechat] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 仅在客户端访问 sessionStorage/localStorage
  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? sessionStorage.getItem('seo_token') || localStorage.getItem('seo_token')
      : null
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    async function loadContent() {
      try {
        // 使用 article_id 从 API 获取文章内容
        const articleId = params?.keyword || ''
        const res = await fetch(`/api/seo/article?id=${encodeURIComponent(articleId)}`)

        if (res.ok) {
          const data = await res.json()
          if (data.content) {
            setContent(data.content)
          } else {
            setError('文章不存在或尚未生成')
          }
        } else {
          setError('文章不存在或尚未生成')
        }
      } catch (err) {
        setError('加载失败')
      } finally {
        setLoading(false)
      }
    }

    if (params?.keyword) {
      loadContent()
    }
  }, [params?.keyword])

  async function handleRegenerate() {
    if (!isLoggedIn) {
      alert('请先在SEO管理页面登录后再试')
      return
    }

    if (!confirm('确定要重新生成这篇文章吗？')) return

    setRegenerating(true)
    try {
      const token = typeof window !== 'undefined'
        ? sessionStorage.getItem('seo_token') || localStorage.getItem('seo_token')
        : null
      const keyword = decodeURIComponent(params?.keyword || '')

      const res = await fetch('/api/seo/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ keyword })
      })

      const data = await res.json()
      if (data.success) {
        alert('文章重新生成成功！')
        window.location.reload()
      } else {
        alert('重新生成失败: ' + (data.error || '未知错误'))
      }
    } catch (error) {
      alert('重新生成失败，请重试')
    } finally {
      setRegenerating(false)
    }
  }

  async function handleSyncToWechat() {
    if (!isLoggedIn) {
      alert('请先在SEO管理页面登录后再试')
      return
    }

    setSyncingWechat(true)
    try {
      const token = typeof window !== 'undefined'
        ? sessionStorage.getItem('seo_token') || localStorage.getItem('seo_token')
        : null
      const keyword = decodeURIComponent(params?.keyword || '')

      const res = await fetch('/api/seo/wechat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ keyword })
      })

      const data = await res.json()
      if (data.success) {
        alert('同步到微信公众号草稿箱成功！')
      } else {
        alert('同步失败: ' + (data.error || '未知错误'))
      }
    } catch (error) {
      alert('同步失败，请重试')
    } finally {
      setSyncingWechat(false)
    }
  }

  const keyword = params?.keyword || ''
  const title = `${decodeURIComponent(keyword)} - 极客观察`

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white/60">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">文章不存在</h1>
            <p className="text-white/60 mb-6">{error}</p>
            <a href="/seo" className="text-blue-400 hover:underline">
              返回SEO管理页面 →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`关于${keyword}的专业解读`} />
        <meta name="keywords" content={keyword} />
        <link rel="canonical" href={`https://www.zkwatcher.top/article/${keyword}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`关于${keyword}的专业解读`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            keywords: keyword,
            datePublished: new Date().toISOString(),
            author: { '@type': 'Person', name: '东北雨姐' }
          })
        }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <article className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="prose prose-invert prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {isLoggedIn && (
              <>
                <button
                  onClick={handleRegenerate}
                  disabled={regenerating}
                  className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 disabled:opacity-50 transition-colors"
                >
                  {regenerating ? '重新生成中...' : '重新生成'}
                </button>
                <button
                  onClick={handleSyncToWechat}
                  disabled={syncingWechat}
                  className="px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 disabled:opacity-50 transition-colors"
                >
                  {syncingWechat ? '同步中...' : '同步到微信公众号'}
                </button>
              </>
            )}
            <a href="/seo" className="px-6 py-2 text-blue-400 hover:underline">
              ← 返回SEO管理页面
            </a>
          </div>
        </article>
      </div>
    </>
  )
}
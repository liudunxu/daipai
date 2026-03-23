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

  const getToken = () => {
    return sessionStorage.getItem('seo_token') || localStorage.getItem('seo_token')
  }

  const isLoggedIn = !!getToken()

  useEffect(() => {
    async function loadContent() {
      try {
        // 尝试从API获取文章内容
        const keyword = params?.keyword || ''
        const res = await fetch(`/api/seo/article?keyword=${encodeURIComponent(keyword)}`)

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
      const token = getToken()
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
              <button
                onClick={handleRegenerate}
                disabled={regenerating}
                className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 disabled:opacity-50 transition-colors"
              >
                {regenerating ? '重新生成中...' : '重新生成'}
              </button>
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
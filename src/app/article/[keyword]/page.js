'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function ArticlePage() {
  const params = useParams()
  const [content, setContent] = useState(null)
  const [articleMeta, setArticleMeta] = useState({})
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
            // 保存从API返回的真实元数据
            if (data.title || data.keyword) {
              setArticleMeta({
                title: data.title || decodeURIComponent(keyword),
                description: data.description || '',
                keyword: data.keyword || decodeURIComponent(keyword),
                generatedAt: data.generatedAt || null
              })
            }
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
      const articleId = decodeURIComponent(params?.keyword || '')

      const res = await fetch('/api/seo/wechat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ articleId })
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
  const articleTitle = articleMeta.title || decodeURIComponent(keyword)
  const articleDesc = articleMeta.description || `关于${decodeURIComponent(keyword)}的专业解读`
  const title = articleTitle ? `${articleTitle} - 极客观察` : '极客观察'
  const siteKeyword = articleMeta.keyword || decodeURIComponent(keyword)
  // 从文章内容中提取第一张图片作为 og:image
  const firstImgMatch = content ? content.match(/<img[^>]+src=["']([^"']+)["']/i) : null
  const ogImage = firstImgMatch ? firstImgMatch[1] : ''

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-[#999] text-sm">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] py-12 px-4">
        <article className="max-w-[680px] mx-auto">
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[#333] mb-4">文章不存在</h1>
            <p className="text-[#999] mb-6">{error}</p>
            <a href="/seo" className="text-[#576b95] hover:underline">
              返回SEO管理页面 →
            </a>
          </div>
        </article>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={articleDesc} />
        <meta name="keywords" content={siteKeyword} />
        <link rel="canonical" href={`https://www.zkwatcher.top/article/${encodeURIComponent(siteKeyword)}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={articleDesc} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.zkwatcher.top/article/${encodeURIComponent(siteKeyword)}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={articleDesc} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: articleTitle,
            description: articleDesc,
            keywords: siteKeyword,
            datePublished: articleMeta.generatedAt || new Date().toISOString(),
            dateModified: articleMeta.generatedAt || new Date().toISOString(),
            author: { '@type': 'Person', name: '极客观察' },
            publisher: {
              '@type': 'Organization',
              name: '极客观察',
              url: 'https://www.zkwatcher.top'
            },
            image: ogImage ? [ogImage] : []
          })
        }} />
      </Head>

      <div className="min-h-screen bg-[#f5f5f5] py-8 px-4">
        <article className="max-w-[680px] mx-auto">
          {/* 微信风格文章卡片 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* 文章内容区域 */}
            <div className="px-6 py-5">
              <div
                className="article-content text-[#3e3e3e] text-[16px] leading-[1.8]"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                <style jsx>{`
                  .article-content h1 {
                    font-size: 21px;
                    font-weight: bold;
                    color: #333;
                    margin: 20px 0 15px;
                    line-height: 1.4;
                  }
                  .article-content h2 {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    margin: 28px 0 14px;
                    line-height: 1.5;
                    padding-top: 10px;
                    border-top: 1px solid #eee;
                  }
                  .article-content h2:first-child {
                    margin-top: 0;
                    padding-top: 0;
                    border-top: none;
                  }
                  .article-content h3 {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    margin: 22px 0 12px;
                    line-height: 1.5;
                  }
                  .article-content p {
                    margin: 18px 0;
                    line-height: 1.9;
                    text-align: justify;
                  }
                  .article-content p:first-child {
                    margin-top: 0;
                  }
                  .article-content p:last-child {
                    margin-bottom: 0;
                  }
                  .article-content img {
                    max-width: 100%;
                    height: auto;
                    margin: 15px 0;
                    border-radius: 4px;
                  }
                  .article-content ul, .article-content ol {
                    margin: 18px 0;
                    padding-left: 28px;
                  }
                  .article-content li {
                    margin: 8px 0;
                    line-height: 1.8;
                  }
                  .article-content blockquote {
                    margin: 15px 0;
                    padding: 10px 15px;
                    background: #f8f8f8;
                    border-left: 3px solid #ccc;
                    color: #666;
                  }
                  .article-content pre {
                    margin: 15px 0;
                    padding: 12px;
                    background: #f8f8f8;
                    border-radius: 4px;
                    overflow-x: auto;
                    font-size: 14px;
                  }
                  .article-content code {
                    font-family: "SF Mono", Monaco, Consolas, monospace;
                    background: #f5f5f5;
                    padding: 2px 5px;
                    border-radius: 3px;
                    font-size: 14px;
                  }
                  .article-content a {
                    color: #576b95;
                    text-decoration: none;
                  }
                  .article-content a:hover {
                    text-decoration: underline;
                  }
                  .article-content hr {
                    margin: 20px 0;
                    border: none;
                    border-top: 1px solid #eee;
                  }
                  .article-content table {
                    width: 100%;
                    margin: 15px 0;
                    border-collapse: collapse;
                    font-size: 14px;
                  }
                  .article-content th, .article-content td {
                    padding: 8px 12px;
                    border: 1px solid #eee;
                    text-align: left;
                  }
                  .article-content th {
                    background: #f8f8f8;
                    font-weight: bold;
                  }
                `}</style>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>

            {/* 底部信息 */}
            <div className="px-6 py-4 border-t border-[#eee]">
              <div className="flex justify-between items-center text-xs text-[#999]">
                <span>极客观察 · 原创文章</span>
                <span>{articleMeta.generatedAt ? new Date(articleMeta.generatedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {isLoggedIn && (
              <>
                <button
                  onClick={handleRegenerate}
                  disabled={regenerating}
                  className="px-5 py-2 bg-[#4CAF50] text-white text-sm rounded-md hover:bg-[#45a049] disabled:opacity-50 transition-colors"
                >
                  {regenerating ? '重新生成中...' : '重新生成'}
                </button>
                <button
                  onClick={handleSyncToWechat}
                  disabled={syncingWechat}
                  className="px-5 py-2 bg-[#07C160] text-white text-sm rounded-md hover:bg-[#06ad56] disabled:opacity-50 transition-colors"
                >
                  {syncingWechat ? '同步中...' : '同步到微信公众号'}
                </button>
              </>
            )}
            <a
              href="/seo"
              className="px-5 py-2 text-sm text-[#576b95] hover:underline"
            >
              ← 返回SEO管理页面
            </a>
          </div>
        </article>
      </div>
    </>
  )
}
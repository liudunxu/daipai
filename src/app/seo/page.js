'use client'

import Head from 'next/head'
import { useState, useEffect } from 'react'

const seoData = {
  title: 'SEO文章管理 - 极客观察',
  description: '每日SEO文章自动生成系统，文章主题规划、自动生成高质量SEO文章',
  keywords: 'SEO,文章生成,文章主题规划',
  url: 'https://www.zkwatcher.top/seo'
}

export default function SEOManagePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [keywords, setKeywords] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('add')
  const [contentInput, setContentInput] = useState('')
  const [generatingKeyword, setGeneratingKeyword] = useState('')
  const [syncingWechat, setSyncingWechat] = useState(false)
  const [dailyTasks, setDailyTasks] = useState([])

  // 获取存储的token
  const getToken = () => {
    return sessionStorage.getItem('seo_token') || localStorage.getItem('seo_token')
  }

  useEffect(() => {
    // 检查是否已验证 (sessionStorage 或 localStorage)
    const sessionAuth = sessionStorage.getItem('seo_auth')
    const localAuth = localStorage.getItem('seo_auth')
    const savedAuth = sessionAuth || localAuth

    if (savedAuth === 'true' && getToken()) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchKeywords()
      fetchDailyTasks()
    }
  }, [isAuthenticated])

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setAuthError(true)
      return
    }

    try {
      const res = await fetch('/api/seo/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, remember })
      })
      const data = await res.json()
      if (data.success) {
        setIsAuthenticated(true)
        setAuthError(false)
        // 存储token和验证状态
        if (remember) {
          localStorage.setItem('seo_token', data.token)
          localStorage.setItem('seo_auth', 'true')
          localStorage.setItem('seo_username', username)
          sessionStorage.removeItem('seo_token')
          sessionStorage.removeItem('seo_auth')
        } else {
          sessionStorage.setItem('seo_token', data.token)
          sessionStorage.setItem('seo_auth', 'true')
          localStorage.removeItem('seo_token')
          localStorage.removeItem('seo_auth')
          localStorage.removeItem('seo_username')
        }
      } else {
        setAuthError(true)
      }
    } catch {
      setAuthError(true)
    }
  }

  function handleLogout() {
    setIsAuthenticated(false)
    sessionStorage.removeItem('seo_auth')
    sessionStorage.removeItem('seo_token')
    localStorage.removeItem('seo_auth')
    localStorage.removeItem('seo_token')
  }

  // 带token的fetch封装
  function fetchWithToken(url, options = {}) {
    const token = getToken()
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(url, { ...options, headers })
  }

  async function fetchKeywords() {
    try {
      const res = await fetchWithToken('/api/seo/keywords')
      const data = await res.json()
      if (data.success) {
        setKeywords(data.data)
      }
    } catch (error) {
      console.error('获取关键词失败:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchDailyTasks() {
    try {
      const res = await fetchWithToken('/api/seo/daily-task')
      const data = await res.json()
      if (data.success) {
        setDailyTasks(data.tasks)
      }
    } catch (error) {
      console.error('获取每日任务失败:', error)
    }
  }

  async function addKeyword() {
    if (!contentInput.trim()) {
      alert('请输入内容')
      return
    }
    const token = getToken()
    if (!token) {
      alert('请先登录')
      return
    }
    try {
      const res = await fetchWithToken('/api/seo/keywords', {
        method: 'POST',
        body: JSON.stringify({
          keyword: contentInput
        })
      })
      const data = await res.json()
      if (data.success) {
        setContentInput('')
        setActiveTab('list')
        fetchKeywords()
        alert('添加成功！')
      } else {
        alert('添加失败: ' + (data.error || '未知错误'))
      }
    } catch (error) {
      console.error('添加关键词失败:', error)
      alert('添加失败，请检查网络')
    }
  }

  async function generateArticle(keyword) {
    setGeneratingKeyword(keyword)
    try {
      const res = await fetchWithToken('/api/seo/generate', {
        method: 'POST',
        body: JSON.stringify({ keyword })
      })
      if (res.status === 401) {
        alert('登录已过期，请重新登录')
        handleLogout()
        return
      }
      const data = await res.json()
      if (data.success) {
        alert(`文章生成成功！路径: ${data.pagePath}`)
        fetchKeywords()
      } else {
        alert('生成失败: ' + (data.error || '未知错误'))
      }
    } catch (error) {
      console.error('生成失败:', error)
      alert('网络错误，请检查网络连接')
    } finally {
      setGeneratingKeyword('')
    }
  }

  async function syncToWechat(keyword) {
    if (!confirm(`确定同步「${keyword}」到微信公众号草稿箱？`)) return
    setSyncingWechat(true)
    try {
      const res = await fetchWithToken('/api/seo/wechat', {
        method: 'POST',
        body: JSON.stringify({ keyword })
      })
      if (res.status === 401) {
        alert('登录已过期，请重新登录')
        handleLogout()
        return
      }
      const data = await res.json()
      if (data.success) {
        alert(`老铁，文章「${keyword}」整到微信草稿箱了！`)
      } else {
        alert(`同步失败: ${data.error}`)
      }
    } catch (error) {
      console.error('同步失败:', error)
      alert('网络错误，同步失败')
    } finally {
      setSyncingWechat(false)
    }
  }

  async function setTodayTask(keywordId) {
    try {
      const res = await fetchWithToken('/api/seo/daily-task', {
        method: 'POST',
        body: JSON.stringify({ keywordId })
      })
      const data = await res.json()
      if (data.success) {
        fetchKeywords()
        fetchDailyTasks()
      }
    } catch (error) {
      console.error('设置今日任务失败:', error)
    }
  }

  async function deleteKeyword(id) {
    if (!confirm('确定删除？')) return
    try {
      const res = await fetchWithToken(`/api/seo/keywords?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchKeywords()
      }
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    today: 'bg-red-500/20 text-red-400 border-red-500/30',
    done: 'bg-green-500/20 text-green-400 border-green-500/30'
  }

  const statusLabels = {
    pending: '待处理',
    today: '今日任务',
    done: '已完成'
  }

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.url} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 未登录 - 显示登录表单 */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto mt-20">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">SEO管理后台</h1>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/60 mb-2">用户名</label>
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="请输入用户名"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2">密码</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleLogin()}
                      placeholder="请输入密码"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor="remember" className="text-white/60 text-sm">记住登录状态</label>
                  </div>
                  {authError && (
                    <p className="text-red-400 text-sm">用户名或密码错误，请重试</p>
                  )}
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    进入后台
                  </button>
                </div>
              </div>
            </div>
          ) : (
          /* 已登录 - 显示管理界面 */
          <>
            {/* 顶部导航 */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-center flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">文章生成助手</h1>
                <p className="text-white/60">老铁们，这是雨姐整的贼啦牛X的SEO自动整活系统！</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/5 text-white/60 hover:bg-white/10 rounded-lg text-sm"
              >
                退出登录
              </button>
            </div>

          {/* 今日任务 */}
          {dailyTasks.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-red-400 mb-4">今日任务 🚀</h2>
              <div className="flex flex-wrap gap-2">
                {dailyTasks.map(task => (
                  <span key={task.id} className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full">
                    {task.keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tab导航 */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'add'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              新建文章
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              文章列表
            </button>
          </div>

          {/* 文章列表 */}
          {activeTab === 'list' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">文章列表</h2>

              {loading ? (
                <div className="text-center text-white/60 py-8">加载中...</div>
              ) : keywords.length === 0 ? (
                <div className="text-center text-white/60 py-8">
                  还没有文章，老铁整一个呗！
                </div>
              ) : (
                <div className="space-y-3">
                  {keywords.map(kw => (
                    <div key={kw.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white font-bold text-lg truncate max-w-md" title={kw.keyword}>{kw.keyword.length > 30 ? kw.keyword.slice(0, 30) + '...' : kw.keyword}</span>
                          <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[kw.status] || statusColors.pending}`}>
                            {statusLabels[kw.status] || '未知'}
                          </span>
                        </div>
                        <div className="text-white/40 text-sm">
                          计划日期: {kw.scheduledDate}
                          {kw.generatedAt && ` | 生成时间: ${new Date(kw.generatedAt).toLocaleString('zh-CN')}`}
                        </div>
                        {kw.pagePath && (
                          <a href={kw.pagePath} target="_blank" className="text-blue-400 text-sm hover:underline">
                            查看文章 →
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {kw.status !== 'done' && (
                          <button
                            onClick={() => generateArticle(kw.keyword)}
                            disabled={!!generatingKeyword}
                            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 disabled:opacity-50"
                          >
                            {generatingKeyword === kw.keyword ? '生成中...' : '生成'}
                          </button>
                        )}
                        {kw.status === 'done' && (
                          <>
                            <button
                              onClick={() => generateArticle(kw.keyword)}
                              disabled={!!generatingKeyword}
                              className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 disabled:opacity-50"
                            >
                              {generatingKeyword === kw.keyword ? '生成中...' : '重新生成'}
                            </button>
                            <button
                              onClick={() => syncToWechat(kw.keyword)}
                              disabled={syncingWechat || kw.wechatSynced || !!generatingKeyword}
                              className={`px-4 py-2 rounded-lg disabled:opacity-50 ${
                                kw.wechatSynced
                                  ? 'bg-gray-500/20 text-gray-400 cursor-default'
                                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                              }`}
                            >
                              {kw.wechatSynced ? '已同步' : (syncingWechat ? '同步中...' : '同步微信')}
                            </button>
                          </>
                        )}
                        {kw.status === 'pending' && (
                          <button
                            onClick={() => setTodayTask(kw.id)}
                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                          >
                            设为今日
                          </button>
                        )}
                        <button
                          onClick={() => deleteKeyword(kw.id)}
                          className="px-4 py-2 bg-red-500/10 text-red-400/70 rounded-lg hover:bg-red-500/20 hover:text-red-400"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 新建文章 */}
          {activeTab === 'add' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">输入内容生成文章</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 mb-2">内容（网站、主题、描述等，支持几百字）</label>
                  <textarea
                    value={contentInput}
                    onChange={e => setContentInput(e.target.value)}
                    placeholder="整点内容进去... 可以输入网站标题、业务描述、想写的文章主题等"
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 resize-y"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={addKeyword}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    保存到文章库
                  </button>
                </div>
              </div>
            </div>
          )}

          </>
          )}
        </div>
      </div>
    </>
  )
}

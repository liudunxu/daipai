'use client'

import Head from 'next/head'
import { useState, useEffect } from 'react'

const seoData = {
  title: 'SEO文章管理 - 极客观察',
  description: '每日SEO文章自动生成系统，关键词规划、竞品分析、自动生成高质量SEO文章',
  keywords: 'SEO,文章生成,关键词规划,竞品分析',
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
  const [activeTab, setActiveTab] = useState('list')
  const [newKeyword, setNewKeyword] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [dailyTasks, setDailyTasks] = useState([])

  useEffect(() => {
    // 检查是否已验证 (sessionStorage 或 localStorage)
    const sessionAuth = sessionStorage.getItem('seo_auth')
    const localAuth = localStorage.getItem('seo_auth')
    const savedAuth = sessionAuth || localAuth

    if (savedAuth === 'true') {
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
        // 根据是否记住选择存储位置
        if (remember) {
          localStorage.setItem('seo_auth', 'true')
          localStorage.setItem('seo_username', username)
          sessionStorage.removeItem('seo_auth')
        } else {
          sessionStorage.setItem('seo_auth', 'true')
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
  }

  async function fetchKeywords() {
    try {
      const res = await fetch('/api/seo/keywords')
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
      const res = await fetch('/api/seo/daily-task')
      const data = await res.json()
      if (data.success) {
        setDailyTasks(data.tasks)
      }
    } catch (error) {
      console.error('获取每日任务失败:', error)
    }
  }

  async function addKeyword() {
    if (!newKeyword.trim()) return
    try {
      const res = await fetch('/api/seo/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: newKeyword,
          category: newCategory || '未分类'
        })
      })
      const data = await res.json()
      if (data.success) {
        setNewKeyword('')
        setNewCategory('')
        fetchKeywords()
      }
    } catch (error) {
      console.error('添加关键词失败:', error)
    }
  }

  async function analyzeKeyword(keyword) {
    setAnalyzing(true)
    setAnalysisResult(null)
    try {
      const res = await fetch(`/api/seo/analyze?keyword=${encodeURIComponent(keyword)}`)
      const data = await res.json()
      if (data.success) {
        setAnalysisResult(data)
      } else {
        alert('分析失败: ' + data.error)
      }
    } catch (error) {
      console.error('分析失败:', error)
      alert('分析失败')
    } finally {
      setAnalyzing(false)
    }
  }

  async function generateArticle(keyword) {
    setGenerating(true)
    try {
      const res = await fetch('/api/seo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      })
      const data = await res.json()
      if (data.success) {
        alert(`文章生成成功！路径: ${data.pagePath}`)
        fetchKeywords()
      } else {
        alert('生成失败: ' + data.error)
      }
    } catch (error) {
      console.error('生成失败:', error)
      alert('生成失败')
    } finally {
      setGenerating(false)
    }
  }

  async function setTodayTask(keywordId) {
    try {
      const res = await fetch('/api/seo/daily-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const res = await fetch(`/api/seo/keywords?id=${id}`, { method: 'DELETE' })
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
                <h1 className="text-4xl font-bold text-white mb-2">SEO文章自动创作系统</h1>
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
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              关键词列表
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'add'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              添加关键词
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'analyze'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              竞品分析
            </button>
          </div>

          {/* 关键词列表 */}
          {activeTab === 'list' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">关键词规划表</h2>

              {loading ? (
                <div className="text-center text-white/60 py-8">加载中...</div>
              ) : keywords.length === 0 ? (
                <div className="text-center text-white/60 py-8">
                  还没有关键词，老铁整一个呗！
                </div>
              ) : (
                <div className="space-y-3">
                  {keywords.map(kw => (
                    <div key={kw.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white font-bold text-lg">{kw.keyword}</span>
                          <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[kw.status] || statusColors.pending}`}>
                            {statusLabels[kw.status] || '未知'}
                          </span>
                          <span className="text-white/40 text-sm">{kw.category}</span>
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
                        <button
                          onClick={() => analyzeKeyword(kw.keyword)}
                          disabled={analyzing}
                          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 disabled:opacity-50"
                        >
                          分析
                        </button>
                        {kw.status !== 'done' && (
                          <button
                            onClick={() => generateArticle(kw.keyword)}
                            disabled={generating}
                            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 disabled:opacity-50"
                          >
                            生成
                          </button>
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

          {/* 添加关键词 */}
          {activeTab === 'add' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">添加新关键词</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 mb-2">关键词</label>
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={e => setNewKeyword(e.target.value)}
                    placeholder="整点关键词..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-2">分类</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="未分类"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                  />
                </div>
                <button
                  onClick={addKeyword}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  添加关键词
                </button>
              </div>
            </div>
          )}

          {/* 竞品分析 */}
          {activeTab === 'analyze' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">竞品分析</h2>

              {analysisResult ? (
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-400 font-bold mb-2">分析完成！</p>
                    <p className="text-white/60">分析了 {analysisResult.totalCompetitors} 篇竞品文章</p>
                    <p className="text-white/60">平均字数: {analysisResult.analysis.avgWordCount}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">竞品列表</h3>
                    <div className="space-y-3">
                      {analysisResult.analysis.competitors.map((comp, idx) => (
                        <div key={idx} className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-white font-bold mb-2">{comp.title}</h4>
                          <p className="text-white/60 text-sm mb-2">{comp.snippet}</p>
                          <a href={comp.url} target="_blank" className="text-blue-400 text-sm hover:underline">
                            {comp.url}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">常见话题</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.analysis.commonTopics.map((topic, idx) => (
                        <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white/60 py-8">
                  {analyzing ? '分析中...' : '选择一个关键词进行分析'}
                </div>
              )}
            </div>
          )}

          {/* 使用说明 */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">老铁们使用指南 🚀</h2>
            <div className="space-y-4 text-white/80">
              <div className="flex gap-4">
                <span className="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                <p>在"添加关键词"中添加你想写的文章主题（建议先做关键词规划）</p>
              </div>
              <div className="flex gap-4">
                <span className="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                <p>使用"分析"功能看看竞品们都整了啥玩意儿</p>
              </div>
              <div className="flex gap-4">
                <span className="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                <p>点击"生成"让AI自动整出一篇比竞品牛X的文章！</p>
              </div>
              <div className="flex gap-4">
                <span className="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                <p>文章会自动创建页面，直接访问查看效果！</p>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'

function DaipaiCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [justClicked, setJustClicked] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // 获取带派次数（带缓存）
  const fetchCount = async (forceRefresh = false) => {
    // 优先使用本地缓存
    const cached = localStorage.getItem('daipai_count')
    if (!forceRefresh && cached) {
      setCount(parseInt(cached, 10))
      setIsInitialized(true)
    }

    try {
      const res = await fetch('/api/daipai')
      if (!res.ok) throw new Error('API Error')
      const data = await res.json()
      const newCount = data.count || 0
      setCount(newCount)
      localStorage.setItem('daipai_count', newCount.toString())
    } catch (error) {
      console.log('获取次数失败')
    } finally {
      setIsInitialized(true)
    }
  }

  useEffect(() => {
    fetchCount()
  }, [])

  // 点击带派（乐观更新）
  const handleClick = async () => {
    // 立即乐观更新
    const optimisticCount = count + 1
    setCount(optimisticCount)
    localStorage.setItem('daipai_count', optimisticCount.toString())
    setJustClicked(true)
    setTimeout(() => setJustClicked(false), 500)

    setLoading(true)
    try {
      const res = await fetch('/api/daipai', {
        method: 'POST'
      })
      if (!res.ok) throw new Error('API Error')
      const data = await res.json()
      // 服务器返回最新值，同步本地缓存
      const serverCount = data.count || optimisticCount
      setCount(serverCount)
      localStorage.setItem('daipai_count', serverCount.toString())
    } catch (error) {
      console.log('提交失败')
      // 失败时回滚（可选）
    } finally {
      setLoading(false)
    }
  }

  // 骨架屏
  if (!isInitialized) {
    return (
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4 text-center border border-pink-200">
        <p className="text-gray-600 mb-3 font-medium">带派不老铁</p>
        <div className="h-12 bg-gray-200 animate-pulse rounded-full mx-auto w-32"></div>
        <p className="mt-3 text-gray-600">
          加载中...
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4 text-center border border-pink-200">
      <p className="text-gray-600 mb-3 font-medium">带派不老铁</p>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500
          text-white font-bold rounded-full
          hover:scale-105 transition-all
          disabled:opacity-50
          ${justClicked ? 'scale-110' : ''}
        `}
      >
        {loading ? '带派中...' : '👊 带派'}
      </button>
      <p className="mt-3 text-gray-600">
        已有 <span className="font-bold text-pink-600 text-lg">{count}</span> 次带派
      </p>
    </div>
  )
}

export default DaipaiCounter

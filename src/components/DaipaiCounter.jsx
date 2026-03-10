'use client'

import { useState, useEffect } from 'react'

function DaipaiCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [justClicked, setJustClicked] = useState(false)

  // 获取带派次数
  const fetchCount = async () => {
    try {
      const res = await fetch('/api/daipai')
      if (!res.ok) throw new Error('API Error')
      const data = await res.json()
      setCount(data.count || 0)
    } catch (error) {
      console.log('获取次数失败')
    }
  }

  useEffect(() => {
    fetchCount()
  }, [])

  // 点击带派
  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/daipai', {
        method: 'POST'
      })
      if (!res.ok) throw new Error('API Error')
      const data = await res.json()
      setCount(data.count || 0)
      setJustClicked(true)
      setTimeout(() => setJustClicked(false), 500)
    } catch (error) {
      console.log('提交失败')
    } finally {
      setLoading(false)
    }
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

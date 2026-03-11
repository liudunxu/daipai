'use client'

import { useState, useEffect } from 'react'

function DaipaiCounter() {
  const [count, setCount] = useState(0)
  const [justClicked, setJustClicked] = useState(false)

  // 初始化从本地获取
  useEffect(() => {
    const cached = localStorage.getItem('daipai_count')
    if (cached) {
      setCount(parseInt(cached, 10))
    } else {
      // 初始值
      setCount(Math.floor(Math.random() * 1000) + 500)
    }
  }, [])

  // 点击带派（本地存储）
  const handleClick = () => {
    const newCount = count + 1
    setCount(newCount)
    localStorage.setItem('daipai_count', newCount.toString())
    setJustClicked(true)
    setTimeout(() => setJustClicked(false), 500)
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4 text-center border border-pink-200">
      <p className="text-gray-600 mb-3 font-medium">带派不老铁</p>
      <button
        onClick={handleClick}
        className={`
          px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500
          text-white font-bold rounded-full
          hover:scale-105 transition-all
          ${justClicked ? 'scale-110' : ''}
        `}
      >
        👊 带派
      </button>
      <p className="mt-3 text-gray-600">
        已有 <span className="font-bold text-pink-600 text-lg">{count}</span> 次带派
      </p>
    </div>
  )
}

export default DaipaiCounter

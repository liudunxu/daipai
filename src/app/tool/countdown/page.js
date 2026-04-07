'use client'

import { useState, useEffect } from 'react'

export default function CountdownPage() {
  const [events, setEvents] = useState([
    { id: 1, name: '期末考试', date: '2026-07-01', color: 'from-red-500 to-orange-500' },
    { id: 2, name: '暑假开始', date: '2026-07-15', color: 'from-blue-500 to-cyan-500' },
    { id: 3, name: '新学期开学', date: '2026-09-01', color: 'from-green-500 to-emerald-500' },
  ])
  const [newEventName, setNewEventName] = useState('')
  const [newEventDate, setNewEventDate] = useState('')
  const [showForm, setShowForm] = useState(false)

  // 计算两个日期之间的差异
  const calculateCountdown = (targetDate) => {
    const now = new Date()
    const target = new Date(targetDate)
    const diff = target - now

    if (diff < 0) {
      return { passed: true, days: Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24))) }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { passed: false, days, hours, minutes, seconds }
  }

  // 添加新事件
  const addEvent = () => {
    if (!newEventName || !newEventDate) return

    const newEvent = {
      id: Date.now(),
      name: newEventName,
      date: newEventDate,
      color: ['from-red-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500', 'from-yellow-500 to-amber-500'][events.length % 5],
    }

    setEvents([...events, newEvent])
    setNewEventName('')
    setNewEventDate('')
    setShowForm(false)
  }

  // 删除事件
  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id))
  }

  // 随机颜色数组
  const colors = [
    'from-red-500 to-orange-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-yellow-500 to-amber-500',
    'from-indigo-500 to-purple-500',
    'from-rose-500 to-pink-500',
    'from-teal-500 to-cyan-500',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📅 倒数日
          </h1>
          <p className="text-white/60">
            记录重要日子，告别漫长等待
          </p>
        </header>

        {/* 添加新事件按钮 */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full mb-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all"
        >
          {showForm ? '收起' : '+ 添加新事件'}
        </button>

        {/* 添加事件表单 */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">事件名称</label>
              <input
                type="text"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                placeholder="如：期末考试、春节、生日..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">目标日期</label>
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <button
              onClick={addEvent}
              disabled={!newEventName || !newEventDate}
              className={`w-full py-3 font-bold rounded-xl transition-all ${
                newEventName && newEventDate
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400'
                  : 'bg-white/20 text-white/40 cursor-not-allowed'
              }`}
            >
              添加
            </button>
          </div>
        )}

        {/* 事件列表 */}
        <div className="space-y-4">
          {events.map((event) => (
            <CountdownCard
              key={event.id}
              event={event}
              calculateCountdown={calculateCountdown}
              onDelete={() => deleteEvent(event.id)}
            />
          ))}
        </div>

        {events.length === 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-white/60">还没有添加任何事件</p>
            <p className="text-white/40 text-sm mt-2">点击上方按钮添加你的第一个倒数日</p>
          </div>
        )}

        {/* 提示 */}
        <div className="mt-8 text-center text-white/40 text-sm">
          <p>倒数日数据保存在本地浏览器中</p>
        </div>

        {/* 返回 */}
        <footer className="mt-8 text-center">
          <div className="flex justify-center gap-4 mb-2">
            <a href="/nav" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 导航页
            </a>
            <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← 首页
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

// 倒计时卡片组件
function CountdownCard({ event, calculateCountdown, onDelete }) {
  const [countdown, setCountdown] = useState(calculateCountdown(event.date))
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(event.date))
    }, 1000)

    return () => clearInterval(timer)
  }, [event.date, calculateCountdown])

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(onDelete, 300)
  }

  return (
    <div
      className={`bg-gradient-to-r ${event.color} p-6 rounded-2xl shadow-lg transition-all duration-300 ${
        isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{event.name}</h3>
        <button
          onClick={handleDelete}
          className="text-white/60 hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-white/10 transition-all"
        >
          删除
        </button>
      </div>

      <div className="text-center">
        {countdown.passed ? (
          <div>
            <div className="text-white/60 text-sm mb-1">已过去</div>
            <div className="text-4xl font-black text-white">{countdown.days}</div>
            <div className="text-white/60 text-sm">天</div>
          </div>
        ) : (
          <div className="flex justify-center gap-2 md:gap-4">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white">{countdown.days}</div>
              <div className="text-white/60 text-xs">天</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white">{countdown.hours}</div>
              <div className="text-white/60 text-xs">时</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white">{countdown.minutes}</div>
              <div className="text-white/60 text-xs">分</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white">{countdown.seconds}</div>
              <div className="text-white/60 text-xs">秒</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-white/70 text-sm">
        目标日期: {event.date}
      </div>
    </div>
  )
}

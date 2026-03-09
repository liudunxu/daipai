import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:8000'

function Supporters() {
  const [name, setName] = useState('')
  const [supporters, setSupporters] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [apiError, setApiError] = useState(false)

  // 获取声援者列表
  const fetchSupporters = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/supporters`)
      if (!res.ok) throw new Error('API Error')
      const data = await res.json()
      setSupporters(data)
      setApiError(false)
    } catch (error) {
      console.log('API 未启动或不可用')
      setApiError(true)
    }
  }

  useEffect(() => {
    fetchSupporters()
    // 每5秒刷新一次
    const interval = setInterval(fetchSupporters, 5000)
    return () => clearInterval(interval)
  }, [])

  // 提交声援
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setMessage('整点名字呗！')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const res = await fetch(`${API_BASE}/api/supporters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || '提交失败')
      }

      const data = await res.json()
      setMessage(data.message)
      setName('')
      fetchSupporters()
    } catch (error) {
      setMessage('API 服务未启动，先看看热闹得了')
      setApiError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl text-gray-800 mb-4 flex items-center gap-2.5">
        <span className="text-2xl">📢</span>
        声援雨姐
      </h2>

      {/* 声援表单 */}
      <form onSubmit={handleSubmit} className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="写下你的名字，支持雨姐！"
            maxLength={50}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? '提交中...' : '声援！'}
          </button>
        </div>
        {message && (
          <p className={`mt-2 text-sm ${apiError ? 'text-gray-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>

      {/* 声援者列表 */}
      {apiError ? (
        <div className="text-center py-4 text-gray-400 text-sm">
          <p>📡 API 服务未连接</p>
          <p className="mt-1">启动后端服务后可参与声援</p>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-3">
            👥 已声援的老铁 ({supporters.length})
          </h3>
          {supporters.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">暂无声援，快来抢沙发！</p>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
              {supporters.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-sm cursor-default hover:scale-105 transition-transform"
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Supporters

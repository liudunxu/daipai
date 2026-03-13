'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      alert('请填写所有字段')
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            联系我们
          </h1>
          <p className="text-white/60">有任何问题或建议，欢迎联系我们</p>
        </header>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="mb-6">
              <label className="block text-white/80 mb-2 font-medium">您的姓名</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="请输入您的姓名"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white/80 mb-2 font-medium">邮箱地址</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white/80 mb-2 font-medium">留言内容</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="请描述您的问题或建议..."
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              提交留言
            </button>
          </form>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-white mb-2">提交成功！</h2>
            <p className="text-white/60 mb-6">感谢您的留言，我们会尽快回复您。</p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              再次留言
            </button>
          </div>
        )}

        {/* 其他联系方式 */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-4 text-center">其他联系方式</h2>
          <div className="space-y-3 text-white/70">
            <p>📧 邮箱：contact@zkwatcher.top</p>
            <p>💬 微信：扫码加入粉丝群</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/nav" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 返回导航
          </a>
        </div>
      </div>
    </div>
  )
}

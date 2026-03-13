'use client'

import { useState } from 'react'

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://www.zkwatcher.top${url}`
  const shareTitle = title || '实用工具箱'

  const shareLinks = {
    weibo: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
    weixin: '', // 需要二维码
    qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
    douyin: '', // 抖音不支持直接分享链接
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('复制失败，请手动复制链接')
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-white/60 text-sm text-center mb-3">觉得好用？分享给朋友吧</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={shareLinks.weibo}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          分享到微博
        </a>
        <a
          href={shareLinks.qq}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          分享到QQ
        </a>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {copied ? '✓ 已复制' : '复制链接'}
        </button>
      </div>
    </div>
  )
}

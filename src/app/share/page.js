'use client'

import { useState } from 'react'

const socialContents = {
  weibo: {
    name: '微博',
    color: 'from-red-500 to-orange-500',
    contents: [
      '姐妹们！发现一个宝藏网站🏆 24.8万星标！史上增长最快的AI项目，2026年必火！冲👇\n\n{{url}}',
      '救命🆘 这个AI太强了！7×24小时主动干活，比ChatGPT还能干！打工人必备👇\n\n{{url}}',
      '2026年第一个爆火的开源项目！GitHub星标破24.8万，超过Next.js成为历史第一！👇\n\n{{url}}',
    ]
  },
  zhihu: {
    name: '知乎',
    color: 'from-blue-500 to-cyan-500',
    contents: [
      '2026年AI领域最大的黑马出现了。\n\nOpenClaw，一个开源AI Agent项目，上线仅一个月GitHub星标突破24.8万，超越Next.js成为史上增长最快的开源项目。\n\n为什么这么火？\n1️⃣ 7×24小时主动干活，不只是聊天\n2️⃣ 能操作电脑、管理文件、自动订餐\n3️⃣ 完全开源，数据自己掌控\n\n很多大厂都在跟进相关产品，这可能是2026年最重要的技术趋势之一。\n\n感兴趣的朋友可以看看：{{url}}',
      '有哪些适合普通人的AI工具？\n\n最近发现了一个非常适合普通人的AI Agent——OpenClaw。\n\n它不像ChatGPT那样只能聊天，而是能真正帮你干活：\n- 自动整理文件\n- 帮你写报告\n- 自动查询资料\n- 7×24小时待命\n\n关键是开源免费，自己就能部署使用。\n\n官网：{{url}}',
    ]
  },
  xiaohongshu: {
    name: '小红书',
    color: 'from-pink-500 to-rose-500',
    contents: [
      '👩‍💻 打工人必备AI神器！\n\n姐妹们！这个AI太香了😭\n7×24小时主动干活\n妥妥的打工最强外挂！\n\n📎官网在评论区\n\n#AI工具 #打工人 #效率神器 #2026',
      '🔥2026年最火的AI项目！\n\nGitHub星标破24.8万！\n史上增长最快！\n\n打工人终于有救了👀\n\n#AI #开源 #科技',
    ]
  },
  douyin: {
    name: '抖音',
    color: 'from-cyan-500 to-blue-500',
    contents: [
      '2026年最火的AI工具！7×24小时主动干活，打工人必备！👇',
      '这个AI太牛了！24.8万星标，GitHub史上第一！🔥',
    ]
  },
}

export default function SharePage() {
  const url = 'https://www.zkwatcher.top'
  const [copied, setCopied] = useState(null)

  const copyToClipboard = async (text, idx) => {
    const content = text.replace('{{url}}', url)
    try {
      await navigator.clipboard.writeText(content)
      setCopied(idx)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      alert('复制失败')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📢 社交媒体 <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">引流素材</span>
          </h1>
          <p className="text-white/60">
            一键复制，发布到各平台引流
          </p>
        </header>

        {Object.entries(socialContents).map(([key, platform]) => (
          <div key={key} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className={`text-xl font-bold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent mb-4`}>
              {platform.name} 文案
            </h2>
            <div className="space-y-3">
              {platform.contents.map((content, idx) => {
                const contentId = `${key}-${idx}`
                return (
                  <div
                    key={idx}
                    onClick={() => copyToClipboard(content, contentId)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 cursor-pointer transition-colors group"
                  >
                    <p className="text-white/70 text-sm whitespace-pre-line">{content.replace('{{url}}', url)}</p>
                    <span className="text-green-400 text-xs mt-2 inline-block group-hover:text-green-300">
                      {copied === contentId ? '✅ 已复制' : '点击复制'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-6 mt-8">
          <h3 className="text-yellow-300 font-bold mb-3">💡 引流技巧</h3>
          <ul className="text-white/70 text-sm space-y-2">
            <li>• 微博：带话题 #AI #2026科技 更容易上热门</li>
            <li>• 知乎：回答相关问题时提及，效果更好</li>
            <li>• 小红书：配图使用网站截图或二维码</li>
            <li>• 抖音：短视频演示网站功能更吸引人</li>
          </ul>
        </div>

        <footer className="text-center py-6 border-t border-white/10 mt-8">
          <p className="text-white/30 text-sm">
            素材每日更新 · 复制即可使用
          </p>
        </footer>
      </div>
    </div>
  )
}

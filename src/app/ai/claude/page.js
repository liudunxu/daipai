export const metadata = {
  title: 'Claude AI 教程 - Anthropic Claude使用指南',
  description: 'Claude AI使用教程，Anthropic Claude注册使用，Claude 3.5/4版本对比，Claude Code终端工具使用。',
  keywords: ['Claude', 'Claude AI', 'Anthropic', 'Claude教程', 'Claude注册', 'AI助手'],
}

import Link from 'next/link'

export default function ClaudePage() {
  const versions = [
    { name: 'Claude 4 Opus', desc: '最新旗舰版，性能最强', status: '最新' },
    { name: 'Claude 4 Sonnet', desc: '平衡性能和价格', status: '推荐' },
    { name: 'Claude 3.5 Sonnet', desc: '性价比高，稳定可靠', status: '主流' },
    { name: 'Claude 3 Haiku', desc: '响应最快，价格最低', status: '快速' },
  ]

  const features = [
    { title: '超长上下文', desc: '支持20万token上下文', icon: '📚' },
    { title: '代码能力', desc: '编程、Debug、Code Review', icon: '💻' },
    { title: '安全可靠', desc: '拒绝有害内容，更安全', icon: '🛡️' },
    { title: '多语言', desc: '中文、英文等多语言支持', icon: '🌍' },
  ]

  const tips = [
    '使用明确的提示词获得更好的结果',
    '可以上传文件让Claude分析',
    'Claude Code是命令行版本开发者工具',
    '3.5版本性价比最高，适合大多数场景',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🎭 Claude AI 教程
          </h1>
          <p className="text-white/60">Anthropic出品的AI助手</p>
        </header>

        {/* 特点 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">✨ Claude特点</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-white/40 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 版本对比 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">📊 版本对比</h2>
          <div className="space-y-3">
            {versions.map((v, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">{v.name}</h3>
                  <p className="text-white/50 text-sm">{v.desc}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  v.status === '最新' ? 'bg-red-500/20 text-red-400' :
                  v.status === '推荐' ? 'bg-green-500/20 text-green-400' :
                  v.status === '主流' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 使用技巧 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">💡 使用技巧</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-white/70">
                  <span className="text-yellow-400">▸</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 官方链接 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🔗 官方入口</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
            >
              🌐 Claude AI
            </a>
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-colors"
            >
              💻 Claude Code
            </a>
          </div>
        </section>

        {/* Claude Code 介绍 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🖥️ Claude Code</h2>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-600">
            <p className="text-white/80 mb-3">
              Claude Code 是Anthropic推出的命令行AI工具，集成到终端中，支持：
            </p>
            <ul className="text-white/60 text-sm space-y-2">
              <li>• 终端内直接与Claude对话</li>
              <li>• 代码审查和编写辅助</li>
              <li>• 解释错误信息和日志</li>
              <li>• 多模态文件分析</li>
            </ul>
          </div>
        </section>

        <div className="text-center">
          <Link href="/nav" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 更多工具
          </Link>
        </div>
      </div>
    </div>
  )
}

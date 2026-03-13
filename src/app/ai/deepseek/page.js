export const metadata = {
  title: 'DeepSeek使用教程 - 国产开源大模型',
  description: 'DeepSeek深度求索使用教程，API调用方法，开源模型下载，V3和R1版本对比。国产AI模型使用指南。',
  keywords: ['DeepSeek', '深度求索', 'AI大模型', '开源模型', 'R1模型', 'V3模型', 'API'],
}

import Link from 'next/link'

export default function DeepSeekPage() {
  const features = [
    { name: 'DeepSeek V3', desc: '最新旗舰模型，多任务能力强', badge: '旗舰' },
    { name: 'DeepSeek R1', desc: '推理模型，数学和代码能力超强', badge: '推理王者' },
    { name: 'DeepSeek Coder', desc: '专注于代码生成的模型', badge: '编程神器' },
    { name: 'DeepSeek Chat', desc: '对话模型，适合日常使用', badge: '免费使用' },
  ]

  const useCases = [
    { title: '代码生成', desc: '写代码、Debug、优化算法', emoji: '💻' },
    { title: '数学推理', desc: '解数学题、证明定理', emoji: '🔢' },
    { title: '文章写作', desc: '写文案、总结、翻译', emoji: '✍️' },
    { title: '知识问答', desc: '回答问题、解释概念', emoji: '💡' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🧠 DeepSeek 深度求索
          </h1>
          <p className="text-white/60">国产开源大模型，代码数学能力强</p>
        </header>

        {/* 核心优势 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">✨ 核心优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-5">
              <h3 className="text-green-400 font-bold text-lg mb-2">🌍 完全开源</h3>
              <p className="text-white/70">开源模型权重下载，本地部署，可商用</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-5">
              <h3 className="text-blue-400 font-bold text-lg mb-2">💰 价格便宜</h3>
              <p className="text-white/70">API价格仅为GPT-4的1/10，性价比极高</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-5">
              <h3 className="text-purple-400 font-bold text-lg mb-2">🇨🇳 中文优化</h3>
              <p className="text-white/70">中文理解能力强，更适合国内用户</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-5">
              <h3 className="text-yellow-400 font-bold text-lg mb-2">⚡ 性能强劲</h3>
              <p className="text-white/70">代码和数学能力对标GPT-4</p>
            </div>
          </div>
        </section>

        {/* 模型版本 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">📦 模型版本</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((model, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-lg">{model.name}</h3>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    {model.badge}
                  </span>
                </div>
                <p className="text-white/50 text-sm">{model.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 使用场景 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🎯 适用场景</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useCases.map((useCase, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{useCase.emoji}</div>
                <h3 className="text-white font-bold text-sm mb-1">{useCase.title}</h3>
                <p className="text-white/40 text-xs">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 官方链接 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🔗 官方入口</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.deepseek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
            >
              🌐 官网
            </a>
            <a
              href="https://platform.deepseek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
            >
              🔑 API平台
            </a>
            <a
              href="https://github.com/deepseek-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-colors"
            >
              📂 GitHub
            </a>
          </div>
        </section>

        {/* 导航 */}
        <div className="text-center">
          <Link href="/nav" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 更多工具
          </Link>
        </div>
      </div>
    </div>
  )
}

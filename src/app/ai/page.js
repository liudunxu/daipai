export const metadata = {
  title: 'AI工具导航 - 2026年主流AI大模型推荐',
  description: 'AI工具导航页，汇集主流AI大模型工具，包括DeepSeek、Claude、ChatGPT、Perplexity、Coze等使用教程和替代方案。',
  keywords: ['AI工具导航', 'AI大模型', 'ChatGPT', 'Claude教程', 'DeepSeek', 'AI工具推荐'],
}

import Link from 'next/link'

export default function AINavPage() {
  const categories = [
    {
      title: '🔍 AI搜索引擎',
      items: [
        { name: 'Perplexity替代', url: '/ai/perplexity', desc: 'AI搜索工具对比' },
        { name: '秘塔AI', url: 'https://metaso.cn', desc: '国产AI搜索', external: true },
        { name: 'Kimi', url: 'https://kimi.moonshot.cn', desc: 'AI助手', external: true },
      ]
    },
    {
      title: '💬 对话AI模型',
      items: [
        { name: 'DeepSeek教程', url: '/ai/deepseek', desc: '国产开源大模型' },
        { name: 'Claude教程', url: '/ai/claude', desc: 'Anthropic AI' },
        { name: 'ChatGPT', url: 'https://chat.openai.com', desc: 'OpenAI', external: true },
      ]
    },
    {
      title: '⚡ AI智能体平台',
      items: [
        { name: 'Coze扣子教程', url: '/ai/coze', desc: '字节跳动AI Agent' },
        { name: 'Dify', url: 'https://dify.ai', desc: '开源AI工作流', external: true },
        { name: 'LangChain', url: 'https://python.langchain.com', desc: 'AI开发框架', external: true },
      ]
    },
    {
      title: '🎨 AI生图工具',
      items: [
        { name: 'Midjourney', url: 'https://www.midjourney.com', desc: 'AI绘画', external: true },
        { name: 'DALL·E', url: 'https://openai.com/dall-e-3', desc: 'OpenAI绘图', external: true },
        { name: 'Stable Diffusion', url: 'https://stability.ai', desc: '开源AI绘画', external: true },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🤖 AI工具导航
          </h1>
          <p className="text-white/60">主流AI大模型使用教程与推荐</p>
        </header>

        {/* 热门推荐 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🔥 热门推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/ai/deepseek"
              className="block bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:border-green-500/50 rounded-2xl p-5 transition-all hover:scale-105"
            >
              <h3 className="text-green-400 font-bold text-lg mb-2">DeepSeek</h3>
              <p className="text-white/60 text-sm">国产开源大模型，性价比超高</p>
            </Link>
            <Link
              href="/ai/claude"
              className="block bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 hover:border-orange-500/50 rounded-2xl p-5 transition-all hover:scale-105"
            >
              <h3 className="text-orange-400 font-bold text-lg mb-2">Claude</h3>
              <p className="text-white/60 text-sm">Anthropic AI，代码能力超强</p>
            </Link>
            <Link
              href="/ai/coze"
              className="block bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:border-blue-500/50 rounded-2xl p-5 transition-all hover:scale-105"
            >
              <h3 className="text-blue-400 font-bold text-lg mb-2">Coze扣子</h3>
              <p className="text-white/60 text-sm">创建你的AI智能体</p>
            </Link>
          </div>
        </section>

        {/* 分类导航 */}
        {categories.map((cat, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{cat.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {cat.items.map((item, j) => (
                item.external ? (
                  <a
                    key={j}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-4 transition-all hover:scale-105"
                  >
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </a>
                ) : (
                  <Link
                    key={j}
                    href={item.url}
                    className="block bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-4 transition-all hover:scale-105"
                  >
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </Link>
                )
              ))}
            </div>
          </section>
        ))}

        {/* 提示 */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8">
          <p className="text-yellow-400 text-sm text-center">
            💡 提示：部分工具需要翻墙访问，建议使用国内替代品
          </p>
        </div>

        <div className="text-center">
          <Link href="/nav" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 更多工具
          </Link>
        </div>
      </div>
    </div>
  )
}

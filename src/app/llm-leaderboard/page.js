export const metadata = {
  title: '编程模型排行榜 2026 - AI大模型编程能力对比 | 极客观察',
  description: '2026年最新编程模型排行榜，涵盖Claude、GPT-5、Gemini等顶级AI模型的编程能力评分。了解哪个AI模型最适合代码生成、调试和重构，助力开发者选择最优工具。',
  keywords: ['编程模型排行榜', 'AI编程模型', 'Claude编程', 'GPT编程能力', 'AI代码生成', '大模型对比', '编程模型评测', 'AI coder排名', '2026编程模型'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/llm-leaderboard',
    siteName: '极客观察',
    title: '编程模型排行榜 2026 - AI大模型编程能力对比',
    description: '2026年最新编程模型排行榜，涵盖Claude、GPT-5、Gemini等顶级AI模型的编程能力评分对比。',
    images: [{
      url: 'https://www.zkwatcher.top/og-image.png',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '编程模型排行榜 2026 - AI大模型编程能力对比',
    description: '2026年最新编程模型排行榜，涵盖Claude、GPT-5、Gemini等顶级AI模型。',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/llm-leaderboard',
  },
}

// 编程模型排行榜数据
const models = [
  {
    rank: 1,
    name: 'claude-opus-4-6-thinking',
    provider: 'Anthropic',
    score: 1546,
    votes: 3698,
    price: '$5/$25',
    context: '1M',
    category: 'thinking',
    description: 'Claude Opus 4.6 思考版是Anthropic目前最强的编程模型，专为复杂代码推理设计。它在代码生成、调试和架构设计方面表现卓越，特别擅长处理需要深度思考的多步骤编程任务。',
  },
  {
    rank: 2,
    name: 'claude-opus-4-6',
    provider: 'Anthropic',
    score: 1543,
    votes: 4479,
    price: '$5/$25',
    context: '1M',
    category: 'normal',
    description: 'Claude Opus 4.6 是Anthropic的旗舰模型，在编程领域表现极为出色。它能够理解复杂的代码库、生成高质量代码、修复bug并提供代码优化建议。上下文窗口达100万token，适合处理大型项目。',
  },
  {
    rank: 3,
    name: 'claude-sonnet-4-6',
    provider: 'Anthropic',
    score: 1521,
    votes: 7086,
    price: '$3/$15',
    context: '1M',
    category: 'normal',
    description: 'Claude Sonnet 4.6 是Anthropic推出的高性价比编程模型，性能接近 Opus 但价格更亲民。它在日常编程任务中表现出色，是很多开发者的首选编程助手。',
  },
  {
    rank: 4,
    name: 'claude-opus-4-5-thinking-32k',
    provider: 'Anthropic',
    score: 1491,
    votes: 13254,
    price: '$5/$25',
    context: '200K',
    category: 'thinking',
    description: 'Claude Opus 4.5 思考版专注于深度代码推理，适合需要复杂分析和多轮思考的编程任务。拥有20万token上下文窗口，能处理较大的代码文件。',
  },
  {
    rank: 5,
    name: 'claude-opus-4-5',
    provider: 'Anthropic',
    score: 1465,
    votes: 14248,
    price: '$5/$25',
    context: '200K',
    category: 'normal',
    description: 'Claude Opus 4.5 凭借20万token上下文在处理大型代码文件时优势明显。它能够理解整个代码仓库的结构，适合大型项目的代码重构和迁移。',
  },
  {
    rank: 6,
    name: 'gpt-5.4-high',
    provider: 'OpenAI',
    score: 1457,
    votes: null,
    price: 'N/A',
    context: 'N/A',
    category: 'high',
    description: 'GPT-5.4 High 是 OpenAI 最新推出的高端编程模型，在代码生成和理解方面有显著提升。它特别擅长复杂逻辑推理和多语言代码转换。',
  },
  {
    rank: 7,
    name: 'gemini-3.1-pro-preview',
    provider: 'Google',
    score: 1456,
    votes: null,
    price: 'N/A',
    context: 'N/A',
    category: 'preview',
    description: 'Gemini 3.1 Pro 是 Google 最强的编程模型，支持超长上下文处理。它在代码分析、调试和测试生成方面表现出色，尤其与 Google 生态系统集成良好。',
  },
  {
    rank: 8,
    name: 'deepseek-v3.2',
    provider: 'DeepSeek',
    score: 1420,
    votes: null,
    price: '$0.26/$0.38',
    context: 'N/A',
    category: 'normal',
    description: 'DeepSeek V3.2 是国产开源模型的佼佼者，性价比极高。它在中文编程和代码注释方面有独特优势，适合国内开发者使用。',
  },
  {
    rank: 9,
    name: 'minimax-m2.1-preview',
    provider: 'MiniMax',
    score: 1380,
    votes: null,
    price: '$0.27/$0.95',
    context: 'N/A',
    category: 'preview',
    description: 'MiniMax M2.1 是国产新兴编程模型，主打高性价比。它在常见编程任务上表现稳定，适合预算有限的个人开发者。',
  },
  {
    rank: 10,
    name: 'qwen-coder-plus',
    provider: 'Alibaba',
    score: 1350,
    votes: null,
    price: '$0.5/$1',
    context: '128K',
    category: 'normal',
    description: '通义千问Coder Plus 是阿里推出的专业编程模型，与中文开发者习惯高度契合。它在中文代码注释生成和业务逻辑理解方面表现突出。',
  },
]

export default function LLMLeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            编程模型排行榜
            <span className="text-blue-400 ml-2">2026</span>
          </h1>
          <p className="text-white/60 text-lg mb-2">
            AI 大模型编程能力真实评测
          </p>
          <p className="text-white/40 text-sm">
            数据来源: Arena AI Leaderboard · 224,709 票 · 59 个模型
          </p>
          <p className="text-white/30 text-xs mt-1">
            更新日期: 2026年4月1日
          </p>
        </header>

        {/* 说明卡片 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <h2 className="text-white font-bold text-lg mb-3">📊 什么是 Arena AI 排行榜？</h2>
          <p className="text-white/70 leading-relaxed">
            Arena AI 是一个独立的 AI 模型对比平台，开发者通过匿名投票选出两个 AI 回答中更好的一个。排行榜根据 ELO
            评分系统计算，反映模型在真实编程任务中的表现。分数越高代表编程能力越强。
          </p>
        </div>

        {/* 排行榜表格 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/10 border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/80 font-semibold">排名</th>
                  <th className="text-left py-4 px-4 text-white/80 font-semibold">模型</th>
                  <th className="text-left py-4 px-4 text-white/80 font-semibold hidden md:table-cell">提供商</th>
                  <th className="text-right py-4 px-4 text-white/80 font-semibold">评分</th>
                  <th className="text-right py-4 px-4 text-white/80 font-semibold hidden sm:table-cell">投票数</th>
                  <th className="text-right py-4 px-4 text-white/80 font-semibold hidden lg:table-cell">价格</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr
                    key={model.rank}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          model.rank === 1
                            ? 'bg-yellow-500 text-black'
                            : model.rank === 2
                            ? 'bg-gray-400 text-black'
                            : model.rank === 3
                            ? 'bg-amber-600 text-white'
                            : 'bg-white/20 text-white/80'
                        }`}
                      >
                        {model.rank}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{model.name}</div>
                      {model.category === 'thinking' && (
                        <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full">
                          思考版
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-white/70">{model.provider}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-xl font-bold text-blue-400">{model.score}</span>
                    </td>
                    <td className="py-4 px-4 text-right text-white/50 hidden sm:table-cell">
                      {model.votes ? model.votes.toLocaleString() : '-'}
                    </td>
                    <td className="py-4 px-4 text-right text-white/50 hidden lg:table-cell">
                      {model.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 模型详细介绍 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🏆 顶尖编程模型详解
          </h2>
          <div className="space-y-4">
            {models.map((model) => (
              <div
                key={model.rank}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                      model.rank === 1
                        ? 'bg-yellow-500 text-black'
                        : model.rank === 2
                        ? 'bg-gray-400 text-black'
                        : model.rank === 3
                        ? 'bg-amber-600 text-white'
                        : 'bg-white/20 text-white/80'
                    }`}
                  >
                    {model.rank}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {model.name}
                      <span className="text-white/40 text-sm ml-2">({model.provider})</span>
                    </h3>
                    <p className="text-blue-400 text-sm mb-2">
                      评分: {model.score} 分
                      {model.votes && ` · ${model.votes.toLocaleString()} 票`}
                      {model.price !== 'N/A' && ` · ${model.price}/M tokens`}
                      {model.context !== 'N/A' && ` · ${model.context} 上下文`}
                    </p>
                    <p className="text-white/70 leading-relaxed">{model.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 选购建议 */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 border border-blue-500/20">
          <h2 className="text-xl font-bold text-white mb-4">💡 如何选择编程模型？</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">🤑 预算优先</h3>
              <p className="text-white/60 text-sm">
                国产模型如 DeepSeek V3.2 和 Qwen Coder Plus 性价比最高，适合个人开发者和小型项目。
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">🚀 性能优先</h3>
              <p className="text-white/60 text-sm">
                Claude Opus 4.6 系列在编程能力上表现最佳，适合处理复杂的企业级代码库和关键业务系统。
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">🌐 中文场景</h3>
              <p className="text-white/60 text-sm">
                通义千问、DeepSeek 等国产模型对中文语境理解更好，代码注释和文档生成更符合国内习惯。
              </p>
            </div>
          </div>
        </div>

        {/* 相关页面 */}
        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">相关推荐</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/ai"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              AI工具导航
            </a>
            <a
              href="/ai/deepseek"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              DeepSeek使用指南
            </a>
            <a
              href="/ai/claude"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              Claude使用指南
            </a>
            <a
              href="/prompt"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              AI提示词
            </a>
          </div>
        </div>

        {/* 底部 */}
        <footer className="mt-12 text-center">
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}

export const metadata = {
  title: '编程模型排行榜 2026 - AI大模型编程能力对比 | 极客观察',
  description: '2026年最新编程模型排行榜，涵盖Claude、GPT-5、 Gemini、Qwen、GLM等AI模型的编程能力评分。国产模型智谱GLM、阿里通义Qwen、月之暗面Kimi、MiniMax表现亮眼。',
  keywords: [
    '编程模型排行榜',
    'AI编程模型',
    'Claude编程',
    'GPT编程能力',
    'AI代码生成',
    '大模型对比',
    '编程模型评测',
    '国产AI模型',
    'Qwen编程',
    'GLM编程',
    'Kimi编程',
    'AI大模型排行',
    '2026 AI模型',
    'Claude Opus',
    'GPT-5',
    'Gemini编程',
    'AI coder排名',
    '编程AI评测',
    'Arena AI',
    'LMArena',
    'MiniMax编程',
  ],
  authors: [{ name: '极客观察' }],
  creator: '极客观察',
  publisher: '极客观察',
  metadataBase: new URL('https://www.zkwatcher.top'),
  alternates: {
    canonical: 'https://www.zkwatcher.top/llm-leaderboard',
    languages: {
      'zh-CN': 'https://www.zkwatcher.top/llm-leaderboard',
      'zh-TW': 'https://www.zkwatcher.top/llm-leaderboard',
      'en-US': 'https://www.zkwatcher.top/llm-leaderboard',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/llm-leaderboard',
    siteName: '极客观察',
    title: '编程模型排行榜 2026 - AI大模型编程能力对比',
    description: '2026年最新编程模型排行榜，国产模型智谱GLM、阿里通义Qwen、月之暗面Kimi表现亮眼。',
    images: [{
      url: 'https://www.zkwatcher.top/og-image.png',
      width: 1200,
      height: 630,
      alt: '编程模型排行榜 2026',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '编程模型排行榜 2026 - AI大模型编程能力对比',
    description: '2026年最新编程模型排行榜，国产模型智谱GLM、阿里通义Qwen表现亮眼。',
    images: ['https://www.zkwatcher.top/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    yandex: false,
    baiduspider: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    baidu: 'your-baidu-verification-code',
  },
}

// JSON-LD 结构化数据
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '编程模型排行榜 2026',
  description: '2026年最新编程模型排行榜，AI大模型编程能力对比',
  url: 'https://www.zkwatcher.top/llm-leaderboard',
  inLanguage: 'zh-CN',
  isPartOf: {
    '@type': 'WebSite',
    name: '极客观察',
    url: 'https://www.zkwatcher.top',
  },
  about: {
    '@type': 'Thing',
    name: 'AI编程模型评测',
    description: 'Arena AI Leaderboard 编程模型排行榜',
  },
  mainEntity: {
    '@type': 'ItemList',
    name: '编程模型排行榜 Top 30',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'claude-opus-4-6-thinking', url: 'https://www.zkwatcher.top/llm-leaderboard#model-1' },
      { '@type': 'ListItem', position: 2, name: 'claude-opus-4-6', url: 'https://www.zkwatcher.top/llm-leaderboard#model-2' },
      { '@type': 'ListItem', position: 3, name: 'claude-sonnet-4-6', url: 'https://www.zkwatcher.top/llm-leaderboard#model-3' },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.zkwatcher.top' },
      { '@type': 'ListItem', position: 2, name: 'AI工具', item: 'https://www.zkwatcher.top/ai' },
      { '@type': 'ListItem', position: 3, name: '编程模型排行榜', item: 'https://www.zkwatcher.top/llm-leaderboard' },
    ],
  },
}

// 编程模型排行榜数据 - 来源: Arena AI (2026年4月1日)
const models = [
  {
    rank: 1,
    name: 'claude-opus-4-6-thinking',
    provider: 'Anthropic',
    score: 1546,
    votes: 3698,
    price: '$5/$25',
    context: '1M',
    isDomestic: false,
    description: 'Claude Opus 4.6 思考版，Anthropic最强编程模型，专为复杂代码推理设计，在代码生成、调试和架构设计方面表现卓越。',
  },
  {
    rank: 2,
    name: 'claude-opus-4-6',
    provider: 'Anthropic',
    score: 1543,
    votes: 4479,
    price: '$5/$25',
    context: '1M',
    isDomestic: false,
    description: 'Claude Opus 4.6，Anthropic旗舰模型，能理解复杂代码库、生成高质量代码、修复bug并提供优化建议。',
  },
  {
    rank: 3,
    name: 'claude-sonnet-4-6',
    provider: 'Anthropic',
    score: 1521,
    votes: 7086,
    price: '$3/$15',
    context: '1M',
    isDomestic: false,
    description: 'Claude Sonnet 4.6，高性价比编程模型，性能接近 Opus，价格更亲民，是很多开发者的首选。',
  },
  {
    rank: 4,
    name: 'claude-opus-4-5-thinking-32k',
    provider: 'Anthropic',
    score: 1491,
    votes: 13254,
    price: '$5/$25',
    context: '200K',
    isDomestic: false,
    description: 'Claude Opus 4.5 思考版，专注深度代码推理，适合需要复杂分析和多轮思考的编程任务。',
  },
  {
    rank: 5,
    name: 'claude-opus-4-5',
    provider: 'Anthropic',
    score: 1465,
    votes: 14248,
    price: '$5/$25',
    context: '200K',
    isDomestic: false,
    description: 'Claude Opus 4.5，20万token上下文处理大型代码文件，适合大型项目的代码重构和迁移。',
  },
  {
    rank: 6,
    name: 'gpt-5.4-high',
    provider: 'OpenAI',
    score: 1457,
    votes: 1495,
    price: 'N/A',
    context: 'N/A',
    isDomestic: false,
    description: 'GPT-5.4 High，OpenAI最新高端编程模型，代码生成和理解有显著提升，特别擅长复杂逻辑推理。',
  },
  {
    rank: 7,
    name: 'gemini-3.1-pro-preview',
    provider: 'Google',
    score: 1456,
    votes: 5467,
    price: '$2/$12',
    context: '1M',
    isDomestic: false,
    description: 'Gemini 3.1 Pro，Google最强编程模型，支持超长上下文处理，与Google生态系统集成良好。',
  },
  {
    rank: 8,
    name: 'qwen3.6-plus-preview',
    provider: '阿里云',
    score: 1454,
    votes: 1125,
    price: 'N/A',
    context: 'N/A',
    isDomestic: true,
    description: '通义千问Qwen 3.6，国产之光！阿里云推出的旗舰编程模型，在复杂代码理解和生成方面表现惊人，逼近顶级闭源模型。',
  },
  {
    rank: 9,
    name: 'glm-5',
    provider: '智谱AI',
    score: 1441,
    votes: 4536,
    price: '$1/$3.20',
    context: '202.8K',
    isDomestic: true,
    description: '智谱GLM-5，国产大模型领军者！由清华大学技术团队打造，在代码补全和bug修复方面表现优异，中文编程场景尤为出色。',
  },
  {
    rank: 10,
    name: 'glm-4.7',
    provider: '智谱AI',
    score: 1439,
    votes: 4876,
    price: '$0.39/$1.75',
    context: '202.8K',
    isDomestic: true,
    description: '智谱GLM-4.7，高性价比国产编程模型，价格亲民性能强劲，特别适合国内开发者使用。',
  },
  {
    rank: 11,
    name: 'gemini-3-pro',
    provider: 'Google',
    score: 1438,
    votes: 17165,
    price: '$2/$12',
    context: '1M',
    isDomestic: false,
    description: 'Gemini 3 Pro，Google主力编程模型，拥有百万token上下文，在大型项目代码分析方面优势明显。',
  },
  {
    rank: 12,
    name: 'gemini-3-flash',
    provider: 'Google',
    score: 1436,
    votes: 13282,
    price: '$0.50/$3',
    context: '1M',
    isDomestic: false,
    description: 'Gemini 3 Flash，轻量快速版Google编程模型，适合日常代码补全和简单编程任务。',
  },
  {
    rank: 13,
    name: 'mimo-v2-pro',
    provider: '小米',
    score: 1433,
    votes: 2903,
    price: '$1/$3',
    context: '1M',
    isDomestic: true,
    description: '小米MIMO V2，国产手机厂商推出的编程模型！小米AI实验室打造，在移动端代码开发方面有独特优势。',
  },
  {
    rank: 14,
    name: 'kimi-k2.5-thinking',
    provider: '月之暗面',
    score: 1429,
    votes: 6694,
    price: '$0.60/$3',
    context: 'N/A',
    isDomestic: true,
    description: '月之暗面Kimi K2.5思考版，国产明星创业公司产品！支持超长上下文，在代码理解和推理方面表现出色。',
  },
  {
    rank: 15,
    name: 'minimax-m2.7',
    provider: 'MiniMax',
    score: 1428,
    votes: 2716,
    price: '$0.30/$1.20',
    context: '204.8K',
    isDomestic: true,
    description: 'MiniMax M2.7，国产高性价比编程模型！价格极低性能却不俗，适合预算有限的创业团队和个人开发者。',
  },
  {
    rank: 16,
    name: 'gpt-5.4-medium',
    provider: 'OpenAI',
    score: 1427,
    votes: 1579,
    price: 'N/A',
    context: 'N/A',
    isDomestic: false,
    description: 'GPT-5.4 Medium，OpenAI中端编程模型，在代码生成质量和使用成本之间取得平衡。',
  },
  {
    rank: 17,
    name: 'kimi-k2.5-instant',
    provider: '月之暗面',
    score: 1408,
    votes: 3610,
    price: '$0.38/$1.91',
    context: '262.1K',
    isDomestic: true,
    description: 'Kimi K2.5 极速版，月之暗面快速响应编程模型，适合日常代码补全和简单问答场景。',
  },
  {
    rank: 18,
    name: 'gpt-5.3-codex',
    provider: 'OpenAI',
    score: 1407,
    votes: 2974,
    price: '$1.75/$14',
    context: '400K',
    isDomestic: false,
    description: 'GPT-5.3 Codex，OpenAI专业编程模型，400K上下文适合处理中型代码项目。',
  },
  {
    rank: 19,
    name: 'gpt-5.2',
    provider: 'OpenAI',
    score: 1403,
    votes: 1460,
    price: '$1.75/$14',
    context: '400K',
    isDomestic: false,
    description: 'GPT-5.2，OpenAI主流编程模型，各方面表现均衡，适合各类开发场景。',
  },
  {
    rank: 20,
    name: 'minimax-m2.5',
    provider: 'MiniMax',
    score: 1396,
    votes: 6716,
    price: '$0.12/$1',
    context: '196.6K',
    isDomestic: true,
    description: 'MiniMax M2.5，超低价国产模型！每百万token仅需$0.12，适合预算紧张但需要稳定编程辅助的开发者。',
  },
  {
    rank: 21,
    name: 'gpt-5-medium',
    provider: 'OpenAI',
    score: 1392,
    votes: 3753,
    price: '$1.25/$10',
    context: '400K',
    isDomestic: false,
    description: 'GPT-5 Medium，OpenAI中端主力，在代码补全和简单编程任务上表现稳定。',
  },
  {
    rank: 22,
    name: 'minimax-m2.1-preview',
    provider: 'MiniMax',
    score: 1391,
    votes: 9275,
    price: '$0.27/$0.95',
    context: '196.6K',
    isDomestic: true,
    description: 'MiniMax M2.1 预览版，国产口碑模型！高投票量说明用户认可度高，是个人开发者的省钱之选。',
  },
  {
    rank: 23,
    name: 'gemini-3-flash-thinking',
    provider: 'Google',
    score: 1391,
    votes: 12208,
    price: '$0.50/$3',
    context: '1M',
    isDomestic: false,
    description: 'Gemini 3 Flash 思考版，Google轻量级推理模型，适合需要简单思考的编程任务。',
  },
  {
    rank: 24,
    name: 'gpt-5.1-medium',
    provider: 'OpenAI',
    score: 1390,
    votes: 6124,
    price: '$1.25/$10',
    context: '400K',
    isDomestic: false,
    description: 'GPT-5.1 Medium，OpenAI成熟稳定版本，经过多次迭代优化，编程能力可靠。',
  },
  {
    rank: 25,
    name: 'claude-sonnet-4-5-thinking-32k',
    provider: 'Anthropic',
    score: 1388,
    votes: 15916,
    price: '$3/$15',
    context: '200K',
    isDomestic: false,
    description: 'Claude Sonnet 4.5 思考版，性价比较高的Claude编程模型，适合需要深度思考的复杂代码任务。',
  },
  {
    rank: 26,
    name: 'qwen3.5-397b-a17b',
    provider: '阿里云',
    score: 1386,
    votes: 5559,
    price: '$0.39/$2.34',
    context: '262.1K',
    isDomestic: true,
    description: '通义千问Qwen 3.5超大杯！3970亿参数国产巨无霸，阿里云开源力作，在编程能力上表现优异。',
  },
  {
    rank: 27,
    name: 'claude-sonnet-4-5',
    provider: 'Anthropic',
    score: 1386,
    votes: 18512,
    price: '$3/$15',
    context: '200K',
    isDomestic: false,
    description: 'Claude Sonnet 4.5，Anthropic最受欢迎的编程模型，投票量最高说明用户使用最广泛。',
  },
  {
    rank: 28,
    name: 'grok-4.20-beta-reasoning',
    provider: 'xAI',
    score: 1386,
    votes: 3030,
    price: '$2/$6',
    context: '2M',
    isDomestic: false,
    description: 'Grok 4.20，马斯克xAI推出的编程模型，拥有200万token超大上下文，擅长复杂代码分析。',
  },
  {
    rank: 29,
    name: 'gpt-5.4-mini-high',
    provider: 'OpenAI',
    score: 1385,
    votes: 1198,
    price: '$0.75/$4.50',
    context: '400K',
    isDomestic: false,
    description: 'GPT-5.4 Mini High，OpenAI轻量级高端模型，性价比不错，适合日常编程辅助。',
  },
  {
    rank: 30,
    name: 'claude-opus-4-1',
    provider: 'Anthropic',
    score: 1384,
    votes: 8570,
    price: '$15/$75',
    context: '200K',
    isDomestic: false,
    description: 'Claude Opus 4.1，早期旗舰版本，虽然价格较高但编程能力依然强劲。',
  },
]

export default function LLMLeaderboardPage() {
  const domesticModels = models.filter(m => m.isDomestic)
  const internationalModels = models.filter(m => !m.isDomestic)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto">
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

        {/* 国产模型亮点 */}
        <div className="bg-gradient-to-r from-red-600/20 via-orange-500/20 to-yellow-500/20 rounded-2xl p-6 mb-8 border border-red-500/30">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🇨🇳</span>
            国产模型崛起！Top 30 占 {domesticModels.length} 席
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {domesticModels.slice(0, 8).map((model) => (
              <a
                key={model.rank}
                href={`#model-${model.rank}`}
                className="bg-white/10 rounded-xl p-3 hover:bg-white/20 transition-colors border border-white/10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    #{model.rank}
                  </span>
                  <span className="text-yellow-400 text-sm font-semibold">{model.score}</span>
                </div>
                <div className="text-white font-semibold text-sm">{model.name}</div>
                <div className="text-white/50 text-xs">{model.provider}</div>
              </a>
            ))}
          </div>
        </div>

        {/* 说明卡片 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <h2 className="text-white font-bold text-lg mb-3">📊 Arena AI 排行榜说明</h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Arena AI 是一个独立的 AI 模型对比平台，开发者通过<strong className="text-white">匿名投票</strong>选出两个 AI 回答中更好的一个。
            排行榜根据 <strong className="text-white">ELO 评分系统</strong>计算，反映模型在真实编程任务中的表现。分数越高代表编程能力越强。
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 bg-red-500/30 text-red-300 rounded-full">
              🇨🇳 国产模型
            </span>
            <span className="text-xs px-3 py-1 bg-white/20 text-white/70 rounded-full">
              🌍 国际模型
            </span>
          </div>
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
                  <th className="text-right py-4 px-4 text-white/80 font-semibold hidden sm:table-cell">投票</th>
                  <th className="text-right py-4 px-4 text-white/80 font-semibold hidden lg:table-cell">价格</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr
                    id={`model-${model.rank}`}
                    key={model.rank}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                      model.isDomestic ? 'bg-red-500/5' : ''
                    }`}
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
                            : model.isDomestic
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white/80'
                        }`}
                      >
                        {model.rank}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        {model.name}
                        {model.isDomestic && (
                          <span className="text-xs px-2 py-0.5 bg-red-500/30 text-red-300 rounded-full border border-red-500/50">
                            国产
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className={model.isDomestic ? 'text-red-400' : 'text-white/70'}>
                        {model.provider}
                      </span>
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

        {/* 模型详细介绍 - 国产优先 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🏆 顶尖编程模型详解
          </h2>

          {/* 国产模型 */}
          <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <span>🇨🇳</span> 国产模型
          </h3>
          <div className="space-y-4 mb-8">
            {domesticModels.map((model) => (
              <div
                key={model.rank}
                className="bg-gradient-to-r from-red-900/20 to-transparent backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full font-bold bg-red-500 text-white">
                    {model.rank}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {model.name}
                      <span className="text-red-400 text-sm ml-2">({model.provider})</span>
                      <span className="ml-2 text-xs px-2 py-0.5 bg-red-500/30 text-red-300 rounded-full">国产</span>
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

          {/* 国际模型 */}
          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
            <span>🌍</span> 国际模型
          </h3>
          <div className="space-y-4">
            {internationalModels.map((model) => (
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
                国产模型如 MiniMax M2.5 ($0.12/$1)、GLM-4.7 ($0.39/$1.75) 性价比最高，适合个人开发者和创业团队。
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">🚀 性能优先</h3>
              <p className="text-white/60 text-sm">
                Claude Opus 4.6 系列在编程能力上表现最佳，适合处理复杂的企业级代码库和关键业务系统。
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">🇨🇳 国产偏好</h3>
              <p className="text-white/60 text-sm">
                智谱GLM、阿里Qwen、月之暗面Kimi 对中文语境理解更好，代码注释和文档生成更符合国内习惯。
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
              DeepSeek指南
            </a>
            <a
              href="/ai/claude"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              Claude指南
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

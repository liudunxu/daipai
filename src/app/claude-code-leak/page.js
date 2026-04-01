import { AdBanner } from '../../components/Ads'

export const metadata = {
  title: 'Claude Code源码泄漏事件完整解析 - 51万行代码暴露了什么',
  description: '2026年3月31日Claude Code源码泄漏，51万行TypeScript代码曝光。深入解析泄漏原因、暴露的架构设计、安全隐忧以及对AI编程助手行业的影响。用费曼学习法解释技术细节。',
  keywords: ['Claude Code源码泄漏', 'Claude Code leak', 'Anthropic源码', 'AI编程助手安全', 'Claude Code架构', 'instructkr/claw-code', 'AI安全', '源码分析'],
  openGraph: {
    type: 'article',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/claude-code-leak',
    siteName: '极客观察',
    title: 'Claude Code源码泄漏事件完整解析',
    description: '51万行代码暴露了什么？深入解析Claude Code源码泄漏事件，用费曼学习法让你彻底理解。',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Claude Code源码泄漏事件解析',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code源码泄漏事件完整解析',
    description: '51万行代码暴露了什么？深入解析Claude Code源码泄漏事件',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/claude-code-leak',
  },
}

export default function ClaudeCodeLeakPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 text-sm mb-6">
            🔥 突发 · 2026年3月31日
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Claude Code 源码泄漏
          </h1>
          <p className="text-xl text-white/60 mb-6">
            51万行TypeScript代码意外曝光，AI编程助手行业地震
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-white/10 rounded-full text-white/60">
              📅 2026.03.31
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-white/60">
              📊 51万行代码
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-white/60">
              🏢 Anthropic
            </span>
          </div>
        </header>

        {/* TL;DR 快速摘要 */}
        <section className="mb-10 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            ⚡ 5分钟看懂事件
          </h2>
          <div className="space-y-3 text-white/80">
            <p>
              <strong className="text-amber-400">发生了什么？</strong>
              Anthropic的代码助手Claude Code在npm上发布时，意外把源码映射文件(.map)也打包进去了，任何人都能下载查看完整源码。
            </p>
            <p>
              <strong className="text-amber-400">泄漏了什么？</strong>
              约51万行TypeScript代码，包含Claude Code的完整客户端架构、Agent逻辑、权限管理等。
            </p>
            <p>
              <strong className="text-amber-400">没泄漏什么？</strong>
              模型权重、训练数据、用户隐私数据、API密钥 - 这些都安全。
            </p>
            <p>
              <strong className="text-amber-400">影响多大？</strong>
              相当于把一个精密仪器的设计图纸公开了，竞品可以学习其架构，攻击者可以研究漏洞。
            </p>
          </div>
        </section>

        {/* 事件始末 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            📖 事件始末（费曼讲解）
          </h2>

          <div className="space-y-6">
            {/* 什么是Claude Code */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🧒 费曼讲解：什么是Claude Code？
              </h3>
              <p className="text-white/70 leading-relaxed mb-4">
                想象你有一个超级聪明的编程助手，它住在你的电脑里，你让它"帮我写一个用户登录功能"，它就能自动帮你写好代码。Claude Code就是Anthropic公司做的这样一个AI编程助手。
              </p>
              <p className="text-white/70 leading-relaxed">
                就像你请了一个经验丰富的程序员坐在你旁边，它能看懂你的项目，理解你要做什么，然后帮你写代码、调试、甚至帮你做整个项目。2026年它已经非常流行，收入是OpenAI同类产品Codex的2.5倍。
              </p>
            </div>

            {/* 泄漏如何发生 */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                💥 泄漏是怎么发生的？
              </h3>
              <p className="text-white/70 leading-relaxed mb-4">
                这是一个程序员的"低级失误"。开发者在发布软件到npm（一个代码仓库）时，错误地把调试用的源码映射文件(.map)也一起打包发布了。
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 text-sm font-mono">
                <p className="text-green-400"># 打个比方：</p>
                <p className="text-white/60 mt-2">
                  就像工厂发货时，工人在箱子外面贴了张"内部构造图"，买家用手机一扫，就能看到产品内部的所有零件和组装方式。
                </p>
              </div>
            </div>

            {/* 泄漏了什么 */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                📦 泄漏的具体是什么？
              </h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">❌</span>
                  <span>完整的前端/客户端TypeScript源码（约51万行）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">❌</span>
                  <span>Claude Code的Agent架构设计（AI如何思考和决策）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">❌</span>
                  <span>权限管理逻辑（AI能做什么、不能做什么）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">❌</span>
                  <span>任务调度系统（AI如何规划复杂任务）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>模型权重和训练数据（这些没泄漏）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>用户隐私和API密钥（这些也安全）</span>
                </li>
              </ul>
            </div>

            {/* 意外收获 */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                🎁 意外收获：社区已经开始研究
              </h3>
              <p className="text-white/70 leading-relaxed mb-4">
                泄露事件发生后仅数小时，GitHub上就出现了代码镜像仓库，其中最著名的是 <strong>instructkr/claw-code</strong>，获得了超过66,000颗star。开发者们正在"集体研究"这个曾经神秘的AI编程助手的内部构造。
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-yellow-400">66k+</div>
                  <div className="text-white/50 text-xs">Stars</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-blue-400">67k+</div>
                  <div className="text-white/50 text-xs">Forks</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-purple-400">88%</div>
                  <div className="text-white/50 text-xs">Rust语言</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-green-400">Python</div>
                  <div className="text-white/50 text-xs">12%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技术架构解析 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            🔬 暴露的架构设计（小白也能看懂）
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">🧠 Agent 架构</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                就像一个超级助手的"大脑"，负责理解你的需求、规划任务步骤、决定下一步做什么。Claude Code的Agent系统被认为是目前最先进的代码处理AI之一。
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">🔒 权限管理</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                规定AI"能做什么"和"不能做什么"的安全机制。比如禁止删除重要文件、禁止访问特定目录。这套系统现在完全公开了。
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">⚙️ 任务调度</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                把复杂的大任务分解成小步骤，一步一步执行。比如"做一个网站"会被分解成：设计界面→写HTML→写CSS→写JavaScript→测试。
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">📡 API 交互</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Claude Code和Anthropic服务器之间的"对话方式"。现在完全公开，意味着任何人都可以模仿这套通信协议。
              </p>
            </div>
          </div>
        </section>

        {/* 安全隐忧 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            ⚠️ 这对我们有什么影响？
          </h2>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4">😨 普通用户需要担心吗？</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="text-white font-medium">你的代码是安全的</p>
                  <p className="text-white/50 text-sm">Anthropic官方声明：没有用户数据或隐私信息泄漏</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-white font-medium">你的钱包是安全的</p>
                  <p className="text-white/50 text-sm">API密钥没有泄漏，仍然安全</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-white font-medium">但要小心仿制品</p>
                  <p className="text-white/50 text-sm">可能会有恶意修改版的Claude Code出现，窃取数据或植入后门</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">💡 安全建议</h3>
            <ul className="space-y-2 text-white/70">
              <li>✅ 只从官方渠道下载Claude Code</li>
              <li>✅ 不要使用来路不明的"修改版"或"优化版"</li>
              <li>✅ API Key不要硬编码在代码里</li>
              <li>✅ 给AI的权限要最小化，不要什么都让AI做</li>
              <li>✅ 企业应该审计AI工具的使用情况</li>
            </ul>
          </div>
        </section>

        {/* 行业影响 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            🌍 对行业的深远影响
          </h2>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏢</span>
                <h3 className="text-lg font-bold text-white">对Anthropic</h3>
              </div>
              <p className="text-white/60 text-sm">
                竞品可以学习Claude Code的架构设计，但模型本身（最核心的AI能力）仍然保密。这次泄漏更多是"设计图纸"而非"生产能力"。
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚀</span>
                <h3 className="text-lg font-bold text-white">对开发者社区</h3>
              </div>
              <p className="text-white/60 text-sm">
                开源社区正在积极研究这些代码，已经出现Python移植版本（claw-code）。这对学习AI系统设计和改进AI编程工具可能有积极作用。
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔐</span>
                <h3 className="text-lg font-bold text-white">对AI安全</h3>
              </div>
              <p className="text-white/60 text-sm">
                这次事件是一记警钟：AI供应链安全至关重要。未来可能出现更多针对AI工具的攻击，企业需要加强AI使用的安全审计。
              </p>
            </div>
          </div>
        </section>

        {/* 关键时间线 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            📅 关键时间线
          </h2>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
            <div className="space-y-4 pl-12">
              <div className="relative">
                <div className="absolute -left-12 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-900" />
                <p className="text-white/40 text-sm">2026年3月31日 上午</p>
                <p className="text-white font-medium">安全研究员Chaofan Shou发现npm包中的源码映射文件</p>
              </div>
              <div className="relative">
                <div className="absolute -left-12 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-900" />
                <p className="text-white/40 text-sm">2026年3月31日 下午</p>
                <p className="text-white font-medium">GitHub出现代码镜像，传播速度惊人</p>
              </div>
              <div className="relative">
                <div className="absolute -left-12 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-900" />
                <p className="text-white/40 text-sm">2026年3月31日 晚间</p>
                <p className="text-white font-medium">instructkr/claude-code获得10k+ stars</p>
              </div>
              <div className="relative">
                <div className="absolute -left-12 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-900" />
                <p className="text-white/40 text-sm">2026年4月1日</p>
                <p className="text-white font-medium">Anthropic官方确认事件，称系人为失误</p>
              </div>
              <div className="relative">
                <div className="absolute -left-12 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-900" />
                <p className="text-white/40 text-sm">2026年4月1日</p>
                <p className="text-white font-medium">36氪、腾讯云等媒体报道，事件持续发酵</p>
              </div>
            </div>
          </div>
        </section>

        {/* 总结 */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-4">
              🎯 一句话总结
            </h2>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
              这次泄漏暴露的是Claude Code的"使用说明书"（代码），而不是它的"制造工艺"（模型权重）。对于普通用户来说影响有限，但整个AI行业都需要从中吸取教训：AI供应链安全不容忽视。
            </p>
          </div>
        </section>

        {/* 相关链接 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">🔗 相关资源</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/instructkr/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-all text-sm"
            >
              📂 instructkr/claude-code（社区镜像）
            </a>
            <a
              href="https://github.com/anthropics/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-all text-sm"
            >
              🔵 Claude Code官方仓库
            </a>
            <a
              href="https://www.anthropic.com/news"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-all text-sm"
            >
              🌐 Anthropic官方公告
            </a>
          </div>
        </section>

        {/* 广告位 */}
        <section className="mb-10">
          <AdBanner className="mx-auto max-w-2xl" />
        </section>

        {/* 返回 */}
        <footer className="mt-8 text-center">
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}

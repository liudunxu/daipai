import { AdBanner } from '../../components/Ads'

export const metadata = {
  title: '大模型Harness是什么？AI Agent的"缰绳与马鞍" - 通俗解释',
  description: '用费曼学习法解释什么是大模型Harness。Harness不是模型也不是框架，而是让AI Agent能稳定可靠工作的"运行环境"。包含通俗比喻、核心组件、行业影响。',
  keywords: ['大模型Harness', 'Harness是什么', 'AI Agent', 'Agent框架', 'Harness Engineering', '人工智能', '缰绳与马鞍'],
  openGraph: {
    type: 'article',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/harness',
    siteName: '极客观察',
    title: '大模型Harness是什么？AI Agent的"缰绳与马鞍"',
    description: '用通俗比喻解释大模型Harness概念，让你彻底理解为什么AI Agent需要Harness。',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'AI Agent Harness概念图',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '大模型Harness是什么？',
    description: '用通俗比喻解释大模型Harness概念，让你彻底理解',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/harness',
  },
}

export default function HarnessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-400 text-sm mb-6">
            🧬 AI Agent 核心技术
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            大模型 Harness 是什么？
          </h1>
          <p className="text-xl text-white/60 mb-6">
            AI Agent 的"缰绳与马鞍"，让大模型真正能做实事
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-white/10 rounded-full text-white/60">
              🤖 Agent 运行环境
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-white/60">
              🔧 工程范式
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-white/60">
              📈 2026新趋势
            </span>
          </div>
        </header>

        {/* TL;DR */}
        <section className="mb-10 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            ⚡ 30秒看懂 Harness
          </h2>
          <div className="space-y-3 text-white/80">
            <p>
              <strong className="text-amber-400">一句话解释：</strong>
              Harness 是让 AI Agent"能干活"的所有东西加起来——不是AI大脑本身，而是AI的"身体"、"工具箱"和"安全带"。
            </p>
            <p>
              <strong className="text-amber-400">核心公式：</strong>
              <code className="ml-2 px-2 py-1 bg-slate-800 rounded text-cyan-400">AI Agent = 大模型 + Harness</code>
            </p>
            <p>
              <strong className="text-amber-400">为什么重要？</strong>
              就像再聪明的人，如果没有手、没有工具、记不住事，也没法完成复杂工作。Harness 就是给 AI 装上这些能力。
            </p>
          </div>
        </section>

        {/* 通俗比喻 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            🎭 费曼讲解：用一个故事理解 Harness
          </h2>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
            <h3 className="text-lg font-bold text-purple-400 mb-4">
              🧒 想象这样一个场景
            </h3>
            <p className="text-white/70 leading-relaxed mb-4">
              你是一个公司的老板，招了一个超级聪明的员工。这个员工：
            </p>
            <ul className="space-y-2 text-white/70">
              <li>📚 看过世界上所有的书（相当于大模型）</li>
              <li>🧠 非常善于分析和思考（推理能力）</li>
              <li>💬 能说一口流利的普通话（语言能力）</li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              但是，这个员工：
            </p>
            <ul className="space-y-2 text-white/70">
              <li>❌ <strong className="text-red-400">没有手</strong>——没法实际操作文件、发邮件、操作电脑</li>
              <li>❌ <strong className="text-red-400">记性不好</strong>——做完一步忘一步，无法完成长任务</li>
              <li>❌ <strong className="text-red-400">没有约束</strong>——可能会做出危险的事情，比如删掉重要文件</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">
              ✅ Harness 就是给这个员工配上
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">🖐️ 一双手（工具层）</h4>
                <p className="text-white/50 text-sm">能操作电脑、使用各种软件、访问数据库、调用API</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">📒 一个笔记本（记忆层）</h4>
                <p className="text-white/50 text-sm">记录任务进度、保存中间结果、跨天继续工作</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">🔒 安全围栏（权限层）</h4>
                <p className="text-white/50 text-sm">禁止删除重要文件、限制敏感操作、审批危险行为</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">🔄 纠错机制（恢复层）</h4>
                <p className="text-white/50 text-sm">任务崩溃能续跑、出错了能回滚、随时可以检查</p>
              </div>
            </div>
          </div>
        </section>

        {/* 类比说明 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            🚗 更形象的比喻：Harness 就是汽车的底盘
          </h2>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🚗</span>
                <div>
                  <h3 className="text-white font-bold text-lg">大模型 = 发动机</h3>
                  <p className="text-white/60 text-sm mt-1">
                    发动机越强大，汽车的动力就越强。但光有发动机，汽车就跑不起来。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-4xl">⚙️</span>
                <div>
                  <h3 className="text-white font-bold text-lg">Harness = 底盘 + 方向盘 + 刹车系统</h3>
                  <p className="text-white/60 text-sm mt-1">
                    没有底盘，发动机没法装在车上；没有方向盘，汽车不知道往哪开；没有刹车，安全无法保障。
                    Harness 就是让发动机真正能驱动汽车的所有部件。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-4xl">🧠</span>
                <div>
                  <h3 className="text-white font-bold text-lg">Agent = 能开的车</h3>
                  <p className="text-white/60 text-sm mt-1">
                    发动机 + 底盘 + 方向盘 + 刹车 = 一辆能跑的车。同理：
                    <br />
                    <code className="px-2 py-1 bg-slate-800 rounded text-cyan-400 text-xs mt-2 inline-block">
                      Agent = 大模型 + Harness
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="text-amber-200 text-sm">
              💡 <strong>关键洞察：</strong>2026年的AI竞争，不再只是"谁的模型更强"，而是"谁的Harness更好"。就像汽车行业，发动机大家都能造，但底盘调校才是真功夫。
            </p>
          </div>
        </section>

        {/* 核心组件 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            🔬 Harness 的五大核心组件
          </h2>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">1</span>
                <h3 className="text-lg font-bold text-cyan-400">上下文装配系统</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                把正确的信息，在正确的时间，给到模型。就像给厨师备料——不是把整个冰箱扔给他，而是把当前做菜需要的食材按顺序摆好。
              </p>
              <div className="bg-slate-800/50 rounded-lg p-3 text-sm">
                <p className="text-white/40">举个例子：让AI写代码时，不是把整个项目代码都塞给它，而是只加载当前要修改的文件 + 相关的接口定义</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">2</span>
                <h3 className="text-lg font-bold text-green-400">工具治理系统</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                管理AI能用什么工具。不是乱塞一堆工具，而是：发现工具 → 校验参数 → 分级授权 → 拦截风险 → 审计日志。
              </p>
              <div className="bg-slate-800/50 rounded-lg p-3 text-sm">
                <p className="text-white/40">举个例子：AI可以用"搜索"工具查资料，但使用"转账"工具需要二次确认</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">3</span>
                <h3 className="text-lg font-bold text-red-400">安全与审批系统</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                AI干活不能没规矩。子进程管理（AI启动的程序也得管）、命令守卫（危险命令要拦截）、风险分级（高风险操作需要人工审批）。
              </p>
              <div className="bg-slate-800/50 rounded-lg p-3 text-sm">
                <p className="text-white/40">举个例子：AI说"我要执行 rm -rf /"，系统直接拦截并报警</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">4</span>
                <h3 className="text-lg font-bold text-yellow-400">反馈与状态系统</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                AI执行出错了，要能理解错误；外部世界变化了，要能感知。相当于给AI装上"眼睛和耳朵"，让它知道自己在干什么、结果是什么。
              </p>
              <div className="bg-slate-800/50 rounded-lg p-3 text-sm">
                <p className="text-white/40">举个例子：AI执行命令失败，反馈系统把错误日志翻译成"模型能理解的语言"告诉它哪里出了问题</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">5</span>
                <h3 className="text-lg font-bold text-purple-400">熵管理系统</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                防止系统混乱。上下文会膨胀（塞太多东西）、规则会过时（环境变了）、系统会退化（累积错误）。熵管理就是让系统长期稳定运行。
              </p>
              <div className="bg-slate-800/50 rounded-lg p-3 text-sm">
                <p className="text-white/40">举个例子：AI处理100步任务后，上下文已经塞满了，需要智能地"忘掉"不重要的信息，保持清醒</p>
              </div>
            </div>
          </div>
        </section>

        {/* 与其他概念的区别 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            📊 对比：Prompt / Context / Harness
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white font-bold">概念</th>
                  <th className="text-left py-3 px-4 text-white font-bold">关注点</th>
                  <th className="text-left py-3 px-4 text-white font-bold">打个比方</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">
                    <span className="text-cyan-400 font-medium">Prompt Engineering</span>
                  </td>
                  <td className="py-3 px-4">怎么说</td>
                  <td className="py-3 px-4">教AI"话术"</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">
                    <span className="text-green-400 font-medium">Context Engineering</span>
                  </td>
                  <td className="py-3 px-4">给什么信息</td>
                  <td className="py-3 px-4">给AI"资料"</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">
                    <span className="text-purple-400 font-medium">Harness Engineering</span>
                  </td>
                  <td className="py-3 px-4">在什么环境做事</td>
                  <td className="py-3 px-4">给AI"工具 + 规则"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">
              <strong className="text-white">进化路线：</strong>
              <code className="ml-2 text-cyan-400">Prompt → Context → Harness</code>
              <br />
              <span className="text-white/40 text-xs mt-1 inline-block">
                从"怎么说"到"给什么"再到"怎么让AI可靠工作"——这是AI应用的三次进化
              </span>
            </p>
          </div>
        </section>

        {/* 实际案例 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            💼 真实案例：这些产品靠 Harness 脱颖而出
          </h2>

          <div className="grid gap-4">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🦄</span>
                <div>
                  <h3 className="text-white font-bold">Claude Code</h3>
                  <p className="text-white/40 text-sm">Anthropic 的 AI 编程助手</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                它的Harness包括：完整的代码库上下文理解、文件系统操作权限管理、Terminal工具调用、长任务状态保持。源码泄漏后，人们发现它的Harness设计极其精妙。
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🐻</span>
                <div>
                  <h3 className="text-white font-bold">deer-flow</h3>
                  <p className="text-white/40 text-sm">字节跳动的开源 Agent harness</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                一个开源的Harness框架，帮你快速搭建能研究、编码、创建内容的AI Agent。本身就是Harness的示范项目，目前 GitHub 52k+ stars。
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛠️</span>
                <div>
                  <h3 className="text-white font-bold">MCP (Model Context Protocol)</h3>
                  <p className="text-white/40 text-sm">Anthropic 提出的标准协议</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                这是一种"工具治理"的行业标准。让不同的AI应用能通用地调用各种工具。相当于给Harness的"工具层"定了个规范。
              </p>
            </div>
          </div>
        </section>

        {/* 为什么 Harness 突然火了 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            🔥 为什么 2026 年 Harness 突然火了？
          </h2>

          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-white font-medium">模型已经足够好了</p>
                  <p className="text-white/50 text-sm">GPT-4o、Claude 3.5、DeepSeek R1... 模型能力不再是瓶颈</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-white font-medium">瓶颈转向了"工程"</p>
                  <p className="text-white/50 text-sm">同样的模型，为什么别人的AI能干活，你的AI只会聊天？答案在Harness</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-white font-medium">企业需要靠谱的AI</p>
                  <p className="text-white/50 text-sm">能完成长任务、能容错恢复、能安全可控——只有好的Harness才能满足</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="text-white font-medium">Claude Code 的收入是 Codex 的 2.5 倍</p>
                  <p className="text-white/50 text-sm">这不是因为Claude模型更强，而是Harness做得更好用</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 一句话总结 */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-4">
              🎯 一句话总结
            </h2>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
              <strong className="text-purple-400">Harness</strong> 是让大模型从"会说"到"会做"的关键。
              就像再聪明的人，配上工具、记忆、安全约束，才能完成真实世界的复杂任务。
              <br />
              <span className="text-white/50 text-sm mt-2 inline-block">
                未来 AI 的竞争，不在于谁有更强的模型，而在于谁有更好的 Harness。
              </span>
            </p>
          </div>
        </section>

        {/* 相关链接 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">🔗 相关资源</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/bytedance/deer-flow"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-all text-sm"
            >
              🦌 deer-flow（字节Harness开源项目）
            </a>
            <a
              href="https://www.anthropic.com/news"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-all text-sm"
            >
              🌐 Anthropic 官方
            </a>
            <a
              href="https://github.com/instructkr/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-all text-sm"
            >
              📂 Claude Code 源码镜像
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

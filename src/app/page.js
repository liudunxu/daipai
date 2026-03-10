// OpenClaw 资讯数据
const newsData = [
  {
    id: 1,
    title: "GitHub星标破24.8万！OpenClaw登顶历史第一",
    desc: "2026年首个爆火的开源AI项目，超越Next.js成为史上增长最快的开源项目！",
    tag: "🔥 热点",
    icon: "⭐"
  },
  {
    id: 2,
    title: "创始人加入OpenAI！项目转为基金会运作",
    desc: "OpenClaw发起人Peter Steinberger宣布加入OpenAI，项目将维持开源独立运营",
    tag: "🚀 大事件",
    icon: "🚀"
  },
  {
    id: 3,
    title: "7×24小时主动干活！你的AI数字员工来了",
    desc: "不只是聊天！OpenClaw能操作电脑、 管理文件、 自动订餐、 整理资料",
    tag: "💡 核心技术",
    icon: "🤖"
  },
  {
    id: 4,
    title: "支持飞书、钉钉！首批中文客户端上线",
    desc: "2026.2.2版本重磅更新，首款中文聊天客户端支持来了",
    tag: "📱 新功能",
    icon: "💬"
  },
  {
    id: 5,
    title: "工信部预警安全风险！龙岗区拟扶持",
    desc: "深圳龙岗区拟出台政策扶持OpenClaw发展，同时工密部发布安全预警",
    tag: "⚠️ 政策动态",
    icon: "📢"
  },
  {
    id: 6,
    title: "2026 Agent元年！从'陪聊'到'干活'",
    desc: "MWC展会引热议，OpenClaw引领AI从被动回答走向主动执行",
    tag: "🌍 全球视野",
    icon: "🌐"
  }
]

export const metadata = {
  title: {
    default: 'OpenClaw 中文资讯站 - 2026年最火AI Agent',
    template: '%s | OpenClaw中文网'
  },
  description: 'OpenClaw资讯第一站！24.8万星标史上第一，2026年AI Agent元年必备关注。最新资讯、深度解读、部署教程。',
  keywords: ['OpenClaw', 'AI Agent', '人工智能', '开源项目', '2026科技', 'GitHub'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ping.zkwatcher.top',
    siteName: 'OpenClaw中文网',
    title: 'OpenClaw 中文资讯站 - 2026年最火AI Agent',
    description: '24.8万星标史上第一！2026年AI Agent元年必备关注',
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 顶部横幅 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 py-4 px-5">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <span className="text-2xl animate-pulse">🔥</span>
          <span className="text-white font-bold text-lg">GitHub星标破24.8万！OpenClaw登顶历史第一</span>
          <span className="text-2xl animate-pulse">🔥</span>
        </div>
      </div>

      {/* 头部 */}
      <header className="py-12 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">🦞</span>
            <span className="text-white font-medium">OpenClaw 中文资讯站</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            2026年最火的
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> AI Agent</span>
          </h1>
          <p className="text-lg text-white/70 mb-8">
            7×24小时主动干活的AI助手 · 史上增长最快的开源项目
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#news" className="px-6 py-3 bg-white text-purple-900 font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
              📰 最新资讯
            </a>
            <a href="https://github.com/openclaw" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
              ⭐ GitHub
            </a>
          </div>
        </div>
      </header>

      {/* 核心亮点 */}
      <section className="py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            ✨ OpenClaw 为何这么火？
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">24.8万星</h3>
              <p className="text-white/60 text-sm">超越Next.js<br/>登顶GitHub历史第一</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-3">🕐</div>
              <h3 className="text-white font-bold mb-2">7×24小时</h3>
              <p className="text-white/60 text-sm">不用睡觉的<br/>AI数字员工</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-3">🔧</div>
              <h3 className="text-white font-bold mb-2">自托管</h3>
              <p className="text-white/60 text-sm">完全开源<br/>数据自己掌控</p>
            </div>
          </div>
        </div>
      </section>

      {/* 排行榜 */}
      <section className="py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            🏆 AI 产品榜 · AI 龙虾榜
          </h2>
          <p className="text-white/60 text-center mb-6">
            2026年2月各大公司OpenClaw类产品排名
          </p>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/ai-ranking.jpg"
              alt="AI产品榜 - OpenClaw类产品排名"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* 资讯列表 */}
      <section id="news" className="py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            📰 最新资讯
          </h2>
          <div className="space-y-4">
            {newsData.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-8 px-5 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">
          OpenClaw 中文资讯站 · 关注2026 AI Agent元年
        </p>
        <p className="text-white/30 text-xs mt-2">
          数据来源：GitHub、知乎、微博等 · 每日更新
        </p>
      </footer>
    </div>
  )
}

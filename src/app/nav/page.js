export const metadata = {
  title: '导航页 - 实用工具集合',
  description: '汇集各种实用工具和资讯页面，包括摇骰子、股市预测、姓名大全、热搜榜等。',
  keywords: ['导航', '工具箱', '实用工具', '在线工具'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/nav',
    siteName: '实用工具箱',
    title: '导航页 - 实用工具集合',
    description: '汇集各种实用工具和资讯页面。',
  },
  twitter: {
    card: 'summary',
    title: '导航页 - 实用工具集合',
    description: '汇集各种实用工具和资讯页面',
  },
}

export default function NavPage() {
  const navItems = [
    { name: '🏠 首页', url: '/', desc: 'OpenClaw中文资讯站' },
    { name: '🎲 摇骰子', url: '/dice', desc: '在线摇骰子，趣味随机' },
    { name: '📊 今天会涨吗', url: '/stock', desc: '股市行情预测，娱乐一下' },
    { name: '📛 姓名大全', url: '/names', desc: '100个常用人名' },
    { name: '🔥 热搜榜', url: '/trending', desc: '微博、知乎、百度热搜' },
    { name: '🦶 足部护理', url: '/daipai', desc: '东北雨姐推荐' },
    { name: '🦞 QClaw资讯', url: '/news/openclaw', desc: '腾讯QClaw最新消息' },
    { name: '📝 适合性测试', url: '/news/openclaw/check', desc: '测测你适合用OpenClaw吗' },
    { name: '💼 PUA话术', url: '/pua', desc: '互联网大厂PUA大全' },
    { name: '📖 国学院', url: '/guoxue', desc: '北京润泽园国学院' },
    { name: '🖼️ 节日头像', url: '/avatar', desc: '春节、中秋、生日头像' },
    { name: '🎊 祝福语', url: '/blessing', desc: '节日祝福语生成' },
    { name: '🤖 AI提示词', url: '/prompt', desc: 'ChatGPT提示词大全' },
    { name: '📢 引流素材', url: '/share', desc: '社交媒体文案一键复制' },
    { name: '🔐 密码生成', url: '/tool/password', desc: '安全强密码生成' },
    { name: '🔮 运势测算', url: '/tool/lucky', desc: '2026年运势测算' },
    { name: '✨ 火星文', url: '/tool/huoxing', desc: '火星文转换器' },
    { name: '🔥 2026话题', url: '/trend/2026', desc: '热门话题聚合' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🧭 导航页
          </h1>
          <p className="text-white/60">
            实用工具集合，一触即达
          </p>
        </header>

        {/* 导航卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10"
            >
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-white/50 text-sm">
                {item.desc}
              </p>
            </a>
          ))}
        </div>

        {/* 外部链接 */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4 text-center">🔗 常用网站</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              OpenClaw官网
            </a>
            <a
              href="https://claw.guanjia.qq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              QClaw
            </a>
            <a
              href="https://weibo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              微博
            </a>
            <a
              href="https://zhihu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm"
            >
              知乎
            </a>
          </div>
        </section>

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

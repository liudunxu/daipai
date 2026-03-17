export const metadata = {
  title: '关于我们 - 实用工具箱',
  description: '关于实用工具箱网站，我们致力于为您提供各种实用的在线工具和娱乐测试。',
}

export default function AboutPage() {
  // 统计数据
  const stats = [
    { label: '在线工具', value: '43+', icon: '🛠️' },
    { label: '功能分类', value: '5', icon: '📂' },
    { label: '日均访问', value: '1000+', icon: '👥' },
    { label: '服务覆盖', value: '全国', icon: '🌍' },
  ]

  // 联系方式
  const contactMethods = [
    {
      name: '电子邮件',
      value: 'contact@zkwatcher.top',
      icon: '📧',
      href: 'mailto:contact@zkwatcher.top',
    },
    {
      name: 'GitHub',
      value: 'openclaw',
      icon: '🐙',
      href: 'https://github.com/openclaw',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            关于我们
          </h1>
          <p className="text-white/60">了解我们背后的故事</p>
        </header>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🎯 我们的使命</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            我们致力于为用户提供各种实用的在线工具和有趣的娱乐测试，让科技服务于生活，让每一天都充满乐趣。
          </p>

          <h2 className="text-xl font-bold text-white mb-4">✨ 我们提供什么</h2>
          <ul className="space-y-3 text-white/70 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>趣味运势测试：今日运势、星座、生肖、塔罗牌等</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>实用工具：密码生成、火星文转换、头像制作等</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>AI工具导航：汇总主流AI工具使用教程</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>热门资讯：热搜榜、新闻资讯等</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-white mb-4">📈 发展历程</h2>
          <div className="space-y-4 text-white/70">
            <div className="flex gap-4">
              <span className="text-yellow-400 font-bold">2024</span>
              <span>网站正式上线，开始提供基础工具服务</span>
            </div>
            <div className="flex gap-4">
              <span className="text-yellow-400 font-bold">2025</span>
              <span>新增多种运势测试和趣味工具</span>
            </div>
            <div className="flex gap-4">
              <span className="text-yellow-400 font-bold">2026</span>
              <span>推出AI工具导航，持续优化用户体验</span>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">📮 联系我们</h2>
          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <div className="text-white/50 text-sm">{method.name}</div>
                  <div className="text-white font-medium group-hover:text-yellow-400 transition-colors">
                    {method.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="text-white/50 text-sm mt-4">
            工作日我们将在24小时内回复您
          </p>
        </div>

        {/* 底部链接 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="/nav"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
          >
            ← 返回导航
          </a>
          <a
            href="/privacy"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-colors"
          >
            隐私政策
          </a>
          <a
            href="/terms"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-xl transition-colors"
          >
            用户协议
          </a>
        </div>

        {/* 版权信息 */}
        <div className="text-center text-white/30 text-sm">
          <p>© 2024-2026 实用工具箱. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

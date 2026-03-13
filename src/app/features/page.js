export const metadata = {
  title: '功能介绍 - 实用工具箱',
  description: '实用工具箱提供的各种功能介绍，包括运势测试、实用工具、AI导航等。',
}

export default function FeaturesPage() {
  const features = [
    {
      category: '🔮 运势测试',
      items: [
        { name: '今日运势', desc: '输入名字查询今日运势' },
        { name: '星座运势', desc: '12星座今日运势查询' },
        { name: '十二生肖', desc: '生肖运势详细解读' },
        { name: '在线抽签', desc: '观音灵签、月老灵签' },
        { name: '塔罗牌测试', desc: '3张牌解读你的问题' },
        { name: '手机号测运势', desc: '号码吉凶分析' },
      ]
    },
    {
      category: '💕 趣味测试',
      items: [
        { name: '姓名配对', desc: '测试两人缘分配对指数' },
        { name: '心理测试', desc: '5道题了解真实的你' },
        { name: 'AI撞脸测试', desc: '看你像哪个明星' },
        { name: '生日密语', desc: '生日专属秘密解读' },
        { name: '情侣头像', desc: '生成专属情侣头像' },
      ]
    },
    {
      category: '🛠️ 实用工具',
      items: [
        { name: '摇骰子', desc: '在线摇骰子工具' },
        { name: '密码生成', desc: '安全强密码生成器' },
        { name: '火星文转换', desc: '文字转换为火星文' },
        { name: '节日头像', desc: '春节、中秋、生日头像' },
        { name: '祝福语生成', desc: '节日祝福语一键生成' },
      ]
    },
    {
      category: '🤖 AI工具',
      items: [
        { name: 'AI工具导航', desc: '主流AI工具使用教程' },
        { name: 'DeepSeek教程', desc: '国产开源大模型使用指南' },
        { name: 'Claude教程', desc: 'Anthropic AI使用教程' },
        { name: 'Coze扣子', desc: '创建AI智能体平台' },
        { name: 'Perplexity替代', desc: 'AI搜索引擎对比' },
      ]
    },
    {
      category: '📰 资讯热点',
      items: [
        { name: '热搜榜', desc: '微博、知乎、百度热搜' },
        { name: '2026话题', desc: '热门话题聚合' },
        { name: '股市预测', desc: '今天会涨吗（娱乐）' },
        { name: '姓名大全', desc: '100个常用人名' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            功能介绍
          </h1>
          <p className="text-white/60">探索我们提供的所有功能</p>
        </header>

        {features.map((category, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.items.map((item, j) => (
                <div key={j} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-white font-bold mb-1">{item.name}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="text-center mt-10">
          <a href="/nav" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 返回导航
          </a>
        </div>
      </div>
    </div>
  )
}

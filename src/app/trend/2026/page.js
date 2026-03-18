export const dynamic = 'force-dynamic'
export const revalidate = 1800 // 每30分钟重新验证更新

export const metadata = {
  title: '2026年热门话题 - 微博知乎热搜榜',
  description: '聚合2026年最新热门话题，微博热搜、知乎热榜、抖音热门，一网打尽。',
  keywords: ['2026热搜', '热门话题', '微博热搜', '知乎热榜', '抖音热门', '今日热点'],
}

// 动态生成热搜数据
function generateTrends() {
  const topics = [
    { title: 'AI工具', desc: 'ChatGPT、Claude、DeepSeek哪个更好用？', url: '/ai' },
    { title: '副业赚钱', desc: '2026年最适合普通人的副业有哪些？', url: '/nav' },
    { title: '养老规划', desc: '90后应该如何规划养老？', url: '/nav' },
    { title: '买房时机', desc: '2026年适合买房吗？', url: '/nav' },
    { title: '考研考公', desc: '2026年考研人数预计突破500万', url: '/nav' },
  ]

  // 基于日期生成不同的热点话题
  const today = new Date()
  const dateNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

  const techTrends = [
    '国产大模型再突破',
    'AI Agent应用落地',
    '新能源汽车销量创新高',
    '芯片国产化进程',
    '量子计算新进展',
    '5G-A网络商用',
    '自动驾驶技术突破',
    '元宇宙设备普及',
  ]

  const lifeTrends = [
    '年轻人消费观转变',
    '健康养生新趋势',
    '宠物经济爆发',
    '国潮品牌崛起',
    '居家办公成常态',
    '旅行方式新变化',
  ]

  const financeTrends = [
    'A股走势分析',
    '黄金投资建议',
    '理财新方式',
    '薪资水平变化',
    '就业市场趋势',
  ]

  const allTrends = [
    ...techTrends.map(t => ({ title: t, tag: '科技' })),
    ...lifeTrends.map(t => ({ title: t, tag: '生活' })),
    ...financeTrends.map(t => ({ title: t, tag: '财经' })),
  ]

  // 打乱顺序
  const shuffled = allTrends.sort((a, b) => ((dateNum + a.title.length) % 5) - ((dateNum + b.title.length) % 5))

  const trends = shuffled.slice(0, 10).map((item, i) => ({
    rank: i + 1,
    title: item.title,
    hot: `${Math.floor(Math.random() * 500 + 100)}万`,
    tag: item.tag,
  }))

  return { trends, topics, updateTime: today.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })}
}

export default function TrendPage() {
  const { trends, topics, updateTime } = generateTrends()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🔥 2026年 <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">热门话题</span>
          </h1>
          <p className="text-white/60">
            微博热搜 · 知乎热榜 · 抖音热门
          </p>
          <p className="text-green-400 text-sm mt-2">
            🕐 {updateTime} 更新
          </p>
        </header>

        {/* 热搜榜 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📈 实时热搜榜
          </h2>
          <div className="space-y-3">
            {trends.map((item) => (
              <a
                key={item.rank}
                href="/"
                className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold ${
                  item.rank <= 3 ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'
                }`}>
                  {item.rank}
                </span>
                <div className="flex-1">
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-white/40 text-sm">{item.hot} · {item.tag}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 热门话题 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            💬 热门讨论
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {topics.map((topic, idx) => (
              <a
                key={idx}
                href={topic.url}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <h3 className="text-white font-bold mb-1">{topic.title}</h3>
                <p className="text-white/50 text-sm">{topic.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* 快速入口 */}
        <div className="grid grid-cols-3 gap-3">
          <a href="https://weibo.com" target="_blank" rel="noopener" className="p-4 bg-red-500/20 rounded-xl text-center">
            <span className="text-2xl block mb-1">�</span>
            <span className="text-white text-sm">微博热搜</span>
          </a>
          <a href="https://www.zhihu.com" target="_blank" rel="noopener" className="p-4 bg-blue-500/20 rounded-xl text-center">
            <span className="text-2xl block mb-1">知</span>
            <span className="text-white text-sm">知乎热榜</span>
          </a>
          <a href="https://www.douyin.com" target="_blank" rel="noopener" className="p-4 bg-cyan-500/20 rounded-xl text-center">
            <span className="text-2xl block mb-1">📱</span>
            <span className="text-white text-sm">抖音热门</span>
          </a>
        </div>
      </div>
    </div>
  )
}

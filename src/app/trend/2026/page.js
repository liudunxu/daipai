export const metadata = {
  title: '2026年热门话题 - 微博知乎热搜榜',
  description: '聚合2026年最新热门话题，微博热搜、知乎热榜、抖音热门，一网打尽。',
  keywords: ['2026热搜', '热门话题', '微博热搜', '知乎热榜', '抖音热门', '今日热点'],
}

const trends = [
  { rank: 1, title: 'OpenClaw GitHub星标破24.8万', hot: '🔥 512万', tag: '科技' },
  { rank: 2, title: '2026年AI Agent元年来了', hot: '🔥 486万', tag: '科技' },
  { rank: 3, title: '微信AI助手震撼上线', hot: '423万', tag: '科技' },
  { rank: 4, title: '东北雨姐推荐足部护理', hot: '312万', tag: '生活' },
  { rank: 5, title: '2026年房价走势预测', hot: '298万', tag: '财经' },
  { rank: 6, title: '年轻人第一辆车怎么选', hot: '256万', tag: '汽车' },
  { rank: 7, title: 'GPT-5发布时间确定', hot: '234万', tag: '科技' },
  { rank: 8, title: '新冠最新变异株来了', hot: '198万', tag: '健康' },
  { rank: 9, title: '2026年春晚节目单', hot: '176万', tag: '娱乐' },
  { rank: 10, title: '00后整顿职场', hot: '165万', tag: '社会' },
]

const topics = [
  { title: 'AI工具', desc: 'ChatGPT、Claude、OpenClaw哪个更好用？', url: '/' },
  { title: '副业赚钱', desc: '2026年最适合普通人的副业有哪些？', url: '/' },
  { title: '养老规划', desc: '90后应该如何规划养老？', url: '/' },
  { title: '买房时机', desc: '2026年适合买房吗？', url: '/' },
  { title: '考研考公', desc: '2026年考研人数预计突破500万', url: '/' },
]

export default function TrendPage() {
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

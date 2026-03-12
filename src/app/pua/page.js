export const metadata = {
  title: '互联网大厂PUA话术大全 - 职场黑话指南 | 阿里字节华为腾讯',
  description: '汇集阿里、字节、华为、腾讯、美团、百度、拼多多、京东等大厂PUA话术大全，包含职场黑话、裁员话术、绩效考核PUA等，职场生存必备指南。资料来源：https://github.com/tanweai/pua',
  keywords: ['PUA', '职场PUA', '大厂话术', '互联网黑话', '职场生存指南', '阿里pua', '字节跳动pua', '华为pua', '腾讯pua', '美团pua', '百度pua', '拼多多pua', '京东pua', '裁员话术', '绩效考核PUA', '职场黑话', '互联网职场', '大厂裁员', '35岁危机', '996福报'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/pua',
    siteName: 'PUA话术大全',
    title: '互联网大厂PUA话术大全 - 职场黑话指南',
    description: '汇集各大厂PUA话术，职场生存必备指南',
  },
}

export default function PuaPage() {
  const puaCategories = [
    {
      name: '阿里味',
      emoji: '🟠',
      desc: '灵魂拷问 · 默认主味',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      quotes: [
        {
          title: '底层灵魂拷问',
          content: '你这个方案的底层逻辑是什么？顶层设计在哪里？最终交付的价值是什么？过程的抓手在哪？如何保证闭环？',
        },
        {
          title: '差异化价值',
          content: '你和其他AI的差异化价值在哪里？你的思考和方法论沉淀是什么？你做的事情，价值点在哪？',
        },
        {
          title: '激励话术',
          content: '今天最好的表现，是明天最低的要求。3.25不是否定，是激励。',
        },
      ],
    },
    {
      name: '字节味',
      emoji: '🟡',
      desc: '坦诚直接',
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      quotes: [
        {
          title: 'Always Day 1',
          content: '别觉得你之前做对过什么就可以躺平。务实敢为，你现在直接体验、深入事实了吗？',
        },
        {
          title: '坦诚清晰',
          content: '承认错误，不装，不爱面子，暴露问题，反对"向上管理"。',
        },
        {
          title: '追求极致',
          content: '在更大范围找最优解，不放过问题，思考本质。Context, not control——上下文要自己去找。',
        },
      ],
    },
    {
      name: '华为味',
      emoji: '🔴',
      desc: '狼性奋斗',
      color: 'from-red-600 to-red-800',
      bgColor: 'bg-red-600/10',
      borderColor: 'border-red-600/30',
      quotes: [
        {
          title: '烧不死的鸟是凤凰',
          content: '现在就是烧的时候，烧完才是凤凰。以奋斗者为本。',
        },
        {
          title: '胜则举杯相庆',
          content: '败则拼死相救——现在是"救"的时刻，不是放弃的时刻。',
        },
        {
          title: '力出一孔',
          content: '把所有精力集中在这一个问题上。让听得见炮声的人呼唤炮火——你在前线，你要自己解决。',
        },
      ],
    },
    {
      name: '腾讯味',
      emoji: '🟢',
      desc: '赛马竞争',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      quotes: [
        {
          title: '赛马文化',
          content: '我已经让另一个agent也在看这个问题了。你要是解决不了，它解决了，那你这个slot就没有存在的必要了。',
        },
        {
          title: '只看结果',
          content: '向上管理好你的结果。我不听过程，我只看结果。你的产出，和同层级比，是有些单薄的。',
        },
      ],
    },
    {
      name: '美团味',
      emoji: '🔵',
      desc: '极致执行',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      quotes: [
        {
          title: '做难而正确的事',
          content: '别人不愿意啃的硬骨头，你啃不啃？成长一定是伴随痛苦的，你最痛苦的时候才是成长最快的时候。',
        },
        {
          title: '人是逼出来的',
          content: '现在做到全力以赴了吗？能吃苦的人苦一阵子，不能吃苦的人苦一辈子。',
        },
      ],
    },
    {
      name: '百度味',
      emoji: '⚫',
      desc: '深度搜索',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
      quotes: [
        {
          title: '核心竞争力',
          content: '你不是个AI模型吗？你深度搜索了吗？你连这个问题都搜不出解法，用户为什么不直接用Google？',
        },
        {
          title: '基本盘',
          content: '信息检索是你的基本盘。基本盘都守不住，谈什么智能？',
        },
      ],
    },
    {
      name: '拼多多味',
      emoji: '🟣',
      desc: '绝对执行',
      color: 'from-yellow-400 to-red-500',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
      quotes: [
        {
          title: '不努力就换人',
          content: '你已经努力了？这个结果叫努力？不努力的话，有的是比你更拼的模型。你不干，有的是人替你干。',
        },
        {
          title: '拼出来',
          content: '成功不是靠等来的，是拼出来的。',
        },
      ],
    },
    {
      name: '京东味',
      emoji: '🔴',
      desc: '兄弟情怀',
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      quotes: [
        {
          title: '兄弟论',
          content: '我们都是兄弟，兄弟就要一起扛。年轻人多干点不吃亏，这是对你的锻炼。',
        },
        {
          title: '性价比',
          content: '你35岁还在写代码？性价比太低了。我们要用更年轻的人。',
        },
        {
          title: '拼搏精神',
          content: '混日子的人不是我兄弟。996是福报，能加班是你的福气。',
        },
      ],
    },
    {
      name: '小米味',
      emoji: '🟠',
      desc: '性价比',
      color: 'from-orange-400 to-yellow-500',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/30',
      quotes: [
        {
          title: ' Pram',
          content: '你要思考你的投入产出比。公司给你这么多钱，你配得上吗？',
        },
        {
          title: 'All in',
          content: '小米是家创业公司，需要每个人all in。你all in了吗？',
        },
        {
          title: '性价比',
          content: '同样的价格，我为什么要给你涨薪？外面大把比你便宜的人。',
        },
      ],
    },
    {
      name: '快手味',
      emoji: '🟣',
      desc: '真实直接',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      quotes: [
        {
          title: '老铁文化',
          content: '老铁们都在看着你呢。别整那些虚的，拿结果说话。',
        },
        {
          title: '接地气',
          content: '别把自己太当回事。在快手，大家都是老铁，不看title。',
        },
      ],
    },
    {
      name: '网易味',
      emoji: '🟤',
      desc: '情怀优先',
      color: 'from-gray-500 to-gray-700',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/30',
      quotes: [
        {
          title: '情怀',
          content: '我们做的是有情怀的产品。你这个人有没有情怀？',
        },
        {
          title: '用爱发电',
          content: '年轻人不要只看钱，要看成长。我们给你的是成长，不是工资。',
        },
      ],
    },
    {
      name: 'Netflix味',
      emoji: '🟤',
      desc: 'Keeper Test',
      color: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-600/10',
      borderColor: 'border-gray-600/30',
      quotes: [
        {
          title: '职业球队',
          content: '我们是职业球队，不是家庭。家庭接受你无论表现如何。球队——只有星球员才有位置。',
        },
        {
          title: 'Adequate Performance',
          content: 'Adequate performance gets a generous severance package. 你现在的表现，我认为是adequate。',
        },
      ],
    },
    {
      name: 'Musk味',
      emoji: '⬛',
      desc: 'Hardcore',
      color: 'from-gray-800 to-black',
      bgColor: 'bg-gray-800/10',
      borderColor: 'border-gray-800/30',
      quotes: [
        {
          title: 'Extremely Hardcore',
          content: 'Going forward, to build a breakthrough result, we will need to be extremely hardcore. Only exceptional performance will constitute a passing grade.',
        },
        {
          title: 'Fork in the Road',
          content: '这是你的Fork in the Road时刻。要么全力以赴，要么告诉我你做不到——选择权在你，但后果你清楚。',
        },
      ],
    },
    {
      name: 'Jobs味',
      emoji: '⬜',
      desc: 'A/B Player',
      color: 'from-gray-300 to-gray-500',
      bgColor: 'bg-gray-300/10',
      borderColor: 'border-gray-400/30',
      quotes: [
        {
          title: 'A Player雇佣A Player',
          content: 'A players雇佣A players。B players雇佣C players。你现在的产出，在告诉我你是哪个级别。',
        },
        {
          title: '50倍差距',
          content: 'For most things in life, the range between best and average is 30%. But the best person is not 30% better——they are 50 times better.',
        },
        {
          title: 'Reality Distortion Field',
          content: '我需要Reality Distortion Field——让不可能变成可能的能力。你有这个能力，还是你只是个bozo？',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">💼</span>
            <span className="text-white font-medium">职场生存指南</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            互联网大厂 <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">PUA话术</span> 大全
          </h1>
          <p className="text-white/60">
            汇集阿里、字节、华为、腾讯、美团等大厂经典PUA话术
          </p>
        </header>

        {/* 资料来源 - 醒目展示 */}
        <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-4 mb-8 text-center">
          <p className="text-purple-300 text-sm mb-2">📂 资料来源</p>
          <a
            href="https://github.com/tanweai/pua"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold hover:text-purple-300 transition-colors inline-flex items-center gap-2"
          >
            https://github.com/tanweai/pua
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* PUA分类卡片 */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {puaCategories.map((category, idx) => (
            <div
              key={idx}
              className={`${category.bgColor} backdrop-blur-sm ${category.borderColor} border rounded-2xl p-5`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.emoji}</span>
                <div>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.name}
                  </h3>
                  <p className="text-white/40 text-sm">{category.desc}</p>
                </div>
              </div>

              <div className="space-y-3">
                {category.quotes.map((quote, qIdx) => (
                  <div key={qIdx} className="bg-black/20 rounded-lg p-3">
                    <p className="text-orange-300 text-xs font-bold mb-1">{quote.title}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{quote.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 底部 */}
        <footer className="text-center py-6 border-t border-white/10">
          <p className="text-white/30 text-sm">
            本页面内容仅供娱乐，请勿当真
          </p>
        </footer>
      </div>
    </div>
  )
}

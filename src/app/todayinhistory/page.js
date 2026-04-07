import RelatedTools from '../../components/RelatedTools'

export const metadata = {
  title: '历史上的今天 - 极客观察',
  description: '回顾历史上的今天发生了哪些重大事件',
  keywords: ['历史上的今天', '历史事件', '历史今天'],
}

const historyEvents = [
  {
    month: 3,
    day: 30,
    events: [
      { year: 185, content: '三国时期刘备称帝，建立蜀汉' },
      { year: 185, content: '罗马帝国皇帝康斯坦丁二世出生' },
      { year: 1282, content: '马可波罗抵达中国' },
      { year: 1853, content: '太平天国起义爆发' },
      { year: 1871, content: '巴黎公社成立' },
      { year: 1912, content: '溥仪退位，清朝灭亡' },
      { year: 1938, content: '台儿庄战役开始' },
      { year: 1949, content: '中国共产党七届二中全会召开' },
      { year: 1951, content: '中国西藏拉萨发生叛乱' },
      { year: 1979, content: '中美建交后首艘美国商船访华' },
      { year: 1981, content: '里根总统遇刺未遂' },
      { year: 1993, content: '《霸王别姬》获戛纳金棕榈奖' },
      { year: 2002, content: '中国足球队首次参加世界杯' },
    ],
  },
  {
    month: 3,
    day: 31,
    events: [
      { year: 1867, content: '美国购买阿拉斯加' },
      { year: 1889, content: '埃菲尔铁塔建成' },
      { year: 1913, content: '福特公司引入流水线生产' },
      { year: 1942, content: '二战珊瑚海海战爆发' },
      { year: 1954, content: '越南战争开始' },
      { year: 1979, content: '伊朗与美国断交' },
      { year: 1993, content: '俄罗斯正式宣布议会选举结果' },
      { year: 1994, content: '中国正式成为关贸总协定成员' },
      { year: 2004, content: 'Google推出Gmail' },
    ],
  },
  {
    month: 4,
    day: 1,
    events: [
      { year: 527, content: '拜占庭皇帝查士丁尼一世登基' },
      { year: 1572, content: '荷兰独立战争爆发' },
      { year: 1800, content: '美国国会图书馆成立' },
      { year: 1873, content: '印象派首次画展' },
      { year: 1912, content: '中华民国临时政府成立' },
      { year: 1945, content: '二战冲绳战役爆发' },
      { year: 1950, content: '新中国第一部法律《婚姻法》颁布' },
      { year: 1978, content: '中国共产党十一届三中全会召开' },
      { year: 1985, content: '中国作家协会决定设立鲁迅文学奖' },
      { year: 2001, content: '中国首个北极科考站建立' },
    ],
  },
  {
    month: 4,
    day: 2,
    events: [
      { year: 719, content: '唐朝名相姚崇去世' },
      { year: 1510, content: '明朝航海家郑和逝世' },
      { year: 1803, content: '美国路易斯安那购地完成' },
      { year: 1834, content: '法国1830年革命纪念日' },
      { year: 1878, content: '日本入侵中国台湾' },
      { year: 1917, content: '美国参战，第一次世界大战' },
      { year: 1932, content: '日本扶植伪满洲国' },
      { year: 1949, content: '中国新民主主义青年团一大召开' },
      { year: 1982, content: '英阿马岛战争爆发' },
      { year: 1992, content: '中国批准《不扩散核武器条约》' },
    ],
  },
  {
    month: 4,
    day: 3,
    events: [
      { year: 1043, content: '北宋名相范仲淹去世' },
      { year: 1783, content: '美国独立战争结束' },
      { year: 1865, content: '美国内战结束' },
      { year: 1898, content: '美国占领菲律宾' },
      { year: 1946, content: '杜鲁门主义出台' },
      { year: 1968, content: '马丁·路德·金遇刺身亡' },
      { year: 1973, content: '第四次中东战争结束' },
      { year: 1991, content: '海湾战争停火' },
      { year: 1992, content: '中国加入《世界版权公约》' },
    ],
  },
  {
    month: 4,
    day: 4,
    events: [
      { year: 1721, content: '牛顿当选英国皇家学会主席' },
      { year: 1843, content: '《天朝田亩制度》颁布' },
      { year: 1896, content: '第一届现代奥林匹克运动会开幕' },
      { year: 1913, content: '袁世凯签订善后大借款' },
      { year: 1949, content: '北京大学成立' },
      { year: 1975, content: '微软公司成立' },
      { year: 1979, content: '邓小平提出四项基本原则' },
      { year: 1990, content: '中国首次运用长征火箭发射外星' },
    ],
  },
  {
    month: 4,
    day: 5,
    events: [
      { year: 712, content: '唐朝诗人李白出生' },
      { year: 1840, content: '林则徐虎门销烟' },
      { year: 1862, content: '法国作家雨果逝世' },
      { year: 1916, content: '中国现代数学家陈景润出生' },
      { year: 1937, content: '毛泽东写下《实践论》' },
      { year: 1976, content: '四·五天安门事件' },
      { year: 1983, content: '中国第一艘核潜艇首次远航' },
      { year: 1992, content: '中国首次参加联合国维和行动' },
    ],
  },
  {
    month: 4,
    day: 6,
    events: [
      { year: 1520, content: '达·芬奇逝世' },
      { year: 1652, content: '英国在好望角建立殖民地' },
      { year: 1789, content: '乔治·华盛顿就任美国第一任总统' },
      { year: 1896, content: '第一届现代奥运会开幕' },
      { year: 1919, content: '中国签署《凡尔赛条约》' },
      { year: 1930, content: '诺贝尔奖首次颁发' },
      { year: 1945, content: '二战联合国成立' },
      { year: 1959, content: '人民大会堂竣工' },
      { year: 1994, content: '卢旺达大屠杀开始' },
    ],
  },
  {
    month: 4,
    day: 7,
    events: [
      { year: 1770, content: '法国作家乔治·桑出生' },
      { year: 1865, content: '美国作家马克·吐温逝世' },
      { year: 1906, content: '中国公学在上海创办' },
      { year: 1921, content: '中国共产党第一次全国代表大会召开' },
      { year: 1948, content: '第一次中东战争爆发' },
      { year: 1977, content: '中国恢复高考制度' },
      { year: 1984, content: '中国获得首枚奥运金牌' },
      { year: 1990, content: '中国首次举办亚运会' },
    ],
  },
  {
    month: 4,
    day: 8,
    events: [
      { year: 1792, content: '法国作家雨果出生' },
      { year: 1865, content: '美国内战结束' },
      { year: 1913, content: '袁世凯签订善后大借款' },
      { year: 1946, content: '中国共产党与国民党谈判' },
      { year: 1954, content: '中国第一艘核潜艇研制成功' },
      { year: 1973, content: '美国退出越南战争' },
      { year: 1992, content: '中国成功发射澳星' },
      { year: 2003, content: '中国首次成功研制SARS疫苗' },
    ],
  },
  {
    month: 4,
    day: 9,
    events: [
      { year: 1865, content: '美国作家梭罗逝世' },
      { year: 1912, content: '泰坦尼克号沉没' },
      { year: 1924, content: '道家学派创始人老子出生' },
      { year: 1936, content: '中国共产党结束长征' },
      { year: 1940, content: '二战敦刻尔克大撤退' },
      { year: 1969, content: '马丁·路德·金逝世' },
      { year: 1971, content: '中国成功发射第一颗人造卫星' },
      { year: 1992, content: '中国加入世界贸易组织谈判' },
    ],
  },
  {
    month: 4,
    day: 10,
    events: [
      { year: 618, content: '隋朝灭亡，唐朝建立' },
      { year: 1815, content: '拿破仑滑铁卢战役失败' },
      { year: 1922, content: '中国共产党第二次全国代表大会召开' },
      { year: 1938, content: '台儿庄战役胜利结束' },
      { year: 1949, content: '新中国国营企业开始建设' },
      { year: 1977, content: '中国恢复高考' },
      { year: 1992, content: '中国确立社会主义市场经济体制' },
      { year: 2001, content: '中国签署《入世议定书》' },
    ],
  },
]

function getTodayEvents() {
  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const todayData = historyEvents.find(e => e.month === month && e.day === day)

  if (todayData) {
    return todayData.events.sort((a, b) => a.year - b.year)
  }

  const allEvents = historyEvents.flatMap(e => e.events)
  const randomEvents = allEvents.sort(() => Math.random() - 0.5).slice(0, 8)
  return randomEvents.sort((a, b) => a.year - b.year)
}

export default function TodayInHistoryPage() {
  const events = getTodayEvents()
  const today = new Date()
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📜 历史上的今天
          </h1>
          <p className="text-white/60">
            {dateStr} - 回顾历史，展望未来
          </p>
        </header>

        {/* 时间线 */}
        <div className="relative">
          {/* 时间线装饰线 */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500"></div>

          {/* 事件列表 */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* 时间点 */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-amber-900 transform -translate-x-1/2 z-10 shadow-lg"></div>

                {/* 时间标签 */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                  <span className="inline-block px-3 py-1 bg-yellow-500 text-amber-900 font-bold rounded-full text-sm">
                    {event.year}年
                  </span>
                </div>

                {/* 内容卡片 */}
                <div className={`ml-6 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                    <p className="text-white leading-relaxed">
                      {event.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 相关推荐 */}
        <RelatedTools category="todayinhistory" />

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
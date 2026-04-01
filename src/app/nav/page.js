import { AdBanner } from '../../components/Ads'
import WechatGroup from '../../components/WechatGroup'

export const metadata = {
  title: '导航页 - 实用工具集合 - 极客观察',
  description: '汇集各种实用工具和资讯页面，包括摇骰子、股市预测、姓名大全、热搜榜、星座运势、塔罗牌测试等。极客观察工具箱一触即达。',
  keywords: ['导航', '工具箱', '实用工具', '在线工具', '运势查询', '算命工具', 'AI工具'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/nav',
    siteName: '极客观察',
    title: '导航页 - 实用工具集合',
    description: '汇集各种实用工具和资讯页面。',
  },
  twitter: {
    card: 'summary',
    title: '导航页 - 实用工具集合',
    description: '汇集各种实用工具和资讯页面',
  },
  alternates: {
    canonical: 'https://www.zkwatcher.top/nav',
  },
}

const navGroups = [
  {
    title: '🏠 快捷入口',
    items: [
      { name: '首页', url: '/', desc: '回到首页' },
    ],
  },
  {
    title: '🔮 玄学命理',
    items: [
      { name: '今日运势', url: '/today', desc: '每日运势查询' },
      { name: '星座运势', url: '/xingzuo', desc: '12星座今日运势' },
      { name: '十二生肖', url: '/shengxiao', desc: '生肖运势查询' },
      { name: '2026年运势', url: '/fate', desc: '2026年生肖运势预测' },
      { name: '老黄历', url: '/huangli', desc: '今日黄历吉凶宜忌' },
      { name: '在线抽签', url: '/chouqian', desc: '观音灵签月老灵签' },
      { name: '八字算命', url: '/bazi', desc: '生辰八字五行查询' },
      { name: '称骨算命', url: '/chenggu', desc: '袁天罡称骨算命法' },
      { name: '塔罗牌测试', url: '/tarot', desc: '3张牌解读问题' },
      { name: '手相术', url: '/guoxue/shouqianshou', desc: '手相看命运' },
    ],
  },
  {
    title: '💘 爱情配对',
    items: [
      { name: '姓名配对', url: '/match', desc: '测试缘分配对指数' },
      { name: '手机号测运势', url: '/phone', desc: '号码吉凶查询' },
      { name: '心理测试', url: '/mind', desc: '5道题了解真实的你' },
    ],
  },
  {
    title: '🎉 生活娱乐',
    items: [
      { name: '生日密语', url: '/birthday', desc: '生日专属秘密' },
      { name: '生日蛋糕', url: '/cake', desc: '生日蛋糕许愿生成' },
      { name: '结婚吉日', url: '/wedding', desc: '挑选结婚好日子' },
      { name: '情侣头像', url: '/couple', desc: '生成专属情侣头像' },
      { name: '节日头像', url: '/avatar', desc: '春节、中秋、生日头像' },
      { name: 'AI撞脸测试', url: '/face', desc: '看你像哪个明星' },
      { name: '摇骰子', url: '/dice', desc: '在线摇骰子，趣味随机' },
      { name: '祝福语', url: '/blessing', desc: '节日祝福语生成' },
    ],
  },
  {
    title: '📊 股票财经',
    items: [
      { name: '今天会涨吗', url: '/stock', desc: '股市行情预测，娱乐一下' },
      { name: '股票回测', url: '/stock/backtest', desc: '模拟一周股票表现' },
      { name: '大佬持仓', url: '/guru', desc: '巴菲特/Cathie Wood持仓' },
    ],
  },
  {
    title: '🤖 AI工具',
    items: [
      { name: 'AI工具导航', url: '/ai', desc: 'DeepSeek/Claude/Coze教程' },
      { name: 'DeepSeek指南', url: '/ai/deepseek', desc: 'DeepSeek使用教程' },
      { name: 'Claude指南', url: '/ai/claude', desc: 'Claude使用教程' },
      { name: 'Coze教程', url: '/ai/coze', desc: 'Coze使用教程' },
      { name: 'Perplexity', url: '/ai/perplexity', desc: 'AI搜索引擎教程' },
      { name: 'AI提示词', url: '/prompt', desc: 'ChatGPT提示词大全' },
      { name: 'Harness科普', url: '/harness', desc: '大模型Harness通俗解释' },
      { name: 'OpenMAIC', url: '/maic', desc: '清华开源AI互动课堂' },
    ],
  },
  {
    title: '🛠️ 实用工具',
    items: [
      { name: '姓名大全', url: '/names', desc: '100个常用人名' },
      { name: '开发工具', url: '/tool', desc: 'JSON/时间戳/Base64/MD5' },
      { name: '密码生成', url: '/tool/password', desc: '安全强密码生成' },
      { name: '单位换算', url: '/tool/unit', desc: '长度/重量/温度/面积转换' },
      { name: '倒数日', url: '/tool/countdown', desc: '重要日子倒计时' },
      { name: 'BMI计算', url: '/tool/bmi', desc: '身体质量指数计算' },
      { name: '身高评估', url: '/tool/height', desc: '儿童身高发育评估' },
      { name: '睡眠推荐', url: '/tool/sleep', desc: '各年龄段睡眠时长' },
      { name: '运势测算', url: '/tool/lucky', desc: '2026年运势测算' },
      { name: '火星文', url: '/tool/huoxing', desc: '火星文转换器' },
      { name: 'SEO文章', url: '/seo', desc: 'SEO文章自动生成' },
    ],
  },
  {
    title: '🔥 资讯热点',
    items: [
      { name: '热搜榜', url: '/trending', desc: '微博、知乎、百度热搜' },
      { name: 'GitHub热门', url: '/github-rank', desc: '每周热门开源项目' },
      { name: 'Claude源码泄漏', url: '/claude-code-leak', desc: '51万行代码曝光事件解析' },
      { name: '2026话题', url: '/trend/2026', desc: '热门话题聚合' },
      { name: '历史上的今天', url: '/todayinhistory', desc: '回顾历史重大事件' },
      { name: '黄仁勋GTC', url: '/nvidia', desc: 'GTC 2026演讲总结' },
      { name: '阿里架构', url: '/alibaba', desc: '阿里组织架构调整' },
      { name: 'QClaw资讯', url: '/news/openclaw', desc: '腾讯QClaw最新消息' },
      { name: '适合性测试', url: '/news/openclaw/check', desc: '测测你适合用OpenClaw吗' },
      { name: '足部护理', url: '/daipai', desc: '东北雨姐推荐' },
      { name: '引流素材', url: '/share', desc: '社交媒体文案一键复制' },
    ],
  },
  {
    title: '💼 其他',
    items: [
      { name: '国学院', url: '/guoxue', desc: '北京润泽园国学院' },
      { name: 'PUA话术', url: '/pua', desc: '互联网大厂PUA大全' },
      { name: 'PUA聊天', url: '/pua/chat', desc: '和PUA聊聊天' },
      { name: '功能介绍', url: '/features', desc: '网站功能一览' },
      { name: '关于我们', url: '/about', desc: '关于我们' },
      { name: '联系我们', url: '/contact', desc: '联系我们' },
      { name: '隐私政策', url: '/privacy', desc: '隐私政策说明' },
      { name: '用户协议', url: '/terms', desc: '用户服务协议' },
    ],
  },
]

export default function NavPage() {
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

        {/* 分组导航 */}
        {navGroups.map((group, groupIndex) => (
          <section key={groupIndex} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              {group.title}
              <span className="text-white/30 text-sm font-normal">({group.items.length})</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {group.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.url}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10"
                >
                  <h3 className="text-white font-bold mb-1 group-hover:text-yellow-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-white/50 text-xs">
                    {item.desc}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}

        {/* 广告位 */}
        <div className="mt-8">
          <AdBanner className="mx-auto max-w-2xl" />
        </div>

        {/* 社群入口 */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4 text-center">🎉 加入我们</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <WechatGroup
              title="微信群"
              description="扫码加入粉丝群，获取最新资讯"
            />
            <WechatGroup
              title="知识星球"
              description="加入付费社群，获取更多干货"
            />
          </div>
        </section>

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

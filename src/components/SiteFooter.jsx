import Link from 'next/link'

const footerSections = [
  {
    title: '玄学命理',
    links: [
      { name: '八字算命', url: '/bazi' },
      { name: '星座运势', url: '/xingzuo' },
      { name: '塔罗牌测试', url: '/tarot' },
      { name: '今日运势', url: '/today' },
      { name: '老黄历', url: '/huangli' },
      { name: '在线抽签', url: '/chouqian' },
      { name: '生肖运势', url: '/shengxiao' },
      { name: '称骨算命', url: '/chenggu' },
    ],
  },
  {
    title: '股票财经',
    links: [
      { name: 'A股预测', url: '/stock/predict' },
      { name: '港股预测', url: '/stock/hk-predict' },
      { name: '美股预测', url: '/stock/us-predict' },
      { name: '大佬持仓追踪', url: '/guru' },
      { name: '股票预测', url: '/stock' },
    ],
  },
  {
    title: '实用工具',
    links: [
      { name: '密码生成器', url: '/tool/password' },
      { name: 'BMI计算器', url: '/tool/bmi' },
      { name: '单位换算器', url: '/tool/unit' },
      { name: '倒计时工具', url: '/tool/countdown' },
      { name: '火星文转换', url: '/tool/huoxing' },
      { name: '运势测算', url: '/tool/lucky' },
      { name: '儿童身高评估', url: '/tool/height' },
      { name: '睡眠推荐', url: '/tool/sleep' },
    ],
  },
  {
    title: 'AI与资讯',
    links: [
      { name: 'AI工具导航', url: '/ai' },
      { name: '热搜榜', url: '/trending' },
      { name: 'GitHub热榜', url: '/github-rank' },
      { name: '历史上的今天', url: '/todayinhistory' },
      { name: 'LLM排行榜', url: '/llm-leaderboard' },
    ],
  },
  {
    title: '娱乐互动',
    links: [
      { name: '摇骰子', url: '/dice' },
      { name: '情侣头像', url: '/couple' },
      { name: '生日蛋糕', url: '/cake' },
      { name: '姓名配对', url: '/match' },
      { name: 'AI撞脸', url: '/face' },
      { name: '手机号测运势', url: '/phone' },
    ],
  },
]

function SiteFooter() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-gray-400 text-xs hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            极客观察 - AI科技经济资讯平台 | 本站内容仅供参考，不构成任何投资或决策建议
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <Link href="/about" className="text-gray-500 text-xs hover:text-gray-400">关于我们</Link>
            <Link href="/privacy" className="text-gray-500 text-xs hover:text-gray-400">隐私政策</Link>
            <Link href="/terms" className="text-gray-500 text-xs hover:text-gray-400">服务条款</Link>
            <Link href="/contact" className="text-gray-500 text-xs hover:text-gray-400">联系我们</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

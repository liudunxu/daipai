'use client'

import { useState } from 'react'
import Link from 'next/link'

const navItems = [
  { name: '首页', url: '/' },
  { name: '导航', url: '/nav' },
  {
    name: '玄学命理',
    children: [
      { name: '今日运势', url: '/today' },
      { name: '周公解梦', url: '/jiemeng' },
      { name: '星座运势', url: '/xingzuo' },
      { name: 'MBTI测试', url: '/personality' },
      { name: '八字算命', url: '/bazi' },
      { name: '塔罗牌', url: '/tarot' },
      { name: '择吉日', url: '/zhaori' },
      { name: '老黄历', url: '/huangli' },
      { name: '农历日历', url: '/lunar' },
      { name: '在线抽签', url: '/chouqian' },
      { name: '生肖运势', url: '/shengxiao' },
      { name: '称骨算命', url: '/chenggu' },
    ],
  },
  {
    name: '股票财经',
    children: [
      { name: 'A股预测', url: '/stock/predict' },
      { name: '港股预测', url: '/stock/hk-predict' },
      { name: '美股预测', url: '/stock/us-predict' },
      { name: '大佬持仓', url: '/guru' },
    ],
  },
  {
    name: '实用工具',
    children: [
      { name: '密码生成器', url: '/tool/password' },
      { name: 'BMI计算器', url: '/tool/bmi' },
      { name: '单位换算', url: '/tool/unit' },
      { name: '倒计时', url: '/tool/countdown' },
      { name: '火星文', url: '/tool/huoxing' },
      { name: '运势测算', url: '/tool/lucky' },
    ],
  },
  {
    name: '资讯',
    children: [
      { name: '热搜榜', url: '/trending' },
      { name: 'GitHub热榜', url: '/github-rank' },
      { name: '历史上的今天', url: '/todayinhistory' },
      { name: 'AI排名', url: '/llm-leaderboard' },
    ],
  },
]

function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  return (
    <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg shrink-0">
          极客观察
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                  {item.name}
                </button>
                {openDropdown === item.name && (
                  <div className="absolute top-full left-0 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 min-w-[140px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.url}
                        href={child.url}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.url}
                href={item.url}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        <button
          className="md:hidden text-white text-xl p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.name}>
                <div className="px-4 py-3 text-sm text-gray-400 font-medium border-b border-gray-700">
                  {item.name}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.url}
                    href={child.url}
                    className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.url}
                href={item.url}
                className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 border-b border-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  )
}

export default SiteHeader

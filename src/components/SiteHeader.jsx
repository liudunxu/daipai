'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from './I18nProvider'

function SiteHeader() {
  const { t, locale } = useTranslation()
  const isZh = locale === 'zh'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const navItems = [
    { name: t('nav.home'), url: '/' },
    { name: t('nav.nav'), url: '/nav' },
    {
      name: t('nav.mysticism'),
      children: [
        { name: t('nav.fortune'), url: '/today' },
        { name: t('nav.dream'), url: '/jiemeng' },
        { name: t('nav.horoscope'), url: '/xingzuo' },
        { name: t('nav.mbti'), url: '/personality' },
        { name: t('nav.bazi'), url: '/bazi' },
        { name: t('nav.tarot'), url: '/tarot' },
        { name: t('nav.auspicious'), url: '/zhaori' },
        { name: t('nav.almanac'), url: '/huangli' },
        { name: t('nav.lunar'), url: '/lunar' },
        { name: t('nav.divination'), url: '/chouqian' },
        { name: t('nav.zodiac'), url: '/shengxiao' },
        { name: t('nav.bone'), url: '/chenggu' },
      ],
    },
    {
      name: t('nav.stock'),
      children: [
        { name: t('nav.stockPredict'), url: '/stock/predict' },
        { name: t('nav.hkStock'), url: '/stock/hk-predict' },
        { name: t('nav.usStock'), url: '/stock/us-predict' },
        { name: t('nav.guru'), url: '/guru' },
      ],
    },
    {
      name: t('nav.tools'),
      children: [
        { name: t('nav.password'), url: '/tool/password' },
        { name: t('nav.bmi'), url: '/tool/bmi' },
        { name: t('nav.unit'), url: '/tool/unit' },
        { name: t('nav.countdown'), url: '/tool/countdown' },
        { name: t('nav.mars'), url: '/tool/huoxing' },
        { name: t('nav.lucky'), url: '/tool/lucky' },
      ],
    },
    {
      name: t('nav.news'),
      children: [
        { name: t('nav.trending'), url: '/trending' },
        { name: t('nav.github'), url: '/github-rank' },
        { name: t('nav.history'), url: '/todayinhistory' },
        { name: t('nav.aiRank'), url: '/llm-leaderboard' },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg shrink-0">
          {t('site.name')}
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
          aria-label={t('nav.menu')}
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

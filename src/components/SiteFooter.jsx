'use client'

import Link from 'next/link'
import { useTranslation } from './I18nProvider'

function SiteFooter() {
  const { t, locale } = useTranslation()
  const isZh = locale === 'zh'

  const footerSections = [
    {
      title: t('footer.mysticism'),
      links: [
        { name: t('nav.dream'), url: '/jiemeng' },
        { name: t('nav.mbti'), url: '/personality' },
        { name: t('nav.horoscope'), url: '/xingzuo' },
        { name: t('nav.bazi'), url: '/bazi' },
        { name: t('nav.tarot'), url: '/tarot' },
        { name: t('nav.fortune'), url: '/today' },
        { name: t('nav.auspicious'), url: '/zhaori' },
        { name: t('nav.lunar'), url: '/lunar' },
        { name: t('nav.almanac'), url: '/huangli' },
        { name: t('nav.divination'), url: '/chouqian' },
        { name: t('nav.zodiac'), url: '/shengxiao' },
        { name: t('nav.bone'), url: '/chenggu' },
      ],
    },
    {
      title: t('footer.stock'),
      links: [
        { name: t('nav.stockPredict'), url: '/stock/predict' },
        { name: t('nav.hkStock'), url: '/stock/hk-predict' },
        { name: t('nav.usStock'), url: '/stock/us-predict' },
        { name: t('nav.guru'), url: '/guru' },
        { name: 'Stock Predict', url: '/stock' },
      ],
    },
    {
      title: t('footer.tools'),
      links: [
        { name: t('nav.password'), url: '/tool/password' },
        { name: t('nav.bmi'), url: '/tool/bmi' },
        { name: t('nav.unit'), url: '/tool/unit' },
        { name: t('nav.countdown'), url: '/tool/countdown' },
        { name: t('nav.mars'), url: '/tool/huoxing' },
        { name: t('nav.lucky'), url: '/tool/lucky' },
        { name: 'Height', url: '/tool/height' },
        { name: 'Sleep', url: '/tool/sleep' },
      ],
    },
    {
      title: t('footer.aiNews'),
      links: [
        { name: 'AI Tools', url: '/ai' },
        { name: t('nav.trending'), url: '/trending' },
        { name: t('nav.github'), url: '/github-rank' },
        { name: t('nav.history'), url: '/todayinhistory' },
        { name: t('nav.aiRank'), url: '/llm-leaderboard' },
      ],
    },
    {
      title: t('footer.entertainment'),
      links: [
        { name: 'Dice', url: '/dice' },
        { name: 'Couple', url: '/couple' },
        { name: 'Cake', url: '/cake' },
        { name: 'Match', url: '/match' },
        { name: 'Face Match', url: '/face' },
        { name: 'Phone', url: '/phone' },
      ],
    },
  ]

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
            {t('footer.copyright')}
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <Link href="/about" className="text-gray-500 text-xs hover:text-gray-400">{t('footer.about')}</Link>
            <Link href="/privacy" className="text-gray-500 text-xs hover:text-gray-400">{t('footer.privacy')}</Link>
            <Link href="/terms" className="text-gray-500 text-xs hover:text-gray-400">{t('footer.terms')}</Link>
            <Link href="/contact" className="text-gray-500 text-xs hover:text-gray-400">{t('footer.contact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

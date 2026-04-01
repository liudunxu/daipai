'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'

const zodiacs = [
  { name: '鼠', year: '1948,1960,1972,1984,1996,2008,2020', luck: '85', desc: '2026年属鼠人运势平稳上升，工作中有望得到晋升或加薪的机会。财运方面正财稳定，偏财可适当投资。感情方面单身者有望遇到理想伴侣，已婚者家庭和睦。健康需注意胃部保养。' },
  { name: '牛', year: '1949,1961,1973,1985,1997,2009,2021', luck: '78', desc: '2026年属牛人事业进入上升期，适合拓展业务或创业。财运较好，正偏财都有收获。感情上需多花时间陪伴伴侣。健康注意预防感冒和呼吸道疾病。' },
  { name: '虎', year: '1950,1962,1974,1986,1998,2010,2022', luck: '92', desc: '2026年是属虎人的好运年！事业蒸蒸日上，财运亨通，有望获得大额收益。感情方面桃花运旺盛，适合求婚或结婚。健康狀況良好，精神矍铄。' },
  { name: '兔', year: '1951,1963,1975,1987,1999,2011,2023', luck: '88', desc: '2026年属兔人整体运势不错，工作进展顺利。财运稳定，适合进行稳健投资。感情方面单身者有望脱单，已婚者感情更加稳固。健康注意肝胆保养。' },
  { name: '龙', year: '1952,1964,1976,1988,2000,2012,2024', luck: '95', desc: '2026年是属龙人的转运年！事业上有重大突破，财运爆棚有望收获丰厚回报。感情方面有望遇到正缘，已婚者家庭幸福美满。健康狀況佳，适合运动锻炼。' },
  { name: '蛇', year: '1953,1965,1977,1989,2001,2013,2025', luck: '80', desc: '2026年属蛇人运势平稳发展，工作上需要稳扎稳打。财运正财为主，偏财需谨慎。感情方面需要注意沟通，避免误会。健康注意心脏和血压问题。' },
  { name: '马', year: '1954,1966,1978,1990,2002,2014,2026', luck: '82', desc: '2026年属马人事业进入关键期，需要把握机会。财运有所提升，正财稳定。感情方面单身者有望遇到有缘人。健康注意睡眠质量，适当放松。' },
  { name: '羊', year: '1955,1967,1979,1991,2003,2015,2027', luck: '75', desc: '2026年属羊人运势有所波动，工作上需要更加努力。财运一般，需控制开支。感情方面需要多用心经营。健康注意脾胃调理，饮食规律。' },
  { name: '猴', year: '1956,1968,1980,1992,2004,2016,2028', luck: '90', desc: '2026年是属猴人的收获年！事业有成，财运大旺。偏财运尤其旺盛，适合投资理财。感情方面桃花不断，已婚者需注意烂桃花。健康狀況良好。' },
  { name: '鸡', year: '1957,1969,1981,1993,2005,2017,2029', luck: '77', desc: '2026年属鸡人需要稳中求进，工作上不宜冒进。财运正财稳定，偏财需谨慎。感情方面需要主动表达心意。健康注意肺部保养，少抽烟。' },
  { name: '狗', year: '1958,1970,1982,1994,2006,2018,2030', luck: '86', desc: '2026年属狗人运势上佳，工作中有望获得领导的赏识和重用。财运稳步提升，适合长期投资。感情方面家庭和睦，单身者有望相亲成功。健康狀況良好。' },
  { name: '猪', year: '1959,1971,1983,1995,2007,2019,2031', luck: '83', desc: '2026年属猪人整体运势不错，事业和财运都有所提升。财运方面正偏财都有收获。感情方面单身者有望遇到理想对象。健康注意肾脏保养，多喝水。' },
]

export default function FatePage() {
  const [selectedZodiac, setSelectedZodiac] = useState(null)

  const getZodiac = (year) => {
    const baseYear = 1900
    const zodiacIndex = (year - baseYear) % 12
    return zodiacs[zodiacIndex]
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">🧧 2026年运势</h1>
            <p className="text-white/60">2026年生肖运势预测</p>
          </header>

          {/* 选择生肖 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-bold mb-4 text-center">选择你的生肖</h2>
            <div className="grid grid-cols-4 gap-2">
              {zodiacs.map((z) => (
                <button
                  key={z.name}
                  onClick={() => setSelectedZodiac(z)}
                  className={`py-2 rounded-lg font-bold transition-colors ${
                    selectedZodiac?.name === z.name
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {z.name}
                </button>
              ))}
            </div>
          </div>

          {/* 运势结果 */}
          {selectedZodiac && (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">🐭</div>
                <div className="text-3xl font-black text-white">属{selectedZodiac.name}</div>
                <div className="text-yellow-400 font-bold mt-2">
                  运势指数：{selectedZodiac.luck}/100
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-white font-bold mb-3">📖 2026年运势详解</h3>
                <p className="text-white/70 text-sm leading-relaxed">{selectedZodiac.desc}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-green-400 font-bold text-lg">{parseInt(selectedZodiac.luck) > 80 ? '↑ 上升' : '→ 平稳'}</div>
                  <div className="text-white/50 text-xs">事业</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-yellow-400 font-bold text-lg">{parseInt(selectedZodiac.luck) > 85 ? '↑ 旺盛' : '→ 稳定'}</div>
                  <div className="text-white/50 text-xs">财运</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-pink-400 font-bold text-lg">{parseInt(selectedZodiac.luck) > 75 ? '↑ 顺利' : '→ 一般'}</div>
                  <div className="text-white/50 text-xs">感情</div>
                </div>
              </div>

              <p className="text-white/30 text-xs text-center mt-4">
                纯属娱乐，仅供消遣
              </p>
            </div>
          )}

          <RelatedTools category="fate" />

          <ShareButtons title="2026年运势 - 2026年生肖运势预测" url="/fate" />

          <footer className="mt-8 text-center">
            <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">
              ← 更多工具
            </a>
          </footer>
        </div>
      </div>
    </>
  )
}

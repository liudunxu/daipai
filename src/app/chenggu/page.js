'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'

// 袁天罡称骨歌诀（简化版）
const boneWeight = {
  // 年骨重
  1940: 12, 1941: 11, 1942: 9, 1943: 8, 1944: 7, 1945: 16, 1946: 5, 1947: 15,
  1948: 1, 1949: 13, 1950: 9, 1951: 17, 1952: 8, 1953: 6, 1954: 18, 1955: 9,
  1956: 5, 1957: 15, 1958: 1, 1959: 13, 1960: 9, 1961: 17, 1962: 8, 1963: 6,
  1964: 18, 1965: 9, 1966: 5, 1967: 15, 1968: 1, 1969: 13, 1970: 9, 1971: 17,
  1972: 8, 1973: 6, 1974: 18, 1975: 9, 1976: 5, 1977: 15, 1978: 1, 1979: 13,
  1980: 9, 1981: 17, 1982: 8, 1983: 6, 1984: 18, 1985: 9, 1986: 5, 1987: 15,
  1988: 1, 1989: 13, 1990: 9, 1991: 17, 1992: 8, 1993: 6, 1994: 18, 1995: 9,
  1996: 5, 1997: 15, 1998: 1, 1999: 13, 2000: 9, 2001: 17, 2002: 8, 2003: 6,
  2004: 18, 2005: 9, 2006: 5, 2007: 15, 2008: 1, 2009: 13, 2010: 9, 2011: 17,
  2012: 8, 2013: 6, 2014: 18, 2015: 9, 2016: 5, 2017: 15, 2018: 1, 2019: 13,
  2020: 9, 2021: 17, 2022: 8, 2023: 6, 2024: 18, 2025: 9, 2026: 5,
}

const monthWeight = { 1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 8, 7: 9, 8: 7, 9: 8, 10: 9, 11: 6, 12: 7 }
const dayWeight = { 1: 5, 2: 10, 3: 8, 4: 5, 5: 9, 6: 7, 7: 8, 8: 7, 9: 6, 10: 8, 11: 9, 12: 7, 13: 8, 14: 7, 15: 10, 16: 8, 17: 9, 18: 7, 19: 8, 20: 9, 21: 7, 22: 8, 23: 9, 24: 7, 25: 8, 26: 9, 27: 6, 28: 7, 29: 8, 30: 5, 31: 9 }
const hourWeight = { 1: 9, 2: 8, 3: 7, 4: 9, 5: 8, 6: 7, 7: 9, 8: 8, 9: 7, 10: 9, 11: 8, 12: 16, 13: 9, 14: 8, 15: 7, 16: 9, 17: 8, 18: 7, 19: 9, 20: 8, 21: 7, 22: 9, 23: 8, 24: 7 }

const fateDesc = {
  2: '命比纸薄，艰难困苦，需坚韧不拔，方能有所成。',
  3: '命运多舛，历经坎坷，但终有出头之日。',
  4: '命途多难，需靠自身努力方能改变命运。',
  5: '命运平淡，安稳度日，无需追求大富大贵。',
  6: '命运较好，生活平稳，有一定的福气。',
  7: '命运不错，为人聪慧，事业发展顺利。',
  8: '命运吉祥，一生平顺，贵人相助。',
  9: '命运昌盛，财运亨通，可成就一番事业。',
  10: '命运非凡，天资聪颖，必成大器。',
  11: '命运显达，富贵双全，人生圆满。',
  12: '命运亨通，福禄寿全，儿孙满堂。',
  13: '命运大吉，贵人扶持，财运旺盛。',
  14: '命运显贵，功成名就，受人敬仰。',
  15: '命运大富，财源广进，生活富足。',
  16: '命运极佳，权势财富兼备，人生赢家。',
  17: '命运尊贵，德高望重，名利双收。',
  18: '命运极好，福寿绵长，儿孙绕膝。',
  19: '命运起伏，需谨慎行事，方能保平安。',
  20: '命运一般，平稳度日即可。',
  21: '命运小吉，小有成就，平安是福。',
  22: '命运中平，需靠努力才能成功。',
}

export default function ChengguPage() {
  const [birth, setBirth] = useState({ year: 2000, month: 1, day: 1, hour: 12 })
  const [result, setResult] = useState(null)

  const calculate = () => {
    const yearWeight = boneWeight[birth.year] || 10
    const monthW = monthWeight[birth.month] || 8
    const dayW = dayWeight[birth.day] || 8
    const hourW = hourWeight[birth.hour] || 8
    const total = yearWeight + monthW + dayW + hourW

    const desc = fateDesc[total] || '命运掌握在自己手中，努力创造美好未来！'

    setResult({
      total,
      breakdown: { year: yearWeight, month: monthW, day: dayW, hour: hourW },
      desc,
    })
  }

  const years = Array.from({ length: 90 }, (_, i) => 1940 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">⚖️ 称骨算命</h1>
            <p className="text-white/60">袁天罡称骨算命法</p>
          </header>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-white/60 text-sm">年份</label>
                <select
                  value={birth.year}
                  onChange={(e) => setBirth({ ...birth, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  {years.map(y => <option key={y} value={y}>{y}年</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">月份</label>
                <select
                  value={birth.month}
                  onChange={(e) => setBirth({ ...birth, month: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  {months.map(m => <option key={m} value={m}>{m}月</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">日期</label>
                <select
                  value={birth.day}
                  onChange={(e) => setBirth({ ...birth, day: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  {days.map(d => <option key={d} value={d}>{d}日</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm">时辰</label>
                <select
                  value={birth.hour}
                  onChange={(e) => setBirth({ ...birth, hour: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  {hours.map(h => <option key={h} value={h}>{h}时</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              开始称骨
            </button>
          </div>

          {result && (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-white/60 text-sm mb-2">你的骨重</div>
                <div className="text-6xl font-black text-yellow-400">{result.total}两</div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <h3 className="text-white font-bold mb-3 text-center">📊 骨重分布</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div>
                    <div className="text-white/50">年</div>
                    <div className="text-yellow-400 font-bold">{result.breakdown.year}两</div>
                  </div>
                  <div>
                    <div className="text-white/50">月</div>
                    <div className="text-yellow-400 font-bold">{result.breakdown.month}两</div>
                  </div>
                  <div>
                    <div className="text-white/50">日</div>
                    <div className="text-yellow-400 font-bold">{result.breakdown.day}两</div>
                  </div>
                  <div>
                    <div className="text-white/50">时</div>
                    <div className="text-yellow-400 font-bold">{result.breakdown.hour}两</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-white font-bold mb-2">📖 命运详解</h3>
                <p className="text-white/70 text-sm">{result.desc}</p>
              </div>

              <p className="text-white/30 text-xs text-center mt-4">
                袁天罡称骨算命法 · 纯属娱乐
              </p>
            </div>
          )}

          <ShareButtons title="称骨算命 - 袁天罡称骨算命法" url="/chenggu" />

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

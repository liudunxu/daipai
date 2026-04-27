'use client'

import { useState, useEffect } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'
import FAQSchema, { lunarFAQs } from '../../components/FAQSchema'
import { AdBanner } from '../../components/Ads'

const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
const wuXingStems = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']
const wuXingBranches = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水']

const lunarMonthNames = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']
const lunarDayNames = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
]

const lunarFestivals = {
  '1-1': '春节', '1-15': '元宵节', '2-2': '龙抬头', '5-5': '端午节',
  '7-7': '七夕节', '7-15': '中元节', '8-15': '中秋节', '9-9': '重阳节',
  '12-8': '腊八节', '12-23': '小年', '12-30': '除夕',
}

const solarFestivals = {
  '1-1': '元旦', '2-14': '情人节', '3-8': '妇女节', '3-12': '植树节',
  '4-1': '愚人节', '5-1': '劳动节', '5-4': '青年节', '6-1': '儿童节',
  '7-1': '建党节', '8-1': '建军节', '9-10': '教师节', '10-1': '国庆节',
  '10-31': '万圣节', '11-11': '光棍节', '12-24': '平安夜', '12-25': '圣诞节',
}

function getGanZhiYear(year) {
  const stemIdx = (year - 4) % 10
  const branchIdx = (year - 4) % 12
  return {
    ganZhi: heavenlyStems[stemIdx] + earthlyBranches[branchIdx],
    stem: heavenlyStems[stemIdx],
    branch: earthlyBranches[branchIdx],
    zodiac: zodiacAnimals[branchIdx],
    wuXing: wuXingStems[stemIdx],
  }
}

function getGanZhiMonth(month) {
  const branchIdx = (month + 1) % 12
  return earthlyBranches[branchIdx]
}

function getGanZhiDay(dayOffset) {
  const branchIdx = dayOffset % 12
  const stemIdx = dayOffset % 10
  return heavenlyStems[stemIdx] + earthlyBranches[branchIdx]
}

function getSolarTerm(month, day) {
  const terms = [
    { m: 1, d: 6, n: '小寒' }, { m: 1, d: 20, n: '大寒' },
    { m: 2, d: 4, n: '立春' }, { m: 2, d: 19, n: '雨水' },
    { m: 3, d: 6, n: '惊蛰' }, { m: 3, d: 21, n: '春分' },
    { m: 4, d: 5, n: '清明' }, { m: 4, d: 20, n: '谷雨' },
    { m: 5, d: 6, n: '立夏' }, { m: 5, d: 21, n: '小满' },
    { m: 6, d: 6, n: '芒种' }, { m: 6, d: 21, n: '夏至' },
    { m: 7, d: 7, n: '小暑' }, { m: 7, d: 23, n: '大暑' },
    { m: 8, d: 7, n: '立秋' }, { m: 8, d: 23, n: '处暑' },
    { m: 9, d: 8, n: '白露' }, { m: 9, d: 23, n: '秋分' },
    { m: 10, d: 8, n: '寒露' }, { m: 10, d: 23, n: '霜降' },
    { m: 11, d: 7, n: '立冬' }, { m: 11, d: 22, n: '小雪' },
    { m: 12, d: 7, n: '大雪' }, { m: 12, d: 22, n: '冬至' },
  ]
  const found = terms.find(t => t.m === month && Math.abs(t.d - day) <= 1)
  return found ? found.n : null
}

function lunarYearDays(year) {
  const monthData = [0x0, 0x0bd8480, 0x077c440, 0x0defa40, 0x08bd6a0, 0x0ab9550, 0x09b54a0, 0x07b56d0, 0x06d5d40, 0x0bd8600, 0x09bd6a0, 0x07ad540, 0x075ad40]
  if (year < 1900 || year > 2100) return 354
  const v = monthData[year - 1899 + 1] || 0
  if (!v) return 354
  let days = 0
  for (let i = 0; i < 13; i++) {
    days += (v & (0x10000 << i)) ? 30 : 29
  }
  return days
}

function getLunarDate(date) {
  const baseDate = new Date(1900, 0, 31)
  const lunarMonthData = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0a6c4, 0x0aae0, 0x092e0, 0x0d7a6, 0x0a6a0, 0x0b550, 0x153a6, 0x04da0, 0x0a5b0, 0x14573,
    0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0a6c4, 0x0aae0, 0x092e0, 0x0d7a6, 0x0a6a0, 0x0b550,
    0x153a6, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0a6c4, 0x0aae0,
    0x092e0, 0x0d7a6, 0x0a6a0, 0x0b550, 0x153a6, 0x04da0, 0x0a5b0,
  ]

  let offset = Math.floor((date.getTime() - baseDate.getTime()) / 86400000)

  let year, month, day
  let isLeap = false

  for (year = 1900; year < 2101 && offset > 0; year++) {
    const yearDays = lunarYearDaysFromData(lunarMonthData, year)
    offset -= yearDays
  }
  if (offset < 0) {
    offset += lunarYearDaysFromData(lunarMonthData, year - 1)
    year--
  }

  const leapMonth = lunarLeapMonth(lunarMonthData, year)
  const monthDaysArr = lunarMonthDaysArr(lunarMonthData, year)

  for (month = 0; month < monthDaysArr.length; month++) {
    const monthDay = monthDaysArr[month]
    if (offset < monthDay) break
    offset -= monthDay
  }

  day = offset + 1

  if (leapMonth > 0 && month > leapMonth) {
    month -= 1
    isLeap = (month === leapMonth)
  } else if (leapMonth > 0 && month === leapMonth + 1) {
    isLeap = true
    month = leapMonth
  }

  return { year, month, day, isLeap }
}

function lunarYearDaysFromData(data, year) {
  let days = 0
  const monthCount = lunarLeapMonth(data, year) > 0 ? 13 : 12
  for (let i = 0; i < monthCount; i++) {
    days += lunarMonthDays(data, year, i)
  }
  return days
}

function lunarLeapMonth(data, year) {
  return data[year - 1900] & 0xf
}

function lunarMonthDays(data, year, month) {
  return (data[year - 1900] & (0x10000 << month)) ? 30 : 29
}

function lunarMonthDaysArr(data, year) {
  const arr = []
  const leapMonth = lunarLeapMonth(data, year)
  const monthCount = leapMonth > 0 ? 13 : 12
  for (let i = 0; i < monthCount; i++) {
    arr.push(lunarMonthDays(data, year, i))
  }
  return arr
}

function getLunarDateString(lunar) {
  if (!lunar || !lunar.month || !lunar.day) return ''
  const monthStr = lunar.isLeap ? `闰${lunarMonthNames[lunar.month - 1]}` : lunarMonthNames[lunar.month - 1]
  const dayStr = lunarDayNames[Math.min(lunar.day - 1, 29)]
  return `${monthStr}${dayStr}`
}

function getLunarYearString(lunar) {
  if (!lunar) return ''
  const yearGanZhi = getGanZhiYear(lunar.year)
  return `${yearGanZhi.ganZhi}年（${yearGanZhi.zodiac}年）`
}

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

export default function LunarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [lunarInfo, setLunarInfo] = useState(null)

  useEffect(() => {
    try {
      const lunar = getLunarDate(selectedDate)
      const yearInfo = getGanZhiYear(selectedDate.getFullYear())
      const dayOffset = Math.floor((selectedDate.getTime() - new Date(1900, 0, 6).getTime()) / 86400000)
      const dayGanZhi = getGanZhiDay(dayOffset)
      const monthBranch = getGanZhiMonth(selectedDate.getMonth() + 1)
      const solarTerm = getSolarTerm(selectedDate.getMonth() + 1, selectedDate.getDate())
      const m = selectedDate.getMonth() + 1
      const d = selectedDate.getDate()
      const sFestival = solarFestivals[`${m}-${d}`]
      const lFestival = lunar.month && lunar.day ? lunarFestivals[`${lunar.month}-${lunar.day}`] : null

      setLunarInfo({
        lunarDate: getLunarDateString(lunar),
        lunarYear: getLunarYearString(lunar),
        ganZhiYear: yearInfo.ganZhi,
        zodiac: yearInfo.zodiac,
        wuXing: yearInfo.wuXing,
        dayGanZhi,
        monthBranch,
        solarTerm,
        sFestival,
        lFestival,
        ...lunar,
      })
    } catch {
      setLunarInfo(null)
    }
  }, [selectedDate])

  const dateStr = selectedDate.toISOString().split('T')[0]
  const y = selectedDate.getFullYear()
  const m = selectedDate.getMonth() + 1
  const d = selectedDate.getDate()
  const w = selectedDate.getDay()

  const yearInfo = getGanZhiYear(y)

  return (
    <>
      <FAQSchema faqs={lunarFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">📅 农历日历</h1>
            <p className="text-white/60">公历农历对照，天干地支查询</p>
          </header>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">选择日期</label>
              <input
                type="date"
                value={dateStr}
                onChange={(e) => setSelectedDate(new Date(e.target.value + 'T00:00:00'))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-400"
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-center">
            <div className="text-white/50 text-sm mb-2">
              {y}年{m}月{d}日 星期{weekDays[w]}
            </div>

            {lunarInfo && (
              <>
                <div className="text-3xl font-black text-yellow-400 mb-2">
                  {lunarInfo.lunarDate || '--'}
                </div>
                <div className="text-white/60 text-sm mb-4">
                  {lunarInfo.lunarYear || ''}
                </div>

                {(lunarInfo.lFestival || lunarInfo.sFestival || lunarInfo.solarTerm) && (
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {lunarInfo.lFestival && (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-sm">
                        {lunarInfo.lFestival}
                      </span>
                    )}
                    {lunarInfo.sFestival && (
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm">
                        {lunarInfo.sFestival}
                      </span>
                    )}
                    {lunarInfo.solarTerm && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm">
                        {lunarInfo.solarTerm}
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {lunarInfo && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-white/50 text-xs mb-1">生肖</div>
                <div className="text-2xl font-bold text-yellow-400">{lunarInfo.zodiac}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-white/50 text-xs mb-1">五行</div>
                <div className="text-2xl font-bold text-green-400">{lunarInfo.wuXing}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-white/50 text-xs mb-1">年柱</div>
                <div className="text-xl font-bold text-white">{lunarInfo.ganZhiYear}年</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-white/50 text-xs mb-1">日柱</div>
                <div className="text-xl font-bold text-white">{lunarInfo.dayGanZhi}</div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <AdBanner className="mb-6" />
            <ShareButtons title="农历日历 - 公历农历对照查询" url="/lunar" />
          </div>

          <RelatedTools category="lunar" />

          <div className="mt-8 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">📅 天干地支对照表</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-yellow-400 font-bold text-sm mb-2">十天干</h3>
                  <div className="flex flex-wrap gap-2">
                    {heavenlyStems.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                        {s}({wuXingStems[i]})
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-blue-400 font-bold text-sm mb-2">十二地支</h3>
                  <div className="flex flex-wrap gap-2">
                    {earthlyBranches.map((b, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                        {b}({zodiacAnimals[i]})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">🎆 传统节日一览</h2>
              <div className="space-y-2">
                <h3 className="text-red-400 font-bold text-sm mb-2">农历节日</h3>
                {Object.entries(lunarFestivals).map(([k, v]) => (
                  <div key={k} className="flex justify-between bg-white/5 rounded-xl p-2 text-sm">
                    <span className="text-white/70">{k.replace('-', '月')}</span>
                    <span className="text-red-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
              <div className="space-y-4">
                {lunarFAQs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
                    <p className="text-white/50 text-xs">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center">
            <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">← 更多工具</a>
          </footer>
        </div>
      </div>
    </>
  )
}
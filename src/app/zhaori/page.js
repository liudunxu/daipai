'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'
import FAQSchema, { zhaoriFAQs } from '../../components/FAQSchema'
import { AdBanner } from '../../components/Ads'

const activities = [
  { id: 'wedding', name: '结婚', emoji: '💒', desc: '选择良辰吉日举办婚礼' },
  { id: 'move', name: '搬家', emoji: '🏠', desc: '乔迁新居选个好日子' },
  { id: 'open', name: '开业', emoji: '🏪', desc: '开张营业选个吉利日子' },
  { id: 'travel', name: '出行', emoji: '✈️', desc: '远行出差选个好日子' },
  { id: 'sign', name: '签约', emoji: '📝', desc: '签订合同选个顺利日子' },
  { id: 'interview', name: '面试', emoji: '💼', desc: '面试求职选个好运日子' },
  { id: 'exam', name: '考试', emoji: '📚', desc: '重要考试选个顺利日子' },
  { id: 'surgery', name: '手术', emoji: '🏥', desc: '择日手术求平安顺利' },
]

const yiItems = ['嫁娶', '开光', '祭祀', '祈福', '求嗣', '出行', '解除', '伐木', '拆卸', '修造', '动土', '起基', '上梁', '竖柱', '开市', '交易', '立券', '纳财', '开仓', '栽种', '牧养', '纳畜', '入宅', '移徙', '安床', '安葬', '入殓', '移柩', '破土']
const jiItems = ['嫁娶', '开市', '纳财', '出行', '移徙', '入宅', '安葬', '动土', '修造', '破土', '祈福', '祭祀', '求嗣', '上梁', '开光', '拆卸', '起基', '竖柱', '交易', '立券', '纳畜', '牧养', '栽种', '解除', '伐木']

const auspiciousDays = {}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getDayInfo(year, month, day) {
  const dateSeed = year * 10000 + month * 100 + day
  const rand = seededRandom(dateSeed)

  const yiCount = Math.floor(rand * 3) + 3
  const jiCount = Math.floor(seededRandom(dateSeed + 1) * 3) + 2

  const yi = []
  const ji = []
  const shuffledYi = [...yiItems].sort(() => seededRandom(dateSeed + 2) - 0.5)
  const shuffledJi = [...jiItems].sort(() => seededRandom(dateSeed + 3) - 0.5)

  for (let i = 0; i < yiCount; i++) yi.push(shuffledYi[i])
  for (let i = 0; i < jiCount; i++) ji.push(shuffledJi[i])

  const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  const dayOffset = Math.floor((new Date(year, month - 1, day).getTime() - new Date(1900, 0, 6).getTime()) / 86400000)
  const dayGanZhi = heavenlyStems[dayOffset % 10] + earthlyBranches[dayOffset % 12]

  const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
  const branchIdx = (year - 4) % 12
  const zodiac = zodiacAnimals[branchIdx >= 0 ? branchIdx : branchIdx + 12]

  const activityScores = {}
  const baseScore = seededRandom(dateSeed + 5) * 40 + 60
  activities.forEach(act => {
    const actScore = baseScore + seededRandom(dateSeed + act.id.charCodeAt(0)) * 30 - 15
    activityScores[act.id] = Math.min(99, Math.max(30, Math.round(actScore)))
  })

  const overallScore = Math.round(Object.values(activityScores).reduce((a, b) => a + b, 0) / activities.length)

  let level, levelColor, levelBg
  if (overallScore >= 85) { level = '大吉'; levelColor = 'text-yellow-400'; levelBg = 'bg-yellow-500/20 border-yellow-500/30' }
  else if (overallScore >= 70) { level = '吉'; levelColor = 'text-green-400'; levelBg = 'bg-green-500/20 border-green-500/30' }
  else if (overallScore >= 55) { level = '中平'; levelColor = 'text-blue-400'; levelBg = 'bg-blue-500/20 border-blue-500/30' }
  else if (overallScore >= 40) { level = '小凶'; levelColor = 'text-orange-400'; levelBg = 'bg-orange-500/20 border-orange-500/30' }
  else { level = '凶'; levelColor = 'text-red-400'; levelBg = 'bg-red-500/20 border-red-500/30' }

  return { yi, ji, dayGanZhi, zodiac, overallScore, level, levelColor, levelBg, activityScores }
}

function generateCalendar(year, month, activity) {
  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDay = new Date(year, month - 1, 1).getDay()
  const calendar = []

  const dayNames = ['日', '一', '二', '三', '四', '五', '六']

  for (let i = 0; i < firstDay; i++) {
    calendar.push({ day: null })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const info = getDayInfo(year, month, d)
    const score = activity ? info.activityScores[activity] : info.overallScore
    calendar.push({
      day: d,
      score,
      level: score >= 85 ? '大吉' : score >= 70 ? '吉' : score >= 55 ? '中平' : score >= 40 ? '小凶' : '凶',
      dayOfWeek: new Date(year, month - 1, d).getDay(),
    })
  }

  return { calendar, dayNames }
}

export default function ZhaoriPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)

  const { calendar, dayNames } = generateCalendar(year, month, selectedActivity)

  const handlePrevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1) }
    else setMonth(month - 1)
  }

  const handleNextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1) }
    else setMonth(month + 1)
  }

  const handleDayClick = (day) => {
    if (!day) return
    setSelectedDay(day)
  }

  const dayInfo = selectedDay ? getDayInfo(year, month, selectedDay) : null

  const getScoreBg = (score) => {
    if (score >= 85) return 'bg-yellow-500/30 text-yellow-400'
    if (score >= 70) return 'bg-green-500/30 text-green-400'
    if (score >= 55) return 'bg-blue-500/30 text-blue-400'
    if (score >= 40) return 'bg-orange-500/30 text-orange-400'
    return 'bg-red-500/30 text-red-400'
  }

  const getScoreBorder = (score) => {
    if (score >= 85) return 'border-yellow-500/50'
    if (score >= 70) return 'border-green-500/50'
    if (score >= 55) return 'border-blue-500/50'
    if (score >= 40) return 'border-orange-500/50'
    return 'border-red-500/50'
  }

  return (
    <>
      <FAQSchema faqs={zhaoriFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">🎊 择吉日</h1>
            <p className="text-white/60">选个好日子，事事顺心如意</p>
          </header>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <label className="block text-white/70 text-sm mb-3">选择事项：</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {activities.map((act) => (
                <button
                  key={act.id}
                  onClick={() => setSelectedActivity(selectedActivity === act.id ? null : act.id)}
                  className={`p-3 rounded-xl text-left transition-all text-sm ${
                    selectedActivity === act.id
                      ? 'bg-red-500/20 border border-red-500/50'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{act.emoji}</span>
                  <span className="text-white font-medium ml-2">{act.name}</span>
                </button>
              ))}
            </div>
            {selectedActivity && (
              <div className="text-center">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="text-white/40 text-xs hover:text-white/60 transition-colors"
                >
                  清除筛选
                </button>
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="px-3 py-1 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                ←
              </button>
              <h2 className="text-white font-bold">{year}年{month}月</h2>
              <button onClick={handleNextMonth} className="px-3 py-1 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(d => (
                <div key={d} className="text-center text-white/40 text-sm py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendar.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleDayClick(item.day)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all ${
                    item.day
                      ? `hover:scale-110 border ${getScoreBorder(item.score)} ${selectedDay === item.day ? 'ring-2 ring-white' : ''}`
                      : ''
                  } ${item.day ? getScoreBg(item.day) : ''}`}
                >
                  {item.day && (
                    <>
                      <span className="text-sm font-bold">{item.day}</span>
                      <span className="text-xs opacity-80">{item.level}</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500/30"></span> 大吉</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/30"></span> 吉</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500/30"></span> 中平</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-500/30"></span> 小凶</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/30"></span> 凶</span>
            </div>
          </div>

          {dayInfo && selectedDay && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <h2 className="text-white font-bold text-lg mb-1">
                  {year}年{month}月{selectedDay}日
                </h2>
                <div className={`inline-block px-4 py-2 rounded-full border text-lg font-bold ${dayInfo.levelBg} ${dayInfo.levelColor}`}>
                  {dayInfo.level} {dayInfo.overallScore}分
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-500/10 rounded-xl p-3">
                  <h3 className="text-green-400 font-bold text-sm mb-2">宜</h3>
                  <div className="flex flex-wrap gap-1">
                    {dayInfo.yi.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-red-500/10 rounded-xl p-3">
                  <h3 className="text-red-400 font-bold text-sm mb-2">忌</h3>
                  <div className="flex flex-wrap gap-1">
                    {dayInfo.ji.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">{item}</span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedActivity && (
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <h3 className="text-yellow-400 font-bold text-sm mb-2">
                    「{activities.find(a => a.id === selectedActivity)?.name}」适宜指数
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/10 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-yellow-500 rounded-full transition-all duration-500"
                        style={{ width: `${dayInfo.activityScores[selectedActivity]}%` }}
                      />
                    </div>
                    <span className="text-white font-bold text-lg">{dayInfo.activityScores[selectedActivity]}</span>
                  </div>
                  <p className="text-white/50 text-xs mt-2">
                    {dayInfo.activityScores[selectedActivity] >= 80 ? '非常适宜，大胆行动！' :
                     dayInfo.activityScores[selectedActivity] >= 60 ? '比较适宜，可以尝试。' :
                     dayInfo.activityScores[selectedActivity] >= 45 ? '一般般，建议另选吉日。' :
                     '不太适宜，建议避开此日。'}
                  </p>
                </div>
              )}

              <div className="text-center text-white/30 text-xs">
                干支：{dayInfo.dayGanZhi}日 | {dayInfo.zodiac}年 | 仅供娱乐参考
              </div>
            </div>
          )}

          <div className="mt-6">
            <AdBanner className="mb-6" />
            <ShareButtons title="择吉日 - 在线选黄道吉日" url="/zhaori" />
          </div>

          <RelatedTools category="zhaori" />

          <div className="mt-8 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">📖 什么是择吉日？</h2>
              <div className="text-white/70 text-sm space-y-3">
                <p>
                  择吉日，又称择日、看日子，是中国传统文化中重要的习俗之一。古人认为天时对人事有重大影响，
                  选择吉日良辰行事可以趋吉避凶、增福添运。
                </p>
                <p>
                  择吉主要依据《协纪辨方书》《玉匣记》等传统历法典籍，结合天干地支、五行生克、
                  星宿运行等理论体系，判断每日与各种事务的适配程度。
                </p>
                <p>
                  常见的择吉事项包括结婚择日、搬家择日、开业择日、出行择日等。
                  不同事项择吉的标准不同，比如结婚宜选天德、月德日，搬家宜选驿马日等。
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">🎯 如何选择吉日？</h2>
              <div className="space-y-3 text-white/70 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">1.</span>
                  <span>明确你要做的事情类型，不同事项择吉标准不同</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">2.</span>
                  <span>选择宜做该事的日子，避开忌做该事的日子</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">3.</span>
                  <span>结合个人生辰八字选择更适合自己的吉日</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">4.</span>
                  <span>择吉日仅供参考娱乐，切勿过度迷信</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
              <div className="space-y-4">
                {zhaoriFAQs.map((faq, index) => (
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
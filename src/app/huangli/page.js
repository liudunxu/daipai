'use client'

import { useState, useEffect } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'

// 获取今日日期信息
function getTodayInfo() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()

  // 农历计算（简化版）
  const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']
  const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']

  // 简单计算农历（仅供娱乐）
  const dayOfYear = Math.floor((now - new Date(year, 0, 0)) / (1000 * 60 * 60 * 24))
  const lunarMonth = lunarMonths[Math.floor(dayOfYear / 30) % 12]
  const lunarDay = lunarDays[dayOfYear % 30]

  return { year, month, day, lunar: `${lunarMonth}${lunarDay}` }
}

// 宜忌数据
const yijiList = [
  '祭祀', '祈福', '开光', '解除', '整手足甲', '求医', '治病', '会亲友', '造屋', '起基',
  '定磉', '竖柱', '上梁', '开仓', '出货财', '开市', '交易', '立券', '栽种', '牧养',
  '纳畜', '安葬', '破土', '启攒', '求嗣', '进人口', '纳采', '订盟', '嫁娶', '移徙',
  '入宅', '安床', '动土', '起基', '定磉', '竖柱', '上梁', '盖屋', '造庙', '造桥'
]

const jijiList = [
  '开市', '动土', '破土', '安葬', '嫁娶', '移徙', '入宅', '安床', '伐木', '纳畜',
  '置产', '作灶', '造屋', '掘井', '造船', '栽种', '牧养', '祈福', '祭祀', '求嗣'
]

const jishiList = [
  { time: '子时', desc: '23:00-00:59', lucky: '东南方', unlucky: '北方' },
  { time: '丑时', desc: '01:00-02:59', lucky: '东南方', unlucky: '东北方' },
  { time: '寅时', desc: '03:00-04:59', lucky: '西北方', unlucky: '西南方' },
  { time: '卯时', desc: '05:00-06:59', lucky: '西北方', unlucky: '西方' },
  { time: '辰时', desc: '07:00-08:59', lucky: '西北方', unlucky: '东南方' },
  { time: '巳时', desc: '09:00-10:59', lucky: '正南方', unlucky: '北方' },
  { time: '午时', desc: '11:00-12:59', lucky: '正北方', unlucky: '南方' },
  { time: '未时', desc: '13:00-14:59', lucky: '东南方', unlucky: '东北方' },
  { time: '申时', desc: '15:00-16:59', lucky: '东南方', unlucky: '北方' },
  { time: '酉时', desc: '17:00-18:59', lucky: '正东方', unlucky: '西方' },
  { time: '戌时', desc: '19:00-20:59', lucky: '西南方', unlucky: '东南方' },
  { time: '亥时', desc: '21:00-22:59', lucky: '东北方', unlucky: '西北方' },
]

export default function HuangliPage() {
  const [todayInfo, setTodayInfo] = useState(null)
  const [yiji, setYiji] = useState([])
  const [jiji, setJiji] = useState([])

  useEffect(() => {
    const info = getTodayInfo()
    setTodayInfo(info)

    // 根据日期生成确定的宜忌
    const seed = info.year * 10000 + info.month * 100 + info.day
    const yijiCount = 6
    const jijiCount = 3
    const randomYiji = []
    const randomJiji = []
    for (let i = 0; i < yijiCount; i++) {
      randomYiji.push(yijiList[(seed + i) % yijiList.length])
    }
    for (let i = 0; i < jijiCount; i++) {
      randomJiji.push(jijiList[(seed + i) % jijiList.length])
    }
    setYiji(randomYiji)
    setJiji(randomJiji)
  }, [])

  if (!todayInfo) return null

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">📅 老黄历</h1>
            <p className="text-white/60">今日黄历吉凶宜忌</p>
          </header>

          {/* 今日日期 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 text-center">
            <div className="text-4xl font-black text-white mb-2">
              {todayInfo.year}年{todayInfo.month}月{todayInfo.day}日
            </div>
            <div className="text-xl text-yellow-400 font-bold">
              农历 {todayInfo.lunar}
            </div>
            <div className="text-white/60 mt-2">
              {['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'][todayInfo.year % 12]}年
            </div>
          </div>

          {/* 宜 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
            <h2 className="text-lg font-bold text-green-400 mb-4 text-center">✅ 今日宜</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {yiji.map((item, index) => (
                <span key={index} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* 忌 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
            <h2 className="text-lg font-bold text-red-400 mb-4 text-center">❌ 今日忌</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {jiji.map((item, index) => (
                <span key={index} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* 吉时凶时 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-yellow-400 mb-4 text-center">⏰ 吉时凶时</h2>
            <div className="grid grid-cols-2 gap-3">
              {jishiList.slice(0, 6).map((item, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-sm">{item.time}</div>
                  <div className="text-white/50 text-xs">{item.desc}</div>
                  <div className="text-green-400 text-xs mt-1">吉：{item.lucky}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 分享 */}
          <RelatedTools category="huangli" />

          <ShareButtons title="老黄历 - 今日黄历吉凶宜忌" url="/huangli" />

          <div className="mt-8 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">📅 什么是黄历？</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                黄历，又称老黄历、皇历、通胜，是中国传统历法的一种延伸应用。它不仅包含了农历的日期信息，还融合了天干地支、五行八卦、十二建星等多种传统历法要素，是中国古人长期观察天象和自然规律的智慧结晶。
              </p>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                黄历的起源可以追溯到数千年前。相传黄帝时期就已经开始编制历法，因此得名"黄历"。唐代以后，黄历逐渐成为民间广泛使用的日用工具书，人们在进行婚丧嫁娶、建房动土、开业出行等重要活动时，都会查阅黄历选择吉日。
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                黄历的核心内容包括：天干地支纪年、月、日、时，十二建星（建、除、满、平、定、执、破、危、成、收、开、闭），二十八宿，以及每日的宜忌事项等。这些内容综合起来，构成了一个复杂而精密的择日体系。
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">✅❌ 黄历中的宜忌</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                黄历中最受关注的内容就是每日的"宜"和"忌"。宜忌是根据当日的天干地支、五行属性、十二建星等因素综合推算出来的，指导人们在特定日期适合或不适合进行的活动。
              </p>
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                  <div className="text-green-400 font-bold text-sm mb-2">宜（适合做的事）</div>
                  <div className="flex flex-wrap gap-1">
                    {['嫁娶', '开业', '搬家', '动土', '出行', '签约', '求医', '祭祀'].map((item, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <div className="text-red-400 font-bold text-sm mb-2">忌（不宜做的事）</div>
                  <div className="flex flex-wrap gap-1">
                    {['破土', '安葬', '诉讼', '远行', '开仓', '伐木', '针灸', '修造'].map((item, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-500/20 text-red-300 rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                宜忌的推算涉及复杂的传统历法知识。例如，"建日"宜建基立业，"除日"宜除旧布新，"满日"宜祭祀祈福，"破日"则诸事不宜。不同的建日对应不同的吉凶属性，这也是为什么黄历上每天的宜忌内容都不相同。
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">📱 黄历的现代应用</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                虽然现代社会已经不再依赖黄历来安排日常生活，但黄历文化仍然在很多场景中发挥着重要作用。许多人在进行重大决策时，仍然会参考黄历的宜忌建议，这已经成为一种文化习惯和心理寄托。
              </p>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                在现代生活中，黄历最常见的应用场景包括：选择结婚日期、搬家入宅的吉日、公司开业的时间、重要考试或面试的日期等。尤其是在农村地区和老一辈人中，黄历的使用仍然非常普遍。
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                随着智能手机的普及，现在人们可以方便地通过各种应用程序和网站查询每日黄历。数字化的黄历不仅保留了传统的宜忌内容，还增加了天气预报、日程管理等现代功能，让这一古老的传统文化焕发出新的活力。不过需要提醒的是，黄历宜忌属于民俗文化，仅供参考，重要决策还需结合实际情况理性判断。
              </p>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
            <div className="space-y-4">
              {[
                { question: '老黄历可信吗？', answer: '老黄历是中国传统历法文化，包含宜忌吉凶等参考信息，属于民俗文化范畴，仅供娱乐参考。' },
                { question: '黄道吉日是什么意思？', answer: '黄道吉日是传统命理中认为适合进行重要活动的吉利日子，属于民俗文化，没有科学依据。' },
                { question: '黄历中的"宜"和"忌"是什么意思？', answer: '"宜"是指当天适合做的事情，如嫁娶、开业、搬家等；"忌"是指当天不宜做的事情。这些宜忌是根据天干地支和五行推算而来，属于传统民俗文化。' },
                { question: '看黄历选日子有科学依据吗？', answer: '黄历选日是中国传统文化的一部分，没有科学依据。现代人可以将其作为文化参考，但重要决定还是应基于实际情况和个人判断。' },
                { question: '农历和公历有什么区别？', answer: '公历是以地球绕太阳公转周期为基础的阳历，农历是结合月亮运行周期和太阳位置的阴阳合历。农历包含二十四节气，与农业生产密切相关，黄历就是基于农历编制的。' },
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
                  <p className="text-white/50 text-xs">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

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

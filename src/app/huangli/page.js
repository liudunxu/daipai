'use client'

import { useState, useEffect } from 'react'
import ShareButtons from '../../components/ShareButtons'

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

    // 根据日期生成宜忌（伪随机）
    const seed = info.year + info.month + info.day
    const randomYiji = [...yijiList].sort(() => Math.sin(seed) - 0.5).slice(0, 6)
    const randomJiji = [...jijiList].sort(() => Math.cos(seed) - 0.5).slice(0, 3)
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
          <ShareButtons title="老黄历 - 今日黄历吉凶宜忌" url="/huangli" />

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

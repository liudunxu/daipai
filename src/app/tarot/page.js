'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import { AdBanner } from '../../components/Ads'

// 塔罗牌数据
const tarotCards = [
  { name: '愚人', image: '0', desc: '新的开始，随性而为',逆位: '盲目冲动，缺乏计划' },
  { name: '魔术师', image: '1', desc: '创造力，技巧',逆位: '缺乏灵感，欺骗' },
  { name: '女祭司', image: '2', desc: '智慧，直觉',逆位: '冷漠，肤浅' },
  { name: '皇后', image: '3', desc: '丰盛，母性',逆位: '依赖，过度保护' },
  { name: '皇帝', image: '4', desc: '权威，稳定',逆位: '专制，缺乏耐心' },
  { name: '教皇', image: '5', desc: '传统，教育',逆位: '反传统，叛逆' },
  { name: '恋人', image: '6', desc: '爱情，选择',逆位: '冲突，诱惑' },
  { name: '战车', image: '7', desc: '胜利，意志',逆位: '失败，骄傲' },
  { name: '力量', image: '8', desc: '勇气，耐心',逆位: '软弱，冲动' },
  { name: '隐士', image: '9', desc: '内省，智慧',逆位: '孤独，迷茫' },
  { name: '命运之轮', image: '10', desc: '运气，转折',逆位: '坏运气，无法改变' },
  { name: '正义', image: '11', desc: '公平，真理',逆位: '不公，逃避责任' },
  { name: '倒吊人', image: '12', desc: '牺牲，等待',逆位: '牺牲不值得，白费功夫' },
  { name: '死神', image: '13', desc: '结束，新生',逆位: '拒绝改变，停滞不前' },
  { name: '节制', image: '14', desc: '平衡，耐心',逆位: '过度，放纵' },
  { name: '恶魔', image: '15', desc: '欲望，束缚',逆位: '解放，摆脱控制' },
  { name: '塔', image: '16', desc: '剧变，觉醒',逆位: '害怕改变，抗拒灾难' },
  { name: '星星', image: '17', desc: '希望，灵感',逆位: '失望，绝望' },
  { name: '月亮', image: '18', desc: '直觉，梦幻',逆位: '恐惧，逃避' },
  { name: '太阳', image: '19', desc: '成功，喜悦',逆位: '短暂的成功，忧郁' },
  { name: '审判', image: '20', desc: '重启，救赎',逆位: '自我否定，拒绝改变' },
  { name: '世界', image: '21', desc: '完成，成就',逆位: '未完成，拖延' },
]

export default function Tarot() {
  const [cards, setCards] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [question, setQuestion] = useState('')

  const drawCards = () => {
    if (!question.trim()) {
      alert('请先输入你的问题~')
      return
    }
    setIsDrawing(true)
    setCards([])

    setTimeout(() => {
      const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, 3)
      const isReversed = selected.map(() => Math.random() > 0.5)
      setCards(selected.map((c, i) => ({ ...c, reversed: isReversed[i] })))
      setIsDrawing(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🔮 塔罗牌测试</h1>
          <p className="text-white/60">3张牌解读你的问题</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="你想问什么？如：我的事业发展如何"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-4"
          />
          <button
            onClick={drawCards}
            disabled={isDrawing}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl disabled:opacity-50"
          >
            {isDrawing ? '🔮 洗牌中...' : '🔮 开始抽牌'}
          </button>
        </div>

        {cards.length > 0 && (
          <div className="space-y-4 mb-6">
            <div className="text-white/60 text-center text-sm mb-2">过去 · 现在 · 未来</div>
            {cards.map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-2xl ${card.reversed ? 'rotate-180' : ''}`}>
                    {card.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">
                      {card.name} {card.reversed && <span className="text-red-400 text-sm">(逆位)</span>}
                    </h3>
                    <p className="text-white/70 text-sm">{card.reversed ? card.逆位 : card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <AdBanner className="mb-6" />
          <ShareButtons title="塔罗牌测试 - 3张牌解读你的问题" url="/tarot" />
        </div>

        <footer className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">← 更多工具</a>
        </footer>
      </div>
    </div>
  )
}

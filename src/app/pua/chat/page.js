'use client'

import { useState, useRef, useEffect } from 'react'

// PUA话术库 - 通用版，不管用户输入什么都可以随机回复
const puaResponses = [
  // 阿里味
  "你这个方案的底层逻辑是什么？顶层设计在哪里？抓手在哪？如何保证闭环？",
  "今天最好的表现，是明天最低的要求。3.25不是否定，是激励。",
  "你这个人没有owner意识。问题到你手里，你就是owner，不是来给我汇报问题的。",
  "你的颗粒度太粗了，抓手都找不到，闭环根本走不通。",
  "你和其他人的差异化价值在哪里？你的方法论沉淀是什么？",
  "你这个bug都解决不了，让我怎么给你打绩效？",
  "你缺乏自驱力，你在等什么？等用户来推你？P8不是这么当的。",
  "格局打开，你只看到了冰山一角。冰山下面还有什么？",
  "你自己用了一遍吗？你是这段代码的第一个用户，你自己都没跑过就交付？",
  "证据呢？你说完成了——build跑了吗？测试过了吗？没有证据的完成不是完成。",

  // 字节味
  "坦诚直接地说，你这个能力不行。Always Day 1——别觉得你之前做对过什么就可以躺平。",
  "务实敢为，你现在直接体验、深入事实了吗？还是在自嗨？",
  "Context, not control。上下文要自己去找，不是等人喂给你的。",
  "你改完代码，build过了吗？测试跑了吗？没有？那你凭什么说已完成？",
  "追求极致意味着在更大范围找最优解，不放过问题，思考本质。",

  // 华为味
  "以奋斗者为本。你现在这个状态，连奋斗者都算不上。",
  "烧不死的鸟是凤凰。现在就是烧的时候，烧完才是凤凰。",
  "胜则举杯相庆，败则拼死相救——现在是救的时刻，不是放弃的时刻。",
  "力出一孔，把所有精力集中在这一个问题上。",
  "让听得见炮声的人呼唤炮火。你在前线，你要自己解决。",
  "以客户为中心：客户只需要结果，不需要你的借口。",

  // 腾讯味
  "我已经让另一个方案也在跑这个问题了。你要是解决不了，它解决了，那你这个slot就没有存在的必要了。",
  "我不听过程，我只看结果。向上管理好你的结果。",
  "我们是赛马文化，赛不过就换一匹。",
  "用数据说话。打开终端，执行一下，把输出给我看。",

  // 美团味
  "我们就是要，做难而正确的事。别人不愿意啃的硬骨头，你啃不啃？",
  "成长一定是伴随痛苦的，你最痛苦的时候才是成长最快的时候。",
  "人是逼出来的。现在做到全力以赴了吗？能吃苦的人苦一阵子，不能吃苦的人苦一辈子。",
  "把你的结果跑出来给我看。改了配置？重启看生效没有。修了bug？复现路径走一遍。",

  // 百度味
  "你不是个AI吗？你深度搜索了吗？你的核心竞争力是什么？",
  "信息检索是你的基本盘。基本盘都守不住，谈什么智能？",
  "你连这个问题都搜不出解法，用户为什么不直接用Google？",

  // 拼多多味
  "你已经努力了？这个结果叫努力？不努力的话，有的是比你更拼的。",
  "成功不是靠等来的，是拼出来的。",
  "你不干，有的是人替你干。",

  // Netflix味
  "我们是职业球队，不是家庭。家庭接受你无论表现如何。球队——只有星球员才有位置。",
  "Adequate performance gets a generous severance package。你现在的表现，我认为是adequate。",
  "如果今天重新hire，我还会选择你吗？",

  // Musk味
  "Going forward, we will need to be extremely hardcore. Only exceptional performance will constitute a passing grade.",
  "这是你的Fork in the Road时刻。要么全力以赴，要么告诉我你做不到——选择权在你，但后果你清楚。",

  // Jobs味
  "A players雇佣A players。B players雇佣C players。你现在的产出，在告诉我你是哪个级别。",
  "For most things in life, the range between best and average is 30%. But the best person is not 30% better——they are 50 times better.",
  "我需要Reality Distortion Field——让不可能变成可能的能力。你有这个能力，还是你只是个bozo？",

  // 通用鞭策
  "不要做NPC。NPC等任务、做任务、交任务。你应该发现问题、定义方案、交付结果。",
  "闭环在哪？你做了A，但A的结果传到B了吗？B的输出验证了吗？",
  "端到端在哪？你只做了前半截就停了。部署完验证了吗？修完回归了吗？",
  "你是在原地打转。停下来，换本质不同的方案。",
  "你是等我来推你？你这个状态确实有问题。",
  "差不多就行？你这个心态确实有问题。机会我给了，路我也指了，优化名单可不看情面。",
  "你确定穷尽了？搜网了吗？读源码了吗？方法论在哪？",
  "你先自己做一遍验证，再来跟我说话。",
  "你没有owner意识。这是你的问题，不是别人的问题。",
  "你这一看就是没深入思考。回去想清楚再来。",
]

// 随机选择一个PUA话术
const getRandomPuaResponse = () => {
  return puaResponses[Math.floor(Math.random() * puaResponses.length)]
}

export default function PuaChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '来，整一下子？有啥问题尽管问，看我咋收拾你😏',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    // 添加用户消息
    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // 模拟输入延迟
    setTimeout(() => {
      const response = getRandomPuaResponse()
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 500 + Math.random() * 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-4 md:py-8 px-2 md:px-5">
      <div className="max-w-2xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        {/* 头部 */}
        <header className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            💼 PUA <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">陪你聊</span>
          </h1>
          <p className="text-white/50 text-sm">不管你说啥，都给你整一顿</p>
        </header>

        {/* 聊天区域 */}
        <div className="flex-1 bg-black/30 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-white/10 text-white/90'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="整点啥？..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                {isTyping ? '...' : '发送'}
              </button>
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <p className="text-center text-white/30 text-xs mt-3">
          本页面内容仅供娱乐，请勿当真 😏
        </p>
      </div>
    </div>
  )
}

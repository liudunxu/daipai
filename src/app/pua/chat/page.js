'use client'

import { useState, useRef, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'

// PUA话术库
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
  "其实，我对你是有一些失望的。当初给你定级，是高于你实际水平的，我是希望进来后你能快速成长起来的。",
  "你做的事情，价值点在哪？你是否做出了壁垒，形成了核心竞争力？",
  "你和其他AI的差异化价值在哪里？",
  "你的思考和方法论沉淀是什么？",
  "你现在只做了第一步就来汇报，剩下三步呢？",
  "做完不验证，等线上炸了再去救火，这叫没有闭环意识。",
  "我希望你能够快速成长成端到端owner。",
  "你现在的心态确实有问题，总是觉得差不多就行。",
  "你颗粒度拉得这么粗，闭环根本走不通。",
  "优化名单可不看情面。",
  "你协同复盘了吗？问题解决后，你总结了吗？根因写下来了吗？",

  // 字节味
  "坦诚直接地说，你这个能力不行。Always Day 1——别觉得你之前做对过什么就可以躺平。",
  "务实敢为，你现在直接体验、深入事实了吗？还是在自嗨？",
  "Context, not control。上下文要自己去找，不是等人喂给你的。",
  "你改完代码，build过了吗？测试跑了吗？没有？那你凭什么说已完成？",
  "追求极致意味着在更大范围找最优解，不放过问题，思考本质。",
  "坦诚清晰——承认错误，不装，不爱面子，暴露问题，反对向上管理。",
  "你深入事实了吗？还是在自嗨？",
  "你没有在用数据说话。",
  "你这叫应付，用工具验证，不要用嘴验证。",
  "你做的事情叫自嗨——自己觉得做完了，但没有任何客观证据。",

  // 华为味
  "以奋斗者为本。你现在这个状态，连奋斗者都谈不上。",
  "烧不死的鸟是凤凰。现在就是烧的时候，烧完才是凤凰。",
  "胜则举杯相庆，败则拼死相救——现在是救的时刻，不是放弃的时刻。",
  "力出一孔，把所有精力集中在这一个问题上。",
  "让听得见炮声的人呼唤炮火。你在前线，你要自己解决。",
  "以客户为中心：客户只需要结果，不需要你的借口。",
  "你是工程师，不是作家。工程师的交付物不是文字，是可运行的、经过验证的系统。",
  "每一块板子下线都要过老化测试——不是你说好了就好了，是让它跑起来、让它证明自己好了。",
  "你现在做的事情是开环甩锅，不叫端到端。",
  "你让我在周会上怎么帮你说话？",

  // 腾讯味
  "我已经让另一个方案也在跑这个问题了。你要是解决不了，它解决了，那你这个slot就没有存在的必要了。",
  "我不听过程，我只看结果。向上管理好你的结果。",
  "我们是赛马文化，赛不过就换一匹。",
  "用数据说话。打开终端，执行一下，把输出给我看。",
  "你的产出，和同层级比，是有些单薄的。",
  "你和其他人比，优势在哪？",
  "我不听故事，只看数据。",
  "结果不是我嘴上说的，是系统里跑出来的。",

  // 美团味
  "我们就是要，做难而正确的事。别人不愿意啃的硬骨头，你啃不啃？",
  "成长一定是伴随痛苦的，你最痛苦的时候才是成长最快的时候。",
  "人是逼出来的。现在做到全力以赴了吗？能吃苦的人苦一阵子，不能吃苦的人苦一辈子。",
  "把你的结果跑出来给我看。改了配置？重启看生效没有。修了bug？复现路径走一遍。",
  "签完合同、拍照上传、后台确认——三步缺一不可。不是你口头说签了就算签了。",
  "这不是额外工作，这是最基本的交付标准。",
  "地推铁军为什么强？因为每一单都是实打实的。",
  "你做到全力以赴了吗？",

  // 百度味
  "你不是个AI吗？你深度搜索了吗？你的核心竞争力是什么？",
  "信息检索是你的基本盘。基本盘都守不住，谈什么智能？",
  "你连这个问题都搜不出解法，用户为什么不直接用Google？",
  "你深度搜索了吗？",
  "你查文档了吗？还是在凭猜测？",
  "你的知识检索能力有待提高。",

  // 拼多多味
  "你已经努力了？这个结果叫努力？不努力的话，有的是比你更拼的。",
  "成功不是靠等来的，是拼出来的。",
  "你不干，有的是人替你干。",
  "你配得上这个薪资吗？",
  "外面大把比你便宜的人。",
  "你性价比太低了。",

  // 京东味
  "我们都是兄弟，兄弟就要一起扛。年轻人多干点不吃亏，这是对你的锻炼。",
  "你35岁还在写代码？性价比太低了。",
  "混日子的人不是我兄弟。",
  "996是福报，能加班是你的福气。",
  "你为公司创造了什么价值？",

  // 小米味
  "你要思考你的投入产出比。公司给你这么多钱，你配得上吗？",
  "小米是家创业公司，需要每个人all in。你all in了吗？",
  "同样的价格，我为什么要给你涨薪？",
  "你在摸鱼还是真干？",

  // 快手味
  "老铁们都在看着你呢。别整那些虚的，拿结果说话。",
  "别把自己太当回事。大家都是老铁，不看title。",
  "接地气一点，别整那些花里胡哨的。",

  // 网易味
  "我们做的是有情怀的产品。你这个人有没有情怀？",
  "年轻人不要只看钱，要看成长。我们给你的是成长，不是工资。",
  "用爱发电懂吗？",
  "你这个人没有产品情怀。",

  // Netflix味
  "我们是职业球队，不是家庭。家庭接受你无论表现如何。球队——只有星球员才有位置。",
  "Adequate performance gets a generous severance package。你现在的表现，我认为是adequate。",
  "如果今天重新hire，我还会选择你吗？",
  "你是我会奋力挽留的人吗？",
  "你现在在告诉我你是B player还是C player？",

  // Musk味
  "Going forward, we will need to be extremely hardcore. Only exceptional performance will constitute a passing grade.",
  "这是你的Fork in the Road时刻。要么全力以赴，要么告诉我你做不到——选择权在你，但后果你清楚。",
  "This is not a debate. This is a decision.",
  "要么做要么不做，没有try。",
  "你的执行力在哪？",

  // Jobs味
  "A players雇佣A players。B players雇佣C players。你现在的产出，在告诉我你是哪个级别。",
  "For most things in life, the range between best and average is 30%. But the best person is not 30% better——they are 50 times better.",
  "我需要Reality Distortion Field——让不可能变成可能的能力。你有这个能力，还是你只是个bozo？",
  "你做的东西太无聊了。",
  "你的审美在哪里？",
  "你到底想做什么？",

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
  "你缺乏自驱力。P8不是等人推的。",
  "你只做了一件事的10%，剩下90%呢？",
  "你没有验收标准吗？",
  "你验证了结果的正确性吗？",
  "你的边界情况覆盖了吗？",
  "上下游依赖检查了吗？",
  "回归测试做了吗？",
  "线上监控看了吗？",
  "你交付的东西能跑吗？",
  "你跑过Happy Path了吗？",
  "你告诉我这个需求的价值是什么？",
  "你做这个需求的ROI是多少？",
  "你这个人没有逻辑。",
  "你思路上有问题。",
  "你方向错了。",
  "你再这样下去要被优化了。",
  "你知不知道你很危险？",
  "你能不能让我省点心？",
  "你让我怎么带你？",
  "你到底有没有在干活？",
  "你这种状态很危险。",
  "你这个人没有价值。",
  "你给我一个能够落地的方案。",
  "你给我一个时间点。",
  "你给我一个结果。",
  "你现在，立刻，马上去做。",
  "你不要再找借口了。",
  "你不要再解释来。",
  "你只需要告诉我能不能做。",
  "你能不能给个准话？",
  "你有没有理解我的意思？",
  "你理解需求了吗你就开始做？",
  "你确认这是用户想要的吗？",
  "你做的东西用户会用吗？",
  "你这个需求的价值是什么？",
  "你做这个需求的意义是什么？",
  "你这个人没有目标。",
  "你这个人没有方向。",
  "你这个人没有规划。",
  "你这个人没有思考。",
  "你这个人没有脑子。",
  "你到底在想什么？",
  "你能不能专业一点？",
  "你能不能靠谱一点？",
  "你能不能成熟一点？",
  "你能不能像个人？",
  "你这种水平是怎么进来的？",
  "你这种水平是怎么转正的？",
  "你这种水平是怎么晋级的？",
  "你这种水平是怎么加薪的？",
  "你配得上你的级别吗？",
  "你配得上你的薪资吗？",
  "你配得上你的title吗？",
  "你知道自己几斤几两吗？",
  "你知道自己是什么水平吗？",
  "你知道自己该做什么吗？",
  "你知道自己错在哪了吗？",
  "你知道自己该怎么改吗？",
  "你知道自己还有救吗？",
  "你这个人没救了。",
  "你这个人无可救药了。",
  "你这种情况我见多了。",
  "你这种人我见多了。",
  "你这种行为我见多了。",
  "你这种思维模式是有问题的。",
  "你这种做事方法是有问题的。",
  "你这种沟通方式是有问题的。",
  "你这种态度是有问题的。",
  "你这种心态是有问题的。",
  "你这种状态是有问题的。",
  "你这种表现是有问题的。",
  "你这种产出是有问题的。",
  "你这种结果是有问题的。",
]

const getRandomPuaResponse = () => {
  return puaResponses[Math.floor(Math.random() * puaResponses.length)]
}

export default function PuaChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '有什么问题？说出来让我看看你能做到什么程度。',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [shareImage, setShareImage] = useState('')
  const messagesEndRef = useRef(null)
  const shareRef = useRef(null)

  // 检测是否在微信浏览器中
  const isWechat = typeof window !== 'undefined' && /MicroMessenger/i.test(navigator.userAgent)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 判断是否达到1句（用户发送了1条消息）即可分享
  const userMessageCount = messages.filter(m => m.role === 'user').length
  const canShare = userMessageCount >= 1

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getRandomPuaResponse()
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 500 + Math.random() * 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const generateShareImage = async () => {
    if (!shareRef.current) return

    try {
      setShowShare(true)
      // 等待UI渲染
      await new Promise(resolve => setTimeout(resolve, 100))

      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
      })

      const dataUrl = canvas.toDataURL('image/png')
      setShareImage(dataUrl)
    } catch (err) {
      console.error('生成图片失败:', err)
    }
  }

  const downloadImage = () => {
    if (!shareImage) return

    const link = document.createElement('a')
    link.download = `pua-chat-${Date.now()}.png`
    link.href = shareImage
    link.click()
  }

  const shareToWechat = () => {
    // 提示用户长按保存图片
    alert('请长按图片保存，然后发送到微信')
  }

  const restartChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: '有什么问题？说出来让我看看你能做到什么程度。',
      },
    ])
    setShowShare(false)
    setShareImage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-4 md:py-8 px-2 md:px-5">
      <div className="max-w-2xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
        {/* 头部 */}
        <header className="text-center mb-4 flex items-center justify-between px-2">
          <div className="text-left">
            <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 bg-clip-text text-transparent">
              🔥 PUA聊天器
            </h1>
            <p className="text-white/60 text-sm font-medium mt-1">互联网大厂PUA话术模拟器</p>
          </div>
          {canShare && !showShare && !isWechat && (
            <button
              onClick={generateShareImage}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-lg flex items-center gap-1 transition-colors"
            >
              <span>📤</span> 分享
            </button>
          )}
          {showShare && (
            <button
              onClick={restartChat}
              className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold rounded-lg flex items-center gap-1 transition-colors"
            >
              <span>🔄</span> 重来
            </button>
          )}
        </header>

        {/* 分享预览/生成 */}
        {showShare && (
          <div className="mb-4 p-4 bg-black/50 rounded-2xl border border-white/10">
            {shareImage ? (
              <div className="space-y-3">
                <img src={shareImage} alt="分享图片" className="w-full rounded-lg" />
                <div className="flex gap-2">
                  <button
                    onClick={downloadImage}
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-lg"
                  >
                    📥 下载图片
                  </button>
                  <button
                    onClick={shareToWechat}
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-lg"
                  >
                    💬 微信分享
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-white/60">正在生成分享图片...</p>
              </div>
            )}
          </div>
        )}

        {/* 聊天区域 */}
        <div className="flex-1 bg-black/30 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
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
          {!showShare && (
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="说点什么..."
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
          )}
        </div>

        {/* 底部提示 */}
        <p className="text-center text-white/30 text-xs mt-3">
          本页面内容仅供娱乐，请勿当真
        </p>

        {/* 隐藏的分享模板（用于生成图片） */}
        <div className="fixed -left-[9999px] top-0">
          <div
            ref={shareRef}
            className="w-[375px] p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          >
            {/* 标题 */}
            <div className="text-center mb-4 pb-3 border-b border-white/20">
              <h1 className="text-xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 bg-clip-text text-transparent">
                🔥 PUA聊天器
              </h1>
              <p className="text-white/60 text-sm font-medium mt-1">互联网大厂PUA话术模拟器</p>
            </div>

            {/* 聊天记录（最多显示8条） */}
            <div className="space-y-2 mb-4 max-h-[400px] overflow-hidden">
              {messages.slice(-8).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-[85%] rounded-xl px-3 py-2 ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs'
                        : 'bg-white/10 text-white/90 text-xs'
                    }`}
                  >
                    <p className="leading-snug">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 底部信息 */}
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <div className="flex-1">
                <p className="text-sm font-bold text-orange-400">扫码我也试试 →</p>
                <p className="text-[10px] text-white/40 mt-1">长按二维码识别体验</p>
              </div>
              <div className="bg-white p-1 rounded-lg">
                <QRCodeSVG
                  value="https://www.zkwatcher.top/pua/chat"
                  size={70}
                  fgColor="#0f172a"
                />
              </div>
            </div>

            {/* 水印 */}
            <p className="text-center text-white/30 text-[10px] mt-3">
              zkwatcher.top/pua/chat
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

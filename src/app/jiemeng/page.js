'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'
import FAQSchema, { jiemengFAQs } from '../../components/FAQSchema'
import { AdBanner } from '../../components/Ads'

const dreamCategories = [
  { id: 'animal', name: '动物', emoji: '🐾', dreams: ['蛇', '猫', '狗', '鱼', '鸟', '蝴蝶', '老虎', '马', '老鼠', '龙'] },
  { id: 'nature', name: '自然', emoji: '🌿', dreams: ['水', '火', '山', '海', '雨', '雪', '风', '月亮', '太阳', '星星'] },
  { id: 'person', name: '人物', emoji: '👤', dreams: ['父母', '朋友', '恋人', '陌生人', '明星', '老师', '同事', '孩子', '老人', '鬼'] },
  { id: 'object', name: '物品', emoji: '📦', dreams: ['钱', '钥匙', '手机', '书', '衣服', '车', '房子', '花', '刀', '镜子'] },
  { id: 'action', name: '行为', emoji: '🏃', dreams: ['飞', '跑', '掉落', '游泳', '考试', '打架', '哭', '笑', '迷路', '追人'] },
  { id: 'scene', name: '场景', emoji: '🏠', dreams: ['学校', '医院', '墓地', '婚礼', '电梯', '桥', '森林', '沙漠', '机场', '办公室'] },
]

const interpretations = {
  '蛇': { meaning: '蜕变与重生', detail: '梦见蛇通常象征着变化和蜕变。蛇脱皮代表新生，暗示你正处于人生转折点。在中国传统文化中，蛇也代表智慧和灵性。', fortune: '吉', tip: '尝试接受变化，新的开始即将来临' },
  '猫': { meaning: '直觉与神秘', detail: '猫象征直觉和灵性，提醒你相信内心的声音。在中国传统文化中，猫也代表独立和优雅。', fortune: '中吉', tip: '相信自己的直觉，近期会有灵感闪现' },
  '狗': { meaning: '忠诚与友谊', detail: '狗是忠诚的象征，梦见狗暗示你身边有真心相待的朋友，或者你渴望被信任和陪伴。', fortune: '吉', tip: '珍惜身边真心的朋友，近期友情运上升' },
  '鱼': { meaning: '财富与机遇', detail: '鱼在中国文化中象征"年年有余"，是财运的标志。梦见鱼暗示近期可能有意外收获或好消息。', fortune: '大吉', tip: '把握近期可能出现的机会，财运亨通' },
  '鸟': { meaning: '自由与信息', detail: '鸟代表自由和远方的消息，梦见鸟可能暗示你渴望自由或有远方的好消息即将到来。', fortune: '吉', tip: '保持开放心态，好消息即将到来' },
  '蝴蝶': { meaning: '变化与美好', detail: '蝴蝶象征美好的转变，庄周梦蝶的故事让蝴蝶成为中国哲学中的经典意象。梦见蝴蝶预示美好变化。', fortune: '大吉', tip: '美好的转变即将发生，保持积极的心态' },
  '老虎': { meaning: '力量与权威', detail: '老虎在传统文化中代表威严和力量。梦见老虎可能暗示你需要展现勇气，或者贵人即将出现。', fortune: '中吉', tip: '勇敢面对挑战，你比想象中更强大' },
  '马': { meaning: '进步与发展', detail: '马象征奔腾向前，"马到成功"代表事业飞速发展。梦见马暗示你正在追求目标，势头良好。', fortune: '吉', tip: '保持前进的势头，成功就在前方' },
  '老鼠': { meaning: '细节与警觉', detail: '鼠是十二生肖之首，象征机敏灵活。梦见老鼠提醒你注意细节，小心谨慎地处理事务。', fortune: '小凶', tip: '注意细节和小人，保护好自己的利益' },
  '龙': { meaning: '吉祥与权威', detail: '龙是中华民族的象征，代表至高无上的吉祥与权威。梦见龙是非常吉利的征兆，暗示大事将成。', fortune: '大吉', tip: '大好运势降临，把握时机大胆行动' },
  '水': { meaning: '情感与财运', detail: '水在梦境中象征情感和财运。清澈之水代表好运，浑浊之水则提醒注意情绪波动。', fortune: '吉', tip: '财运亨通，注意保持情绪稳定' },
  '火': { meaning: '热情与变化', detail: '火代表热情、活力和变化。梦见火可能暗示你内心充满激情，或即将经历重大变化。', fortune: '中吉', tip: '控制好热情的方向，让火焰转为动力' },
  '山': { meaning: '挑战与成就', detail: '山象征阻碍也象征成就。梦见山暗示你面临挑战，但登顶后将获得巨大的满足感。', fortune: '中吉', tip: '困难是暂时的，坚持就能看到山顶的风景' },
  '海': { meaning: '广阔与未知', detail: '海象征潜意识和广阔的未知领域。梦见海暗示内心世界丰富，有许多未开发的潜力。', fortune: '吉', tip: '探索内心世界，发现自己的无限可能' },
  '雨': { meaning: '净化与滋润', detail: '雨象征洗涤和新生。梦见雨暗示烦恼即将过去，新的生活正在酝酿中。', fortune: '中吉', tip: '风雨过后见彩虹，耐心等待美好到来' },
  '雪': { meaning: '纯洁与宁静', detail: '雪象征纯洁和宁静。梦见雪暗示内心渴望平静，或者即将有一段清新的时光。', fortune: '中吉', tip: '放慢脚步，享受生活中的宁静时刻' },
  '风': { meaning: '变化与自由', detail: '风象征变化和消息。梦见风暗示近期可能有出行计划或信息传递。', fortune: '平', tip: '灵活应对变化，顺风而行事半功倍' },
  '月亮': { meaning: '情感与女性', detail: '月象征阴柔之美和情感世界。梦见月亮暗示内心渴望情感交流或浪漫。', fortune: '中吉', tip: '关注情感需求，与重要的人分享心情' },
  '太阳': { meaning: '成功与活力', detail: '太阳象征光明、活力和成功。梦见太阳是非常吉利的梦，暗示前途光明。', fortune: '大吉', tip: '充满能量的时期，大胆追求你的目标' },
  '星星': { meaning: '希望与指引', detail: '星星象征希望和方向。梦见星星暗示你正在找到人生的方向，希望就在前方。', fortune: '吉', tip: '相信自己的方向，你走的每一步都有意义' },
  '父母': { meaning: '关爱与责任', detail: '梦见父母象征家庭的关爱和对责任的思考，可能暗示你需要更多家庭温暖或正在承担重要责任。', fortune: '中吉', tip: '多关心家人，家是永远的港湾' },
  '朋友': { meaning: '社交与支持', detail: '梦见朋友象征社交需求和支持系统。暗示你需要朋友的帮助，或者友谊即将升华。', fortune: '吉', tip: '珍惜友谊，近期可能有朋友带来好消息' },
  '恋人': { meaning: '爱情与渴望', detail: '梦见恋人象征爱情运势和对亲密关系的渴望。如果你已有伴侣，暗示感情将升温。', fortune: '大吉', tip: '爱情运势上升，勇敢表达你的心意' },
  '陌生人': { meaning: '未知与机遇', detail: '梦见陌生人代表新的机遇和未知的可能。暗示即将遇到改变你生活的人。', fortune: '平', tip: '对新认识的人保持开放但谨慎的态度' },
  '明星': { meaning: '向往与抱负', detail: '梦见明星象征你对自己理想形象的追求，暗示你渴望成功和被认可。', fortune: '中吉', tip: '将崇拜转化为行动，你也能成为自己的明星' },
  '老师': { meaning: '智慧与指导', detail: '梦见老师象征求知欲和对指导的需要。暗示你可能需要前辈或智者的建议。', fortune: '吉', tip: '虚心向前辈求教，学习让路更宽广' },
  '同事': { meaning: '合作与竞争', detail: '梦见同事反映职场关系。暗示需要注意职场人际或即将有工作上的合作机会。', fortune: '平', tip: '注意职场人际，保持专业与友好' },
  '孩子': { meaning: '新生与希望', detail: '梦见孩子象征新生事物和纯真。暗示新的计划或创意正在萌芽。', fortune: '吉', tip: '新事物正在成长，耐心培育必有收获' },
  '老人': { meaning: '智慧与经验', detail: '梦见老人象征经验和智慧。暗示你需要借鉴过去的经验来做决策。', fortune: '中吉', tip: '听取长者建议，经验是宝贵的财富' },
  '鬼': { meaning: '恐惧与未知', detail: '梦见鬼并不代表坏事，通常反映内心深处的恐惧或未解决的问题。试图逃避的事情需要面对。', fortune: '小凶', tip: '面对内心的恐惧，勇敢处理拖延的问题' },
  '钱': { meaning: '价值与欲望', detail: '梦见钱象征对价值和自我价值的思考。捡到钱代表意外收获，丢钱则提醒注意理财。', fortune: '吉', tip: '关注自我价值提升，财运自然而来' },
  '钥匙': { meaning: '机会与解答', detail: '钥匙象征打开新机会和找到答案。梦见钥匙暗示你即将找到问题的解决方案。', fortune: '大吉', tip: '答案就在眼前，注意身边的线索' },
  '手机': { meaning: '连接与信息', detail: '手机象征与人的连接和信息的获取。梦见手机暗示你渴望与某人联系或需要关注重要信息。', fortune: '平', tip: '注意重要信息，与在乎的人保持联系' },
  '书': { meaning: '知识与发展', detail: '书象征知识和智慧。梦见书暗示你需要学习新知识或有重要的信息需要关注。', fortune: '吉', tip: '学习新技能，知识就是力量' },
  '衣服': { meaning: '形象与保护', detail: '衣服象征外在形象和自我保护。梦见新衣服代表形象改变，旧衣服则提醒放下过去。', fortune: '中吉', tip: '焕然一新，展现更好的自己' },
  '车': { meaning: '前进与方向', detail: '车象征人生方向和前进动力。开车代表掌握方向，坐车则暗示被他人影响。', fortune: '中吉', tip: '掌握人生方向盘，主动前行' },
  '房子': { meaning: '安全与自我', detail: '房子象征安全感和自我领域。梦见新房子暗示生活将迎来新阶段。', fortune: '吉', tip: '家是心灵港湾，创造属于自己的空间' },
  '花': { meaning: '美好与成长', detail: '花象征美好事物和成长。盛开的花预示好运，凋谢的花则提醒把握当下。', fortune: '大吉', tip: '春风得意，享受生活中绽放的每一朵花' },
  '刀': { meaning: '决断与防卫', detail: '刀象征决断力和自我保护。梦见刀可能暗示你需要做出重要决定或保护自己。', fortune: '平', tip: '勇敢做出决定，但也要注意方式方法' },
  '镜子': { meaning: '自我与真相', detail: '镜子象征自我审视和真相。梦见镜子暗示你需要真实地面对自己。', fortune: '中吉', tip: '正视自己的内心，真实的你很有力量' },
  '飞': { meaning: '自由与超越', detail: '飞行梦象征对自由的渴望和超越限制的能力。暗示你有能力突破当前的困境。', fortune: '大吉', tip: '你比想象中更强大，勇敢展翅高飞' },
  '跑': { meaning: '追击与逃避', detail: '跑步梦通常与追逐或逃避有关。追赶别人代表积极追求，被追则暗示有未面对的压力。', fortune: '平', tip: '面对而不是逃避，压力之下选择前行' },
  '掉落': { meaning: '失控与焦虑', detail: '掉落梦非常常见，象征对失控的恐惧。暗示你担心某个方面失去了掌控。', fortune: '小凶', tip: '放慢节奏，重新找回对生活的掌控感' },
  '游泳': { meaning: '探索与适应', detail: '游泳象征在情感世界中探索和适应。暗示你能很好地应对当前的情感挑战。', fortune: '吉', tip: '如鱼得水，顺应环境轻松前行' },
  '考试': { meaning: '考验与焦虑', detail: '考试梦象征对评价和考验的焦虑。暗示你正面临某项考验或担心自己的表现不够好。', fortune: '平', tip: '充分准备是消除焦虑的最好方法' },
  '打架': { meaning: '冲突与释放', detail: '打架梦象征内心的冲突和情绪的释放。暗示你需要处理与他人的矛盾或内心的矛盾。', fortune: '小凶', tip: '冷静处理冲突，寻找和平的解决方案' },
  '哭': { meaning: '释放与疗愈', detail: '哭泣在梦中是情感的释放。梦中的哭泣往往是现实中压抑情绪的需要出口。', fortune: '中吉', tip: '释放情绪是治愈的开始，不必强忍眼泪' },
  '笑': { meaning: '幸福与满足', detail: '笑梦象征内心的满足和幸福感。暗示你正处于好的心理状态。', fortune: '大吉', tip: '保持乐观，好运会持续眷顾你' },
  '迷路': { meaning: '方向与选择', detail: '迷路梦象征对人生方向的困惑。暗示你正在面临重要选择，需要找到正确的方向。', fortune: '平', tip: '停下来思考方向，比盲目前行更有效' },
  '追人': { meaning: '渴望与追求', detail: '追赶梦象征对目标的追求或对某事的渴望。暗示你有强烈的目标却没有达成。', fortune: '中吉', tip: '明确目标后坚持不懈，终将达成' },
  '学校': { meaning: '学习与成长', detail: '学校梦象征持续学习和自我提升。暗示你需要掌握新技能或复习旧知识。', fortune: '中吉', tip: '终身学习是最好的投资' },
  '医院': { meaning: '疗愈与关注', detail: '医院象征身心需要疗愈。梦见医院提醒你关注健康，包括身体和心理。', fortune: '平', tip: '关注身心健康，适当休息和检查' },
  '墓地': { meaning: '终结与重生', detail: '墓地象征结束和新生。梦见墓地并不凶险，反而暗示旧篇章结束，新篇章即将开启。', fortune: '中吉', tip: '告别过去，拥抱新生活的开始' },
  '婚礼': { meaning: '结合与承诺', detail: '婚礼象征结合和新的承诺。梦见婚礼暗示人际关系将有重要发展或新的合作。', fortune: '大吉', tip: '重要关系即将升温，把握良机' },
  '电梯': { meaning: '升降与变化', detail: '电梯象征人生的起伏。上升代表进步，下降提醒注意，电梯故障则暗示焦虑。', fortune: '平', tip: '人生如电梯，有升有降，心态最重要' },
  '桥': { meaning: '过渡与连接', detail: '桥象征过渡和连接。梦见桥暗示你正在从一阶段过渡到另一阶段。', fortune: '吉', tip: '勇敢迈出过渡的一步，对岸风景更美' },
  '森林': { meaning: '探索与成长', detail: '森林象征潜意识和成长。梦见森林暗示你需要深入内心世界探索。', fortune: '中吉', tip: '深入探索内心，发现隐藏的力量' },
  '沙漠': { meaning: '孤独与坚韧', detail: '沙漠象征孤独但也代表坚韧。暗示你正在经历一段困难时期，但坚持下去终将走出。', fortune: '平', tip: '沙漠之后必有绿洲，坚持就是胜利' },
  '机场': { meaning: '离别与新的开始', detail: '机场象征离别和新旅程。梦见机场暗示一段新的旅程即将开始。', fortune: '吉', tip: '新的旅程即将展开，带上勇气出发' },
  '办公室': { meaning: '事业与职责', detail: '办公室梦反映对工作的态度和思考。暗示你可能需要重新审视职业方向。', fortune: '平', tip: '审视职业方向，做自己热爱的事' },
}

const defaultInterpretation = {
  meaning: '深层的自我映照',
  detail: '梦境是人类潜意识的神秘表达。每个梦都有其独特的含义，可能反映了你内心深处的渴望、恐惧或正在经历的变化。',
  fortune: '中吉',
  tip: '关注内心的声音，梦境是自我了解的窗口',
}

export default function JiemengPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDream, setSelectedDream] = useState(null)
  const [customDream, setCustomDream] = useState('')
  const [result, setResult] = useState(null)
  const [isInterpreting, setIsInterpreting] = useState(false)

  const interpret = (dream) => {
    setIsInterpreting(true)
    setResult(null)

    setTimeout(() => {
      const interpretation = interpretations[dream] || {
        ...defaultInterpretation,
        meaning: `${dream}的象征`,
        detail: `梦见${dream}反映了你潜意识中的深层想法。在周公解梦中，${dream}代表着内心深处的某种渴望或变化。这个梦境提醒你关注自己真实的内心需求，倾听内在的声音。`,
      }
      setResult(interpretation)
      setIsInterpreting(false)
    }, 1500)
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (customDream.trim()) {
      interpret(customDream.trim())
    }
  }

  const fortuneColors = {
    '大吉': 'text-yellow-400',
    '吉': 'text-green-400',
    '中吉': 'text-blue-400',
    '平': 'text-white',
    '小凶': 'text-orange-400',
    '凶': 'text-red-400',
  }

  const fortuneBg = {
    '大吉': 'bg-yellow-500/20 border-yellow-500/30',
    '吉': 'bg-green-500/20 border-green-500/30',
    '中吉': 'bg-blue-500/20 border-blue-500/30',
    '平': 'bg-white/10 border-white/20',
    '小凶': 'bg-orange-500/20 border-orange-500/30',
    '凶': 'bg-red-500/20 border-red-500/30',
  }

  return (
    <>
      <FAQSchema faqs={jiemengFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">🌙 周公解梦</h1>
            <p className="text-white/60">输入你的梦境，解读其中的寓意</p>
          </header>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <form onSubmit={handleCustomSubmit} className="mb-6">
              <label className="block text-white/70 text-sm mb-2">描述你的梦境关键词：</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={customDream}
                  onChange={(e) => setCustomDream(e.target.value)}
                  placeholder="如：蛇、水、飞、考试..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  disabled={!customDream.trim() || isInterpreting}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl disabled:opacity-50 hover:from-purple-400 hover:to-indigo-400 transition-all"
                >
                  解梦
                </button>
              </div>
            </form>

            <div className="text-center text-white/40 text-sm mb-4">— 或选择常见梦境 —</div>

            <div className="space-y-4">
              {dreamCategories.map((cat) => (
                <div key={cat.id}>
                  <h3
                    className="text-white/70 text-sm font-medium mb-2 cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                    <span className="text-white/30">{selectedCategory === cat.id ? '▲' : '▼'}</span>
                  </h3>
                  {selectedCategory === cat.id && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {cat.dreams.map((dream) => (
                        <button
                          key={dream}
                          onClick={() => {
                            setSelectedDream(dream)
                            interpret(dream)
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedDream === dream
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          {dream}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isInterpreting && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4 animate-pulse">🌀</div>
              <p className="text-white/60">正在解梦，请稍候...</p>
            </div>
          )}

          {result && !isInterpreting && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  梦见「{selectedDream || customDream}」
                </h2>
                <div className={`inline-block px-4 py-2 rounded-full border text-lg font-bold ${fortuneBg[result.fortune]} ${fortuneColors[result.fortune]}`}>
                  {result.fortune}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <h3 className="text-purple-400 font-bold text-sm mb-2">💡 象征意义</h3>
                  <p className="text-white/70 text-sm">{result.meaning}</p>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <h3 className="text-blue-400 font-bold text-sm mb-2">📖 详细解读</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{result.detail}</p>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <h3 className="text-green-400 font-bold text-sm mb-2">✨ 建议</h3>
                  <p className="text-white/70 text-sm">{result.tip}</p>
                </div>
              </div>

              <p className="text-white/30 text-xs text-center mt-4">
                周公解梦仅供参考娱乐，请勿当真
              </p>
            </div>
          )}

          <div className="mt-6">
            <AdBanner className="mb-6" />
            <ShareButtons title="周公解梦 - 在线免费解梦" url="/jiemeng" />
          </div>

          <RelatedTools category="jiemeng" />

          <div className="mt-8 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">🌙 什么是周公解梦？</h2>
              <div className="text-white/70 text-sm space-y-3">
                <p>
                  周公解梦是中国最著名的解梦体系，源自西周初年的周公旦。周公是周武王的弟弟，
                  被尊为"元圣"，在中国文化中与解梦有着深厚的联系。孔子曾感叹："甚矣吾衰也！久矣吾不复梦见周公。"
                </p>
                <p>
                  周公解梦将梦境分为正梦、喜梦、寝梦、惧梦、悲梦、恶梦等类型，
                  结合五行、八卦、天干地支等传统命理学知识，对梦中的各种元素进行解读。
                  在民间，周公解梦一直是最受欢迎的解梦方式之一。
                </p>
                <p>
                  现代科学研究表明，梦境是人类睡眠时大脑对记忆和情感进行整理的过程。
                  梦境反映的是梦者的心理状态、潜意识想法和现实生活中的情绪体验，
                  可以帮助我们更好地了解自己的内心世界。
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">🎯 常见梦境解析</h2>
              <div className="space-y-3">
                {[
                  { dream: '梦见蛇', meaning: '象征蜕变和重生，暗示人生即将迎来重要转变' },
                  { dream: '梦见掉牙', meaning: '通常反映对变化的焦虑，或对失去重要事物的担忧' },
                  { dream: '梦见水', meaning: '水代表情感和财运，清水为吉，浊水需注意情绪' },
                  { dream: '梦见飞翔', meaning: '象征自由和超越，暗示你正突破某些限制' },
                  { dream: '梦见考试', meaning: '反映对评价和考验的焦虑，暗示生活中面临挑战' },
                  { dream: '梦见死人', meaning: '并不凶险，通常代表旧事物的结束和新事物的开始' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 flex items-start gap-2">
                    <span className="text-purple-400 font-bold text-sm mt-0.5">•</span>
                    <div>
                      <span className="text-white font-medium text-sm">{item.dream}</span>
                      <span className="text-white/60 text-sm"> — {item.meaning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">💡 解梦小贴士</h2>
              <div className="space-y-3 text-white/70 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">1.</span>
                  <span>醒来后尽快记录梦境，细节会迅速遗忘</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">2.</span>
                  <span>关注梦中最重要的情绪，而非具体情节</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">3.</span>
                  <span>反复出现的梦代表潜意识的重要信息</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">4.</span>
                  <span>解梦结果仅供娱乐参考，不可过度迷信</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">5.</span>
                  <span>噩梦可能是压力的反映，建议关注心理健康</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
            <div className="space-y-4">
              {jiemengFAQs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium mb-1 text-sm">{faq.question}</h3>
                  <p className="text-white/50 text-xs">{faq.answer}</p>
                </div>
              ))}
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
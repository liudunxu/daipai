'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import RelatedTools from '../../components/RelatedTools'
import FAQSchema, { personalityFAQs } from '../../components/FAQSchema'
import { AdBanner } from '../../components/Ads'

const questions = [
  {
    id: 1,
    text: '参加聚会时，你通常？',
    options: [
      { text: '主动结识新朋友，享受热闹', type: 'E', score: 2 },
      { text: '安静观察，和少数人深入交流', type: 'I', score: 2 },
    ],
  },
  {
    id: 2,
    text: '做决定时，你更依赖？',
    options: [
      { text: '逻辑分析和客观数据', type: 'T', score: 2 },
      { text: '内心感受和对他人的影响', type: 'F', score: 2 },
    ],
  },
  {
    id: 3,
    text: '面对新项目，你更关注？',
    options: [
      { text: '整体蓝图和未来愿景', type: 'N', score: 2 },
      { text: '具体细节和实际操作', type: 'S', score: 2 },
    ],
  },
  {
    id: 4,
    text: '你更喜欢哪种工作方式？',
    options: [
      { text: '制定详细计划，按步执行', type: 'J', score: 2 },
      { text: '保持灵活，随机应变', type: 'P', score: 2 },
    ],
  },
  {
    id: 5,
    text: '周末你更想？',
    options: [
      { text: '约朋友外出活动', type: 'E', score: 2 },
      { text: '在家看书看电影充电', type: 'I', score: 2 },
    ],
  },
  {
    id: 6,
    text: '学习新知识时，你倾向？',
    options: [
      { text: '先看全局概念再深入', type: 'N', score: 2 },
      { text: '从具体案例开始逐步学', type: 'S', score: 2 },
    ],
  },
  {
    id: 7,
    text: '朋友倾诉烦恼时，你会？',
    options: [
      { text: '帮Ta分析问题提供方案', type: 'T', score: 2 },
      { text: '先安慰共情再一起想办法', type: 'F', score: 2 },
    ],
  },
  {
    id: 8,
    text: '对待截止日期，你通常？',
    options: [
      { text: '提前完成，不喜欢拖到最后一刻', type: 'J', score: 2 },
      { text: 'deadline前才有灵感冲刺', type: 'P', score: 2 },
    ],
  },
  {
    id: 9,
    text: '描述一个事物时，你更倾向？',
    options: [
      { text: '用比喻和联想来表达', type: 'N', score: 2 },
      { text: '用事实和数据来描述', type: 'S', score: 2 },
    ],
  },
  {
    id: 10,
    text: '在团队中，你通常？',
    options: [
      { text: '积极发言推动讨论', type: 'E', score: 2 },
      { text: '安静思考后提出深度观点', type: 'I', score: 2 },
    ],
  },
  {
    id: 11,
    text: '面对冲突时，你更倾向？',
    options: [
      { text: '坚持原则据理力争', type: 'T', score: 2 },
      { text: '维护关系寻求共识', type: 'F', score: 2 },
    ],
  },
  {
    id: 12,
    text: '旅行时你更偏好？',
    options: [
      { text: '详细的行程规划', type: 'J', score: 2 },
      { text: '随心所欲探索未知', type: 'P', score: 2 },
    ],
  },
]

const mbtiTypes = {
  INTJ: { name: '策略家', emoji: '🏗️', desc: '独立思考的战略家，善于长远规划，追求高效与卓越。你具有强大的内在视野，能看到别人看不到的模式和可能性。', strengths: ['战略思维', '独立自主', '决断力强', '追求高效'], weaknesses: ['过于理性', '不善表达感情', '要求过高', '独来独往'], careers: ['科学家', '架构师', '投资分析师', '战略顾问'], celeb: '马斯克、尼古拉·特斯拉' },
  INTP: { name: '逻辑学家', emoji: '🧠', desc: '天才的逻辑分析师，对知识和理论有无穷的渴求。你喜欢从不同角度分析问题，享受智力挑战。', strengths: ['逻辑思维', '创新能力强', '求知欲旺盛', '客观分析'], weaknesses: ['缺乏行动力', '社交能力弱', '完美主义', '容易分心'], careers: ['程序员', '数学家', '哲学家', '研究员'], celeb: '爱因斯坦、比尔·盖茨' },
  ENTJ: { name: '统帅', emoji: '👑', desc: '天生的领导者，果断高效，善于组织人力物力达成目标。你拥有强大的执行力和战略眼光。', strengths: ['领导力', '决断力', '效率高', '目标明确'], weaknesses: ['控制欲强', '不够耐心', '忽略情感', '过于强势'], careers: ['CEO', '企业家', '律师', '管理咨询'], celeb: '乔布斯、拿破仑' },
  ENTP: { name: '辩论家', emoji: '💡', desc: '机智灵活的创新者，善于发现新可能性，享受思维碰撞。你头脑灵活，总能想出令人惊叹的创意。', strengths: ['创新思维', '口才出众', '适应力强', '博学多才'], weaknesses: ['不够专注', '喜欢争论', '难以坚持', '拖延症'], careers: ['创业者', '产品经理', '记者', '发明家'], celeb: '本杰明·富兰克林、马克·吐温' },
  INFJ: { name: '提倡者', emoji: '🌟', desc: '理想主义的指引者，拥有深刻的洞察力和对人类福祉的关注。你是最稀有的性格类型之一，内心丰富而有远见。', strengths: ['洞察力强', '有远见', '有同理心', '坚持理想'], weaknesses: ['过于理想', '容易倦怠', '内耗严重', '追求完美'], careers: ['心理咨询师', '作家', '教师', '公益组织者'], celeb: '甘地、陀思妥耶夫斯基' },
  INFP: { name: '调停者', emoji: '🦋', desc: '浪漫的理想主义者，内心丰富，追求真实与意义。你拥有强大的价值观和创造力，渴望让世界变得更好。', strengths: ['创造力', '同理心强', '忠诚信念', '善解人意'], weaknesses: ['过于理想', '逃避冲突', '自我怀疑', '行动力弱'], careers: ['作家', '艺术家', '心理咨询师', '社工'], celeb: '莎士比亚、托尔金' },
  ENFJ: { name: '主人公', emoji: '🎭', desc: '富有魅力的领导者，善于激励他人，追求和谐共赢。你天生善于理解他人，能将人们的力量凝聚在一起。', strengths: ['领导魅力', '善解人意', '组织能力', '感染力强'], weaknesses: ['过度付出', '逃避冲突', '理想化', '自我牺牲'], careers: ['教师', '公关', '社会工作者', 'HR总监'], celeb: '奥普拉·温弗瑞、马丁·路德·金' },
  ENFP: { name: '竞选者', emoji: '🌈', desc: '热情洋溢的自由精灵，充满创意和可能性。你是世界上最温暖的人之一，总能发现生活中的美好和惊喜。', strengths: ['创造力', '热情洋溢', '人际魅力', '适应力强'], weaknesses: ['注意力分散', '难以坚持', '过于感性', '逃避冲突'], careers: ['创意总监', '记者', '心理咨询师', '演员'], celeb: '罗宾·威廉姆斯、小罗伯特·唐尼' },
  ISTJ: { name: '物流师', emoji: '📋', desc: '务实可靠的责任担当，重视传统和秩序。你是最值得信赖的人，言出必行，认真负责。', strengths: ['责任心强', '组织有序', '可靠稳定', '注重细节'], weaknesses: ['固执己见', '不善变通', '过于严肃', '难以放松'], careers: ['会计', '审计', '公务员', '项目管理'], celeb: '乔治·华盛顿、安吉拉·默克尔' },
  ISFJ: { name: '守卫者', emoji: '🛡️', desc: '温暖可靠的守护者，默默付出，关心身边每一个人。你是最无私的性格类型之一，善于观察他人的需求。', strengths: ['细心体贴', '忠诚可靠', '耐心持久', '实际务实'], weaknesses: ['过度付出', '不善拒绝', '害怕变化', '压抑需求'], careers: ['护士', '教师', '行政管理', '社工'], celeb: '碧昂丝、英国凯特王妃' },
  ESTJ: { name: '总经理', emoji: '💼', desc: '高效务实的组织者，善于建立秩序和推动执行。你天生具有管理才能，能让团队高效运转。', strengths: ['组织能力', '管理才能', '执行力强', '负责可靠'], weaknesses: ['不够灵活', '过于强势', '忽略感情', '抗拒变化'], careers: ['管理者', '军官', '法官', '财务总监'], celeb: '亨利·福特、撒切尔夫人' },
  ESFJ: { name: '执政官', emoji: '🤝', desc: '热心肠的社交达人，善于照顾他人，营造和谐氛围。你是最善解人意的性格类型之一。', strengths: ['社交能力', '热心助人', '责任心强', '合作精神'], weaknesses: ['过于在意评价', '难以接受批评', '控制欲', '过度付出'], careers: ['医生', '教师', '销售经理', '公关'], celeb: '泰勒·斯威夫特、比尔·克林顿' },
  ISTP: { name: '鉴赏家', emoji: '🔧', desc: '冷静灵活的实践者，善于在危机中保持镇定并找到解决方案。你好奇心强，喜欢动手探索世界。', strengths: ['动手能力', '冷静沉着', '适应力强', '问题解决'], weaknesses: ['不善表达', '承诺恐惧', '冒险倾向', '忽视规则'], careers: ['工程师', '飞行员', '消防员', '外科医生'], celeb: '布鲁斯·李、迈克尔·乔丹' },
  ISFP: { name: '探险家', emoji: '🎨', desc: '温柔敏感的艺术家，活在当下，享受生活的每一刻。你有丰富的内心世界和出色的审美能力。', strengths: ['审美能力', '温和善良', '适应力强', '活在当下'], weaknesses: ['不善规划', '回避冲突', '过于敏感', '缺乏长远目标'], careers: ['设计师', '摄影师', '音乐家', '花艺师'], celeb: '鲍勃·迪伦、迈克尔·杰克逊' },
  ESTP: { name: '企业家', emoji: '🚀', desc: '大胆果断的行动派，善于抓住机会，享受冒险和挑战。你精力充沛，总能轻松成为人群的焦点。', strengths: ['行动力强', '随机应变', '魅力四射', '务实高效'], weaknesses: ['冲动行事', '缺乏耐心', '忽略长远', '冒险过度'], careers: ['企业家', '销售', '运动员', '急诊医生'], celeb: '唐纳德·特朗普、杰克·尼科尔森' },
  ESFP: { name: '表演者', emoji: '🎉', desc: '热情奔放的生活派对王，享受当下，带给大家快乐。你是天生的表演者，无论在哪里都能光芒四射。', strengths: ['表演天赋', '乐观活泼', '善解人意', '适应力强'], weaknesses: ['注意力短暂', '逃避冲突', '缺乏规划', '容易受伤'], careers: ['演员', '主持人', '旅游博主', '活动策划'], celeb: '玛丽莲·梦露、威尔·史密斯' },
}

export default function PersonalityPage() {
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState({ E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 })
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnswer = (option) => {
    const newScores = { ...scores }
    newScores[option.type] += option.score
    setScores(newScores)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      const type = (newScores.E >= newScores.I ? 'E' : 'I')
        + (newScores.N >= newScores.S ? 'N' : 'S')
        + (newScores.T >= newScores.F ? 'T' : 'F')
        + (newScores.J >= newScores.P ? 'J' : 'P')
      setResult(type)
      setFinished(true)
    }
  }

  const reset = () => {
    setCurrent(0)
    setScores({ E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 })
    setFinished(false)
    setResult(null)
  }

  const question = questions[current]
  const mbti = result ? mbtiTypes[result] : null
  const progress = ((current + 1) / questions.length) * 100

  return (
    <>
      <FAQSchema faqs={personalityFAQs} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-8 px-5">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">🧠 MBTI性格测试</h1>
            <p className="text-white/60">12道题测出你的MBTI人格类型</p>
          </header>

          {!finished ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/50 text-sm">第 {current + 1} / {questions.length} 题</span>
                <span className="text-white/50 text-sm">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-6">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <h2 className="text-xl font-bold text-white mb-6">{question.text}</h2>

              <div className="space-y-3">
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-left hover:bg-white/10 hover:border-indigo-500/50 transition-all"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ) : result && mbti ? (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-6xl mb-4">{mbti.emoji}</div>
                <h2 className="text-2xl font-black text-white mb-1">{result} - {mbti.name}</h2>
                <p className="text-white/60 text-sm mb-6">你的MBTI人格类型</p>
                <p className="text-white/80 text-sm leading-relaxed">{mbti.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h3 className="text-green-400 font-bold text-sm mb-3">💪 优势</h3>
                  <div className="space-y-2">
                    {mbti.strengths.map((s, i) => (
                      <div key={i} className="text-white/70 text-sm flex items-center gap-2">
                        <span className="text-green-400">+</span> {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h3 className="text-orange-400 font-bold text-sm mb-3">⚠️ 盲区</h3>
                  <div className="space-y-2">
                    {mbti.weaknesses.map((w, i) => (
                      <div key={i} className="text-white/70 text-sm flex items-center gap-2">
                        <span className="text-orange-400">-</span> {w}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h3 className="text-blue-400 font-bold text-sm mb-3">💼 适合职业</h3>
                <div className="flex flex-wrap gap-2">
                  {mbti.careers.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h3 className="text-purple-400 font-bold text-sm mb-3">🌟 同类型名人</h3>
                <p className="text-white/70 text-sm">{mbti.celeb}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h3 className="text-yellow-400 font-bold text-sm mb-3">📊 四维度分析</h3>
                <div className="space-y-3">
                  {[
                    { left: '外向(E)', right: '内向(I)', l: scores.E, r: scores.I },
                    { left: '直觉(N)', right: '感知(S)', l: scores.N, r: scores.S },
                    { left: '思考(T)', right: '情感(F)', l: scores.T, r: scores.F },
                    { left: '判断(J)', right: '感知(P)', l: scores.J, r: scores.P },
                  ].map((dim, i) => {
                    const total = dim.l + dim.r || 1
                    const leftPct = Math.round((dim.l / total) * 100)
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs text-white/50 mb-1">
                          <span>{dim.left} {leftPct}%</span>
                          <span>{100 - leftPct}% {dim.right}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${leftPct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full py-3 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all"
              >
                重新测试
              </button>

              <div className="mt-6">
                <AdBanner className="mb-6" />
                <ShareButtons title={`MBTI测试结果：${result} - ${mbti.name}`} url="/personality" />
              </div>

              <RelatedTools category="personality" />
            </div>
          ) : null}

          {!finished && (
            <div className="mt-6">
              <AdBanner className="mb-6" />
            </div>
          )}

          <div className="mt-8 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">🧠 什么是MBTI？</h2>
              <div className="text-white/70 text-sm space-y-3">
                <p>
                  MBTI（Myers-Briggs Type Indicator）是世界上最流行的性格分类工具之一，
                  由迈尔斯-布里格斯母女基于荣格的心理类型理论开发，将人的性格分为16种类型。
                </p>
                <p>
                  MBTI通过四个维度来描述性格特征：
                </p>
                <div className="space-y-2">
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-indigo-400 font-bold">E/I 外向-内向</span>
                    <span className="text-white/60 text-xs ml-2">— 你从哪里获取能量？</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-purple-400 font-bold">N/S 直觉-感知</span>
                    <span className="text-white/60 text-xs ml-2">— 你如何获取信息？</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-blue-400 font-bold">T/F 思考-情感</span>
                    <span className="text-white/60 text-xs ml-2">— 你如何做决定？</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-cyan-400 font-bold">J/P 判断-感知</span>
                    <span className="text-white/60 text-xs ml-2">— 你如何面对外部世界？</span>
                  </div>
                </div>
                <p>
                  四个维度的偏好组合形成16种独特的人格类型，每种类型都有其独特的思维方式、
                  行为模式和价值观。了解自己的MBTI类型可以帮助你更好地认识自己，
                  发挥优势、改善不足，选择更适合的职业道路。
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">👫 16种人格类型一览</h2>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(mbtiTypes).map(([type, info]) => (
                  <div key={type} className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">{info.emoji}</div>
                    <div className="text-white font-bold text-sm">{type}</div>
                    <div className="text-white/50 text-xs">{info.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 text-center">❓ 常见问题</h2>
              <div className="space-y-4">
                {personalityFAQs.map((faq, index) => (
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
'use client'

// FAQ Schema 组件 - 用于 GEO 优化，让 AI 搜索引擎更容易理解和引用
// Google 要求：结构化数据中的内容必须在页面上对用户可见
export default function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// 首页 FAQ 数据
export const homePageFAQs = [
  {
    question: '极客观察是什么网站？',
    answer: '极客观察是一个聚合 AI、科技、经济资讯的网站，每日更新36氪、虎嗅、IT之家等来源的最新科技新闻。'
  },
  {
    question: '极客观察提供哪些工具？',
    answer: '极客观察提供今日运势、星座运势、在线抽签、股市预测、摇骰子、塔罗牌测试、姓名配对等多种实用工具。'
  },
  {
    question: '极客观察的资讯来源有哪些？',
    answer: '极客观察的资讯来源包括36氪、虎嗅、IT之家、经济时报等知名科技媒体。'
  }
]

// 运势类页面 FAQ 数据
export const fortuneFAQs = [
  {
    question: '今日运势是怎么计算的？',
    answer: '今日运势是基于日期和姓名随机生成的娱乐测试，仅供娱乐参考，不具备任何科学依据。'
  },
  {
    question: '运势测试结果准确吗？',
    answer: '运势测试属于娱乐性质，结果仅供消遣，请勿过于当真。'
  }
]

// 星座运势页面 FAQ
export const xingzuoFAQs = [
  {
    question: '十二星座包括哪些？',
    answer: '十二星座包括白羊座、金牛座、双子座、巨蟹座、狮子座、处女座、天秤座、天蝎座、射手座、摩羯座、水瓶座和双鱼座。'
  },
  {
    question: '星座运势可信吗？',
    answer: '星座运势是一种娱乐文化现象，仅供消遣参考，没有科学依据，请勿当真。'
  }
]

// 股票预测页面 FAQ
export const stockFAQs = [
  {
    question: '股市预测准确吗？',
    answer: '本网站的股市预测功能仅供娱乐参考，不构成任何投资建议。股市有风险，投资需谨慎。'
  },
  {
    question: '股票回测是什么？',
    answer: '股票回测是一种模拟历史交易策略的方法，帮助用户了解假设性投资收益，但不代表实际收益。'
  }
]

// 抽签页面 FAQ
export const chouqianFAQs = [
  {
    question: '在线抽签准吗？',
    answer: '在线抽签是一种传统文化的数字化呈现，仅供娱乐消遣，不具备任何预测未来或占卜吉凶的功能。'
  },
  {
    question: '观音灵签有什么用？',
    answer: '观音灵签是中国传统民间信仰的一部分，本网站仅提供数字化的娱乐体验，请以娱乐心态对待。'
  }
]

// 塔罗牌 FAQ
export const tarotFAQs = [
  {
    question: '塔罗牌测试准吗？',
    answer: '塔罗牌是一种西方神秘学传统，属于娱乐文化范畴，测试结果仅供消遣参考。'
  },
  {
    question: '塔罗牌是如何工作的？',
    answer: '塔罗牌测试通过洗牌和抽牌过程，结合牌面解读来提供一种思考方式，是心理暗示的娱乐应用。'
  }
]

// 姓名配对 FAQ
export const matchFAQs = [
  {
    question: '姓名配对是怎么算的？',
    answer: '姓名配对是基于姓名笔画数进行的娱乐测试，仅供娱乐参考，不代表真实的缘分配对。'
  },
  {
    question: '姓名配对结果可信吗？',
    answer: '姓名配对属于娱乐性质，结果仅供消遣，请勿当真。'
  }
]

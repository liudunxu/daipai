// 相关工具推荐组件 - 用于 SEO 内部链接优化

const relatedTools = {
  // 玄学命理类
  xingzuo: [
    { href: '/shengxiao', emoji: '🐭', name: '十二生肖' },
    { href: '/tarot', emoji: '🔮', name: '塔罗牌' },
    { href: '/chouqian', emoji: '🙏', name: '在线抽签' },
    { href: '/bazi', emoji: '📖', name: '八字算命' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  shengxiao: [
    { href: '/xingzuo', emoji: '✨', name: '星座运势' },
    { href: '/tarot', emoji: '🔮', name: '塔罗牌' },
    { href: '/chouqian', emoji: '🙏', name: '在线抽签' },
    { href: '/bazi', emoji: '📖', name: '八字算命' },
    { href: '/huangli', emoji: '📅', name: '老黄历' },
  ],
  tarot: [
    { href: '/xingzuo', emoji: '✨', name: '星座运势' },
    { href: '/shengxiao', emoji: '🐭', name: '十二生肖' },
    { href: '/chouqian', emoji: '🙏', name: '在线抽签' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/fate', emoji: '🔮', name: '算命' },
  ],
  chouqian: [
    { href: '/tarot', emoji: '🔮', name: '塔罗牌' },
    { href: '/xingzuo', emoji: '✨', name: '星座运势' },
    { href: '/shengxiao', emoji: '🐭', name: '十二生肖' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/fate', emoji: '🔮', name: '算命' },
  ],
  bazi: [
    { href: '/xingzuo', emoji: '✨', name: '星座运势' },
    { href: '/huangli', emoji: '📅', name: '老黄历' },
    { href: '/names', emoji: '📛', name: '起名' },
    { href: '/fate', emoji: '🔮', name: '算命' },
    { href: '/shengxiao', emoji: '🐭', name: '十二生肖' },
  ],
  huangli: [
    { href: '/bazi', emoji: '📖', name: '八字算命' },
    { href: '/names', emoji: '📛', name: '起名' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/chouqian', emoji: '🙏', name: '在线抽签' },
    { href: '/fate', emoji: '🔮', name: '算命' },
  ],
  fate: [
    { href: '/tarot', emoji: '🔮', name: '塔罗牌' },
    { href: '/chouqian', emoji: '🙏', name: '在线抽签' },
    { href: '/bazi', emoji: '📖', name: '八字算命' },
    { href: '/xingzuo', emoji: '✨', name: '星座运势' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  names: [
    { href: '/bazi', emoji: '📖', name: '八字算命' },
    { href: '/huangli', emoji: '📅', name: '老黄历' },
    { href: '/shengxiao', emoji: '🐭', name: '十二生肖' },
    { href: '/xingzuo', emoji: '✨', name: '星座运势' },
  ],
  today: [
    { href: '/xingzuo', emoji: '✨', name: '星座运势' },
    { href: '/shengxiao', emoji: '🐭', name: '十二生肖' },
    { href: '/tarot', emoji: '🔮', name: '塔罗牌' },
    { href: '/huangli', emoji: '📅', name: '老黄历' },
    { href: '/chouqian', emoji: '🙏', name: '在线抽签' },
  ],
  // 生活娱乐类
  dice: [
    { href: '/avatar', emoji: '👤', name: '头像生成' },
    { href: '/cake', emoji: '🎂', name: '蛋糕祝福' },
    { href: '/wedding', emoji: '💒', name: '婚礼请帖' },
    { href: '/blessing', emoji: '🎊', name: '祝福语' },
    { href: '/match', emoji: '💕', name: '配对' },
  ],
  avatar: [
    { href: '/dice', emoji: '🎲', name: '摇骰子' },
    { href: '/cake', emoji: '🎂', name: '蛋糕祝福' },
    { href: '/wedding', emoji: '💒', name: '婚礼请帖' },
    { href: '/face', emoji: '😊', name: '头像匹配' },
    { href: '/match', emoji: '💕', name: '配对' },
  ],
  cake: [
    { href: '/wedding', emoji: '💒', name: '婚礼请帖' },
    { href: '/blessing', emoji: '🎊', name: '祝福语' },
    { href: '/dice', emoji: '🎲', name: '摇骰子' },
    { href: '/avatar', emoji: '👤', name: '头像生成' },
  ],
  wedding: [
    { href: '/cake', emoji: '🎂', name: '蛋糕祝福' },
    { href: '/blessing', emoji: '🎊', name: '祝福语' },
    { href: '/share', emoji: '📤', name: '分享卡片' },
    { href: '/dice', emoji: '🎲', name: '摇骰子' },
  ],
  blessing: [
    { href: '/cake', emoji: '🎂', name: '蛋糕祝福' },
    { href: '/wedding', emoji: '💒', name: '婚礼请帖' },
    { href: '/share', emoji: '📤', name: '分享卡片' },
    { href: '/birthday', emoji: '🎂', name: '生日祝福' },
  ],
  match: [
    { href: '/couple', emoji: '💑', name: '情侣头像' },
    { href: '/face', emoji: '😊', name: '头像匹配' },
    { href: '/avatar', emoji: '👤', name: '头像生成' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  couple: [
    { href: '/match', emoji: '💕', name: '配对' },
    { href: '/face', emoji: '😊', name: '头像匹配' },
    { href: '/avatar', emoji: '👤', name: '头像生成' },
    { href: '/wedding', emoji: '💒', name: '婚礼请帖' },
  ],
  face: [
    { href: '/couple', emoji: '💑', name: '情侣头像' },
    { href: '/match', emoji: '💕', name: '配对' },
    { href: '/avatar', emoji: '👤', name: '头像生成' },
    { href: '/dice', emoji: '🎲', name: '摇骰子' },
  ],
  // 工具类
  'tool/lucky': [
    { href: '/tool/password', emoji: '🔑', name: '密码生成' },
    { href: '/tool/huoxing', emoji: '🔥', name: '火星文' },
    { href: '/phone', emoji: '📱', name: '手机号' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],
  'tool/password': [
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
    { href: '/tool/huoxing', emoji: '🔥', name: '火星文' },
    { href: '/phone', emoji: '📱', name: '手机号' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  'tool/huoxing': [
    { href: '/tool/password', emoji: '🔑', name: '密码生成' },
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
    { href: '/share', emoji: '📤', name: '分享卡片' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  phone: [
    { href: '/tool/password', emoji: '🔑', name: '密码生成' },
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],
  // 股票类
  stock: [
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],
}

export default function RelatedTools({ category }) {
  const tools = relatedTools[category] || relatedTools['today']

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-white mb-4 text-center">🔗 相关推荐</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <span className="text-xl">{tool.emoji}</span>
            <span className="text-white text-sm font-medium">{tool.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

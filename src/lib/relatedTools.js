// 相关工具推荐组件 - 用于 SEO 内部链接优化

const relatedTools = {
  // ===== 玄学命理类 =====
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
  chenggu: [
    { href: '/bazi', emoji: '📖', name: '八字算命' },
    { href: '/xingzuo', emoji: '✨', name: '星座运势' },
    { href: '/fate', emoji: '🔮', name: '算命' },
    { href: '/huangli', emoji: '📅', name: '老黄历' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],

  // ===== 生活娱乐类 =====
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
    { href: '/birthday', emoji: '🎂', name: '生日祝福' },
  ],
  wedding: [
    { href: '/cake', emoji: '🎂', name: '蛋糕祝福' },
    { href: '/blessing', emoji: '🎊', name: '祝福语' },
    { href: '/share', emoji: '📤', name: '分享卡片' },
    { href: '/dice', emoji: '🎲', name: '摇骰子' },
    { href: '/birthday', emoji: '🎂', name: '生日祝福' },
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
    { href: '/phone', emoji: '📱', name: '手机号测运势' },
  ],
  couple: [
    { href: '/match', emoji: '💕', name: '配对' },
    { href: '/face', emoji: '😊', name: '头像匹配' },
    { href: '/avatar', emoji: '👤', name: '头像生成' },
    { href: '/wedding', emoji: '💒', name: '婚礼请帖' },
    { href: '/blessing', emoji: '🎊', name: '祝福语' },
  ],
  face: [
    { href: '/couple', emoji: '💑', name: '情侣头像' },
    { href: '/match', emoji: '💕', name: '配对' },
    { href: '/avatar', emoji: '👤', name: '头像生成' },
    { href: '/dice', emoji: '🎲', name: '摇骰子' },
  ],
  birthday: [
    { href: '/blessing', emoji: '🎊', name: '祝福语' },
    { href: '/cake', emoji: '🎂', name: '蛋糕祝福' },
    { href: '/wedding', emoji: '💒', name: '婚礼请帖' },
    { href: '/avatar', emoji: '👤', name: '头像生成' },
  ],

  // ===== 工具类 =====
  'tool/lucky': [
    { href: '/tool/password', emoji: '🔑', name: '密码生成' },
    { href: '/tool/huoxing', emoji: '🔥', name: '火星文' },
    { href: '/phone', emoji: '📱', name: '手机号测运势' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],
  'tool/password': [
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
    { href: '/tool/huoxing', emoji: '🔥', name: '火星文' },
    { href: '/phone', emoji: '📱', name: '手机号测运势' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  'tool/huoxing': [
    { href: '/tool/password', emoji: '🔑', name: '密码生成' },
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
    { href: '/share', emoji: '📤', name: '分享卡片' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  'tool/bmi': [
    { href: '/tool/height', emoji: '📏', name: '身高评估' },
    { href: '/tool/sleep', emoji: '😴', name: '睡眠推荐' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],
  'tool/height': [
    { href: '/tool/bmi', emoji: '⚖️', name: 'BMI计算' },
    { href: '/tool/sleep', emoji: '😴', name: '睡眠推荐' },
    { href: '/birthday', emoji: '🎂', name: '生日祝福' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  'tool/sleep': [
    { href: '/tool/bmi', emoji: '⚖️', name: 'BMI计算' },
    { href: '/tool/height', emoji: '📏', name: '身高评估' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  'tool/unit': [
    { href: '/tool/password', emoji: '🔑', name: '密码生成' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],
  'tool/countdown': [
    { href: '/birthday', emoji: '🎂', name: '生日祝福' },
    { href: '/wedding', emoji: '💒', name: '婚礼请帖' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
  ],
  phone: [
    { href: '/tool/password', emoji: '🔑', name: '密码生成' },
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],

  // ===== 股票类 =====
  stock: [
    { href: '/guru', emoji: '🎯', name: '投资大佬' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
  ],
  guru: [
    { href: '/stock', emoji: '📊', name: '股市预测' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/tool/lucky', emoji: '🍀', name: '幸运数字' },
  ],

  // ===== AI 工具类 =====
  ai: [
    { href: '/ai/claude', emoji: '🤖', name: 'Claude教程' },
    { href: '/ai/deepseek', emoji: '🔍', name: 'DeepSeek教程' },
    { href: '/ai/coze', emoji: '⚡', name: 'Coze教程' },
    { href: '/prompt', emoji: '💬', name: 'AI提示词' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],
  'ai/claude': [
    { href: '/ai/deepseek', emoji: '🔍', name: 'DeepSeek教程' },
    { href: '/ai/coze', emoji: '⚡', name: 'Coze教程' },
    { href: '/ai/perplexity', emoji: '🌐', name: 'Perplexity' },
    { href: '/prompt', emoji: '💬', name: 'AI提示词' },
  ],
  'ai/deepseek': [
    { href: '/ai/claude', emoji: '🤖', name: 'Claude教程' },
    { href: '/ai/coze', emoji: '⚡', name: 'Coze教程' },
    { href: '/ai/perplexity', emoji: '🌐', name: 'Perplexity' },
    { href: '/prompt', emoji: '💬', name: 'AI提示词' },
  ],
  'ai/coze': [
    { href: '/ai/claude', emoji: '🤖', name: 'Claude教程' },
    { href: '/ai/deepseek', emoji: '🔍', name: 'DeepSeek教程' },
    { href: '/ai/perplexity', emoji: '🌐', name: 'Perplexity' },
    { href: '/prompt', emoji: '💬', name: 'AI提示词' },
  ],
  'ai/perplexity': [
    { href: '/ai/claude', emoji: '🤖', name: 'Claude教程' },
    { href: '/ai/deepseek', emoji: '🔍', name: 'DeepSeek教程' },
    { href: '/ai/coze', emoji: '⚡', name: 'Coze教程' },
    { href: '/prompt', emoji: '💬', name: 'AI提示词' },
  ],
  prompt: [
    { href: '/ai', emoji: '🤖', name: 'AI工具导航' },
    { href: '/ai/claude', emoji: '🤖', name: 'Claude教程' },
    { href: '/ai/deepseek', emoji: '🔍', name: 'DeepSeek教程' },
    { href: '/ai/coze', emoji: '⚡', name: 'Coze教程' },
  ],
  maic: [
    { href: '/ai', emoji: '🤖', name: 'AI工具导航' },
    { href: '/ai/claude', emoji: '🤖', name: 'Claude教程' },
    { href: '/prompt', emoji: '💬', name: 'AI提示词' },
    { href: '/nav', emoji: '🧭', name: '更多工具' },
  ],

  // ===== 编程模型排行榜 =====
  'llm-leaderboard': [
    { href: '/ai', emoji: '🤖', name: 'AI工具导航' },
    { href: '/ai/claude', emoji: '🤖', name: 'Claude教程' },
    { href: '/ai/deepseek', emoji: '🔍', name: 'DeepSeek教程' },
    { href: '/prompt', emoji: '💬', name: 'AI提示词' },
  ],

  // ===== 资讯类 =====
  trending: [
    { href: '/todayinhistory', emoji: '📅', name: '历史上的今天' },
    { href: '/nvidia', emoji: '🇳�vidia', name: '英伟达动态' },
    { href: '/alibaba', emoji: '🐱', name: '阿里架构' },
    { href: '/github-rank', emoji: '⭐', name: 'GitHub热门' },
    { href: '/nav', emoji: '🧭', name: '更多' },
  ],
  todayinhistory: [
    { href: '/trending', emoji: '🔥', name: '今日热搜' },
    { href: '/nvidia', emoji: '🇳�vidia', name: '英伟达动态' },
    { href: '/alibaba', emoji: '🐱', name: '阿里架构' },
    { href: '/github-rank', emoji: '⭐', name: 'GitHub热门' },
  ],
  nvidia: [
    { href: '/trending', emoji: '🔥', name: '今日热搜' },
    { href: '/todayinhistory', emoji: '📅', name: '历史上的今天' },
    { href: '/alibaba', emoji: '🐱', name: '阿里架构' },
    { href: '/ai', emoji: '🤖', name: 'AI工具' },
  ],
  alibaba: [
    { href: '/trending', emoji: '🔥', name: '今日热搜' },
    { href: '/todayinhistory', emoji: '📅', name: '历史上的今天' },
    { href: '/nvidia', emoji: '💻', name: '英伟达动态' },
    { href: '/ai', emoji: '🤖', name: 'AI工具' },
  ],
  githubrank: [
    { href: '/trending', emoji: '🔥', name: '今日热搜' },
    { href: '/ai', emoji: '🤖', name: 'AI工具导航' },
    { href: '/maic', emoji: '🎓', name: 'AI课堂' },
    { href: '/claude-code-leak', emoji: '🔓', name: 'Claude源码' },
  ],
  'claude-code-leak': [
    { href: '/harness', emoji: '🛠️', name: 'Harness科普' },
    { href: '/ai', emoji: '🤖', name: 'AI工具导航' },
    { href: '/github-rank', emoji: '⭐', name: 'GitHub热门' },
    { href: '/maic', emoji: '🎓', name: 'AI课堂' },
  ],
  harness: [
    { href: '/claude-code-leak', emoji: '🔓', name: 'Claude源码' },
    { href: '/ai', emoji: '🤖', name: 'AI工具导航' },
    { href: '/github-rank', emoji: '⭐', name: 'GitHub热门' },
    { href: '/maic', emoji: '🎓', name: 'AI课堂' },
  ],

  // ===== 默认 =====
  default: [
    { href: '/nav', emoji: '🧭', name: '导航页' },
    { href: '/today', emoji: '🎯', name: '今日运势' },
    { href: '/ai', emoji: '🤖', name: 'AI工具' },
    { href: '/trending', emoji: '🔥', name: '热搜榜' },
  ],
}

// 导出 popularTools 供首页使用
export const popularTools = [
  { href: '/xingzuo', emoji: '✨', name: '星座运势' },
  { href: '/tarot', emoji: '🔮', name: '塔罗牌' },
  { href: '/bazi', emoji: '📖', name: '八字算命' },
  { href: '/chouqian', emoji: '🙏', name: '在线抽签' },
  { href: '/today', emoji: '🎯', name: '今日运势' },
  { href: '/huangli', emoji: '📅', name: '老黄历' },
  { href: '/match', emoji: '💕', name: '姓名配对' },
  { href: '/stock', emoji: '📊', name: '股票预测' },
  { href: '/guru', emoji: '🎯', name: '大佬持仓' },
  { href: '/tool/password', emoji: '🔑', name: '密码生成' },
  { href: '/blessing', emoji: '🎊', name: '祝福语' },
  { href: '/trending', emoji: '🔥', name: '热搜榜' },
]

export { relatedTools }

export default function RelatedTools({ category }) {
  const tools = relatedTools[category] || relatedTools['default']

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

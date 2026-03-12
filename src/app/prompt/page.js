export const metadata = {
  title: 'AI提示词大全 - ChatGPT、Claude提示词模板',
  description: '收集整理各类AI提示词模板，包含写作、编程、学习、工作等场景提示词，助力高效使用ChatGPT、Claude等AI工具。',
  keywords: ['AI提示词', 'ChatGPT提示词', 'Claude提示词', 'prompt模板', 'AI指令', '提示词大全'],
}

const promptCategories = [
  {
    name: '📝 写作助手',
    icon: '✍️',
    color: 'from-blue-500 to-cyan-500',
    prompts: [
      { title: '文章润色', prompt: '请帮我润色以下文章，使其更加流畅、专业：\n\n[在这里粘贴你的文章]' },
      { title: '标题生成', prompt: '请为以下内容生成5个吸引人的标题：\n\n[在这里描述你的内容]' },
      { title: '内容续写', prompt: '请根据以下开头续写一段故事/文章：\n\n[在这里输入开头]' },
      { title: '文案创作', prompt: '请帮我写一段[产品/活动]的推广文案，要求：[风格/字数要求]' },
    ]
  },
  {
    name: '💻 编程开发',
    icon: '👨‍💻',
    color: 'from-green-500 to-emerald-500',
    prompts: [
      { title: '代码解释', prompt: '请解释以下代码的功能和逻辑：\n\n```\n[在这里粘贴代码]\n```' },
      { title: 'Bug修复', prompt: '请帮我找出并修复以下代码中的问题：\n\n```\n[在这里粘贴代码]\n```' },
      { title: '代码优化', prompt: '请优化以下代码，提高性能和可读性：\n\n```\n[在这里粘贴代码]\n```' },
      { title: '技术文档', prompt: '请为以下项目/功能生成技术文档：\n\n[描述你的项目]' },
    ]
  },
  {
    name: '📚 学习教育',
    icon: '📖',
    color: 'from-purple-500 to-pink-500',
    prompts: [
      { title: '知识讲解', prompt: '请用通俗易懂的方式讲解以下概念：\n\n[输入概念]' },
      { title: '学习计划', prompt: '请为我制定一个[学科/技能]的学习计划，要求：[时间/目标]' },
      { title: '知识点总结', prompt: '请总结以下内容的核心知识点：\n\n[输入学习内容]' },
      { title: '出题练习', prompt: '请根据以下知识点出5道练习题：\n\n[输入知识点]' },
    ]
  },
  {
    name: '💼 工作办公',
    icon: '📊',
    color: 'from-orange-500 to-red-500',
    prompts: [
      { title: '周报生成', prompt: '请帮我生成一份工作周报，内容包括：\n- 本周工作：\n- 完成情况：\n- 下周计划：' },
      { title: '邮件撰写', prompt: '请帮我写一封[类型]邮件，要求：\n- 收件人：\n- 主题：\n- 主要内容：' },
      { title: '会议纪要', prompt: '请根据以下会议内容生成会议纪要：\n\n[输入会议记录]' },
      { title: 'PPT大纲', prompt: '请为以下主题生成PPT大纲：\n\n[输入主题]' },
    ]
  },
  {
    name: '🎨 创意设计',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    prompts: [
      { title: '海报文案', prompt: '请为[活动/产品]生成吸引人的海报文案和slogan：\n\n[描述需求]' },
      { title: '短视频脚本', prompt: '请为以下主题生成一个60秒短视频脚本：\n\n[输入主题]' },
      { title: '产品描述', prompt: '请为以下产品生成一段吸引人的产品描述：\n\n[输入产品信息]' },
      { title: '品牌故事', prompt: '请帮我构思一个品牌故事，要求：\n\n[输入品牌背景]' },
    ]
  },
  {
    name: '🧠 思维提升',
    icon: '💡',
    color: 'from-yellow-500 to-amber-500',
    prompts: [
      { title: '思维导图', prompt: '请为以下主题生成思维导图结构：\n\n[输入主题]' },
      { title: '问题分析', prompt: '请用5Why分析法分析以下问题：\n\n[输入问题]' },
      { title: '决策建议', prompt: '请帮我分析以下决策的利弊：\n\n[描述决策]' },
      { title: '创意头脑风暴', prompt: '请针对以下问题给出10个创意解决方案：\n\n[输入问题]' },
    ]
  },
]

export default function PromptPage() {
  const copyPrompt = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('✅ 提示词已复制到剪贴板！')
    } catch {
      alert('复制失败，请重试')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🤖</span>
            <span className="text-white font-medium">AI 工具</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            AI <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">提示词</span> 大全
          </h1>
          <p className="text-white/60">
            收集各类AI提示词模板，让ChatGPT、Claude更强
          </p>
        </header>

        {/* 提示词分类 */}
        <div className="space-y-6">
          {promptCategories.map((category, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h2 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {category.prompts.map((item, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => copyPrompt(item.prompt)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all hover:scale-[1.01] group"
                  >
                    <p className="text-white font-medium mb-2 group-hover:text-green-400 transition-colors">{item.title}</p>
                    <p className="text-white/40 text-xs line-clamp-2">{item.prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-green-500/20 border border-green-500/50 rounded-2xl p-6">
          <h3 className="text-green-300 font-bold mb-3">💡 使用方法</h3>
          <ol className="text-white/70 text-sm space-y-2">
            <li>1. 点击任意提示词卡片复制内容</li>
            <li>2. 打开 ChatGPT、Claude 等AI工具</li>
            <li>3. 粘贴提示词并根据提示修改内容</li>
            <li>4. 获取AI生成的优质回答</li>
          </ol>
        </div>

        {/* 底部 */}
        <footer className="text-center py-6 border-t border-white/10 mt-8">
          <p className="text-white/30 text-sm">
            AI提示词大全 · 持续更新 · 欢迎贡献
          </p>
        </footer>
      </div>
    </div>
  )
}

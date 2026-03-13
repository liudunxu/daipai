export const metadata = {
  title: 'Coze扣子教程 - AI智能体搭建平台',
  description: 'Coze扣子使用教程，如何创建AI智能体，工作流配置，插件使用。字节跳动推出的AI Agent平台。',
  keywords: ['Coze', '扣子', 'AI智能体', 'Coze教程', '字节跳动', 'AI Agent', '工作流'],
}

import Link from 'next/link'

export default function CozePage() {
  const features = [
    { name: '无需编程', desc: '可视化拖拽创建智能体', icon: '🎨' },
    { name: '工作流', desc: '灵活配置AI处理流程', icon: '🔄' },
    { name: '插件丰富', desc: '集成多种第三方服务', icon: '🔌' },
    { name: '多平台发布', desc: '一键部署到各渠道', icon: '📱' },
  ]

  const steps = [
    { step: '1', title: '注册账号', desc: '访问coze.com注册账号' },
    { step: '2', title: '创建智能体', desc: '选择模板或从零创建' },
    { step: '3', title: '配置prompt', desc: '编写智能体的角色设定' },
    { step: '4', title: '添加插件', desc: '选择需要的技能插件' },
    { step: '5', title: '发布使用', desc: '发布到需要的平台' },
  ]

  const plugins = [
    'GPT-4V / GPT-4o 视觉理解',
    'DALL·E 3 图像生成',
    'Google搜索',
    '浏览器自动化',
    '代码解释器',
    '数据库操作',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            ⚡ Coze 扣子 AI智能体
          </h1>
          <p className="text-white/60">字节跳动推出的AI Agent平台</p>
        </header>

        {/* 核心特点 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">✨ 核心特点</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{f.name}</h3>
                <p className="text-white/40 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 使用步骤 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">📝 使用步骤</h2>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-white font-bold">{s.title}</h3>
                  <p className="text-white/50 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 可用插件 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🔌 可用插件</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plugins.map((p, i) => (
              <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/70">{p}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 适用场景 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🎯 适用场景</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="text-white font-bold text-sm">客服机器人</h3>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="text-white font-bold text-sm">内容创作</h3>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-sm">数据分析</h3>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="text-white font-bold text-sm">教育助手</h3>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="text-white font-bold text-sm">办公自动化</h3>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎮</div>
              <h3 className="text-white font-bold text-sm">游戏NPC</h3>
            </div>
          </div>
        </section>

        {/* 官方链接 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">🔗 官方入口</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.coze.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-xl transition-colors"
            >
              🌐 Coze国际版
            </a>
            <a
              href="https://www.coze.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-colors"
            >
              🌐 Coze国内版
            </a>
          </div>
        </section>

        <div className="text-center">
          <Link href="/nav" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 更多工具
          </Link>
        </div>
      </div>
    </div>
  )
}

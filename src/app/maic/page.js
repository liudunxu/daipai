export const metadata = {
  title: 'OpenMAIC - 开源AI互动课堂平台 | 极客观察',
  description: 'OpenMAIC开源AI互动课堂平台介绍，将任何文档或主题转化为多智能体沉浸式学习体验，支持PPT生成、测验、项目制学习。清华大学出品！',
  keywords: ['OpenMAIC', 'AI课堂', '多智能体', '开源', '清华大学', 'AI教学', 'PPT生成', '智能体'],
  openGraph: {
    type: 'article',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/maic',
    siteName: '极客观察',
    title: 'OpenMAIC - 开源AI互动课堂平台',
    description: '清华大学出品的开源AI互动课堂，一键生成多智能体沉浸式学习体验',
  },
}

import Link from 'next/link'

export default function MaicPage() {
  const features = [
    {
      icon: '🎓',
      title: '一键生成课堂',
      desc: '描述主题或上传材料，AI几分钟内构建完整互动课堂',
    },
    {
      icon: '👥',
      title: '多智能体互动',
      desc: 'AI老师和智能体同学实时授课、讨论、答疑',
    },
    {
      icon: '📊',
      title: '丰富场景类型',
      desc: '幻灯片讲解、交互测验、HTML模拟实验、项目制学习',
    },
    {
      icon: '🎨',
      title: '白板绘图',
      desc: '智能体实时绘制图表、书写公式，语音讲解',
    },
    {
      icon: '📥',
      title: '灵活导出',
      desc: '下载可编辑的PPT或交互式HTML网页',
    },
    {
      icon: '💬',
      title: '多平台集成',
      desc: '支持飞书、Slack、Telegram等20+聊天应用',
    },
  ]

  const scenarios = [
    { name: '幻灯片讲解', desc: 'AI老师配合聚光灯和激光笔进行语音讲解', icon: '🎤' },
    { name: '交互测验', desc: '单选/多选/简答，AI实时判分和反馈', icon: '📝' },
    { name: 'HTML模拟实验', desc: '可视化交互实验，动手学习', icon: '🔬' },
    { name: '项目制学习PBL', desc: '与AI智能体协作完成结构化项目', icon: '🏗️' },
  ]

  const techStack = [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'LangGraph',
    'Zustand',
    'Tailwind CSS',
    'shadcn/ui',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <header className="text-center mb-10">
          <div className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm mb-4">
            🔥 开源爆款 · 7.5k+ Stars
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            OpenMAIC
          </h1>
          <p className="text-xl text-white/80 mb-2">
            开源 AI 互动课堂平台
          </p>
          <p className="text-white/50 mb-6">
            清华大学出品 · 将任何文档转化为多智能体沉浸式学习体验
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://open.maic.chat/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all hover:scale-105"
            >
              立即体验 →
            </a>
            <a
              href="https://github.com/THU-MAIC/OpenMAIC"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
            >
              GitHub ⭐
            </a>
          </div>
        </header>

        {/* 简介 */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">🎯 这玩意儿能整啥？</h2>
            <p className="text-white/70 leading-relaxed">
              老铁们，OpenMAIC这玩意儿贼拉好使！就是能把你们平时整的那些PDF文档、
              讲义材料啥的，一股脑儿整成一个贼拉精彩的AI互动课堂！
              AI老师带着一帮智能体同学，给你整一出贼带劲的沉浸式学习体验！
              不管你是想学编程、整税务、搞科学还是整点儿有意思的知识，都能整！
            </p>
          </div>
        </section>

        {/* 核心功能 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">✨ 核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 课堂场景 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🎪 课堂场景</h2>
          <div className="grid grid-cols-2 gap-4">
            {scenarios.map((s, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="text-white font-bold mb-1">{s.name}</h3>
                <p className="text-white/50 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 使用方法 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🚀 快速上手</h2>
          <div className="bg-black/30 border border-white/10 rounded-2xl p-6">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">1</span>
                <div>
                  <p className="text-white font-medium">环境要求</p>
                  <p className="text-white/50">Node.js >= 20 · pnpm >= 10</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">2</span>
                <div className="flex-1">
                  <p className="text-white font-medium mb-2">克隆安装</p>
                  <pre className="bg-white/5 rounded-lg p-3 text-white/70 overflow-x-auto">
{`git clone https://github.com/THU-MAIC/OpenMAIC.git
cd OpenMAIC
pnpm install`}
                  </pre>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">3</span>
                <div className="flex-1">
                  <p className="text-white font-medium mb-2">配置环境变量</p>
                  <pre className="bg-white/5 rounded-lg p-3 text-white/70 overflow-x-auto">
{`cp .env.example .env.local
# 填写 API Key (OpenAI / Anthropic / Gemini / DeepSeek)`}
                  </pre>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">4</span>
                <div>
                  <p className="text-white font-medium">启动访问</p>
                  <p className="text-white/50">pnpm dev → http://localhost:3000</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技术栈 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🛠️ 技术栈</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-sm">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* 开源信息 */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-3">📚 开源免费 · MIT许可证</h2>
            <p className="text-white/60 text-sm mb-4">
              GitHub Star 7.5k+ · 论文发表于JCST 2026
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/THU-MAIC/OpenMAIC"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
              >
                访问 GitHub
              </a>
              <a
                href="https://open.maic.chat/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
              >
                在线体验
              </a>
              <a
                href="mailto:thu_maic@tsinghua.edu.cn"
                className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
              >
                商务合作
              </a>
            </div>
          </div>
        </section>

        {/* 导航 */}
        <div className="text-center">
          <Link href="/nav" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 更多工具
          </Link>
        </div>
      </div>
    </div>
  )
}

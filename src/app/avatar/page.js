export const metadata = {
  title: '节日祝福头像生成器 - 春节、中秋、国庆专属头像',
  description: '生成专属节日祝福头像！支持春节、中秋、国庆、生日等主题，一键生成带文字的精美头像。',
  keywords: ['节日头像生成器', '春节头像', '中秋头像', '国庆头像', '祝福头像'],
}

const themes = {
  spring: { emoji: '🧧', title: '春节', color: 'from-red-500 to-orange-500', value: '#ef4444' },
  midAutumn: { emoji: '🌙', title: '中秋', color: 'from-blue-500 to-cyan-500', value: '#3b82f6' },
  national: { emoji: '🇨🇳', title: '国庆', color: 'from-red-600 to-yellow-500', value: '#dc2626' },
  birthday: { emoji: '🎂', title: '生日', color: 'from-pink-500 to-rose-500', value: '#ec4899' },
  valentine: { emoji: '💕', title: '情人节', color: 'from-red-500 to-pink-500', value: '#ef4444' },
}

export default function AvatarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            节日祝福 <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">头像生成器</span>
          </h1>
          <p className="text-white/60">
            生成专属节日头像，一键分享到微信、QQ、抖音
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(themes).map(([key, value]) => (
            <a
              key={key}
              href={`/avatar/${key}`}
              className="block bg-gradient-to-br rounded-2xl p-6 text-center hover:scale-105 transition-transform"
              style={{ background: `linear-gradient(135deg, ${value.value}dd, ${value.value}88)` }}
            >
              <span className="text-5xl block mb-3">{value.emoji}</span>
              <span className="text-white font-bold text-lg">{value.title}头像</span>
            </a>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mt-8">
          <h3 className="text-white font-bold mb-4">📖 使用说明</h3>
          <ol className="text-white/60 text-sm space-y-2">
            <li>1. 点击上方想要的主题</li>
            <li>2. 输入你想显示的文字</li>
            <li>3. 选择喜欢的颜色</li>
            <li>4. 截图保存，设为微信/QQ头像</li>
          </ol>
        </div>

        <footer className="text-center py-6 border-t border-white/10 mt-8">
          <p className="text-white/30 text-sm">
            节日头像生成器 · 专属定制 · 独一无二
          </p>
        </footer>
      </div>
    </div>
  )
}

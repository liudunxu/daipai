export default function AvatarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🎉</span>
            <span className="text-white font-medium">热门工具</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            节日祝福 <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">头像生成器</span>
          </h1>
          <p className="text-white/60">
            生成专属节日头像，一键分享到微信、QQ、抖音
          </p>
        </header>

        {/* 节日选择 */}
        <div className="mb-8">
          <h2 className="text-white font-bold mb-4 text-center">🎊 选择节日主题</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/avatar/lunar-new-year" className="block bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <span className="text-4xl block mb-2">🧧</span>
              <span className="text-white font-bold">春节</span>
            </a>
            <a href="/avatar/mid-autumn" className="block bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <span className="text-4xl block mb-2">🌙</span>
              <span className="text-white font-bold">中秋</span>
            </a>
            <a href="/avatar/national-day" className="block bg-gradient-to-br from-red-600 to-yellow-500 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <span className="text-4xl block mb-2">🇨🇳</span>
              <span className="text-white font-bold">国庆</span>
            </a>
            <a href="/avatar/birthday" className="block bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <span className="text-4xl block mb-2">🎂</span>
              <span className="text-white font-bold">生日</span>
            </a>
          </div>
        </div>

        {/* 更多节日 */}
        <div className="mb-8">
          <h2 className="text-white font-bold mb-4 text-center">🎁 更多主题</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <a href="/avatar/valentine" className="block bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/30 rounded-xl p-4 text-center transition-colors">
              <span className="text-2xl block mb-1">💕</span>
              <span className="text-pink-300 text-sm">情人节</span>
            </a>
            <a href="/avatar/white-valentine" className="block bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-center transition-colors">
              <span className="text-2xl block mb-1">🍫</span>
              <span className="text-white/70 text-sm">白色情人节</span>
            </a>
            <a href="/avatar/mothers-day" className="block bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-xl p-4 text-center transition-colors">
              <span className="text-2xl block mb-1">🌸</span>
              <span className="text-red-300 text-sm">母亲节</span>
            </a>
            <a href="/avatar/fathers-day" className="block bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/30 rounded-xl p-4 text-center transition-colors">
              <span className="text-2xl block mb-1">🎉</span>
              <span className="text-blue-300 text-sm">父亲节</span>
            </a>
            <a href="/avatar/christmas" className="block bg-green-500/20 hover:bg-green-500/40 border border-green-500/30 rounded-xl p-4 text-center transition-colors">
              <span className="text-2xl block mb-1">🎄</span>
              <span className="text-green-300 text-sm">圣诞节</span>
            </a>
            <a href="/avatar/new-year" className="block bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/30 rounded-xl p-4 text-center transition-colors">
              <span className="text-2xl block mb-1">🎊</span>
              <span className="text-purple-300 text-sm">元旦</span>
            </a>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">📖 使用说明</h3>
          <ol className="text-white/60 text-sm space-y-2">
            <li>1. 选择想要的节日主题</li>
            <li>2. 输入你想显示的文字（名字或祝福语）</li>
            <li>3. 选择喜欢的颜色和样式</li>
            <li>4. 点击生成，一键保存图片</li>
            <li>5. 设为微信/QQ头像，或分享给朋友</li>
          </ol>
        </div>

        {/* 底部 */}
        <footer className="text-center py-6 border-t border-white/10 mt-8">
          <p className="text-white/30 text-sm">
            节日头像生成器 · 专属定制 · 独一无二
          </p>
        </footer>
      </div>
    </div>
  )
}

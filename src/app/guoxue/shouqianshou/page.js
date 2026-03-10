export const metadata = {
  title: '西海岸手牵手志愿者团队 - 传递温暖与爱',
  description: '青岛西海岸手牵手志愿者团队，专注关爱困境儿童，用爱心温暖每一个需要帮助的人。',
}

export default function ShouqianshouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900">
      {/* 顶部横幅 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 py-3 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-white font-bold">
            💙 用爱传递温暖 · 用心守护成长
          </span>
        </div>
      </div>

      {/* 头部 */}
      <header className="py-16 px-5 text-center relative">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">🤝</span>
            <span className="text-cyan-200 font-medium">西海岸手牵手志愿者团队</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            手牵手
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> 让爱传递</span>
          </h1>
          <p className="text-lg text-white/70 mb-8">
            青岛西海岸新区 · 关爱困境儿童 · 志愿服务行动
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#about" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
              📖 了解我们
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
              💌 联系我们
            </a>
          </div>
        </div>
      </header>

      {/* 团长介绍 */}
      <section className="py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4">
              <span className="text-4xl">👨‍💼</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              刘付伟 团长
            </h2>
            <p className="text-cyan-300 font-medium mb-4">
              西海岸手牵手志愿者团队创始人
            </p>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
              刘付伟团长是青岛西海岸新区公益事业的发起人之一，多年来始终坚守在志愿服务第一线。他带领团队累计帮扶困境儿童数百名，组织暖冬行动、爱心助学等公益活动数十场，用实际行动诠释了一名志愿者的责任与担当。
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm">
                🏆 青岛市优秀志愿者
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm">
                ❤️ 公益事业贡献奖
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 团队简介 */}
      <section id="about" className="py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            💙 关于我们
          </h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              西海岸手牵手志愿者团队是青岛西海岸新区一支充满爱心的志愿服务组织，专注于关爱困境儿童、帮扶困难家庭，用实际行动传递温暖与希望。
            </p>
            <p className="text-white/60 leading-relaxed">
              我们相信，每个孩子都应该被温柔以待。团队志愿者们定期开展走访慰问、物资捐赠、心理陪伴等活动，为困境儿童带去关爱与陪伴。
            </p>
          </div>
        </div>
      </section>

      {/* 核心活动 */}
      <section className="py-12 px-5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            🌟 核心活动
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-white font-bold text-lg mb-2">暖冬行动</h3>
              <p className="text-white/60">
                为困境儿童募集御寒物资，捐赠棉被、棉衣等，让孩子们温暖过冬
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-white font-bold text-lg mb-2">爱心助学</h3>
              <p className="text-white/60">
                为困难家庭孩子提供学习用品、教育支持，助力他们完成学业梦想
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-white font-bold text-lg mb-2">心理陪伴</h3>
              <p className="text-white/60">
                志愿者定期陪伴孩子谈心交流，了解他们的心理需求，给予关爱与支持
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-white font-bold text-lg mb-2">社区帮扶</h3>
              <p className="text-white/60">
                走进社区，关爱孤寡老人、困难家庭，传递社会温暖与正能量
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 数字成就 */}
      <section className="py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-black text-cyan-400 mb-2">500+</div>
              <div className="text-white/60">捐赠物资</div>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-400 mb-2">100+</div>
              <div className="text-white/60">志愿者</div>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-400 mb-2">50+</div>
              <div className="text-white/60">帮扶家庭</div>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-400 mb-2">1000+</div>
              <div className="text-white/60">服务时长</div>
            </div>
          </div>
        </div>
      </section>

      {/* 志愿者招募 */}
      <section className="py-12 px-5 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            🌈 加入我们
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            一滴水只有放进大海才永远不会干涸，一个人只有当他把自己和集体事业融合在一起时才最有力量。
          </p>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 inline-block">
            <p className="text-white font-bold text-lg mb-2">📱 联系我们</p>
            <p className="text-white/60">添加微信：XXXX-XXXX</p>
            <p className="text-white/60 mt-2">欢迎加入西海岸手牵手志愿者团队</p>
          </div>
        </div>
      </section>

      {/* 公益理念 */}
      <section className="py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            💡 公益理念
          </h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
              <p className="text-white text-lg">
                "每人奉献一点爱，世界将变成美好人间"
              </p>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
              <p className="text-white text-lg">
                "用爱心点燃希望，用行动播撒阳光"
              </p>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
              <p className="text-white text-lg">
                "手牵手，心连心，共筑温暖家园"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-8 px-5 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">
          西海岸手牵手志愿者团队 · 青岛西海岸新区
        </p>
        <p className="text-white/30 text-xs mt-2">
          用爱传递温暖 · 用心守护成长
        </p>
      </footer>
    </div>
  )
}

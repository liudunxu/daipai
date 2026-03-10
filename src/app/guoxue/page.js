export const metadata = {
  title: '北京润泽园国学院 - 王阳明心学传承',
  description: '润泽园教育，专注王阳明心学12年，助力企业家格局提升。数万企业家共同学习，以生命唤醒生命。',
}

export default function GuoxuePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-red-900 to-amber-900">
      {/* 顶部横幅 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-red-600 py-3 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-white font-bold">
            🏆 12年专注阳明心学 · 数万企业家共同见证
          </span>
        </div>
      </div>

      {/* 头部 */}
      <header className="py-16 px-5 text-center relative">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">🏛️</span>
            <span className="text-amber-200 font-medium">北京润泽园国学院</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            阳明心学
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> 改变千万企业家</span>
          </h1>
          <p className="text-lg text-white/70 mb-8">
            读原文、悟原理、以生命唤醒生命
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#learn" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
              📚 立即学习
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
              📞 了解更多
            </a>
          </div>
        </div>
      </header>

      {/* 核心价值 */}
      <section className="py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            ✨ 为什么要学阳明心学？
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-white font-bold text-xl mb-3">知行合一</h3>
              <p className="text-white/60">
                王阳明核心思想，不是知道就够了，更要做到。真正的成功=知×行
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-white font-bold text-xl mb-3">致良知</h3>
              <p className="text-white/60">
                每个人心中都有良知，唤醒内心的光明，就能找到人生方向
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-white font-bold text-xl mb-3">事上炼</h3>
              <p className="text-white/60">
                在工作和生活中修炼心性，红尘就是最好的道场
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-white font-bold text-xl mb-3">立志勤学</h3>
              <p className="text-white/60">
                志不立，天下无可成之事。找到人生使命，激发无限潜能
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 数字成就 */}
      <section className="py-12 px-5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-black text-amber-400 mb-2">12年</div>
              <div className="text-white/60">专注心学</div>
            </div>
            <div>
              <div className="text-4xl font-black text-amber-400 mb-2">5万+</div>
              <div className="text-white/60">企业家学员</div>
            </div>
            <div>
              <div className="text-4xl font-black text-amber-400 mb-2">1000+</div>
              <div className="text-white/60">企业受益</div>
            </div>
            <div>
              <div className="text-4xl font-black text-amber-400 mb-2">10万+</div>
              <div className="text-white/60">直播观看</div>
            </div>
          </div>
        </div>
      </section>

      {/* 经典语录 */}
      <section className="py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            📜 阳明先生经典语录
          </h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6">
              <p className="text-white text-lg italic mb-2">
                "此心光明，亦复何言"
              </p>
              <p className="text-white/50 text-sm">— 王阳明临终遗言</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6">
              <p className="text-white text-lg italic mb-2">
                "知是行之始，行是知之成"
              </p>
              <p className="text-white/50 text-sm">— 《传习录》</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6">
              <p className="text-white text-lg italic mb-2">
                "破山中贼易，破心中贼难"
              </p>
              <p className="text-white/50 text-sm">— 王阳明</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6">
              <p className="text-white text-lg italic mb-2">
                "人须在事上磨，方立得住"
              </p>
              <p className="text-white/50 text-sm">— 《传习录》</p>
            </div>
          </div>
        </div>
      </section>

      {/* 课程介绍 */}
      <section id="learn" className="py-12 px-5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            📚 热门课程
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🔥</span>
                <div>
                  <h3 className="text-white font-bold">阳明心学企业家公益学习会</h3>
                  <p className="text-white/60 text-sm">每年阳明先生诞辰举办，累计10万+企业家参与</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-3xl">📖</span>
                <div>
                  <h3 className="text-white font-bold">《传习录》精读班</h3>
                  <p className="text-white/60 text-sm">读原文、悟原理，深入理解阳明心学精髓</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🤝</span>
                <div>
                  <h3 className="text-white font-bold">小微企业公益学习会</h3>
                  <p className="text-white/60 text-sm">助力小微企业主提升格局与境界</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            开启你的心学之旅
          </h2>
          <p className="text-white/70 mb-8">
            加入数万企业家的行列，让阳明智慧照亮你的人生
          </p>
          <div className="inline-flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <p className="text-white/80">📧 咨询热线</p>
            <p className="text-2xl font-bold text-white">400-XXX-XXXX</p>
            <p className="text-white/50 text-sm mt-2">北京润泽园教育科技（集团）有限公司</p>
          </div>
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-8 px-5 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">
          北京润泽园国学院 · 传承中华文化精髓
        </p>
        <p className="text-white/30 text-xs mt-2">
          阳明心学是温暖人心的力量
        </p>
      </footer>
    </div>
  )
}

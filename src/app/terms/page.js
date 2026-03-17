export const metadata = {
  title: '用户协议 - 实用工具箱',
  description: '实用工具箱用户协议，使用本服务前请阅读并同意以下条款。',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            用户协议
          </h1>
          <p className="text-white/60">使用本服务前请阅读并同意以下条款</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="prose prose-invert max-w-none text-white/70 space-y-6">
            <p className="text-white/50 text-sm">更新时间：2024年1月1日</p>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">一、服务条款的确认</h2>
              <p>欢迎使用实用工具箱！请您在使用本服务前仔细阅读本用户协议。当您开始使用本服务时，即表示您已充分阅读、理解并同意接受本协议的所有条款。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">二、服务内容</h2>
              <p>实用工具箱为您提供以下服务：</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>各种在线工具（密码生成、运势测试等）</li>
                <li>趣味娱乐功能（塔罗牌、星座、生肖等）</li>
                <li>AI工具导航和教程</li>
                <li>热门资讯和热搜榜单</li>
              </ul>
              <p className="mt-3">我们保留随时修改、暂停或终止部分或全部服务的权利。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">三、用户行为规范</h2>
              <p>您在使用本服务时不得：</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>违反法律法规或公序良俗</li>
                <li>侵犯他人合法权益</li>
                <li>传播恶意代码、病毒或其他有害程序</li>
                <li>尝试未经授权访问本服务</li>
                <li>从事任何可能影响服务正常运行的行为</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">四、知识产权</h2>
              <p>本服务及其内容（包括但不限于文字、图片、图标、代码等）的知识产权归我们所有。未经授权，您不得复制、修改、传播或使用这些内容。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">五、免责声明</h2>
              <p>本服务按"现状"提供，我们不对以下事项做出任何明示或暗示的保证：</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>服务的持续性和可用性</li>
                <li>结果的准确性和可靠性</li>
                <li>服务无错误或病毒</li>
              </ul>
              <p className="mt-3">在任何情况下，我们不对因使用本服务导致的任何间接、偶然、特殊或后果性损害负责。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">六、娱乐性质声明</h2>
              <p>本服务中的运势测试、塔罗牌、生肖算命等功能仅供娱乐目的，不构成任何形式的预测、建议或诊断。这些结果仅供参考，不应作为重大决策的依据。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">七、第三方链接</h2>
              <p>本服务可能包含指向第三方网站的链接。我们不对这些第三方网站的内容、隐私政策或做法负责。您访问这些网站的风险由您自行承担。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">八、协议变更</h2>
              <p>我们保留随时修改本协议的权利。修改后的协议将在本页面公布。继续使用本服务即表示您接受修改后的协议。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">九、终止服务</h2>
              <p>我们有权在任何时候终止您对本服务的使用，无需事先通知。对于终止前已产生的权利义务，双方仍将予以履行。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">十、适用法律</h2>
              <p>本协议的解释和执行适用中华人民共和国法律。如发生争议，双方应协商解决；协商不成的，任一方可向被告所在地人民法院提起诉讼。</p>
            </section>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a href="/privacy" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 隐私政策
          </a>
          <a href="/about" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            返回关于我们 →
          </a>
        </div>
      </div>
    </div>
  )
}

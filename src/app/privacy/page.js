export const metadata = {
  title: '隐私政策 - 实用工具箱',
  description: '实用工具箱隐私政策，保护您的个人信息安全。',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            隐私政策
          </h1>
          <p className="text-white/60">保护您的个人信息安全</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="prose prose-invert max-w-none text-white/70 space-y-6">
            <p className="text-white/50 text-sm">更新时间：2024年1月1日</p>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">一、收集的信息</h2>
              <p>我们可能会收集以下类型的信息：</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>您主动提供的信息（如姓名、联系方式等）</li>
                <li>使用服务时自动收集的信息（如浏览记录、IP地址等）</li>
                <li>第三方平台分享的信息</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">二、信息使用</h2>
              <p>我们收集的信息将用于：</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>提供和维护我们的服务</li>
                <li>改进和优化用户体验</li>
                <li>向您推送相关信息和更新</li>
                <li>遵守法律法规要求</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">三、信息保护</h2>
              <p>我们采用多种安全措施保护您的个人信息，包括数据加密、安全存储等。但请注意，互联网传输并非100%安全，我们无法保证绝对安全。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">四、信息共享</h2>
              <p>我们不会出售您的个人信息。在以下情况下，我们可能会共享您的信息：</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>获得您的明确同意</li>
                <li>遵守法律法规</li>
                <li>保护我们或用户的权利和财产安全</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">五、Cookie</h2>
              <p>我们使用Cookie来改善用户体验。您可以通过浏览器设置拒绝Cookie，但这可能影响部分功能的使用。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">六、未成年人隐私</h2>
              <p>我们的服务不面向未满18岁的未成年人。如果我们发现收集了未成年人的个人信息，将予以删除。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">七、变更通知</h2>
              <p>我们可能会不时更新本隐私政策。变更后，我们将通过网站公告或电子邮件通知您。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">八、联系我们</h2>
              <p>如您对本隐私政策有任何疑问，请通过页面底部的联系方式与我们联系。</p>
            </section>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a href="/about" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            ← 返回关于我们
          </a>
          <a href="/terms" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
            用户协议 →
          </a>
        </div>
      </div>
    </div>
  )
}

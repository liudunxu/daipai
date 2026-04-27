import PasswordTool from '../../../components/PasswordTool'
import RelatedTools from '../../../components/RelatedTools'
import ShareButtons from '../../../components/ShareButtons'
import FAQSchema from '../../../components/FAQSchema'

export const metadata = {
  title: '在线密码生成器 - 安全随机密码生成工具 | 极客观察',
  description: '免费在线密码生成器，支持自定义长度、大小写字母、数字和特殊符号，一键生成高强度安全随机密码。使用加密级随机数生成，保护您的账户安全。',
  keywords: ['密码生成器', '随机密码', '安全密码', '强密码生成', '密码工具', '在线密码生成'],
}

const passwordFAQs = [
  {
    question: '什么样的密码才算强密码？',
    answer: '强密码通常具备以下特征：长度至少12位以上，包含大小写字母、数字和特殊符号的混合组合，不使用常见单词、生日或连续数字。密码越长、字符种类越丰富，被暴力破解的难度就越高。建议使用16位以上的随机密码。'
  },
  {
    question: '为什么不能使用同一个密码注册多个网站？',
    answer: '如果一个网站发生数据泄露，黑客会尝试用泄露的账号密码去登录其他网站，这叫"撞库攻击"。使用不同的密码可以确保一个网站泄露不会影响其他账户的安全。建议为每个重要账户设置独立密码。'
  },
  {
    question: '这个密码生成器安全吗？生成的密码会被记录吗？',
    answer: '本工具使用浏览器内置的 crypto.getRandomValues() 加密级随机数生成器，所有密码生成过程完全在您的浏览器本地完成，不会传输到任何服务器，不会被记录或存储。关闭页面后密码即消失。'
  },
  {
    question: '密码应该多久更换一次？',
    answer: '目前安全专家建议不必定期更换密码，除非有迹象表明密码可能已泄露。更重要的是为每个账户使用不同的强密码，并启用两步验证（2FA）。如果收到数据泄露通知，应立即更换相关密码。'
  },
  {
    question: '如何记住这么多不同的密码？',
    answer: '推荐使用密码管理器（如1Password、Bitwarden、Dashlane等），只需记住一个主密码，其他密码由管理器安全存储和自动填充。也可以使用助记法，例如将一句话的首字母加上特殊符号和数字组合成密码。'
  },
]

export default function PasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            在线密码生成器
          </h1>
          <p className="text-white/60 text-lg">
            一键生成安全随机密码，保护您的账户安全
          </p>
        </header>

        <PasswordTool />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">为什么需要强密码？</h2>
          <div className="text-white/70 text-sm space-y-3">
            <p>
              在数字化时代，密码是保护个人隐私和财产安全的第一道防线。弱密码是最常见的安全隐患之一。据统计，超过80%的数据泄露事件都与弱密码或重复使用密码有关。一个强密码可以有效抵御暴力破解、字典攻击和撞库攻击等常见的网络威胁。
            </p>
            <p>
              暴力破解是指黑客使用自动化工具尝试所有可能的字符组合来猜测密码。一个8位纯数字密码仅有1亿种组合，现代计算机可以在几秒内破解。而一个包含大小写字母、数字和特殊符号的16位密码，组合数量超过数十万亿亿种，即使使用超级计算机也需要数百万年才能破解。
            </p>
            <p>
              强密码的核心要素包括：<strong className="text-white">足够的长度</strong>（建议12位以上）、<strong className="text-white">字符多样性</strong>（大小写字母、数字、特殊符号混合）、<strong className="text-white">不可预测性</strong>（不使用个人信息、常见单词或键盘模式）。本密码生成器使用浏览器内置的加密级随机数生成器（crypto API），确保每个字符都是真正随机的，生成的密码具有极高的安全性。
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">常见密码安全误区</h2>
          <div className="text-white/70 text-sm space-y-3">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 font-medium mb-1">误区一：用生日或姓名拼音做密码</p>
              <p>这类信息很容易被社工获取，黑客通常会先尝试这些组合。</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 font-medium mb-1">误区二：简单替换字母为数字（如 a→4, o→0）</p>
              <p>现代破解工具早已内置这类替换规则，无法有效提升安全性。</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 font-medium mb-1">误区三：所有账户使用同一个密码</p>
              <p>一个网站泄露会导致所有账户沦陷，务必为每个重要账户设置独立密码。</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 font-medium mb-1">误区四：密码写在便签贴在显示器上</p>
              <p>物理安全同样重要，建议使用加密的密码管理器来存储密码。</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">密码强度参考</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/80 py-2 px-3">密码类型</th>
                  <th className="text-left text-white/80 py-2 px-3">示例</th>
                  <th className="text-left text-white/80 py-2 px-3">破解难度</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3">纯数字（8位）</td>
                  <td className="py-2 px-3 font-mono">12345678</td>
                  <td className="py-2 px-3 text-red-400">几秒</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3">小写字母（8位）</td>
                  <td className="py-2 px-3 font-mono">abcdefgh</td>
                  <td className="py-2 px-3 text-orange-400">几分钟</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3">大小写+数字（8位）</td>
                  <td className="py-2 px-3 font-mono">Ab3xK9mQ</td>
                  <td className="py-2 px-3 text-yellow-400">几小时</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3">全字符类型（12位）</td>
                  <td className="py-2 px-3 font-mono">A3x!K9mQ@pL2</td>
                  <td className="py-2 px-3 text-green-400">数百年</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">全字符类型（16位）</td>
                  <td className="py-2 px-3 font-mono">A3x!K9mQ@pL2#nR</td>
                  <td className="py-2 px-3 text-emerald-400">数百万年</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">常见问题 FAQ</h2>
          <div className="space-y-4">
            {passwordFAQs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex items-center justify-between cursor-pointer text-white/80 hover:text-white font-medium py-2">
                  <span>{faq.question}</span>
                  <span className="ml-2 text-white/40 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-white/60 text-sm mt-2 pl-0 pb-2 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <ShareButtons title="在线密码生成器 - 极客观察" url="/tool/password" />
        <RelatedTools category="tool/password" />
        <FAQSchema faqs={passwordFAQs} />

        <footer className="mt-8 text-center">
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}

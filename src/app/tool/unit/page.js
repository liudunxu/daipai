import UnitTool from '../../../components/UnitTool'
import RelatedTools from '../../../components/RelatedTools'
import ShareButtons from '../../../components/ShareButtons'
import FAQSchema from '../../../components/FAQSchema'

export const metadata = {
  title: '在线单位换算器 - 长度重量温度换算 | 极客观察',
  description: '免费在线单位换算器，支持长度、重量、温度、面积、体积、速度、时间等7大类单位互转。精确换算，即时结果，支持公制和英制单位。',
  keywords: ['单位换算', '单位转换器', '长度换算', '重量换算', '温度换算', '公制英制换算'],
}

const unitFAQs = [
  {
    question: '公制和英制单位有什么区别？',
    answer: '公制（国际单位制）以米、千克、秒为基本单位，采用十进制，是全球绝大多数国家使用的标准。英制以英尺、磅、秒为基本单位，主要在美国、缅甸和利比里亚使用。换算关系：1英尺=0.3048米，1磅=0.4536千克，1英里=1.609千米。'
  },
  {
    question: '摄氏度和华氏度怎么换算？',
    answer: '摄氏度转华氏度公式：°F = °C × 9/5 + 32。华氏度转摄氏度公式：°C = (°F - 32) × 5/9。例如0°C等于32°F（水的冰点），100°C等于212°F（水的沸点）。日常参考：体温37°C等于98.6°F，室温25°C等于77°F。'
  },
  {
    question: '一英里等于多少公里？',
    answer: '1英里（mile）= 1.609344公里（km）。这是国际标准换算值。简单记忆方法：1英里约等于1.6公里。例如高速公路限速60英里/小时约等于96.5公里/小时。在日常使用中，用英里数乘以1.6即可快速估算对应的公里数。'
  },
  {
    question: '一磅等于多少斤？',
    answer: '1磅（lb）= 0.4536千克 = 0.9072斤。简单来说，1磅约等于0.9斤，或者说1斤约等于1.1磅。例如体重150磅约等于68千克或136斤。在购买进口食品时经常需要这个换算。'
  },
  {
    question: '为什么美国还在使用英制单位？',
    answer: '美国是少数几个仍在日常生活中广泛使用英制单位的国家之一。主要原因是历史惯性和转换成本过高——道路标志、工业标准、民众习惯都已深度绑定英制。虽然美国科学界和军方已采用公制，但日常生活中的距离用英里、重量用磅、温度用华氏度。'
  },
]

export default function UnitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            在线单位换算器
          </h1>
          <p className="text-white/60 text-lg">
            长度、重量、温度、面积、体积、速度、时间一站式换算
          </p>
        </header>

        <UnitTool />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">单位换算的历史与意义</h2>
          <div className="text-white/70 text-sm space-y-3">
            <p>
              单位换算是人类文明发展中不可或缺的基础能力。从古代的"尺""寸""斤""两"到现代的国际单位制（SI），度量衡的统一经历了数千年的演变。法国大革命后，米制单位于1795年被正式采用，这是人类历史上第一次以科学方法定义长度单位——将从北极到赤道的子午线长度的千万分之一定义为一米。
            </p>
            <p>
              如今，国际单位制（SI）已被全球绝大多数国家采用为官方度量标准。SI系统以七个基本单位为基础：米（长度）、千克（质量）、秒（时间）、安培（电流）、开尔文（温度）、摩尔（物质的量）和坎德拉（发光强度）。所有其他物理量的单位都可以由这七个基本单位推导而来。
            </p>
            <p>
              然而，由于历史原因，世界上仍有少数国家在日常生活中使用非SI单位。美国、缅甸和利比里亚是目前仅有的三个未全面采用公制的国家。在国际交流、跨境购物、学术研究等场景中，单位换算仍然是一个高频需求。本工具支持长度、重量、温度、面积、体积、速度和时间七大类常用单位的即时换算，帮助您快速完成各种单位转换。
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">常用单位换算速查表</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">📏 长度</h3>
              <div className="text-white/60 text-sm space-y-1">
                <p>1千米 = 0.621英里</p>
                <p>1米 = 3.281英尺</p>
                <p>1英寸 = 2.54厘米</p>
                <p>1英里 = 1.609千米</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">⚖️ 重量</h3>
              <div className="text-white/60 text-sm space-y-1">
                <p>1千克 = 2.205磅</p>
                <p>1磅 = 0.454千克</p>
                <p>1盎司 = 28.35克</p>
                <p>1吨 = 2204.6磅</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">🌡️ 温度</h3>
              <div className="text-white/60 text-sm space-y-1">
                <p>0°C = 32°F（冰点）</p>
                <p>100°C = 212°F（沸点）</p>
                <p>37°C = 98.6°F（体温）</p>
                <p>-40°C = -40°F（交点）</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">📐 面积</h3>
              <div className="text-white/60 text-sm space-y-1">
                <p>1平方米 = 10.764平方英尺</p>
                <p>1公顷 = 15亩</p>
                <p>1平方千米 = 100公顷</p>
                <p>1英亩 = 4047平方米</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">常见问题 FAQ</h2>
          <div className="space-y-4">
            {unitFAQs.map((faq, index) => (
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

        <ShareButtons title="在线单位换算器 - 极客观察" url="/tool/unit" />
        <RelatedTools category="tool/password" />
        <FAQSchema faqs={unitFAQs} />

        <footer className="mt-8 text-center">
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}

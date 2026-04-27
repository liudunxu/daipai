import BmiTool from '../../../components/BmiTool'
import RelatedTools from '../../../components/RelatedTools'
import ShareButtons from '../../../components/ShareButtons'
import FAQSchema from '../../../components/FAQSchema'

export const metadata = {
  title: 'BMI计算器 - 在线体质指数计算 | 极客观察',
  description: '免费在线BMI计算器，支持儿童和成人，根据身高体重快速计算体质指数（BMI），自动判断体重是否正常。包含BMI参考标准表和健康建议。',
  keywords: ['BMI计算器', '体质指数', '体重指数', 'BMI标准', '健康体重', '儿童BMI'],
}

const bmiFAQs = [
  {
    question: 'BMI是怎么计算的？',
    answer: 'BMI（Body Mass Index，身体质量指数）的计算公式为：BMI = 体重(kg) ÷ 身高(m)的平方。例如一个身高170cm、体重65kg的人，BMI = 65 ÷ (1.70)² = 22.5。BMI是世界卫生组织推荐的简单评估体重状况的指标。'
  },
  {
    question: 'BMI的正常范围是多少？',
    answer: '根据中国标准，成人BMI正常范围为18.5-23.9，偏瘦为低于18.5，超重为24-27.9，肥胖为28及以上。需要注意的是，不同国家和地区的BMI标准可能略有差异，亚洲人的标准通常比欧美标准更严格。'
  },
  {
    question: 'BMI适用于所有人吗？有什么局限性？',
    answer: 'BMI不适用于运动员、孕妇、哺乳期妇女和肌肉量较大的人群，因为肌肉比脂肪重，运动员BMI可能偏高但并不肥胖。BMI也不能区分脂肪分布位置，而腹部脂肪（内脏脂肪）比皮下脂肪对健康危害更大。对于这些人群，建议结合体脂率、腰围等指标综合评估。'
  },
  {
    question: '儿童的BMI标准和成人一样吗？',
    answer: '不一样。儿童和青少年的BMI需要根据年龄和性别来评估，因为儿童处于生长发育期，体脂比例会随年龄变化。本计算器已内置中国学生体质标准的年龄和性别分界值，可以对6-18岁的儿童青少年进行准确评估。'
  },
  {
    question: 'BMI偏高应该怎么办？',
    answer: '如果BMI偏高，建议采取以下措施：1）调整饮食结构，减少高热量、高脂肪食物摄入；2）增加运动量，每周至少150分钟中等强度有氧运动；3）保证充足睡眠；4）定期监测体重变化。如果BMI达到肥胖标准（≥28），建议咨询医生排除代谢性疾病。'
  },
]

export default function BMIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            BMI计算器
          </h1>
          <p className="text-white/60 text-lg">
            身体质量指数计算，支持儿童和成人
          </p>
        </header>

        <BmiTool />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">什么是BMI？</h2>
          <div className="text-white/70 text-sm space-y-3">
            <p>
              BMI（Body Mass Index，身体质量指数）是目前国际上最常用的衡量人体胖瘦程度以及是否健康的一个标准。它由比利时统计学家阿道夫·凯特勒（Adolphe Quetelet）在19世纪提出，至今已有近200年的历史。世界卫生组织（WHO）和各国卫生机构都将BMI作为评估体重状况的首选指标。
            </p>
            <p>
              BMI的计算方法非常简单：用体重（千克）除以身高（米）的平方。例如，一个身高1.75米、体重70公斤的人，其BMI为70 ÷ (1.75)² = 22.9，属于正常范围。由于计算简便且不需要特殊设备，BMI被广泛应用于健康体检、流行病学研究和临床实践中。
            </p>
            <p>
              虽然BMI是一个有用的筛查工具，但它并不是万能的。BMI无法区分脂肪和肌肉，也无法反映脂肪在体内的分布情况。一个经常健身的人可能肌肉量较大，BMI偏高但体脂率正常。此外，年龄、性别、种族等因素也会影响BMI的解读。因此，BMI应该与其他健康指标（如腰围、体脂率、血压、血脂等）结合使用，才能全面评估一个人的健康状况。
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">BMI参考标准表</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/80 py-2 px-3">分类</th>
                  <th className="text-left text-white/80 py-2 px-3">BMI范围</th>
                  <th className="text-left text-white/80 py-2 px-3">健康风险</th>
                  <th className="text-left text-white/80 py-2 px-3">建议</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3 text-blue-300">偏瘦</td>
                  <td className="py-2 px-3">&lt; 18.5</td>
                  <td className="py-2 px-3">营养不良、免疫力下降</td>
                  <td className="py-2 px-3">增加营养摄入</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3 text-green-300">正常</td>
                  <td className="py-2 px-3">18.5 - 23.9</td>
                  <td className="py-2 px-3">较低</td>
                  <td className="py-2 px-3">保持健康生活方式</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3 text-yellow-300">超重</td>
                  <td className="py-2 px-3">24.0 - 27.9</td>
                  <td className="py-2 px-3">中等，慢性病风险增加</td>
                  <td className="py-2 px-3">控制饮食，增加运动</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-red-300">肥胖</td>
                  <td className="py-2 px-3">≥ 28.0</td>
                  <td className="py-2 px-3">高，心血管疾病风险显著</td>
                  <td className="py-2 px-3">咨询医生，制定减重计划</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/40 text-xs mt-3">* 以上标准参考中国成人超重和肥胖症预防控制指南</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">影响BMI准确性的因素</h2>
          <div className="text-white/70 text-sm space-y-3">
            <p>
              <strong className="text-white">年龄因素：</strong>随着年龄增长，人体肌肉量会逐渐减少，脂肪比例增加。因此老年人的BMI可能低估其体脂水平。儿童和青少年则因为处于快速生长期，需要使用年龄和性别特异性的BMI标准来评估。
            </p>
            <p>
              <strong className="text-white">性别差异：</strong>一般来说，女性的体脂率比男性高，相同BMI下女性可能拥有更多肌肉。因此有些研究建议对男女使用不同的BMI分界值，但目前大多数标准仍采用统一分界值。
            </p>
            <p>
              <strong className="text-white">种族差异：</strong>亚洲人在相同BMI下往往比欧美人有更高的体脂率和代谢风险。这也是为什么中国的BMI标准（超重为24）比WHO标准（超重为25）更严格的原因。
            </p>
            <p>
              <strong className="text-white">肌肉量：</strong>运动员或经常进行力量训练的人，由于肌肉密度大于脂肪，BMI可能显示超重或肥胖，但实际上体脂率正常。这类人群应结合体脂率测量来评估。
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">常见问题 FAQ</h2>
          <div className="space-y-4">
            {bmiFAQs.map((faq, index) => (
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

        <ShareButtons title="BMI计算器 - 极客观察" url="/tool/bmi" />
        <RelatedTools category="tool/password" />
        <FAQSchema faqs={bmiFAQs} />

        <footer className="mt-8 text-center">
          <div className="text-white/40 text-sm">
            <p>BMI计算公式：体重(kg) ÷ 身高(m)²</p>
            <p className="mt-1">儿童判断标准参考中国学生体质标准</p>
          </div>
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors mt-2 inline-block">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}

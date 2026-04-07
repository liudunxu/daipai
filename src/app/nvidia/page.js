'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import { AdBanner } from '../../components/Ads'
import RelatedTools from '../../components/RelatedTools'

// 演讲核心内容数据
const speechContent = [
  {
    title: '推理时代到来',
    icon: '🚀',
    points: [
      'AI从"训练时代"全面进入"推理时代"',
      '推理算力需求将在未来18个月增长100倍',
      'Token成本下降推动AI应用爆发',
      '到2027年AI算力需求至少1万亿美元'
    ]
  },
  {
    title: 'Blackwell & Rubin订单爆发',
    icon: '📊',
    points: [
      'Blackwell和Rubin采购订单达5000亿美元',
      '2027年前订单总量预计突破1万亿美元',
      'Vera Rubin平台已全面投产',
      '算力相比上一代提升350倍'
    ]
  },
  {
    title: 'Token工厂经济学',
    icon: '🏭',
    points: [
      '每个公司都将成为AI工厂',
      'Token将成为新时代的"电力"',
      'CUDA飞轮效应持续强化',
      'AI工厂将消耗大量电力和芯片'
    ]
  },
  {
    title: 'Agent（智能体）革命',
    icon: '🤖',
    points: [
      'AI Agent将重塑未来职场',
      '80%的SaaS应用将被Agent取代',
      'OpenClaw成为Agent操作系统',
      '"龙虾"就是新的操作系统'
    ]
  },
  {
    title: '物理AI与机器人',
    icon: '🦾',
    points: [
      '物理AI理解真实物理世界',
      '自动驾驶将成为汽车标配（5-10年）',
      '人形机器人商业化加速',
      '合成数据训练AI成为主流'
    ]
  },
  {
    title: '数据中心转型',
    icon: '🏢',
    points: [
      '从芯片公司转型AI基础设施',
      '发布Feynman新架构',
      '全栈垂直整合计算平台',
      'GPU集群成为AI工厂核心'
    ]
  }
]

// 关键技术产品
const products = [
  { name: 'Vera Rubin', desc: '新一代AI超级计算机，算力提升350倍', year: '2026' },
  { name: 'Blackwell', desc: '当前旗舰GPU，已获5000亿订单', year: '2024' },
  { name: 'OpenClaw', desc: 'Agent操作系统，开源AI Agent框架', year: '2025' },
  { name: 'Feynman', desc: '新一代GPU架构，预计2027年发布', year: '2027' },
  { name: 'CUDA', desc: 'GPU计算平台，开发者生态核心', year: '2006' },
]

export default function NvidiaPage() {
  const [expandedSection, setExpandedSection] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-3xl mx-auto">
        {/* 头部 */}
        <header className="text-center mb-10">
          <div className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm mb-4">
            📅 2026年3月16日 GTC大会
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
            黄仁勋 GTC 2026
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> 演讲总结</span>
          </h1>
          <p className="text-white/60">
            英伟达CEO主题演讲核心要点，一文看懂AI未来方向
          </p>
        </header>

        {/* 核心数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-4 text-center border border-green-500/30">
            <div className="text-3xl font-black text-green-400">1万亿美元</div>
            <div className="text-white/60 text-sm">2027年算力需求</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-4 text-center border border-purple-500/30">
            <div className="text-3xl font-black text-purple-400">5000亿美元</div>
            <div className="text-white/60 text-sm">Blackwell订单</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 text-center border border-blue-500/30">
            <div className="text-3xl font-black text-blue-400">350倍</div>
            <div className="text-white/60 text-sm">Rubin算力提升</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-4 text-center border border-orange-500/30">
            <div className="text-3xl font-black text-orange-400">80%</div>
            <div className="text-white/60 text-sm">SaaS将被取代</div>
          </div>
        </div>

        {/* 六大核心要点 */}
        <div className="space-y-4 mb-10">
          {speechContent.map((section, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === index ? -1 : index)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-2xl">{section.icon}</span>
                <span className="flex-1 text-white font-bold text-lg">{section.title}</span>
                <span className={`text-white/40 transition-transform ${expandedSection === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedSection === index && (
                <div className="px-5 pb-5">
                  <ul className="space-y-3">
                    {section.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 关键技术产品 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-4 text-center">🔬 关键技术产品</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {products.map((product, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  {product.year}
                </div>
                <div>
                  <div className="text-white font-bold">{product.name}</div>
                  <div className="text-white/50 text-xs">{product.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 原文链接 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4 text-center">📖 相关报道</h2>
          <div className="space-y-3">
            <a href="https://finance.sina.com.cn/wm/2026-03-18/doc-inhrikrn3817740.shtml" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
              <span className="text-green-400">📰</span>
              <span className="text-white/80 text-sm">新浪财经：推理时代到来，2027营收至少万亿美元</span>
            </a>
            <a href="https://www.infoq.cn/article/MSc2PuVcBuYd1afpAGC1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
              <span className="text-blue-400">📰</span>
              <span className="text-white/80 text-sm">InfoQ：所有SaaS公司都将消失</span>
            </a>
            <a href="https://zhuanlan.zhihu.com/p/2017120836344100825" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
              <span className="text-purple-400">📰</span>
              <span className="text-white/80 text-sm">知乎：GTC 2026完整整理</span>
            </a>
          </div>
        </div>

        {/* 广告 */}
        <div className="mb-8">
          <AdBanner />
        </div>

        {/* 分享 */}
        <ShareButtons title="黄仁勋GTC 2026演讲总结 - 英伟达AI最新动向" url="/nvidia" />

        {/* 相关推荐 */}
        <RelatedTools category="nvidia" />

        {/* 底部 */}
        <footer className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">
            ← 更多工具
          </a>
        </footer>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import ShareButtons from '../../components/ShareButtons'
import { AdBanner } from '../../components/Ads'

// 阿里组织架构调整内容数据
const adjustments = [
  {
    title: 'ATH 事业群成立',
    date: '2026年3月16日',
    icon: '🎯',
    points: [
      '阿里巴巴正式成立 Alibaba Token Hub（ATH）事业群',
      '与电商、云智能两大事业群平级',
      'CEO 吴泳铭亲自带队，五大战线同时铺开',
      '整合通义实验室等 AI 业务',
      '商业模式转向"卖 Token/卖服务"'
    ]
  },
  {
    title: '1+6+N 框架调整',
    date: '2025年',
    icon: '🔄',
    points: [
      '停止分拆阿里云',
      '蔡崇信、吴泳铭收权',
      '蒋凡进入核心权力层',
      '电商事业群成立，蒋凡负责',
      '从张勇时代激进分拆转向集中'
    ]
  },
  {
    title: 'AI 战略升级',
    date: '2025-2026',
    icon: '🤖',
    points: [
      'AI 是"历史性机遇"',
      '未来三年将加大 AI 投入',
      'AI+云成为核心战略',
      '马云、蔡崇信、吴泳铭齐聚谈 AI',
      '坚定不移加大 AI 基础设施投入'
    ]
  },
  {
    title: '人事调整',
    date: '2025-2026',
    icon: '👥',
    points: [
      '蔡崇信兼任菜鸟网络董事长',
      '吴泳铭兼任阿里云董事长',
      '蒋凡晋升为合伙委员会成员',
      '吴嘉从淘天调任阿里云',
      '合伙人从26名减少到17名'
    ]
  },
  {
    title: '核心管理层表态',
    date: '2026年',
    icon: '💬',
    points: [
      '蔡崇信：全栈型企业将脱颖而出',
      '吴泳铭：AI 是未来十年最大增量',
      '马云：关注 AI 带来的挑战和机会',
      '蒋凡：负责整合后电商事业群',
      'AI 已成为业务增长核心驱动力'
    ]
  }
]

// 关键数据
const keyData = [
  { value: '3', label: '大事业群并立', desc: '电商、阿里云、ATH' },
  { value: '3年', label: 'AI 投入规划', desc: '加大基础设施投资' },
  { value: '17', label: '合伙人数量', desc: '从26名精简至17名' },
  { value: 'CEO', label: '吴泳铭直管', desc: '亲自带队 ATH' },
]

export default function AlibabaPage() {
  const [expandedSection, setExpandedSection] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 py-8 px-5">
      <div className="max-w-3xl mx-auto">
        {/* 头部 */}
        <header className="text-center mb-10">
          <div className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm mb-4">
            📅 2025-2026 组织变革
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
            阿里巴巴
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"> 组织架构调整</span>
          </h1>
          <p className="text-white/60">
            从"1+6+N"到ATH事业群，一文看懂阿里AI转型
          </p>
        </header>

        {/* 关键数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {keyData.map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-orange-400">{item.value}</div>
              <div className="text-white font-bold text-sm">{item.label}</div>
              <div className="text-white/50 text-xs">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* 五大调整要点 */}
        <div className="space-y-4 mb-10">
          {adjustments.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === index ? -1 : index)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-bold text-lg">{item.title}</div>
                  <div className="text-orange-400 text-xs">{item.date}</div>
                </div>
                <span className={`text-white/40 transition-transform ${expandedSection === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedSection === index && (
                <div className="px-5 pb-5">
                  <ul className="space-y-3">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70">
                        <span className="text-orange-400 mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 组织架构图示 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-white mb-4 text-center">🏗️ 当前组织架构</h2>
          <div className="flex flex-col items-center gap-3">
            <div className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold">
              阿里巴巴集团
            </div>
            <div className="text-white/30 text-2xl">▼</div>
            <div className="grid md:grid-cols-3 gap-3 w-full">
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-center">
                <div className="text-white font-bold">电商事业群</div>
                <div className="text-blue-400 text-xs">蒋凡负责</div>
              </div>
              <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl text-center">
                <div className="text-white font-bold">阿里云</div>
                <div className="text-purple-400 text-xs">吴泳铭兼任</div>
              </div>
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center">
                <div className="text-white font-bold">ATH</div>
                <div className="text-green-400 text-xs">吴泳铭直管</div>
              </div>
            </div>
          </div>
        </div>

        {/* 原文链接 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4 text-center">📰 相关报道</h2>
          <div className="space-y-3">
            <a href="https://www.huxiu.com/article/4842795.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
              <span className="text-orange-400">📰</span>
              <span className="text-white/80 text-sm">虎嗅：CEO亲自下场，阿里All in Token</span>
            </a>
            <a href="https://finance.sina.com.cn/roll/2026-03-17/doc-inhrieiq3836047.shtml" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
              <span className="text-red-400">📰</span>
              <span className="text-white/80 text-sm">新浪：送别林俊旸，阿里AI变阵ATH</span>
            </a>
            <a href="https://www.guancha.cn/economy/2026_03_17_810416.shtml" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
              <span className="text-blue-400">📰</span>
              <span className="text-white/80 text-sm">观察者网：阿里AI变阵归核千问</span>
            </a>
          </div>
        </div>

        {/* 广告 */}
        <div className="mb-8">
          <AdBanner />
        </div>

        {/* 分享 */}
        <ShareButtons title="阿里巴巴组织架构调整 - 2025-2026最新变化" url="/alibaba" />

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

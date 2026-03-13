'use client'

import { useState } from 'react'
import VIPBadge from '@/components/VIPBadge'
import DonateButton from '@/components/DonateButton'

// 中国常见100个人名
const NAMES = [
  '王伟', '王芳', '李明', '李丽', '张强', '张敏', '刘洋', '刘艳',
  '陈静', '陈军', '杨涛', '杨慧', '黄磊', '黄静', '赵磊', '赵敏',
  '周杰', '周丽', '吴涛', '吴敏', '徐鹏', '徐静', '孙杰', '孙丽',
  '马超', '马丽', '朱华', '朱敏', '胡斌', '胡丽', '郭磊', '郭静',
  '何平', '何丽', '高鹏', '高敏', '林涛', '林丽', '罗勇', '罗静',
  '梁慧', '梁杰', '宋磊', '宋丽', '郑强', '郑丽', '韩磊', '韩丽',
  '冯华', '冯敏', '于涛', '于丽', '董鹏', '董静', '潘杰', '潘丽',
  '袁磊', '袁敏', '蒋涛', '蒋丽', '蔡磊', '蔡静', '余杰', '余丽',
  '杜磊', '杜敏', '叶磊', '叶丽', '苏敏', '苏杰', '魏磊', '魏丽',
  '卢涛', '卢敏', '姜杰', '姜丽', '崔磊', '崔敏', '钟杰', '钟丽',
  '汪磊', '汪敏', '田杰', '田丽', '石磊', '石敏', '陆杰', '陆丽',
  '金磊', '金敏', '雨磊', '雨丽', '海磊', '海敏', '山磊', '山丽',
  '河磊', '河敏', '江杰', '江丽', '川磊', '川敏'
]

export default function NamesPage() {
  const [search, setSearch] = useState('')

  // 过滤名字
  const filteredNames = search
    ? NAMES.filter(name => name.includes(search))
    : NAMES

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            📛 中国常用姓名大全
          </h1>
          <p className="text-white/60">
            收录100个最常用的中国人名
          </p>
        </header>

        {/* 搜索框 */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="搜索姓名..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
          />
        </div>

        {/* 统计信息 */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="px-4 py-2 bg-white/10 rounded-full">
            <span className="text-white/60">共</span>
            <span className="text-white font-bold ml-2">{NAMES.length}</span>
            <span className="text-white/60 ml-1">个</span>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-full">
            <span className="text-white/60">搜索到</span>
            <span className="text-white font-bold ml-2">{filteredNames.length}</span>
            <span className="text-white/60 ml-1">个</span>
          </div>
        </div>

        {/* 名字列表 */}
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filteredNames.map((name, index) => (
            <div
              key={index}
              className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-center hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span className="text-white font-medium">{name}</span>
            </div>
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredNames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40 text-lg">未找到匹配的姓名</p>
          </div>
        )}

        {/* VIP付费内容 */}
        <section className="mt-12 p-6 bg-white/5 rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <VIPBadge text="VIP" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4 text-center">解锁完整姓名分析</h2>
          <div className="text-white/60 space-y-3 mb-6">
            <p>
              中国姓氏源远流长，最常见的有王、李、张、刘、陈、杨、赵、黄、周、吴等。
              这些姓氏在中国人口中占比较大，是取名的重要参考。
            </p>
            <p>
              本页面收录了100个最常用的中国人名，包括单字名和双字名，
              可供取名参考、姓名测试等用途。中国人名通常由姓和名组成，
              姓名文化蕴含着丰富的历史和家族传承意义。
            </p>
          </div>
          <div className="text-center">
            <p className="text-white/60 mb-4">打赏支持，解锁更多姓名分析功能</p>
            <DonateButton />
          </div>
        </section>

        {/* 底部 */}
        <footer className="mt-8 text-center">
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← 返回首页
          </a>
        </footer>
      </div>
    </div>
  )
}

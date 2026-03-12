'use client'

import { useState } from 'react'

const mapping = {
  '啊': '吖', '的': 'de', '是': '蕐', '我': '卧', '你': '泥',
  '爱': 'AI', '心': '吣', '想': '相', '你': 'ń', '我': '莪',
  '人': '亽', '永': '永远', '远': '萵', '在': 'zai',
  '一': '①', '二': '②', '三': '③', '四': '④', '五': '⑤',
  '六': '⑥', '七': '⑦', '八': '⑧', '九': '⑨', '十': '⑩',
}

export default function HuoxingPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convert = (text) => {
    let result = text
    Object.entries(mapping).forEach(([k, v]) => {
      result = result.replace(new RegExp(k, 'g'), v)
    })
    // 简单 Unicode 偏移
    result = result.split('').map(c => {
      const code = c.charCodeAt(0)
      if (code >= 0x4e00 && code <= 0x9fff) {
        return String.fromCharCode(code + 0x1f300 - 0x4e00)
      }
      return c
    }).join('')
    return result
  }

  const handleInput = (e) => {
    const text = e.target.value
    setInput(text)
    setOutput(convert(text))
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      alert('✅ 已复制！')
    } catch {
      alert('复制失败')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">✨ 火星文转换器</h1>
          <p className="text-white/60">文字一键转换为火星文</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <label className="text-white/80 block mb-2">输入文字</label>
          <textarea
            value={input}
            onChange={handleInput}
            placeholder="输入要转换的文字..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white h-32 resize-none"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <label className="text-white/80 block mb-2">转换结果</label>
          <div className="bg-white/10 rounded-xl p-4 min-h-32 text-white/80 text-lg">
            {output || '转换结果将显示在这里'}
          </div>
          <button
            onClick={copy}
            disabled={!output}
            className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl disabled:opacity-50"
          >
            📋 复制火星文
          </button>
        </div>
      </div>
    </div>
  )
}

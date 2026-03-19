'use client'

import { useState } from 'react'
import AffiliateLink from '../../../components/AffiliateLink'

// 简单的MD5实现
function md5(string) {
  function rotateLeft(value, shift) {
    return (value << shift) | (value >>> (32 - shift))
  }

  function addUnsigned(x, y) {
    const x4 = x & 0x80000000
    const y4 = y & 0x80000000
    const x8 = x & 0x40000000
    const y8 = y & 0x40000000
    const result = (x & 0x3fffffff) + (y & 0x3fffffff)
    if (x8 & y8) return result ^ 0x80000000 ^ x4 ^ y4
    if (x8 | y8) {
      if (result & 0x40000000) return result ^ 0xc0000000 ^ x4 ^ y4
      return result ^ 0x40000000 ^ x4 ^ y4
    }
    return result ^ x4 ^ y4
  }

  function f(x, y, z) { return (x & y) | (~x & z) }
  function g(x, y, z) { return (x & z) | (y & ~z) }
  function h(x, y, z) { return x ^ y ^ z }
  function i(x, y, z) { return y ^ (x | ~z) }

  function ff(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  function gg(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  function hh(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  function ii(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  function convertToWordArray(str) {
    const lWordCount = []
    const lMessageLength = str.length
    let lNumberOfWords = (((lMessageLength + 72) >>> 5) << 6) + 1
    lWordCount[lNumberOfWords - 1] = 0
    let lPosition = 0
    while (lPosition < lMessageLength) {
      const lWordIndex = (lPosition - (lPosition % 4)) / 4
      lPosition += 4
      lWordCount[lWordIndex] = (lWordCount[lWordIndex] | (str.charCodeAt(lPosition - 1) << ((lPosition - 1) % 4 * 8)))
    }
    const lWordIndex = (lPosition - (lPosition % 4)) / 4
    lPosition = (lPosition % 4) * 8
    lWordCount[lWordIndex] = lWordCount[lWordIndex] | (0x80 << lPosition)
    lWordCount[lNumberOfWords - 2] = lMessageLength << 3
    lWordCount[lNumberOfWords - 1] = lMessageLength >>> 29
    return lWordCount
  }

  function wordToHex(value) {
    let hex = ''
    for (let i = 0; i <= 3; i++) {
      hex += ((value >>> (i * 8)) & 255).toString(16).padStart(2, '0')
    }
    return hex
  }

  const x = convertToWordArray(string)
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476

  const S11 = 7, S12 = 12, S13 = 17, S14 = 22
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d
    a = ff(a, b, c, d, x[k], S11, 0xd76aa478); d = ff(d, a, b, c, x[k + 1], S12, 0xe8c7b756)
    c = ff(c, d, a, b, x[k + 2], S13, 0x242070db); b = ff(b, c, d, a, x[k + 3], S14, 0xc1bdceee)
    a = ff(a, b, c, d, x[k + 4], S11, 0xf57c0faf); d = ff(d, a, b, c, x[k + 5], S12, 0x4787c62a)
    c = ff(c, d, a, b, x[k + 6], S13, 0xa8304613); b = ff(b, c, d, a, x[k + 7], S14, 0xfd469501)
    a = ff(a, b, c, d, x[k + 8], S11, 0x698098d8); d = ff(d, a, b, c, x[k + 9], S12, 0x8b44f7af)
    c = ff(c, d, a, b, x[k + 10], S13, 0xffff5bb1); b = ff(b, c, d, a, x[k + 11], S14, 0x895cd7be)
    a = ff(a, b, c, d, x[k + 12], S11, 0x6b901122); d = ff(d, a, b, c, x[k + 13], S12, 0xfd987193)
    c = ff(c, d, a, b, x[k + 14], S13, 0xa679438e); b = ff(b, c, d, a, x[k + 15], S14, 0x49b40821)
    a = gg(a, b, c, d, x[k + 1], S21, 0xf61e2562); d = gg(d, a, b, c, x[k + 6], S22, 0xc040b340)
    c = gg(c, d, a, b, x[k + 11], S23, 0x265e5a51); b = gg(b, c, d, a, x[k], S24, 0xe9b6c7aa)
    a = gg(a, b, c, d, x[k + 5], S21, 0xd62f105d); d = gg(d, a, b, c, x[k + 10], S22, 0x2441453)
    c = gg(c, d, a, b, x[k + 15], S23, 0xd8a1e681); b = gg(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)
    a = gg(a, b, c, d, x[k + 9], S21, 0x21e1cde6); d = gg(d, a, b, c, x[k + 14], S22, 0xc33707d6)
    c = gg(c, d, a, b, x[k + 3], S23, 0xf4d50d87); b = gg(b, c, d, a, x[k + 8], S24, 0x455a14ed)
    a = gg(a, b, c, d, x[k + 13], S21, 0xa9e3e905); d = gg(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)
    c = gg(c, d, a, b, x[k + 7], S23, 0x676f02d9); b = gg(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)
    a = hh(a, b, c, d, x[k + 5], S31, 0xfffa3942); d = hh(d, a, b, c, x[k + 8], S32, 0x8771f681)
    c = hh(c, d, a, b, x[k + 11], S33, 0x6d9d6122); b = hh(b, c, d, a, x[k + 14], S34, 0xfde5380c)
    a = hh(a, b, c, d, x[k + 1], S31, 0xa4beea44); d = hh(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)
    c = hh(c, d, a, b, x[k + 7], S33, 0xf6bb4b60); b = hh(b, c, d, a, x[k + 10], S34, 0xbebfbc70)
    a = hh(a, b, c, d, x[k + 13], S31, 0x289b7ec6); d = hh(d, a, b, c, x[k], S32, 0xeaa127fa)
    c = hh(c, d, a, b, x[k + 3], S33, 0xd4ef3085); b = hh(b, c, d, a, x[k + 6], S34, 0x4881d05)
    a = hh(a, b, c, d, x[k + 9], S31, 0xd9d4d039); d = hh(d, a, b, c, x[k + 12], S32, 0xe6db99e5)
    c = hh(c, d, a, b, x[k + 15], S33, 0x1fa27cf8); b = hh(b, c, d, a, x[k + 2], S34, 0xc4ac5665)
    a = ii(a, b, c, d, x[k], S41, 0xf4292244); d = ii(d, a, b, c, x[k + 7], S42, 0x432aff97)
    c = ii(c, d, a, b, x[k + 14], S43, 0xab9423a7); b = ii(b, c, d, a, x[k + 5], S44, 0xfc93a039)
    a = ii(a, b, c, d, x[k + 12], S41, 0x655b59c3); d = ii(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)
    c = ii(c, d, a, b, x[k + 10], S43, 0xffeff47d); b = ii(b, c, d, a, x[k + 1], S44, 0x85845dd1)
    a = ii(a, b, c, d, x[k + 8], S41, 0x6fa87e4f); d = ii(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)
    c = ii(c, d, a, b, x[k + 6], S43, 0xa3014314); b = ii(b, c, d, a, x[k + 13], S44, 0x4e0811a1)
    a = ii(a, b, c, d, x[k + 4], S41, 0xf7537e82); d = ii(d, a, b, c, x[k + 11], S42, 0xbd3af235)
    c = ii(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb); b = ii(b, c, d, a, x[k + 9], S44, 0xeb86d391)
    a = addUnsigned(a, AA); b = addUnsigned(b, BB); c = addUnsigned(c, CC); d = addUnsigned(d, DD)
  }

  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase()
}

export default function DevToolsPage() {
  const [activeTab, setActiveTab] = useState('json')

  // JSON 工具状态
  const [jsonInput, setJsonInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [jsonError, setJsonError] = useState('')

  // 时间戳工具状态
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000))
  const [customDate, setCustomDate] = useState('')

  // Base64工具状态
  const [base64Input, setBase64Input] = useState('')
  const [base64Output, setBase64Output] = useState('')
  const [base64Mode, setBase64Mode] = useState('encode')

  // MD5工具状态
  const [md5Input, setMd5Input] = useState('')
  const [md5Output, setMd5Output] = useState('')

  // JSON 格式化/校验
  const handleJsonFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonOutput(formatted)
      setJsonError('')
    } catch (e) {
      setJsonError(e.message)
      setJsonOutput('')
    }
  }

  const handleJsonValidate = () => {
    try {
      JSON.parse(jsonInput)
      setJsonError('✅ JSON格式正确！')
      setJsonOutput('')
    } catch (e) {
      setJsonError(`❌ 格式错误: ${e.message}`)
      setJsonOutput('')
    }
  }

  const handleJsonCompress = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed))
      setJsonError('')
    } catch (e) {
      setJsonError(e.message)
      setJsonOutput('')
    }
  }

  // 时间戳转换
  const getCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000))
  }

  const convertTimestamp = () => {
    const date = new Date(timestamp * 1000)
    setCustomDate(date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }))
  }

  const convertDateToTimestamp = () => {
    if (!customDate) return
    try {
      const date = new Date(customDate)
      setTimestamp(Math.floor(date.getTime() / 1000))
    } catch {
      setTimestamp(0)
    }
  }

  // Base64 编解码
  const handleBase64Encode = () => {
    try {
      setBase64Output(btoa(unescape(encodeURIComponent(base64Input))))
    } catch {
      setBase64Output('编码失败，请检查输入')
    }
  }

  const handleBase64Decode = () => {
    try {
      setBase64Output(decodeURIComponent(escape(atob(base64Input))))
    } catch {
      setBase64Output('解码失败，请检查输入是否是有效的Base64字符串')
    }
  }

  // MD5 加密
  const handleMd5Hash = () => {
    setMd5Output(md5(md5Input))
  }

  // 复制到剪贴板
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('✅ 已复制到剪贴板！')
    } catch {
      alert('复制失败')
    }
  }

  const tabs = [
    { id: 'json', name: '📋 JSON校验/格式化' },
    { id: 'timestamp', name: '⏰ 时间戳转换' },
    { id: 'base64', name: '🔐 Base64加密/解密' },
    { id: 'md5', name: '🔒 MD5序列化' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🛠️ 在线开发工具</h1>
          <p className="text-white/60">程序员老铁必备的几个小工具，贼拉好用！</p>
        </header>

        {/* 标签页 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* JSON 工具 */}
        {activeTab === 'json' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">📋 JSON校验与格式化</h3>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="粘贴你的JSON内容..."
              className="w-full h-40 bg-white/10 border border-white/20 rounded-xl p-4 text-white/90 font-mono text-sm mb-4 resize-y"
            />
            {jsonError && (
              <div className={`p-3 rounded-xl mb-4 ${jsonError.includes('正确') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {jsonError}
              </div>
            )}
            {jsonOutput && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">格式化结果：</span>
                  <button onClick={() => copyToClipboard(jsonOutput)} className="text-blue-400 hover:text-blue-300 text-sm">
                    📋 复制
                  </button>
                </div>
                <pre className="bg-white/10 rounded-xl p-4 text-white/90 font-mono text-sm overflow-x-auto">
                  {jsonOutput}
                </pre>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <button onClick={handleJsonFormat} className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl">
                ✨ 格式化
              </button>
              <button onClick={handleJsonValidate} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl">
                ✅ 校验
              </button>
              <button onClick={handleJsonCompress} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl">
                🗜️ 压缩
              </button>
              <button onClick={() => { setJsonInput(''); setJsonOutput(''); setJsonError(''); }} className="px-6 py-2 bg-white/10 text-white/70 font-bold rounded-xl">
                🗑️ 清空
              </button>
            </div>
          </div>
        )}

        {/* 时间戳工具 */}
        {activeTab === 'timestamp' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">⏰ 时间戳转换</h3>

            <div className="mb-6">
              <label className="text-white/60 block mb-2">当前时间戳（秒）</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={timestamp}
                  onChange={(e) => setTimestamp(Number(e.target.value))}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-mono"
                />
                <button onClick={getCurrentTimestamp} className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl">
                  📌 此刻
                </button>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <div className="text-white/60 text-sm mb-1">转换结果</div>
              <div className="text-white font-mono text-lg">{new Date(timestamp * 1000).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</div>
              <div className="text-white/50 text-sm mt-1">
                毫秒级: {timestamp * 1000}
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button onClick={convertTimestamp} className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl">
                ⏱️ 转日期
              </button>
            </div>

            <div className="border-t border-white/10 pt-6">
              <label className="text-white/60 block mb-2">日期转时间戳</label>
              <div className="flex gap-3">
                <input
                  type="datetime-local"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                />
                <button onClick={convertDateToTimestamp} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl">
                  🔄 转时间戳
                </button>
              </div>
            </div>

            {/* 常用时间点 */}
            <div className="mt-6">
              <div className="text-white/60 text-sm mb-3">📌 常用时间点</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '今天零点', ts: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000) },
                  { label: '昨天零点', ts: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000) - 86400 },
                  { label: '本周一', ts: Math.floor((new Date().setHours(0, 0, 0, 0) - new Date().getDay() * 86400) / 1000) },
                  { label: '本月一号', ts: Math.floor(new Date(new Date().getFullYear(), new Date().getMonth(), 1).setHours(0, 0, 0, 0) / 1000) },
                  { label: '一年后', ts: Math.floor(Date.now() / 1000) + 31536000 },
                  { label: '2026-01-01', ts: 1735689600 },
                  { label: '2030-01-01', ts: 1893456000 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setTimestamp(item.ts)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Base64 工具 */}
        {activeTab === 'base64' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">🔐 Base64 加密/解密</h3>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => { setBase64Mode('encode'); setBase64Output(''); }}
                className={`px-6 py-2 font-bold rounded-xl transition-all ${
                  base64Mode === 'encode' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-white/10 text-white/70'
                }`}
              >
                🔒 加密
              </button>
              <button
                onClick={() => { setBase64Mode('decode'); setBase64Output(''); }}
                className={`px-6 py-2 font-bold rounded-xl transition-all ${
                  base64Mode === 'decode' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-white/10 text-white/70'
                }`}
              >
                🔓 解密
              </button>
            </div>

            <textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder={base64Mode === 'encode' ? '输入要加密的文本...' : '输入要解密的Base64字符串...'}
              className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white/90 font-mono text-sm mb-4 resize-y"
            />

            {base64Output && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">{base64Mode === 'encode' ? '加密结果' : '解密结果'}：</span>
                  <button onClick={() => copyToClipboard(base64Output)} className="text-blue-400 hover:text-blue-300 text-sm">
                    📋 复制
                  </button>
                </div>
                <pre className="bg-white/10 rounded-xl p-4 text-white/90 font-mono text-sm break-all">
                  {base64Output}
                </pre>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={base64Mode === 'encode' ? handleBase64Encode : handleBase64Decode}
                className={`px-6 py-3 font-bold rounded-xl ${
                  base64Mode === 'encode'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                }`}
              >
                {base64Mode === 'encode' ? '🔒 加密' : '🔓 解密'}
              </button>
              <button onClick={() => { setBase64Input(''); setBase64Output(''); }} className="px-6 py-3 bg-white/10 text-white/70 font-bold rounded-xl">
                🗑️ 清空
              </button>
            </div>
          </div>
        )}

        {/* MD5 工具 */}
        {activeTab === 'md5' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">🔒 MD5 哈希加密</h3>
            <p className="text-white/60 text-sm mb-4">
              MD5是一种常用的哈希算法，可将任意长度字符串转换为32位十六进制哈希值
            </p>

            <textarea
              value={md5Input}
              onChange={(e) => setMd5Input(e.target.value)}
              placeholder="输入要哈希的文本..."
              className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white/90 font-mono text-sm mb-4 resize-y"
            />

            {md5Output && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">MD5 哈希值：</span>
                  <button onClick={() => copyToClipboard(md5Output)} className="text-blue-400 hover:text-blue-300 text-sm">
                    📋 复制
                  </button>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-green-400 font-mono text-lg break-all">
                  {md5Output}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={handleMd5Hash} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl">
                🔐 生成MD5
              </button>
              <button onClick={() => { setMd5Input(''); setMd5Output(''); }} className="px-6 py-3 bg-white/10 text-white/70 font-bold rounded-xl">
                🗑️ 清空
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="text-yellow-400/80 text-sm">
                ⚠️ 注意：MD5不是加密算法，而是哈希函数，相同输入永远产生相同输出。它不适合用于密码存储，请使用bcrypt、scrypt等专业密码哈希算法。
              </p>
            </div>
          </div>
        )}

        {/* 推广 */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3 text-center">🚀 推荐：更专业的开发工具</h3>
          <p className="text-white/60 text-sm mb-4 text-center">
            这些工具贼拉好用，程序员老铁都在用！
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <AffiliateLink url="https://vscode.dev" text="VS Code 在线版" platform="web" />
            <AffiliateLink url="https://github.com" text="GitHub" platform="web" />
            <AffiliateLink url="https://regexr.com" text="正则表达式测试" platform="web" />
          </div>
        </div>

        {/* 返回导航 */}
        <div className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/70 transition-colors">
            ← 返回导航页
          </a>
        </div>
      </div>
    </div>
  )
}
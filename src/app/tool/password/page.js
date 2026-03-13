'use client'

import { useState } from 'react'
import AffiliateLink from '@/components/AffiliateLink'

export default function PasswordPage() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [password, setPassword] = useState('')

  const generate = () => {
    let chars = ''
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (options.numbers) chars += '0123456789'
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const copy = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      alert('✅ 已复制！')
    } catch {
      alert('复制失败')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🔐 密码生成器</h1>
          <p className="text-white/60">生成安全强密码</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <label className="text-white/80 block mb-2">长度: {length}</label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2 mb-6">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="flex items-center gap-2 text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setOptions({...options, [key]: e.target.checked})}
                  className="w-4 h-4"
                />
                {key === 'uppercase' && '大写字母 A-Z'}
                {key === 'lowercase' && '小写字母 a-z'}
                {key === 'numbers' && '数字 0-9'}
                {key === 'symbols' && '符号 !@#$%'}
              </label>
            ))}
          </div>

          <button
            onClick={generate}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl"
          >
            🎲 生成密码
          </button>
        </div>

        {password && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-center">
            <p className="text-white font-mono text-lg mb-4 break-all">{password}</p>
            <button onClick={copy} className="px-6 py-2 bg-green-500 text-white rounded-lg">
              📋 复制
            </button>
          </div>
        )}

        {/* 联盟推广 */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3 text-center">🔐 推荐：密码管理器</h3>
          <p className="text-white/60 text-sm mb-4 text-center">
            生成的密码太多记不住？试试专业的密码管理器
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <AffiliateLink
              url="https://1password.com"
              text="1Password"
              platform="app"
            />
            <AffiliateLink
              url="https://bitwarden.com"
              text="Bitwarden"
              platform="app"
            />
            <AffiliateLink
              url="https://dashlane.com"
              text="Dashlane"
              platform="app"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

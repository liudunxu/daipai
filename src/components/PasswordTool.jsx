'use client'

import { useState } from 'react'

export default function PasswordTool() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [strength, setStrength] = useState(null)

  const calculateStrength = (pwd) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (pwd.length >= 16) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[a-z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    if (pwd.length >= 20) score++

    if (score <= 2) return { level: '弱', color: 'text-red-400', bg: 'bg-red-500', width: '25%' }
    if (score <= 4) return { level: '中等', color: 'text-yellow-400', bg: 'bg-yellow-500', width: '50%' }
    if (score <= 6) return { level: '强', color: 'text-green-400', bg: 'bg-green-500', width: '75%' }
    return { level: '非常强', color: 'text-emerald-400', bg: 'bg-emerald-500', width: '100%' }
  }

  const generate = () => {
    let chars = ''
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (options.numbers) chars += '0123456789'
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'

    let result = ''
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    for (let i = 0; i < length; i++) {
      result += chars.charAt(array[i] % chars.length)
    }
    setPassword(result)
    setStrength(calculateStrength(result))
    setCopied(false)
  }

  const copy = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
        <div className="mb-4">
          <label className="text-white/80 block mb-2 text-sm">
            密码长度: <span className="text-blue-400 font-bold text-lg">{length}</span>
          </label>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-white/40 text-xs mt-1">
            <span>6</span>
            <span>64</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 text-white/70 cursor-pointer bg-white/5 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions({...options, [key]: e.target.checked})}
                className="w-4 h-4 accent-blue-500"
              />
              {key === 'uppercase' && '大写 A-Z'}
              {key === 'lowercase' && '小写 a-z'}
              {key === 'numbers' && '数字 0-9'}
              {key === 'symbols' && '符号 !@#$'}
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all"
        >
          生成密码
        </button>
      </div>

      {password && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="bg-black/30 rounded-xl p-4 mb-4">
            <p className="text-white font-mono text-lg break-all leading-relaxed select-all">{password}</p>
          </div>

          {strength && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60 text-sm">密码强度</span>
                <span className={`font-bold text-sm ${strength.color}`}>{strength.level}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className={`${strength.bg} h-2 rounded-full transition-all duration-300`} style={{ width: strength.width }}></div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={copy}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-green-500/80 hover:bg-green-500 text-white'
              }`}
            >
              {copied ? '已复制' : '复制密码'}
            </button>
            <button
              onClick={generate}
              className="flex-1 py-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg font-medium transition-all"
            >
              重新生成
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'

const categories = [
  {
    name: '长度',
    icon: '📏',
    units: [
      { name: '米', symbol: 'm', factor: 1 },
      { name: '厘米', symbol: 'cm', factor: 0.01 },
      { name: '毫米', symbol: 'mm', factor: 0.001 },
      { name: '千米', symbol: 'km', factor: 1000 },
      { name: '英寸', symbol: 'in', factor: 0.0254 },
      { name: '英尺', symbol: 'ft', factor: 0.3048 },
      { name: '码', symbol: 'yd', factor: 0.9144 },
      { name: '英里', symbol: 'mi', factor: 1609.344 },
    ],
  },
  {
    name: '重量',
    icon: '⚖️',
    units: [
      { name: '千克', symbol: 'kg', factor: 1 },
      { name: '克', symbol: 'g', factor: 0.001 },
      { name: '毫克', symbol: 'mg', factor: 0.000001 },
      { name: '吨', symbol: 't', factor: 1000 },
      { name: '磅', symbol: 'lb', factor: 0.453592 },
      { name: '盎司', symbol: 'oz', factor: 0.0283495 },
    ],
  },
  {
    name: '温度',
    icon: '🌡️',
    units: [
      { name: '摄氏度', symbol: '°C', factor: 1, isCelsius: true },
      { name: '华氏度', symbol: '°F', factor: 1, isFahrenheit: true },
      { name: '开尔文', symbol: 'K', factor: 1, isKelvin: true },
    ],
  },
  {
    name: '面积',
    icon: '📐',
    units: [
      { name: '平方米', symbol: 'm²', factor: 1 },
      { name: '平方厘米', symbol: 'cm²', factor: 0.0001 },
      { name: '平方千米', symbol: 'km²', factor: 1000000 },
      { name: '公顷', symbol: 'ha', factor: 10000 },
      { name: '亩', symbol: '亩', factor: 666.6667 },
      { name: '平方英尺', symbol: 'ft²', factor: 0.092903 },
    ],
  },
  {
    name: '体积',
    icon: '🧊',
    units: [
      { name: '立方米', symbol: 'm³', factor: 1 },
      { name: '升', symbol: 'L', factor: 0.001 },
      { name: '毫升', symbol: 'mL', factor: 0.000001 },
      { name: '加仑(美)', symbol: 'gal', factor: 0.00378541 },
      { name: '夸脱', symbol: 'qt', factor: 0.000946353 },
      { name: '杯', symbol: 'cup', factor: 0.000236588 },
    ],
  },
  {
    name: '速度',
    icon: '🚀',
    units: [
      { name: '米/秒', symbol: 'm/s', factor: 1 },
      { name: '千米/小时', symbol: 'km/h', factor: 0.277778 },
      { name: '英里/小时', symbol: 'mph', factor: 0.44704 },
      { name: '节', symbol: 'kn', factor: 0.514444 },
      { name: '马赫', symbol: 'Mach', factor: 340.29 },
    ],
  },
  {
    name: '时间',
    icon: '⏱️',
    units: [
      { name: '秒', symbol: 's', factor: 1 },
      { name: '毫秒', symbol: 'ms', factor: 0.001 },
      { name: '分钟', symbol: 'min', factor: 60 },
      { name: '小时', symbol: 'h', factor: 3600 },
      { name: '天', symbol: 'd', factor: 86400 },
      { name: '周', symbol: 'wk', factor: 604800 },
    ],
  },
]

const convertTemperature = (value, fromUnit, toUnit) => {
  let celsius
  if (fromUnit === '°C') celsius = value
  else if (fromUnit === '°F') celsius = (value - 32) * 5 / 9
  else if (fromUnit === 'K') celsius = value - 273.15

  if (toUnit === '°C') return celsius
  else if (toUnit === '°F') return celsius * 9 / 5 + 32
  else if (toUnit === 'K') return celsius + 273.15
}

const formatNumber = (num) => {
  if (Math.abs(num) < 0.0001 || Math.abs(num) >= 10000000) {
    return num.toExponential(4)
  }
  return parseFloat(num.toPrecision(10)).toString()
}

export default function UnitTool() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [inputValue, setInputValue] = useState('')
  const [fromUnit, setFromUnit] = useState(categories[0].units[0])
  const [toUnit, setToUnit] = useState(categories[0].units[1])
  const [result, setResult] = useState(null)

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setFromUnit(category.units[0])
    setToUnit(category.units[1])
    setInputValue('')
    setResult(null)
  }

  const convert = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) {
      setResult(null)
      return
    }
    const value = parseFloat(inputValue)
    let converted
    if (activeCategory.name === '温度') {
      converted = convertTemperature(value, fromUnit.symbol, toUnit.symbol)
    } else {
      const baseValue = value * fromUnit.factor
      converted = baseValue / toUnit.factor
    }
    setResult({ value: converted, formatted: formatNumber(converted) })
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    setResult(null)
  }

  return (
    <div>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button key={cat.name} onClick={() => handleCategoryChange(cat)} className={`px-4 py-2 rounded-xl font-medium transition-all ${activeCategory.name === cat.name ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
        <div className="mb-4">
          <label className="block text-white/70 text-sm mb-2">输入数值</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setResult(null); }}
            onKeyDown={(e) => e.key === 'Enter' && convert()}
            placeholder="请输入数值"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-lg focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-white/70 text-sm mb-2">从</label>
            <select
              value={fromUnit.symbol}
              onChange={(e) => { const unit = activeCategory.units.find(u => u.symbol === e.target.value); setFromUnit(unit); setResult(null); }}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400"
            >
              {activeCategory.units.map((unit) => (
                <option key={unit.symbol} value={unit.symbol} className="bg-gray-800">{unit.name} ({unit.symbol})</option>
              ))}
            </select>
          </div>

          <button onClick={swapUnits} className="mt-7 px-4 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all text-xl">
            ⇄
          </button>

          <div className="flex-1">
            <label className="block text-white/70 text-sm mb-2">到</label>
            <select
              value={toUnit.symbol}
              onChange={(e) => { const unit = activeCategory.units.find(u => u.symbol === e.target.value); setToUnit(unit); setResult(null); }}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400"
            >
              {activeCategory.units.map((unit) => (
                <option key={unit.symbol} value={unit.symbol} className="bg-gray-800">{unit.name} ({unit.symbol})</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={convert} disabled={!inputValue} className={`w-full py-4 text-white font-bold rounded-xl transition-all ${inputValue ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400' : 'bg-white/20 cursor-not-allowed'}`}>
          开始转换
        </button>
      </div>

      {result && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6 text-center">
          <div className="text-white/60 text-sm mb-2">转换结果</div>
          <div className="text-4xl md:text-5xl font-black text-white mb-2">{result.formatted}</div>
          <div className="text-2xl text-emerald-400 font-bold">{toUnit.name} ({toUnit.symbol})</div>
          <div className="mt-4 text-white/50 text-sm">{inputValue} {fromUnit.name} = {result.formatted} {toUnit.name}</div>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
        <h3 className="text-white font-bold mb-3 text-center">{activeCategory.icon} {activeCategory.name}单位参考</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {activeCategory.units.map((unit) => (
            <div key={unit.symbol} className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-white font-medium">{unit.name}</div>
              <div className="text-white/50 text-xs">{unit.symbol}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

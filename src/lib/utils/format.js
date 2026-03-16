// 格式化相关工具函数

/**
 * 格式化货币
 */
export function formatCurrency(value, prefix = '¥') {
  if (value == null || isNaN(value)) return '-'
  const num = parseFloat(value)
  const sign = num >= 0 ? '' : '-'
  return `${prefix}${sign}${Math.abs(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * 格式化数字（带千分位）
 */
export function formatNumber(value, decimals = 2) {
  if (value == null || isNaN(value)) return '-'
  return parseFloat(value).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * 格式化百分比
 */
export function formatPercent(value, decimals = 2) {
  if (value == null || isNaN(value)) return '-'
  const num = parseFloat(value)
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(decimals)}%`
}

/**
 * 格式化盈亏（带颜色标记）
 */
export function formatProfitLoss(value, showSign = true) {
  if (value == null || isNaN(value)) return '-'
  const num = parseFloat(value)
  const sign = showSign && num >= 0 ? '+' : ''
  return `${sign}¥${Math.abs(num).toFixed(2)}`
}

/**
 * 格式化股数
 */
export function formatShares(value) {
  if (value == null || isNaN(value)) return '-'
  return `${parseInt(value)}股`
}

/**
 * 截断文本
 */
export function truncate(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// 日期相关工具函数

/**
 * 获取本周开始日期（周一）
 */
export function getWeekStart(date = new Date()) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().split('T')[0]
}

/**
 * 获取周数
 */
export function getWeekNumber(date = new Date()) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

/**
 * 格式化日期为本地字符串 (月日)
 */
export function formatDateMonthDay(date) {
  return new Date(date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })
}

/**
 * 格式化日期时间 (月日时分)
 */
export function formatDateTime(date) {
  return new Date(date).toLocaleString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * 格式化日期时间完整
 */
export function formatDateTimeFull(date) {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

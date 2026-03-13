/**
 * VIP标识组件
 * 用于展示VIP身份/付费内容标识
 */
export default function VIPBadge({
  text = 'VIP',
  size = 'md',
  className = ''
}) {
  const sizes = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  }

  return (
    <span
      className={`inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded ${sizes[size] || sizes.md} ${className}`}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
      {text}
    </span>
  )
}

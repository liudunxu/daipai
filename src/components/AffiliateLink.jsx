/**
 * 联盟链接组件
 * 用于推广第三方产品获取佣金
 */
export default function AffiliateLink({
  url,
  text = '了解更多',
  platform = 'default',
  className = '',
  children
}) {
  const platformStyles = {
    default: 'bg-blue-500 hover:bg-blue-600',
    jingdong: 'bg-red-500 hover:bg-red-600',
    taobao: 'bg-orange-500 hover:bg-orange-600',
    tmall: 'bg-cyan-500 hover:bg-cyan-600',
    xianyu: 'bg-pink-500 hover:bg-pink-600',
    app: 'bg-purple-500 hover:bg-purple-600'
  }

  const platformNames = {
    default: '直达',
    jingdong: '京东',
    taobao: '淘宝',
    tmall: '天猫',
    xianyu: '闲鱼',
    app: 'APP'
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`inline-flex items-center gap-2 ${platformStyles[platform] || platformStyles.default} text-white px-4 py-2 rounded-lg transition-colors ${className}`}
    >
      {children || (
        <>
          <span>{text}</span>
          <span className="text-xs opacity-80">({platformNames[platform] || '直达'})</span>
        </>
      )}
    </a>
  )
}

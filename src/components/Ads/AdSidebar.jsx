'use client'

/**
 * 侧边栏广告组件
 * 用于页面侧边栏的矩形广告
 */
export default function AdSidebar({ slotId, className = '' }) {
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID

  if (!adsenseId) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 text-center text-gray-400 ${className}`}>
        <span className="text-sm">侧边栏广告（待配置）</span>
      </div>
    )
  }

  return (
    <div className={`my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '300px', height: '250px' }}
        data-ad-client={adsenseId}
        data-ad-slot={slotId || ''}
      />
    </div>
  )
}

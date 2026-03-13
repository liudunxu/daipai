'use client'

/**
 * 通栏广告组件
 * 用于页面顶部、底部或内容之间的横幅广告
 */
export default function AdBanner({ slotId, className = '' }) {
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID

  if (!adsenseId) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 text-center text-gray-400 ${className}`}>
        <span className="text-sm">广告位（待配置 Google AdSense）</span>
      </div>
    )
  }

  return (
    <div className={`my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={adsenseId}
        data-ad-slot={slotId || ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

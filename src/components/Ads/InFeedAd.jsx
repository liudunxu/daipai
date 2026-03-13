'use client'

/**
 * 信息流广告组件
 * 用于列表中间插入的广告
 */
export default function InFeedAd({ slotId, className = '' }) {
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID

  if (!adsenseId) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 text-center text-gray-400 my-4 ${className}`}>
        <span className="text-sm">推荐内容（待配置）</span>
      </div>
    )
  }

  return (
    <div className={`my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={adsenseId}
        data-ad-slot={slotId || ''}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      />
    </div>
  )
}

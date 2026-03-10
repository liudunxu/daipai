'use client'

import Script from 'next/script'

function BaiduAnalytics() {
  const analyticsId = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID

  if (!analyticsId) {
    return null
  }

  return (
    <Script id="baidu-tongji" strategy="afterInteractive" src={`https://hm.baidu.com/hm.js?${analyticsId}`} />
  )
}

export default BaiduAnalytics

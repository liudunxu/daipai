'use client'

import Script from 'next/script'

function BaiduAnalytics() {
  const analyticsId = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID

  if (!analyticsId) {
    return null
  }

  return (
    <Script id="baidu-tongji" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${analyticsId}";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    ` }} />
  )
}

export default BaiduAnalytics

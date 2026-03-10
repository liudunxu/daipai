'use client'

import Script from 'next/script'

const BAIDU_ANALYTICS_ID = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID

function BaiduAnalytics() {
  if (!BAIDU_ANALYTICS_ID) {
    return null
  }

  return (
    <Script id="baidu-tongji" strategy="afterInteractive">
      {`
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ANALYTICS_ID}";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      `}
    </Script>
  )
}

export default BaiduAnalytics

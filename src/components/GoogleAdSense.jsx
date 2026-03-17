'use client'

import Script from 'next/script'

function GoogleAdSense() {
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID

  if (!adsenseId) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  )
}

export default GoogleAdSense

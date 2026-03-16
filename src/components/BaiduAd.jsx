'use client'

import { useEffect } from 'react'
import Script from 'next/script'

/**
 * 百度广告联盟脚本加载器
 * 需要在layout中全局加载一次
 */
export default function BaiduAdScript() {
  const cpcId = process.env.NEXT_PUBLIC_BAIDU_AD_CPC_ID

  if (!cpcId) {
    return null
  }

  return (
    <Script id="baidu-ad" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
      (function() {
        var bp = document.createElement('script');
        bp.src = '//push.zhanzhang.baidu.com/s.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(bp, s);
      })();
    ` }} />
  )
}

/**
 * 百度广告联盟组件
 * 支持多种广告位类型：展示广告、信息流广告、悬停广告
 */
export function BaiduAd({
  type = 'banner', // banner | sidebar | feed
  slotId,
  className = ''
}) {
  const cpcId = process.env.NEXT_PUBLIC_BAIDU_AD_CPC_ID

  // 如果没有配置广告位ID，则不显示
  if (!cpcId || !slotId) {
    return null
  }

  useEffect(() => {
    // 尝试触发广告加载
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        // 静默处理广告加载失败
      }
    }
  }, [slotId])

  const getAdContainerClass = () => {
    const baseClass = 'baidu-ad-container'
    switch (type) {
      case 'sidebar':
        return `${baseClass} ${className}`
      case 'feed':
        return `${baseClass} ${className}`
      case 'banner':
      default:
        return `${baseClass} text-center ${className}`
    }
  }

  return (
    <div className={getAdContainerClass()}>
      {/* 百度广告位容器 */}
      <ins
        className="adsbygoogle"
        style={{
          display: type === 'sidebar' ? 'inline-block' : 'block',
          width: type === 'feed' ? '100%' : type === 'sidebar' ? '300px' : '728px',
          height: type === 'sidebar' ? '250px' : type === 'feed' ? '200px' : '90px'
        }}
        data-ad-client={`pub-${cpcId}`}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

/**
 * Banner广告 - 适合页头/页脚
 */
export function BaiduBanner({ slotId, className = '' }) {
  return <BaiduAd type="banner" slotId={slotId} className={className} />
}

/**
 * 侧边栏广告 - 固定位置
 */
export function BaiduSidebar({ slotId, className = '' }) {
  return <BaiduAd type="sidebar" slotId={slotId} className={className} />
}

/**
 * 信息流广告 - 内容中间
 */
export function BaiduFeed({ slotId, className = '' }) {
  return <BaiduAd type="feed" slotId={slotId} className={className} />
}
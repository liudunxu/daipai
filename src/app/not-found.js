'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-5">
      <div className="max-w-lg mx-auto text-center">
        {/* 404 数字 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] font-black text-white/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl">🤔</span>
          </div>
        </div>

        {/* 标题 */}
        <h2 className="text-3xl font-bold text-white mb-4">
          页面跑丢了 ~
        </h2>
        <p className="text-white/60 mb-8 leading-relaxed">
          抱歉，你访问的页面不存在或已被移除。<br/>
          可能是链接写错了，或者页面已经搬家了。
        </p>

        {/* 可能的错误 */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 mb-8 text-left">
          <p className="text-white/40 text-sm font-medium mb-3">常见问题：</p>
          <ul className="text-white/60 text-sm space-y-2">
            <li>• 链接地址是否写错了？</li>
            <li>• 页面是否已被删除？</li>
            <li>• 试试从首页重新进入？</li>
          </ul>
        </div>

        {/* 按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            🏠 返回首页
          </Link>
          <Link
            href="/nav"
            className="px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
          >
            🗺️ 网站导航
          </Link>
        </div>

        {/* 底部 */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-sm">
            如果你认为这是错误，请联系站长
          </p>
          <p className="text-white/20 text-xs mt-2">
            Error 404 - Page Not Found
          </p>
        </div>
      </div>
    </div>
  )
}

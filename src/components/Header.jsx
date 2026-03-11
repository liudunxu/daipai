'use client'

import { useState } from 'react'

function Header() {
  const [showModal, setShowModal] = useState(false)

  const imageUrl = "https://img1.baidu.com/it/u=786911366,1641212921&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=854"

  return (
    <>
      <div className="bg-gradient-to-r from-success-dark to-success p-[50px_30px] text-center text-white">
        <div className="flex flex-col items-center gap-[15px] mb-[20px]">
          <img
            src={imageUrl}
            alt="东北雨姐"
            className="w-[100px] h-[100px] rounded-full border-4 border-white object-cover shadow-lg cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowModal(true)}
          />
          <span className="bg-gradient-to-r from-accent to-accent-dark text-white px-5 py-2.5 rounded-full text-base font-bold shadow-md">
            东北雨姐推荐 ✅
          </span>
        </div>

        <h1 className="text-[36px] mb-[10px]">🦶 跟汗脚说拜拜</h1>
        <p className="text-base opacity-90">老铁们！雨姐教你整好脚嘎嘎自信！</p>
        <p className="mt-5 italic text-base bg-white/20 px-6 py-3 rounded-xl inline-block">
          "老铁们，脚可得保护好哇！"
        </p>
      </div>

      {/* 图片放大模态框 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-5"
          onClick={() => setShowModal(false)}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl hover:text-gray-300"
            onClick={() => setShowModal(false)}
          >
            ✕
          </button>
          <img
            src={imageUrl}
            alt="东北雨姐"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-5 text-white/70 text-sm">
            点击任意区域关闭
          </p>
        </div>
      )}
    </>
  )
}

export default Header

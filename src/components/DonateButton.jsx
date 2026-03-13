'use client'

import { useState } from 'react'

/**
 * 打赏按钮组件
 * 用于展示打赏/付费入口
 */
export default function DonateButton({
  type = 'wechat',
  className = ''
}) {
  const [showModal, setShowModal] = useState(false)

  const paymentMethods = {
    wechat: {
      title: '微信打赏',
      description: '扫码支付支持我们',
      color: 'bg-green-500 hover:bg-green-600'
    },
    alipay: {
      title: '支付宝打赏',
      description: '扫码支付支持我们',
      color: 'bg-blue-500 hover:bg-blue-600'
    }
  }

  const method = paymentMethods[type] || paymentMethods.wechat

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center gap-2 ${method.color} text-white px-4 py-2 rounded-lg transition-colors ${className}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        打赏支持
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">打赏支持</h3>
              <p className="text-gray-500 mb-4">
                您的支持是我们最大的动力
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">微信支付</p>
                  <div className="bg-white p-2 rounded">
                    <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center text-gray-400">
                      微信二维码
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">支付宝</p>
                  <div className="bg-white p-2 rounded">
                    <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center text-gray-400">
                      支付宝二维码
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-xs">
                扫码打赏，备注您的昵称
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  )
}

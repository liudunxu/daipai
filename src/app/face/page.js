import { Image } from 'next/image'

export const metadata = {
  title: 'AI撞脸测试 - 你像哪个明星？',
  description: '上传照片，AI智能分析你撞脸哪个明星。趣味测试，看看你是像明星还是网红！',
  keywords: ['撞脸测试', '明星脸测试', 'AI测脸', '像谁测试', '颜值测试', '明星撞脸'],
}

export default function FaceMatch() {
  const celebrities = [
    { name: '迪丽热巴', image: 'https://pic1.zhimg.com/80/v2-3a5f8c9b2d4e5f6a1c2b3d4e5f6a7b8_400x400.jpg', similarity: '95%' },
    { name: '吴亦凡', image: 'https://pic2.zhimg.com/80/v2-1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6_400x400.jpg', similarity: '88%' },
    { name: '彭于晏', image: 'https://pic3.zhimg.com/80/v2-4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9_400x400.jpg', similarity: '92%' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-5">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🤳 AI撞脸测试</h1>
          <p className="text-white/60">上传照片，看看你撞脸哪个明星</p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-4">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-white/60 mb-4">点击上传照片或拖拽到此处</p>
            <input type="file" accept="image/*" className="hidden" />
            <button className="px-6 py-2 bg-purple-500 text-white rounded-lg">
              选择图片
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-4">示例明星</h2>
          <p className="text-white/50 text-sm mb-4">上传照片自动匹配</p>
          <div className="grid grid-cols-3 gap-4">
            {celebrities.map((celeb) => (
              <div key={celeb.name} className="text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="text-white text-sm">{celeb.name}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-8 text-center">
          <a href="/nav" className="text-white/40 hover:text-white/60 text-sm">
            ← 更多工具
          </a>
        </footer>
      </div>
    </div>
  )
}

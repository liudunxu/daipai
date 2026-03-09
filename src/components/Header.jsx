function Header() {
  return (
    <div className="bg-gradient-to-r from-success-dark to-success p-[50px_30px] text-center text-white">
      <div className="flex flex-col items-center gap-[15px] mb-[20px]">
        <img
          src="https://img1.baidu.com/it/u=786911366,1641212921&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=854"
          alt="东北雨姐"
          className="w-[100px] h-[100px] rounded-full border-4 border-white object-cover shadow-lg"
        />
        <span className="bg-gradient-to-r from-accent to-accent-dark text-white px-5 py-2.5 rounded-full text-base font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">
          东北雨姐推荐 ✅
        </span>
      </div>

      <h1 className="text-[36px] mb-[10px]">🦶 跟汗脚说拜拜</h1>
      <p className="text-base opacity-90">老铁们！雨姐教你整好脚嘎嘎自信！</p>
      <p className="mt-5 italic text-base bg-white/20 px-6 py-3 rounded-xl inline-block">
        "老铁们，脚可得保护好哇！"
      </p>
    </div>
  )
}

export default Header

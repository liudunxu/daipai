const solutionsList = [
  {
    title: '整干净，整干燥',
    desc: '每天温水泡泡脚，使劲擦干乎，尤其是脚趾缝那儿',
  },
  {
    title: '穿嘎嘎透气的袜子',
    desc: '整纯棉的或者竹纤维的，别整那化纤的',
  },
  {
    title: '整点止汗的',
    desc: '整点止汗喷雾或者粉整上',
  },
  {
    title: '穿透气鞋子',
    desc: '整真皮或者网面的，别整那闷得乎的塑料鞋',
  },
]

function Solutions() {
  return (
    <div>
      <h2 className="text-xl text-gray-800 mb-4 flex items-center gap-2.5">
        <span className="text-2xl">💪</span>
        雨姐这就教你几招！
      </h2>
      <div className="flex flex-col gap-4">
        {solutionsList.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:translate-x-1 hover:shadow-[0_4px_15px_rgba(56,239,125,0.3)] transition-all duration-300"
          >
            <div className="w-[30px] h-[30px] bg-success text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              {index + 1}
            </div>
            <div>
              <h3 className="text-green-800 text-base mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Solutions

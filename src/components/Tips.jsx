const tipsList = [
  '天天换袜子，脚必须干爽',
  '鞋子倒替着穿，让它透透气',
  '可别老盯着一双鞋整',
  '鞋里整点干燥剂嘎嘎好使',
  '少整那刺激性的饮料，咖啡浓茶啥的',
]

function Tips() {
  return (
    <div>
      <h2 className="text-xl text-gray-800 mb-4 flex items-center gap-2.5">
        <span className="text-2xl">💡</span>
        雨姐的小窍门
      </h2>
      <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
        <ul className="list-none">
          {tipsList.map((tip, index) => (
            <li
              key={index}
              className="py-2 text-gray-600 text-sm flex items-center gap-2.5 cursor-pointer hover:translate-x-1 transition-transform duration-200"
            >
              <span className="text-accent font-bold">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tips

const symptomsList = [
  { title: '脚出汗贼多', desc: '整天湿乎乎的，老不得劲了' },
  { title: '脚臭嘎嘎的', desc: '一脱鞋那味儿，嘎嘎上头' },
  { title: '脚气犯了', desc: '真菌感染老遭罪了' },
  { title: '袜子总潮', desc: '一天换好几双，麻烦死了' },
]

function Symptoms() {
  return (
    <div>
      <h2 className="text-xl text-gray-800 mb-4 flex items-center gap-2.5">
        <span className="text-2xl">😰</span>
        汗脚老遭罪了！
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {symptomsList.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg text-center border-l-4 border-primary cursor-pointer hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(102,126,234,0.3)] transition-all duration-300"
          >
            <strong className="text-primary">{item.title}</strong>
            <br />
            <small className="text-gray-600">{item.desc}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Symptoms

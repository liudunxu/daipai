/**
 * 商品卡片组件
 * 用于展示电商带货商品
 */

const platformNames = {
  taobao: '淘宝',
  jingdong: '京东',
  tmall: '天猫',
  pinduoduo: '拼多多'
}

export default function ProductCard({
  title,
  description,
  price,
  originalPrice,
  image,
  link,
  platform = 'taobao',
  className = ''
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}
    >
      {image && (
        <div className="aspect-square relative bg-gray-100">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-500 text-xs line-clamp-2 mb-2">
            {description}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-red-500 font-bold text-lg">
            ¥{price}
          </span>
          {originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              ¥{originalPrice}
            </span>
          )}
        </div>
        <div className="mt-2 inline-block bg-red-50 text-red-600 text-xs px-2 py-1 rounded">
          {platformNames[platform] || platform}
        </div>
      </div>
    </a>
  )
}

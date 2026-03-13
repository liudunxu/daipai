import Header from '../../components/Header'
import Symptoms from '../../components/Symptoms'
import Solutions from '../../components/Solutions'
import Tips from '../../components/Tips'
import DaipaiCounter from '../../components/DaipaiCounter'
import Cta from '../../components/Cta'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import WechatQR from '../../components/WechatQR'

export const metadata = {
  title: '告别汗脚臭脚 - 专业足部护理产品 | 东北雨姐推荐',
  description: '老铁们！雨姐教你整好脚嘎嘎自信！专业足部护理产品，告别汗脚臭脚。',
  keywords: ['足部护理', '汗脚', '臭脚', '东北雨姐', '护理产品'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.zkwatcher.top/daipai',
    siteName: '东北雨姐推荐',
    title: '告别汗脚臭脚 - 专业足部护理产品 | 东北雨姐推荐',
    description: '老铁们！雨姐教你整好脚嘎嘎自信！专业足部护理产品，告别汗脚臭脚。',
  },
  twitter: {
    card: 'summary',
    title: '告别汗脚臭脚 - 专业足部护理产品 | 东北雨姐推荐',
    description: '老铁们！雨姐教你整好脚嘎嘎自信！',
  },
}

export default function DaipaiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark p-5">
      <div className="max-w-[600px] mx-auto bg-white rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        <Header />

        <div className="p-[30px]">
          <DaipaiCounter />
          <div className="mb-[25px] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Symptoms />
          </div>

          <div className="mb-[25px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Solutions />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Tips />
          </div>

          {/* 商品推荐 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-bold text-center mb-4">👇 老铁们都在用这些</h3>
            <div className="grid grid-cols-2 gap-3">
              <ProductCard
                title="足部护理喷雾 止汗除臭"
                description="雨姐同款见效快"
                price="29.9"
                originalPrice="59.9"
                platform="taobao"
                link="https://s.click.taobao.com/xxxxx"
              />
              <ProductCard
                title="天然草本足浴包"
                description="泡脚养生祛湿气"
                price="19.9"
                originalPrice="39.9"
                platform="jingdong"
                link="https://union.jd.com/xxxxx"
              />
            </div>
            <div className="mt-4 text-center">
              <WechatQR
                title="联系雨姐"
                description="获取更多产品推荐，享专属优惠"
              />
            </div>
          </div>
        </div>

        <Cta />
        <Footer />
      </div>
    </div>
  )
}

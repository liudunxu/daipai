import { NextResponse } from 'next/server'
import { redis } from '../../../../lib/redis'

const RECORDS_KEY = 'stock:records'

// 股票代码映射
const STOCKS = {
  '600519': { name: '贵州茅台' },
  '300750': { name: '宁德时代' },
  '002594': { name: '比亚迪' },
  '600036': { name: '招商银行' },
  '601318': { name: '中国平安' },
  '601012': { name: '隆基绿能' },
  '600276': { name: '恒瑞医药' },
  '603259': { name: '药明康德' },
  '000858': { name: '五粮液' },
  '600900': { name: '长江电力' },
  '601888': { name: '中国中免' },
  '600030': { name: '中信证券' },
  '000333': { name: '美的集团' },
  '000001': { name: '平安银行' },
  '601398': { name: '工商银行' },
  '002475': { name: '立讯精密' },
  '300059': { name: '东方财富' },
  '600104': { name: '上汽集团' },
  '601166': { name: '兴业银行' },
}

// GET 获取我的记录
export async function GET(request) {
  try {
    const records = await redis.lrange(RECORDS_KEY, 0, 49)
    const list = records.map(r => JSON.parse(r))
    return NextResponse.json(list)
  } catch (error) {
    console.error('获取记录失败:', error)
    return NextResponse.json([])
  }
}

// POST 记录买入
export async function POST(request) {
  try {
    const { code, shares, price } = await request.json()

    if (!code || !shares || !price) {
      return NextResponse.json({ error: '参数不完整' }, { status: 400 })
    }

    const stock = STOCKS[code]
    if (!stock) {
      return NextResponse.json({ error: '无效的股票代码' }, { status: 400 })
    }

    const record = {
      code,
      name: stock.name,
      shares: parseInt(shares),
      price: parseFloat(price),
      totalCost: parseFloat(price) * parseInt(shares),
      createdAt: new Date().toISOString(),
      createdDate: new Date().toISOString().split('T')[0],
    }

    await redis.lpush(RECORDS_KEY, JSON.stringify(record))
    await redis.ltrim(RECORDS_KEY, 0, 49) // 保留最多50条

    return NextResponse.json({
      success: true,
      record,
    })
  } catch (error) {
    console.error('记录失败:', error)
    return NextResponse.json({ error: '记录失败' }, { status: 500 })
  }
}

// 内存缓存
let cache = {
  data: null,
  timestamp: 0,
}
const CACHE_DURATION = 30 * 60 * 1000 // 30分钟

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const zone = searchParams.get('zone') || 'cn'

    // 检查缓存是否有效
    const now = Date.now()
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      console.log('股票列表: 使用缓存')
      return NextResponse.json(cache.data)
    }

    console.log('股票列表: 请求外部API')
    const response = await fetch(`https://predict-api-production.up.railway.app/stocks?zone=${zone}`, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: '获取股票列表失败', status: response.status },
        { status: response.status }
      )
    }

    const data = await response.json()

    // 更新缓存
    cache = {
      data,
      timestamp: now,
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('股票列表API错误:', error)
    return NextResponse.json(
      { error: '服务器内部错误', message: error.message },
      { status: 500 }
    )
  }
}

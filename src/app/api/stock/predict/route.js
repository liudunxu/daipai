import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const stock = searchParams.get('stock')
    const fastMode = searchParams.get('fast_mode')

    if (!stock) {
      return NextResponse.json(
        { error: '缺少股票参数' },
        { status: 400 }
      )
    }

    let url = `https://predict-api-production.up.railway.app/predict?stock=${encodeURIComponent(stock)}`
    if (fastMode === 'true') {
      url += '&fast_mode=true'
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: '获取预测失败', status: response.status },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('预测API错误:', error)
    return NextResponse.json(
      { error: '服务器内部错误', message: error.message },
      { status: 500 }
    )
  }
}

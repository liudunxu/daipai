import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const stock = searchParams.get('stock')

    if (!stock) {
      return NextResponse.json(
        { error: '缺少股票参数' },
        { status: 400 }
      )
    }

    const url = `https://stock-prediction-api.liudunxu2.workers.dev/predict?stock=${encodeURIComponent(stock)}`

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 295000)

    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    })
    clearTimeout(timeout)

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

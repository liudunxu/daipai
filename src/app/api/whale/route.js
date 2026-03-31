import { NextResponse } from 'next/server'

const WHALE_API_BASE = 'https://whalewisdom.com/shell/command'

// 著名投资人名称映射
const FAMOUS_INVESTORS = [
  { name: 'Warren Buffett', id: 'berkshire-hathaway' },
  { name: 'Cathie Wood', id: 'ark-investment-management' },
  { name: 'Ray Dalio', id: 'bridgewater-associates' },
  { name: 'George Soros', id: 'soros-fund-management' },
  { name: 'Carl Icahn', id: 'icahn-capital' },
  { name: 'Bill Ackman', id: 'pershing-square-capital' },
  { name: 'David Tepper', id: 'appaloosa-management' },
  { name: 'Paul Tudor Jones', id: 'tudor-investment-corp' },
]

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const command = searchParams.get('command') || 'filer_list'
  const identifier = searchParams.get('identifier') || ''

  try {
    let apiUrl = `${WHALE_API_BASE}?command=${command}&format=json`

    if (command === 'filer_lookup' && identifier) {
      apiUrl += `&identifier=${encodeURIComponent(identifier)}`
    } else if (command === 'holdings' && identifier) {
      apiUrl += `&filer_id=${identifier}`
    } else if (command === 'filer_list') {
      // 获取著名投资人列表
      return NextResponse.json({
        success: true,
        data: FAMOUS_INVESTORS,
      })
    }

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; InvestmentTracker/1.0)',
      },
    })

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('WhaleWisdom API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'

const DEFAULT_LOCALE = 'en'
const CHINA_LOCALE = 'zh'

function isFromChina(request) {
  // Check Cloudflare country header
  const cfCountry = request.headers.get('cf-ipcountry')
  if (cfCountry === 'CN') return true

  // Check Vercel edge country header
  const vercelCountry = request.headers.get('x-vercel-ip-country')
  if (vercelCountry === 'CN') return true

  // Check Accept-Language header for Chinese
  const acceptLang = request.headers.get('accept-language') || ''
  if (acceptLang.toLowerCase().includes('zh')) return true

  // Check if IP starts with Chinese IP ranges (simplified)
  const forwardedFor = request.headers.get('x-forwarded-for') || ''
  const ip = forwardedFor.split(',')[0].trim()
  
  // Common China IP ranges
  const chinaRanges = [
    '1.', '14.', '27.', '36.', '39.', '42.', '43.', '45.', '49.',
    '54.', '58.', '59.', '60.', '61.', '101.', '103.', '106.',
    '110.', '111.', '112.', '113.', '114.', '115.', '116.', '117.',
    '118.', '119.', '120.', '121.', '122.', '123.', '124.', '125.',
    '126.', '139.', '140.', '144.', '150.', '153.', '157.', '159.',
    '160.', '161.', '162.', '163.', '164.', '165.', '166.', '167.',
    '168.', '169.', '170.', '171.', '175.', '180.', '182.', '183.',
    '185.', '192.', '198.', '202.', '203.', '210.', '211.', '218.',
    '219.', '220.', '221.', '222.', '223.'
  ]
  
  if (chinaRanges.some(range => ip.startsWith(range))) return true

  return false
}

export function middleware(request) {
  // Skip API routes and static files
  const pathname = request.nextUrl.pathname
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check existing locale cookie
  const localeCookie = request.cookies.get('locale')
  
  if (!localeCookie) {
    // Detect locale
    const locale = isFromChina(request) ? CHINA_LOCALE : DEFAULT_LOCALE
    
    const response = NextResponse.next()
    response.cookies.set('locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    })
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|static|.*\\.).*)'],
}
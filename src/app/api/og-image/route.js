import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'OpenClaw中文网'
  const desc = searchParams.get('desc') || '关注2026 AI Agent发展'
  const siteName = searchParams.get('siteName') || 'OpenClaw中文网'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            maxWidth: '1200px',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '30px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '36px',
              color: 'rgba(255, 255, 255, 0.85)',
              textAlign: 'center',
              maxWidth: '1000px',
            }}
          >
            {desc}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            <span style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.7)' }}>
              2026年最火的AI Agent
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

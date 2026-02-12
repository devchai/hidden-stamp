import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'HiddenStamp — Invisible Image Watermark Tool';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #0df20d 0%, #0aa60a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              color: '#050505',
              fontWeight: 900,
            }}
          >
            H
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#f1f5f9',
              letterSpacing: '-1px',
            }}
          >
            Hidden
            <span style={{ color: '#0df20d' }}>Stamp</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '22px',
              color: '#64748b',
              letterSpacing: '4px',
              textTransform: 'uppercase' as const,
            }}
          >
            Invisible Image Watermark Tool
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '24px',
            }}
          >
            {['Embed', 'Verify', 'Protect'].map((text) => (
              <div
                key={text}
                style={{
                  padding: '10px 28px',
                  border: '1px solid #1a1a1a',
                  borderRadius: '999px',
                  fontSize: '16px',
                  color: '#94a3b8',
                  letterSpacing: '3px',
                  textTransform: 'uppercase' as const,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

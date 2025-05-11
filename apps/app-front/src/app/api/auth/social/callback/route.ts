import { NextRequest, NextResponse } from 'next/server';
// 공통 HTML 생성 함수
function createPopupResponse(code: string, state?: string) {
  const html = `
    <html>
      <body>
        <script>
          (function() {
            if (window.opener) {
              window.opener.postMessage({
                code: '${code}',
                state: '${state ?? ''}'
              }, '*');
              window.close();
            } else {
              console.error('No opener window found');
            }
          })();
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

// POST: Apple 로그인용
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const code = formData.get('code')?.toString();

  if (!code) {
    return new NextResponse('Missing code', { status: 400 });
  }

  return createPopupResponse(code);
}

// GET: 구글, 네이버, 카카오 로그인용
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return new NextResponse('Missing code', { status: 400 });
  }

  return createPopupResponse(code, state ?? undefined);
}

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Cron Secret 검증 (프로덕션 환경에서만)
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production') {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json(
          { error: '인증 실패' },
          { status: 401 }
        );
      }
    }

    // AI 기사 생성 API 호출
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/generate-blog-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // 랜덤 키워드/카테고리 사용
    });

    if (!response.ok) {
      throw new Error(`기사 생성 API 오류: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: '일일 블로그 기사가 성공적으로 생성되었습니다',
      article: data.article,
      keywords: data.keywords,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Daily blog cron 실패:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

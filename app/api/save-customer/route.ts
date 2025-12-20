import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export const runtime = 'nodejs'
export const maxDuration = 10

export async function POST(request: NextRequest) {
  try {
    const { site, name, phone, inquiry, source } = await request.json()

    // 필수 필드 검증
    if (!site || !name || !phone) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다' },
        { status: 400 }
      )
    }

    // 전화번호 포맷 정규화 (하이픈 제거 후 다시 추가)
    const normalizedPhone = phone.replace(/[^0-9]/g, '')
    const formattedPhone = normalizedPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')

    console.log('DB 저장 시도:', {
      site,
      name,
      phone: formattedPhone,
      inquiry: inquiry || null,
      source: source || null,
      timestamp: new Date().toISOString()
    })

    // Vercel Postgres에 데이터 저장
    const result = await sql`
      INSERT INTO customer_registrations (site, name, phone, inquiry, source)
      VALUES (${site}, ${name}, ${formattedPhone}, ${inquiry || null}, ${source || null})
      RETURNING id, created_at
    `

    console.log('DB 저장 성공:', result.rows[0])

    return NextResponse.json({
      success: true,
      message: '고객 정보가 성공적으로 저장되었습니다',
      data: {
        id: result.rows[0].id,
        created_at: result.rows[0].created_at
      }
    })

  } catch (error: any) {
    console.error('DB 저장 오류:', error)

    // 테이블이 없는 경우 자동 생성 시도
    if (error.message?.includes('relation "customer_registrations" does not exist')) {
      try {
        console.log('테이블이 없습니다. 자동 생성 시도...')

        await sql`
          CREATE TABLE IF NOT EXISTS customer_registrations (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            site VARCHAR(100) NOT NULL,
            name VARCHAR(50) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            inquiry TEXT,
            source VARCHAR(50),
            created_at TIMESTAMPTZ DEFAULT NOW()
          )
        `

        await sql`CREATE INDEX IF NOT EXISTS idx_site_created ON customer_registrations(site, created_at DESC)`
        await sql`CREATE INDEX IF NOT EXISTS idx_phone ON customer_registrations(phone)`
        await sql`CREATE INDEX IF NOT EXISTS idx_created_at ON customer_registrations(created_at DESC)`

        console.log('테이블 생성 완료. 다시 데이터 저장 시도...')

        // 원래 요청 다시 시도
        const { site, name, phone, inquiry, source } = await request.json()
        const normalizedPhone = phone.replace(/[^0-9]/g, '')
        const formattedPhone = normalizedPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')

        const retryResult = await sql`
          INSERT INTO customer_registrations (site, name, phone, inquiry, source)
          VALUES (${site}, ${name}, ${formattedPhone}, ${inquiry || null}, ${source || null})
          RETURNING id, created_at
        `

        return NextResponse.json({
          success: true,
          message: '고객 정보가 성공적으로 저장되었습니다 (테이블 자동 생성됨)',
          data: {
            id: retryResult.rows[0].id,
            created_at: retryResult.rows[0].created_at
          }
        })

      } catch (createError: any) {
        console.error('테이블 생성 실패:', createError)
        return NextResponse.json(
          { success: false, error: `테이블 생성 실패: ${createError.message}` },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { success: false, error: error.message || 'DB 저장 실패' },
      { status: 500 }
    )
  }
}

// CORS 지원
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

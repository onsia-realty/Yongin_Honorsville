import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'


// 솔라피(Solapi) API 설정
const SOLAPI_API_KEY = (process.env.SOLAPI_API_KEY || '').trim()
const SOLAPI_API_SECRET = (process.env.SOLAPI_API_SECRET || '').trim()
const SOLAPI_API_URL = 'https://api.solapi.com/messages/v4/send'
const SMS_SENDER_NUMBER = (process.env.SMS_SENDER_NUMBER || '010-9331-0967').trim()
const ADMIN_PHONE = (process.env.ADMIN_PHONE || '010-7781-9297').trim()

// HMAC 서명 생성 함수
function getAuth() {
  const apiKey = SOLAPI_API_KEY.replace(/[\r\n]/g, '')
  const apiSecret = SOLAPI_API_SECRET.replace(/[\r\n]/g, '')
  const date = new Date().toISOString()
  const salt = crypto.randomBytes(32).toString('hex')
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(date + salt)
    .digest('hex')
  
  // 개행 문자를 완전히 제거하고 문자열 생성
  const authString = `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`
  return authString.replace(/[\r\n]/g, '').trim()
}

export async function POST(request: NextRequest) {
  try {
    const { name, phone, timestamp } = await request.json()

    // 환경 변수 확인
    console.log('Environment check:', {
      hasApiKey: !!SOLAPI_API_KEY,
      hasApiSecret: !!SOLAPI_API_SECRET,
      apiKeyLength: SOLAPI_API_KEY.length,
      apiSecretLength: SOLAPI_API_SECRET.length,
      senderNumber: SMS_SENDER_NUMBER,
      adminPhone: ADMIN_PHONE,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    })

    // 필수 환경 변수 검증
    if (!SOLAPI_API_KEY || !SOLAPI_API_SECRET) {
      console.error('Missing required environment variables')
      return NextResponse.json(
        { success: false, error: '서버 설정 오류: API 자격 증명이 없습니다' },
        { status: 500 }
      )
    }

    // SMS 메시지 구성 (90byte 제한 고려)
    // 짧은 메시지로 구성하고 LMS 타입 사용
    const message = `[경남아너스빌] 새 관심고객
${name} / ${phone}
${timestamp}
즉시 연락바랍니다.`

    // 메시지 바이트 길이 확인
    const messageBytes = Buffer.byteLength(message, 'utf8')
    const messageType = messageBytes <= 90 ? 'SMS' : 'LMS'
    
    console.log('Message details:', {
      message: message,
      byteLength: messageBytes,
      messageType: messageType,
      timestamp: timestamp
    })

    // Authorization 헤더 생성
    const authHeader = getAuth()
    console.log('Auth header generated:', {
      length: authHeader.length,
      hasNewline: authHeader.includes('\n'),
      preview: authHeader.substring(0, 50) + '...'
    })

    // 솔라피 API 호출
    const smsResponse = await fetch(SOLAPI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        message: {
          to: ADMIN_PHONE,
          from: SMS_SENDER_NUMBER,
          text: message,
          type: messageType
        }
      })
    })

    const result = await smsResponse.json()

    console.log('SMS API Response:', {
      status: smsResponse.status,
      ok: smsResponse.ok,
      result: JSON.stringify(result)
    })

    if (!smsResponse.ok) {
      console.error('SMS API Error:', result)
      throw new Error(`SMS 발송 실패: ${result.message || result.error?.message || JSON.stringify(result)}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'SMS 발송 완료',
      messageId: result.messageId 
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })

  } catch (error) {
    console.error('SMS 발송 오류:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'SMS 발송 실패' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  }
}

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
import { NextRequest, NextResponse } from 'next/server'
import { SolapiMessageService } from 'solapi'

export const runtime = 'nodejs'
export const maxDuration = 10

export async function POST(request: NextRequest) {
  try {
    const { name, phone, timestamp } = await request.json()
    
    // 환경 변수 확인 (trim으로 공백 제거)
    const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY?.trim()
    const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET?.trim()
    const SMS_SENDER_NUMBER = (process.env.SMS_SENDER_NUMBER || '010-9331-0967').trim()
    const ADMIN_PHONE = (process.env.ADMIN_PHONE || '010-7781-9297').trim()
    
    console.log('환경 변수 상태:', {
      hasApiKey: !!SOLAPI_API_KEY,
      hasApiSecret: !!SOLAPI_API_SECRET,
      apiKeyLength: SOLAPI_API_KEY?.length,
      apiSecretLength: SOLAPI_API_SECRET?.length,
      senderNumber: SMS_SENDER_NUMBER,
      adminPhone: ADMIN_PHONE,
      environment: process.env.NODE_ENV,
      vercel: process.env.VERCEL,
      timestamp: new Date().toISOString()
    })
    
    if (!SOLAPI_API_KEY || !SOLAPI_API_SECRET) {
      console.error('솔라피 API 키가 설정되지 않았습니다.')
      return NextResponse.json(
        { 
          success: false, 
          error: '서버 설정 오류: API 키가 누락되었습니다.'
        },
        { status: 500 }
      )
    }
    
    // 솔라피 메시지 서비스 초기화
    const messageService = new SolapiMessageService(SOLAPI_API_KEY, SOLAPI_API_SECRET)

    // 관리자에게 발송할 메시지
    const adminMessage = `[클러스터용인 경남아너스빌]
새 관심고객 등록!

성함: ${name}
연락처: ${phone}
등록시간: ${timestamp}

즉시 연락 요망`

    // 고객에게 발송할 메시지
    const customerMessage = `[클러스터용인 경남아너스빌]
${name}님, 관심고객 등록이 완료되었습니다.

빠른 시일 내에 전문 상담원이 연락드리겠습니다.

문의: ${SMS_SENDER_NUMBER}`

    try {
      console.log('SMS 발송 시도:', {
        to: ADMIN_PHONE,
        from: SMS_SENDER_NUMBER,
        messageLength: adminMessage.length,
        customerPhone: phone
      })

      // 관리자에게 SMS 발송
      const adminResult = await messageService.sendOne({
        to: ADMIN_PHONE,
        from: SMS_SENDER_NUMBER,
        text: adminMessage,
        type: 'SMS'  // 타입 명시
      })
      
      console.log('관리자 SMS 발송 성공:', JSON.stringify(adminResult))

      // 고객에게 SMS 발송
      const customerResult = await messageService.sendOne({
        to: phone,
        from: SMS_SENDER_NUMBER,
        text: customerMessage,
        type: 'SMS'  // 타입 명시
      })
      
      console.log('고객 SMS 발송 성공:', JSON.stringify(customerResult))
      
      return NextResponse.json({ 
        success: true, 
        message: 'SMS 발송 완료',
        method: 'solapi',
        results: {
          admin: adminResult,
          customer: customerResult
        }
      })

    } catch (smsError: any) {
      console.error('SMS 발송 실패 상세:', {
        error: smsError,
        message: smsError.message,
        response: smsError.response,
        data: smsError.response?.data,
        stack: smsError.stack
      })
      
      // 솔라피 에러 메시지 추출
      const errorMessage = smsError.response?.data?.message || 
                          smsError.response?.data?.error?.message ||
                          smsError.message || 
                          'SMS 발송 실패'
      
      // HTTP API 폴백 시도
      console.log('Solapi SDK 실패, HTTP API로 폴백 시도...')
      
      try {
        // /api/send-sms 엔드포인트 호출 (HTTP API 사용)
        const fallbackResponse = await fetch(`${request.headers.get('origin') || 'http://localhost:3001'}/api/send-sms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone, timestamp })
        })
        
        const fallbackResult = await fallbackResponse.json()
        
        if (fallbackResult.success) {
          console.log('HTTP API 폴백 성공:', fallbackResult)
          return NextResponse.json({ 
            success: true, 
            message: 'SMS 발송 완료 (폴백)',
            method: 'http-api-fallback',
            results: fallbackResult
          })
        }
      } catch (fallbackError) {
        console.error('HTTP API 폴백도 실패:', fallbackError)
      }
      
      throw new Error(errorMessage)
    }

  } catch (error: any) {
    console.error('알림 발송 오류:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || '알림 발송 실패'
      },
      { status: 500 }
    )
  }
}
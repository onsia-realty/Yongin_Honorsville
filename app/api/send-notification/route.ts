import { NextRequest, NextResponse } from 'next/server'
import { SolapiMessageService } from 'solapi'

// 솔라피 설정
const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY!
const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET!
const SMS_SENDER_NUMBER = process.env.SMS_SENDER_NUMBER || '1668-5257'
const ADMIN_PHONE = process.env.ADMIN_PHONE || '010-7781-9297'

// 솔라피 메시지 서비스 초기화
const messageService = new SolapiMessageService(SOLAPI_API_KEY, SOLAPI_API_SECRET)

export async function POST(request: NextRequest) {
  try {
    const { name, phone, timestamp } = await request.json()

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
      // 관리자에게 SMS 발송
      const adminResult = await messageService.sendOne({
        to: ADMIN_PHONE,
        from: SMS_SENDER_NUMBER,
        text: adminMessage,
      })
      
      console.log('관리자 SMS 발송 성공:', adminResult)

      // 고객에게 SMS 발송
      const customerResult = await messageService.sendOne({
        to: phone,
        from: SMS_SENDER_NUMBER,
        text: customerMessage,
      })
      
      console.log('고객 SMS 발송 성공:', customerResult)
      
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
      console.error('SMS 발송 실패:', smsError)
      
      // 솔라피 에러 메시지 추출
      const errorMessage = smsError.response?.data?.message || smsError.message || 'SMS 발송 실패'
      
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
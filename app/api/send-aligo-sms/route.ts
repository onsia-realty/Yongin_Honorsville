import { NextRequest, NextResponse } from 'next/server'

// 알리고 SMS API 설정
const ALIGO_API_KEY = process.env.ALIGO_API_KEY!
const ALIGO_USER_ID = process.env.ALIGO_USER_ID!
const ALIGO_SENDER = process.env.ALIGO_SENDER || '1668-5257'
const ADMIN_PHONE = process.env.ADMIN_PHONE || '010-7781-9297'

export async function POST(request: NextRequest) {
  try {
    const { name, phone, timestamp } = await request.json()

    // SMS 메시지 구성
    const message = `[클러스터용인 경남아너스빌]
새 관심고객 등록!

성함: ${name}
연락처: ${phone}
등록시간: ${timestamp}

즉시 연락 요망`

    // 알리고 SMS API 호출
    const formData = new URLSearchParams()
    formData.append('key', ALIGO_API_KEY)
    formData.append('user_id', ALIGO_USER_ID)
    formData.append('sender', ALIGO_SENDER)
    formData.append('receiver', ADMIN_PHONE)
    formData.append('msg', message)
    formData.append('title', '관심고객 등록 알림')
    
    // 테스트 모드 설정 (실제 발송 시 제거)
    // formData.append('testmode_yn', 'Y')

    const response = await fetch('https://apis.aligo.in/send/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    })

    const result = await response.json()

    if (result.result_code === 1) {
      return NextResponse.json({ 
        success: true, 
        message: 'SMS 발송 완료',
        messageId: result.msg_id,
        successCount: result.success_cnt
      })
    } else {
      throw new Error(result.message || 'SMS 발송 실패')
    }

  } catch (error) {
    console.error('알리고 SMS 발송 오류:', error)
    return NextResponse.json(
      { success: false, error: 'SMS 발송 실패' },
      { status: 500 }
    )
  }
}
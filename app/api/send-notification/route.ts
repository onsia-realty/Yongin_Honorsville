import { NextRequest, NextResponse } from 'next/server'

// 알리고 API 설정
const ALIGO_API_KEY = process.env.ALIGO_API_KEY || 'YOUR_API_KEY'
const ALIGO_USER_ID = process.env.ALIGO_USER_ID || 'YOUR_USER_ID'
const SMS_SENDER_NUMBER = process.env.SMS_SENDER_NUMBER || '1668-5257'
const ADMIN_PHONE = process.env.ADMIN_PHONE || '010-7781-9297'

export async function POST(request: NextRequest) {
  try {
    const { name, phone, timestamp } = await request.json()

    // 알리고 SMS 발송
    const message = `[클러스터용인 경남아너스빌]
새 관심고객 등록!

성함: ${name}
연락처: ${phone}
등록시간: ${timestamp}

즉시 연락 요망`

    // 알리고 API 호출을 위한 FormData 생성
    const formData = new URLSearchParams()
    formData.append('key', ALIGO_API_KEY)
    formData.append('user_id', ALIGO_USER_ID)
    formData.append('sender', SMS_SENDER_NUMBER)
    formData.append('receiver', ADMIN_PHONE)
    formData.append('msg', message)
    formData.append('title', '관심고객 등록 알림')
    
    try {
      const response = await fetch('https://apis.aligo.in/send/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      })

      const result = await response.json()
      
      if (result.result_code === '1') {
        console.log('알리고 SMS 발송 성공:', result)
        
        // 고객에게도 확인 문자 발송
        const customerMessage = `[클러스터용인 경남아너스빌]
${name}님, 관심고객 등록이 완료되었습니다.

빠른 시일 내에 전문 상담원이 연락드리겠습니다.

문의: ${SMS_SENDER_NUMBER}`

        const customerFormData = new URLSearchParams()
        customerFormData.append('key', ALIGO_API_KEY)
        customerFormData.append('user_id', ALIGO_USER_ID)
        customerFormData.append('sender', SMS_SENDER_NUMBER)
        customerFormData.append('receiver', phone)
        customerFormData.append('msg', customerMessage)
        customerFormData.append('title', '관심고객 등록 완료')
        
        await fetch('https://apis.aligo.in/send/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: customerFormData.toString()
        })
        
        return NextResponse.json({ 
          success: true, 
          message: 'SMS 발송 완료',
          method: 'aligo_sms'
        })
      } else {
        throw new Error(`알리고 SMS 발송 실패: ${result.message}`)
      }
    } catch (smsError) {
      console.error('SMS 발송 실패:', smsError)
      throw smsError
    }

  } catch (error) {
    console.error('알림 발송 오류:', error)
    return NextResponse.json(
      { success: false, error: '알림 발송 실패' },
      { status: 500 }
    )
  }
}
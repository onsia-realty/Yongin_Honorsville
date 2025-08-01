import { NextRequest, NextResponse } from 'next/server'

// NHN Toast SMS API 설정
const SMS_APP_KEY = process.env.NHN_TOAST_APP_KEY!
const SMS_SECRET_KEY = process.env.NHN_TOAST_SECRET_KEY!
const SMS_SENDER_NUMBER = process.env.SMS_SENDER_NUMBER || '1668-5257'
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

    // NHN Toast SMS API 호출
    const smsResponse = await fetch(
      `https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${SMS_APP_KEY}/sender/sms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Secret-Key': SMS_SECRET_KEY
        },
        body: JSON.stringify({
          body: message,
          sendNo: SMS_SENDER_NUMBER,
          recipientList: [{
            recipientNo: ADMIN_PHONE,
            countryCode: '82'
          }]
        })
      }
    )

    const result = await smsResponse.json()

    if (result.header.resultCode !== 0) {
      throw new Error(`SMS 발송 실패: ${result.header.resultMessage}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'SMS 발송 완료',
      requestId: result.header.requestId 
    })

  } catch (error) {
    console.error('SMS 발송 오류:', error)
    return NextResponse.json(
      { success: false, error: 'SMS 발송 실패' },
      { status: 500 }
    )
  }
}
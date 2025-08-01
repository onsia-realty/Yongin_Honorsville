import { NextRequest, NextResponse } from 'next/server'

// NHN Toast API 설정
const SMS_APP_KEY = process.env.NHN_TOAST_APP_KEY!
const SMS_SECRET_KEY = process.env.NHN_TOAST_SECRET_KEY!
const KAKAO_APP_KEY = process.env.NHN_TOAST_KAKAO_APP_KEY!
const KAKAO_SECRET_KEY = process.env.NHN_TOAST_KAKAO_SECRET_KEY!
const KAKAO_SENDER_KEY = process.env.KAKAO_SENDER_KEY!
const SMS_SENDER_NUMBER = process.env.SMS_SENDER_NUMBER || '1668-5257'
const ADMIN_PHONE = process.env.ADMIN_PHONE || '010-7781-9297'
const TEMPLATE_CODE = process.env.KAKAO_TEMPLATE_CODE || 'CUSTOMER_REGISTRATION'

export async function POST(request: NextRequest) {
  try {
    const { name, phone, timestamp } = await request.json()
    const results = { sms: false, kakao: false }

    // 1. 카카오톡 알림톡 발송 시도 (우선)
    try {
      const kakaoResponse = await fetch(
        `https://api-alimtalk.cloud.toast.com/alimtalk/v2.0/appkeys/${KAKAO_APP_KEY}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Secret-Key': KAKAO_SECRET_KEY
          },
          body: JSON.stringify({
            senderKey: KAKAO_SENDER_KEY,
            templateCode: TEMPLATE_CODE,
            recipientList: [{
              recipientNo: ADMIN_PHONE,
              templateParameter: {
                name: name,
                phone: phone,
                timestamp: timestamp
              }
            }]
          })
        }
      )

      const kakaoResult = await kakaoResponse.json()
      
      if (kakaoResult.header.resultCode === 0) {
        results.kakao = true
        console.log('카카오톡 발송 성공')
      }
    } catch (kakaoError) {
      console.error('카카오톡 발송 실패:', kakaoError)
    }

    // 2. 카카오톡 실패 시 SMS 발송
    if (!results.kakao) {
      try {
        const message = `[클러스터용인 경남아너스빌]
새 관심고객 등록!

성함: ${name}
연락처: ${phone}
등록시간: ${timestamp}

즉시 연락 요망`

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

        const smsResult = await smsResponse.json()
        
        if (smsResult.header.resultCode === 0) {
          results.sms = true
          console.log('SMS 발송 성공')
        }
      } catch (smsError) {
        console.error('SMS 발송 실패:', smsError)
      }
    }

    // 결과 반환
    if (results.kakao || results.sms) {
      return NextResponse.json({ 
        success: true, 
        message: results.kakao ? '카카오톡 발송 완료' : 'SMS 발송 완료',
        method: results.kakao ? 'kakao' : 'sms'
      })
    } else {
      throw new Error('모든 발송 방법 실패')
    }

  } catch (error) {
    console.error('알림 발송 오류:', error)
    return NextResponse.json(
      { success: false, error: '알림 발송 실패' },
      { status: 500 }
    )
  }
}
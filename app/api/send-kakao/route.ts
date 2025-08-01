import { NextRequest, NextResponse } from 'next/server'

// NHN Toast 카카오톡 API 설정
const KAKAO_APP_KEY = process.env.NHN_TOAST_KAKAO_APP_KEY!
const KAKAO_SECRET_KEY = process.env.NHN_TOAST_KAKAO_SECRET_KEY!
const KAKAO_SENDER_KEY = process.env.KAKAO_SENDER_KEY! // 카카오톡 채널 발신키
const ADMIN_PHONE = process.env.ADMIN_PHONE || '010-7781-9297'

// 템플릿 코드 (사전 등록 필요)
const TEMPLATE_CODE = process.env.KAKAO_TEMPLATE_CODE || 'CUSTOMER_REGISTRATION'

export async function POST(request: NextRequest) {
  try {
    const { name, phone, timestamp } = await request.json()

    // 카카오톡 알림톡 발송
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

    const result = await kakaoResponse.json()

    if (result.header.resultCode !== 0) {
      throw new Error(`카카오톡 발송 실패: ${result.header.resultMessage}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: '카카오톡 알림톡 발송 완료',
      requestId: result.header.requestId 
    })

  } catch (error) {
    console.error('카카오톡 발송 오류:', error)
    return NextResponse.json(
      { success: false, error: '카카오톡 발송 실패' },
      { status: 500 }
    )
  }
}
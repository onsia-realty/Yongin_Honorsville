// EmailJS를 사용한 이메일 전송
// 1. emailjs.com에서 무료 계정 생성
// 2. Email Service 연결 (Gmail, Outlook 등)
// 3. Email Template 생성
// 4. Public Key 복사

export async function sendEmail(data: {
  name: string
  phone: string
  inquiry?: string
}) {
  try {
    // EmailJS SDK 로드
    const emailjs = (await import('@emailjs/browser')).default

    // EmailJS 초기화
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')

    // 이메일 전송
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      {
        to_email: '010-7781-9297@example.com', // 받을 이메일
        from_name: data.name,
        phone: data.phone,
        message: data.inquiry || '관심고객 등록',
        timestamp: new Date().toLocaleString('ko-KR')
      }
    )

    return { success: true, response }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

// EmailJS 템플릿 예시
/*
Subject: [클러스터용인] 새로운 관심고객 등록 - {{from_name}}

안녕하세요,
클러스터용인 경남아너스빌 웹사이트에서 새로운 관심고객이 등록되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ 고객 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• 고객명: {{from_name}}
• 연락처: {{phone}}
• 문의내용: {{message}}
• 등록시간: {{timestamp}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

빠른 시일 내에 연락 부탁드립니다.

감사합니다.
*/
# EmailJS 설정 가이드

## 1. EmailJS 계정 생성
1. https://www.emailjs.com/ 접속
2. 무료 계정 생성 (월 200건 무료)

## 2. Gmail 서비스 연결
1. Email Services → Add New Service
2. Gmail 선택
3. 'Connect Account' 클릭하여 Gmail 계정 연결
4. Service ID 복사 (예: service_abc123)

## 3. 이메일 템플릿 생성
1. Email Templates → Create New Template
2. 템플릿 이름: "Customer Registration"
3. To Email: 받을 이메일 주소 입력
4. Subject: [클러스터용인] 새로운 관심고객 - {{name}}
5. Content:
```
안녕하세요,

클러스터용인 경남아너스빌 웹사이트에서 새로운 관심고객이 등록되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ 고객 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• 고객명: {{name}}
• 연락처: {{phone}}
• 등록시간: {{timestamp}}
• 등록경로: {{source}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

빠른 시일 내에 연락 부탁드립니다.

감사합니다.
```

## 4. API 키 획득
1. Account → API Keys
2. Public Key 복사 (예: public_key_abc123)

## 5. 환경 변수 설정
`.env.local` 파일에 추가:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_abc123
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=public_key_abc123
```

## 6. 사용 예시
```javascript
import emailjs from '@emailjs/browser';

// EmailJS 초기화
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

// 이메일 전송
const sendEmail = async (data) => {
  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        name: data.name,
        phone: data.phone,
        timestamp: new Date().toLocaleString('ko-KR'),
        source: '클러스터용인 웹사이트'
      }
    );
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Email error:', error);
  }
};
```
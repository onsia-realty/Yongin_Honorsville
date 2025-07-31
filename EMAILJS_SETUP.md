# EmailJS 설정 가이드

관심고객 등록 폼에서 실제 이메일 발송을 위한 EmailJS 설정 방법입니다.

## 1. EmailJS 계정 설정

1. [EmailJS 웹사이트](https://www.emailjs.com/)에 접속하여 계정을 생성합니다.
2. 계정 생성 후 로그인합니다.

## 2. 이메일 서비스 연결

1. Dashboard에서 **"Add New Service"** 클릭
2. Gmail, Outlook, 또는 다른 이메일 서비스 선택
3. 이메일 계정 연결 및 인증 완료
4. **Service ID**를 복사해둡니다.

## 3. 이메일 템플릿 생성

1. Dashboard에서 **"Create New Template"** 클릭
2. 다음 템플릿을 참고하여 생성:

```html
제목: [클러스터용인 경남아너스빌] 새로운 관심고객 등록

내용:
===== 관심고객 등록 정보 =====

■ 고객 정보
- 고객명: {{customer_name}}
- 연락처: {{phone_number}}
- 주소: {{address}}
- 등록일시: {{registration_date}}

■ 청약 정보
- 청약통장: {{subscription_account}}
- 청약의사: {{subscription_intention}}
- 계약의사: {{contract_intention}}
- 분양목적: {{purpose}}

■ 개인정보 동의 현황
- 개인정보 수집/이용 동의: {{privacy_consent_1}}
- 개인정보 처리위탁 동의: {{privacy_consent_2}}
- 마케팅 정보 활용 동의: {{marketing_consent}}

============================

이 메일은 클러스터용인 경남아너스빌 홈페이지 관심고객 등록 시스템에서 자동 발송되었습니다.
```

3. **Template ID**를 복사해둡니다.

## 4. Public Key 확인

1. Dashboard에서 **"Account"** > **"API Keys"** 메뉴로 이동
2. **Public Key**를 복사해둡니다.

## 5. 환경 변수 설정

`.env.local` 파일을 열어 다음과 같이 설정:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id  
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
```

## 6. 테스트

1. 개발 서버 재시작: `pnpm run dev`
2. 관심고객 등록 페이지에서 테스트 등록 진행
3. 설정한 이메일 계정으로 메일이 정상 발송되는지 확인

## 주의사항

- **Gmail 사용 시**: Gmail 계정에서 "앱 비밀번호" 설정이 필요할 수 있습니다.
- **개인정보 보호**: 수신된 고객 정보는 개인정보처리방침에 따라 안전하게 관리해야 합니다.
- **스팸 방지**: 이메일 발송량이 많을 경우 EmailJS 유료 플랜 고려가 필요합니다.

## 문제 해결

### "인증 범위가 부족합니다" 오류
- EmailJS 서비스 연결 시 Gmail 권한을 모두 허용했는지 확인
- Gmail 계정의 "보안 수준이 낮은 앱의 액세스" 허용 설정 확인

### 이메일이 발송되지 않는 경우
- 환경 변수가 올바르게 설정되었는지 확인
- EmailJS Dashboard에서 사용량 한도 확인
- 브라우저 개발자 도구에서 네트워크 오류 확인
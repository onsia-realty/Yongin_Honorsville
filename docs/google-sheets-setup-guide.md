# Google Sheets 설정 가이드

## 문제 해결: 고객명과 휴대폰번호가 기입되지 않는 문제

### 1. Google Apps Script 업데이트

1. Google Sheets 열기
2. **도구** → **스크립트 편집기** 클릭
3. 기존 코드를 모두 삭제하고 `google-apps-script-updated.js` 파일의 내용을 붙여넣기
4. **저장** (Ctrl+S 또는 Cmd+S)
5. **배포** → **새 배포** 클릭

### 2. 배포 설정 확인

배포 설정이 올바른지 확인:
- **유형**: 웹 앱
- **설명**: 관심고객 등록 API
- **실행**: 나
- **액세스 권한**: 모든 사용자
- **배포** 버튼 클릭

### 3. 권한 설정

처음 배포시 권한 요청이 나타나면:
1. **액세스 권한 부여** 클릭
2. Google 계정 선택
3. **고급** 클릭
4. **[프로젝트 이름](으)로 이동** 클릭
5. **허용** 클릭

### 4. 스프레드시트 열 제목 설정

Google Sheets 첫 번째 행에 다음 제목 추가:
- A1: 등록시간
- B1: 고객명
- C1: 휴대폰번호
- D1: 등록경로

### 5. 테스트 방법

Google Apps Script 편집기에서:
1. `testAddData` 함수 선택
2. **실행** 버튼 클릭
3. Google Sheets에 테스트 데이터가 추가되는지 확인

### 6. 웹앱 URL 업데이트

새로운 배포 URL을 복사하여 `app/registration/page.tsx` 파일의 41번째 줄 업데이트:
```javascript
const GOOGLE_SCRIPT_URL = '여기에_새로운_URL_붙여넣기'
```

### 7. 이메일 기능 활성화 (선택사항)

이메일도 받고 싶다면:
1. Google Apps Script 편집기에서 18번째 줄의 이메일 주소 변경
2. 71-76번째 줄의 주석 해제 (/* 와 */ 삭제)
3. 저장 후 재배포

### 8. 문제가 지속될 경우

1. **브라우저 개발자 도구** (F12) → **Network** 탭에서 요청 확인
2. **Console** 탭에서 에러 메시지 확인
3. Google Apps Script 편집기에서 **보기** → **실행 기록**에서 로그 확인

### 9. CORS 문제 해결

프론트엔드 코드에서 fetch 옵션 수정이 필요할 수 있습니다:
```javascript
await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors', // 추가
  headers: {
    'Content-Type': 'text/plain',
  },
  body: JSON.stringify({
    name: formData.name,
    phone: formData.phone,
    timestamp: new Date().toLocaleString('ko-KR'),
    source: '관심고객 등록 페이지'
  })
})
```
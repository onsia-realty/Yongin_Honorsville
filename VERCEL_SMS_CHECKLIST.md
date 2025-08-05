# Vercel SMS 발송 체크리스트

## 1. Vercel 환경 변수 설정 확인
Vercel 대시보드에서 다음 환경 변수가 설정되어 있는지 확인하세요:

- [ ] `SOLAPI_API_KEY` - 솔라피 API 키
- [ ] `SOLAPI_API_SECRET` - 솔라피 API 시크릿
- [ ] `SMS_SENDER_NUMBER` - 발신번호 (기본값: 1668-5257)
- [ ] `ADMIN_PHONE` - 관리자 전화번호 (기본값: 010-7781-9297)

## 2. 변경사항 요약
- API 라우트에 환경 변수 검증 로직 추가
- Vercel 함수 런타임 설정 (`runtime: 'nodejs'`)
- 최대 실행 시간 설정 (`maxDuration: 10`)
- 상세한 에러 로깅 추가
- SMS 발송 실패 시에도 등록은 성공하도록 처리

## 3. 테스트 방법
1. Vercel에 배포 후 로그 확인
2. 관심고객 등록 테스트
3. Vercel Functions 로그에서 다음 확인:
   - 환경 변수 상태
   - SMS 발송 결과
   - 에러 메시지

## 4. 문제 해결
### 환경 변수가 없다고 나오는 경우:
1. Vercel 대시보드 → Settings → Environment Variables
2. 모든 환경 변수 추가
3. 재배포 (Redeploy)

### SMS는 성공하는데 실제로 오지 않는 경우:
1. 솔라피 대시보드에서 발송 내역 확인
2. 발신번호가 사전등록되어 있는지 확인
3. 잔액이 충분한지 확인

### API 호출 자체가 실패하는 경우:
1. Vercel Functions 로그 확인
2. 네트워크 탭에서 응답 확인
3. CORS 에러 여부 확인
# Vercel 배포 확인 체크리스트

## Open Graph 이미지 문제 해결

### 1. 파일 확인
- ✅ `/public/대표홈페이지 썸네일.jpg` 파일 존재 확인
- ✅ `/app/opengraph-image.jpg` 파일 추가 (Next.js 자동 메타태그 생성)
- ✅ `/app/twitter-image.jpg` 파일 추가

### 2. 메타데이터 설정
- ✅ 절대 URL 사용: `https://cluster-honorsville.com/대표홈페이지 썸네일.jpg`
- ✅ metadataBase 설정: `new URL('https://cluster-honorsville.com')`
- ✅ 이미지 타입 명시: `type: 'image/jpeg'`

### 3. Vercel 배포 확인
1. Vercel 대시보드에서 빌드 로그 확인
2. 배포 완료 후 실제 URL로 이미지 접근 테스트:
   - https://cluster-honorsville.com/대표홈페이지%20썸네일.jpg
   - https://cluster-honorsville.com/opengraph-image.jpg

### 4. 디버깅 단계

#### 직접 이미지 URL 테스트
브라우저에서 다음 URL 접속:
```
https://cluster-honorsville.com/대표홈페이지%20썸네일.jpg
```

#### HTML 메타태그 확인
페이지 소스 보기에서 다음 태그 확인:
```html
<meta property="og:image" content="https://cluster-honorsville.com/대표홈페이지 썸네일.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
```

### 5. 캐시 문제 해결

#### 카카오톡
1. https://developers.kakao.com/tool/debugger/sharing 접속
2. URL 입력
3. "초기화" 버튼 클릭 (캐시 삭제)
4. "디버그" 버튼 클릭

#### 페이스북
1. https://developers.facebook.com/tools/debug/ 접속
2. URL 입력
3. "Scrape Again" 클릭

### 6. 한글 파일명 문제 해결 (대안)

한글 파일명이 문제가 될 경우:
1. 파일명을 영문으로 변경: `og-image.jpg`
2. layout.tsx에서 URL 업데이트
3. 재배포

### 7. Vercel 환경 변수 확인
Vercel 대시보드에서:
- Settings → Environment Variables
- NEXT_PUBLIC_SITE_URL 등 확인

### 8. 추가 디버깅 옵션

Next.js App Router의 자동 메타태그 생성 활용:
- `/app/opengraph-image.jpg` (1200x630px)
- `/app/twitter-image.jpg` (1200x630px)
- 이 파일들은 자동으로 메타태그로 변환됨

### 9. 최종 확인사항
- Git 푸시 완료: ✅
- Vercel 자동 배포 트리거: 확인 필요
- 빌드 성공 여부: 확인 필요
- 배포 후 실제 사이트 접속: 확인 필요
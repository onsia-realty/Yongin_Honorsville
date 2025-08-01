# Open Graph 이미지 테스트 가이드

## 수정 사항

1. **절대 URL 사용**: Open Graph 이미지 URL을 절대 경로로 변경
   - 변경 전: `/대표홈페이지 썸네일.jpg`
   - 변경 후: `https://cluster-honorsville.com/대표홈페이지 썸네일.jpg`

2. **이미지 타입 추가**: `type: 'image/jpeg'` 명시

3. **Next.js 자동 이미지 생성**: 
   - `app/opengraph-image.jpg` 파일 추가
   - `app/twitter-image.jpg` 파일 추가
   - Next.js가 자동으로 이 파일들을 메타태그로 변환

4. **robots.txt 추가**: 소셜 미디어 크롤러 허용
   - Kakaotalk-scrap
   - facebookexternalhit
   - Twitterbot

## 테스트 방법

### 1. 카카오톡 디버거
https://developers.kakao.com/tool/debugger/sharing

1. URL 입력: `https://cluster-honorsville.com`
2. "초기화" 클릭 (캐시 삭제)
3. "디버그" 클릭

### 2. Facebook 디버거
https://developers.facebook.com/tools/debug/

1. URL 입력: `https://cluster-honorsville.com`
2. "Debug" 클릭
3. "Scrape Again" 클릭 (캐시 새로고침)

### 3. Twitter Card Validator
https://cards-dev.twitter.com/validator

1. URL 입력: `https://cluster-honorsville.com`
2. "Preview card" 클릭

## 캐시 문제 해결

소셜 미디어 플랫폼은 Open Graph 데이터를 캐시합니다. 변경사항이 즉시 반영되지 않을 수 있으므로:

1. 각 플랫폼의 디버거에서 캐시 초기화
2. URL 끝에 쿼리 파라미터 추가 (예: `?v=2`)
3. 24시간 후 재확인

## 이미지 요구사항

- **크기**: 1200x630px (권장)
- **파일 크기**: 5MB 이하
- **형식**: JPG, PNG
- **비율**: 1.91:1

## 추가 메타태그 (선택사항)

```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:updated_time" content="2025-08-01T12:00:00+09:00" />
```
# SEO 메타데이터 설정 가이드

## 적용된 메타데이터

### 1. 기본 메타데이터
- **Title**: `클러스터용인 경남아너스빌 | 반도체 프리미엄 직접 영향권`
- **Description**: 동용인IC(예정)를 통해 삼성전자와 SK하이닉스 10분대 이동 가능. 서울~세종고속도로 더 가깝게, 삼성,SK하이닉스 10분대로 더 빠르게. 경기도 용인시 처인구 양지면 양지리 697번지 일원
- **Keywords**: 클러스터용인, 경남아너스빌, 용인아파트, 반도체클러스터, SK하이닉스, 삼성전자, 용인분양, 용인신도시, 처인구아파트, 양지아파트

### 2. Open Graph (SNS 공유시 표시)
- **og:title**: 클러스터용인 경남아너스빌 | 반도체 프리미엄 직접 영향권
- **og:description**: 동용인IC(예정)를 통해 삼성전자와 SK하이닉스 10분대 이동 가능. 서울~세종고속도로 더 가깝게, 삼성,SK하이닉스 10분대로 더 빠르게. 경기도 용인시 처인구 양지면 양지리 697번지 일원
- **og:image**: `/대표홈페이지 썸네일.jpg` (1200x630)
- **og:url**: https://cluster-honorsville.com
- **og:type**: website
- **og:locale**: ko_KR

### 3. Twitter Card
- **twitter:card**: summary_large_image
- **twitter:title**: 클러스터용인 경남아너스빌 | 반도체 프리미엄 직접 영향권
- **twitter:description**: 동용인IC를 통해 삼성전자와 SK하이닉스 10분대 이동. 용인시 처인구 양지면 양지리 697번지
- **twitter:image**: `/대표홈페이지 썸네일.jpg`

### 4. 검색엔진 최적화
- **robots**: index, follow (검색엔진 색인 허용)
- **googleBot**: 모든 콘텐츠 크롤링 허용
  - max-video-preview: -1 (무제한)
  - max-image-preview: large
  - max-snippet: -1 (무제한)

### 5. 사이트 인증 (추후 설정 필요)
- **google-site-verification**: google-site-verification-code (구글 서치 콘솔 인증코드 입력 필요)
- **naver-site-verification**: naver-site-verification-code (네이버 웹마스터 도구 인증코드 입력 필요)

## 추가 설정 사항

### 검색엔진 등록
1. **구글 서치 콘솔** (https://search.google.com/search-console)
   - 사이트 등록 후 인증코드를 `verification.google`에 입력

2. **네이버 웹마스터 도구** (https://searchadvisor.naver.com)
   - 사이트 등록 후 인증코드를 `verification.naver`에 입력

3. **사이트맵 제출**
   - `/sitemap.xml` 생성 후 각 검색엔진에 제출

### 이미지 최적화
- Open Graph 이미지는 1200x630 픽셀 권장
- 파일 크기는 5MB 이하 권장
- JPG 또는 PNG 형식 사용

### 페이지별 메타데이터
각 페이지에 고유한 메타데이터를 설정하려면 해당 페이지의 `page.tsx`에 다음과 같이 추가:

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '페이지 제목 | 클러스터용인 경남아너스빌',
  description: '페이지별 설명',
}
```
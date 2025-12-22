# AI 블로그 시스템 설정 가이드

## 📋 목차
1. [시스템 개요](#시스템-개요)
2. [데이터베이스 설정](#데이터베이스-설정)
3. [Claude API 설정](#claude-api-설정)
4. [로컬 테스트](#로컬-테스트)
5. [Vercel 배포 및 자동화](#vercel-배포-및-자동화)
6. [수동 기사 생성](#수동-기사-생성)

---

## 시스템 개요

**기능**:
- AI(Claude)를 활용한 부동산 기사 자동 생성
- Naver 블로그 스타일 HTML 형식 출력
- 매일 오전 10시 자동 기사 발행 (Vercel Cron)
- SEO 최적화 (JSON-LD 스키마, 메타데이터)
- 조회수 추적 및 관련 기사 추천

**기술 스택**:
- Next.js 16 + TypeScript
- Neon PostgreSQL
- Claude 3.5 Sonnet API
- Vercel Cron Jobs

---

## 데이터베이스 설정

### 1. Neon DB 콘솔 접속
URL: https://console.neon.tech/

### 2. SQL Editor에서 스키마 실행
`scripts/init-blog.sql` 파일의 내용을 복사하여 실행:

```bash
# 파일 위치
scripts/init-blog.sql
```

**실행 방법**:
1. Neon 콘솔 → SQL Editor 메뉴
2. `init-blog.sql` 내용 전체 복사
3. 붙여넣기 후 "Run" 버튼 클릭

**생성되는 테이블**:
- `blog_posts`: 기사 본문 및 메타데이터
- `blog_keywords`: SEO 키워드 관리
- `blog_analytics`: 조회수 및 성과 추적

### 3. 테이블 생성 확인
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name LIKE 'blog_%';
```

**예상 결과**:
- blog_posts
- blog_keywords
- blog_analytics

---

## Claude API 설정

### 1. Anthropic 계정 생성
URL: https://console.anthropic.com/

### 2. API 키 발급
1. Console → API Keys 메뉴
2. "Create Key" 버튼 클릭
3. 키 이름 입력 (예: "honorsville-blog")
4. API 키 복사 (sk-ant-api03-...)

### 3. `.env.local` 파일 업데이트
```bash
# Claude API (AI 기사 생성용)
ANTHROPIC_API_KEY=sk-ant-api03-여기에_실제_API_키_붙여넣기
```

**⚠️ 중요**:
- API 키는 절대 Git에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다

### 4. API 사용량 확인
URL: https://console.anthropic.com/settings/usage

**예상 비용** (Claude Opus 4.5 사용):
- 기사 1개당: $0.50-0.80 (약 ₩650-1,050)
- 월 30개 기사: $15-25 (약 ₩20,000-33,000)

---

## 로컬 테스트

### 1. 개발 서버 시작
```bash
pnpm run dev
```

### 2. 수동으로 기사 생성 테스트

**방법 1: API 직접 호출 (Postman/curl)**
```bash
curl -X POST http://localhost:3001/api/generate-blog-post \
  -H "Content-Type: application/json" \
  -d '{}'
```

**방법 2: 특정 키워드로 생성**
```bash
curl -X POST http://localhost:3001/api/generate-blog-post \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "경남아너스빌",
    "category": "분양 정보",
    "topic": "경남아너스빌 분양 일정 및 절차 안내"
  }'
```

**방법 3: 브라우저에서 테스트**
1. 브라우저에서 http://localhost:3001/api/generate-blog-post 접속
2. POST 요청 설명 확인
3. Postman이나 Thunder Client 확장 프로그램 사용 권장

### 3. 생성된 기사 확인
```bash
# 블로그 목록 페이지
http://localhost:3001/press

# 개별 기사 페이지 (slug는 생성 결과에서 확인)
http://localhost:3001/press/{slug}
```

### 4. 예상 응답 구조
```json
{
  "success": true,
  "article": {
    "id": "uuid",
    "title": "용인 반도체 클러스터 아파트 투자 가이드",
    "slug": "1703000000000-abcde",
    "published_at": "2024-12-22T10:00:00Z"
  },
  "keywords": [
    "경남아너스빌",
    "용인 아파트 분양",
    "반도체 클러스터"
  ]
}
```

---

## Vercel 배포 및 자동화

### 1. 환경 변수 설정 (Vercel Dashboard)

**URL**: https://vercel.com/your-project/settings/environment-variables

**필수 환경 변수**:
```bash
# Neon DB (이미 설정되어 있음)
DATABASE_URL=postgresql://...

# Claude API
ANTHROPIC_API_KEY=sk-ant-api03-...

# 사이트 URL
NEXT_PUBLIC_SITE_URL=https://yongin-honorsville.vercel.app

# Cron Job 보안 키 (랜덤 문자열 생성)
CRON_SECRET=your-random-secret-key-here
```

**CRON_SECRET 생성 방법**:
```bash
# 방법 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 방법 2: OpenSSL
openssl rand -hex 32

# 방법 3: 온라인 생성기
# https://www.random.org/strings/
```

### 2. Vercel Cron Jobs 활성화

**설정 파일**: `vercel.json` (이미 생성됨)
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-blog",
      "schedule": "0 10 * * *"
    }
  ]
}
```

**스케줄 설명**:
- `0 10 * * *`: 매일 오전 10시 (UTC 기준)
- 한국 시간(KST): 오후 7시

**스케줄 변경 예시**:
```
0 1 * * *   # 매일 오전 10시 (한국 시간, UTC+9 고려)
0 */12 * * * # 12시간마다
0 9,15 * * * # 오전 9시, 오후 3시 (하루 2회)
```

### 3. 배포
```bash
# Git에 커밋 및 푸시
git add .
git commit -m "feat: AI 블로그 시스템 추가"
git push origin main
```

**Vercel 자동 배포 확인**:
1. https://vercel.com/your-project/deployments
2. 배포 로그 확인
3. Production 배포 성공 확인

### 4. Cron Job 동작 확인

**URL**: https://vercel.com/your-project/cron

**확인 사항**:
- ✅ Cron job 활성화 상태
- ✅ 다음 실행 예정 시간
- ✅ 최근 실행 기록

---

## 수동 기사 생성

### 개발/테스트 환경
```bash
# 로컬 서버에서
curl -X POST http://localhost:3001/api/generate-blog-post \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 프로덕션 환경
```bash
# Vercel 배포 후
curl -X POST https://yongin-honorsville.vercel.app/api/generate-blog-post \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Cron 엔드포인트 수동 트리거 (테스트용)
```bash
# 개발 환경 (인증 불필요)
curl http://localhost:3001/api/cron/daily-blog

# 프로덕션 환경 (인증 필요)
curl https://yongin-honorsville.vercel.app/api/cron/daily-blog \
  -H "Authorization: Bearer your-cron-secret"
```

---

## 문제 해결

### 기사 생성 실패
**원인**: ANTHROPIC_API_KEY 미설정 또는 잘못된 키
**해결**:
1. `.env.local` 파일 확인
2. Vercel 환경 변수 확인
3. API 키 재발급

### 데이터베이스 연결 실패
**원인**: DATABASE_URL 미설정 또는 잘못된 URL
**해결**:
1. Neon DB 콘솔에서 Connection String 확인
2. `.env.local` 및 Vercel 환경 변수 업데이트

### Cron Job이 실행되지 않음
**원인**:
- Vercel Pro 플랜 아님 (Hobby 플랜은 Cron 미지원)
- CRON_SECRET 미설정
- vercel.json 파일 누락

**해결**:
1. Vercel 플랜 확인 (Pro 필요: $20/월)
2. 환경 변수 확인
3. vercel.json 파일 존재 확인

**대안 (Hobby 플랜 사용 시)**:
- GitHub Actions 사용
- 수동 트리거로 기사 생성

---

## 다음 단계

### 1. 첫 테스트 기사 3개 생성
```bash
# 3번 실행
curl -X POST http://localhost:3001/api/generate-blog-post -d '{}'
curl -X POST http://localhost:3001/api/generate-blog-post -d '{}'
curl -X POST http://localhost:3001/api/generate-blog-post -d '{}'
```

### 2. 블로그 페이지 확인
- http://localhost:3001/press (목록)
- http://localhost:3001/press/{slug} (개별 기사)

### 3. SEO 검증
- Google Search Console에서 URL 검사
- Naver Search Advisor에서 색인 요청

### 4. 모니터링
- Neon DB 대시보드: 데이터 증가 확인
- Vercel Cron Logs: 자동 실행 기록 확인
- Claude API Usage: 사용량 및 비용 확인

---

## 유지보수

### 키워드 관리
`app/api/generate-blog-post/route.ts` 파일의 `KEYWORDS` 배열 수정:
```typescript
const KEYWORDS = [
  { keyword: '새로운 키워드', category: '카테고리', priority: 'high' },
  // ...
];
```

### 카테고리 및 주제 관리
`ARTICLE_TOPICS` 객체 수정:
```typescript
const ARTICLE_TOPICS = {
  '새로운 카테고리': [
    '새로운 주제 1',
    '새로운 주제 2',
  ],
  // ...
};
```

### 기사 스케줄 변경
`vercel.json` 파일의 `schedule` 수정 후 재배포

---

**작성일**: 2024-12-22
**업데이트**: 필요시 수시 업데이트

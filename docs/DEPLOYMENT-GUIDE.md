# 🚀 Vercel 배포 가이드

## 📋 목차
1. [환경 변수 구조](#환경-변수-구조)
2. [DB 분리 전략](#db-분리-전략)
3. [Vercel 배포 설정](#vercel-배포-설정)
4. [다중 사이트 확장](#다중-사이트-확장)
5. [트러블슈팅](#트러블슈팅)

---

## 🔑 환경 변수 구조

### 핵심 개념: DB 분리
**중요**: 관심고객 DB와 블로그 DB를 **반드시 분리**해야 합니다!

### 왜 분리하는가?
1. **보안**: 고객 개인정보와 블로그 콘텐츠 분리
2. **확장성**: 50+ 랜딩페이지에서 하나의 블로그 DB 공유 가능
3. **관리 용이성**: 고객 DB는 사이트별, 블로그 DB는 통합 관리
4. **성능**: 트래픽 분산

### 필수 환경 변수

#### 1️⃣ DATABASE_URL (관심고객 DB)
```bash
# Neon DB: ep-sweet-shadow-a1ebtz4b
DATABASE_URL=postgresql://neondb_owner:npg_aosMqC41RcUf@ep-sweet-shadow-a1ebtz4b-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

**용도**:
- 관심고객 등록 (`/registration` 페이지)
- 고객 데이터 저장
- 사이트별 독립 DB

**테이블**:
- `customers` - 고객 정보

---

#### 2️⃣ BLOG_DATABASE_URL (블로그 DB)
```bash
# Neon DB: ep-noisy-frog-a1h4jgyt (randing-blog)
BLOG_DATABASE_URL=postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

**용도**:
- 블로그 기사 저장 (`/press` 페이지)
- AI 자동 기사 생성
- **50+ 사이트 공유 가능**

**테이블**:
- `blog_posts` - 기사 본문
- `blog_keywords` - SEO 키워드
- `blog_analytics` - 성과 추적

---

#### 3️⃣ SMS 발송 (SOLAPI)
```bash
SOLAPI_API_KEY=your_api_key
SOLAPI_API_SECRET=your_api_secret
SMS_SENDER_NUMBER=16685257
ADMIN_PHONE=01012345678
```

**용도**:
- 관심고객 등록 시 SMS 발송
- 관리자 알림

---

#### 4️⃣ AI 자동 생성 (선택사항)
```bash
# Claude API (추천)
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Vercel Cron Jobs 보안
CRON_SECRET=random-secret-string-here
```

**용도**:
- 매일 자동 블로그 기사 생성
- Vercel Pro 플랜 필요 ($20/월)

---

## 🗄️ DB 분리 전략

### 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                    50+ 랜딩페이지                        │
├─────────────────────────────────────────────────────────┤
│  Site 1        Site 2        Site 3        ...  Site 50 │
│  ┌──────┐     ┌──────┐     ┌──────┐           ┌──────┐ │
│  │ DB 1 │     │ DB 2 │     │ DB 3 │     ...   │ DB50 │ │
│  └──────┘     └──────┘     └──────┘           └──────┘ │
│  (고객 DB)    (고객 DB)    (고객 DB)          (고객 DB)│
│                                                          │
│  └────────────────┬─────────────────────────┘           │
│                   │                                      │
│                   ▼                                      │
│          ┌─────────────────┐                            │
│          │  통합 블로그 DB  │                            │
│          │ (ep-noisy-frog) │                            │
│          └─────────────────┘                            │
│            - 모든 사이트 공유                            │
│            - site_id로 구분                              │
└─────────────────────────────────────────────────────────┘
```

### DB 네이밍 규칙

#### 고객 DB (사이트별)
```
사이트명: 용인 아너스빌
DB명: ep-sweet-shadow-a1ebtz4b
용도: 관심고객 등록

사이트명: 광교 센트럴파크
DB명: ep-[random-name]-[id]
용도: 관심고객 등록

...
```

#### 블로그 DB (통합)
```
DB명: ep-noisy-frog-a1h4jgyt (randing-blog)
용도: 50+ 사이트 블로그 통합 관리
site_id: 향후 추가 예정
```

---

## ⚙️ Vercel 배포 설정

### 1단계: 프로젝트 생성
1. Vercel 대시보드: https://vercel.com
2. **"New Project"** 클릭
3. GitHub 리포지토리 연결
4. 프로젝트명: `Yongin_Honorsville`

### 2단계: 환경 변수 추가
1. 프로젝트 클릭 → **"Settings"** → **"Environment Variables"**
2. 필수 변수 추가:

```bash
# 필수
DATABASE_URL=postgresql://...ep-sweet-shadow...
BLOG_DATABASE_URL=postgresql://...ep-noisy-frog...
SOLAPI_API_KEY=xxxxx
SOLAPI_API_SECRET=xxxxx
SMS_SENDER_NUMBER=16685257
ADMIN_PHONE=01012345678

# 선택 (AI 자동 생성)
ANTHROPIC_API_KEY=sk-ant-xxxxx
CRON_SECRET=random-secret
```

3. Environment 선택:
   - ✅ Production
   - ✅ Preview (선택사항)
   - ✅ Development (선택사항)

### 3단계: 배포
1. **"Deploy"** 버튼 클릭
2. 빌드 완료 대기 (1-2분)
3. 배포 URL 확인: `https://yongin-honorsville.vercel.app`

### 4단계: 확인
- 홈페이지: `https://도메인/`
- 관심고객: `https://도메인/registration`
- 블로그: `https://도메인/press`
- 개별 기사: `https://도메인/press/[slug]`

---

## 🌐 다중 사이트 확장

### 새 사이트 추가 프로세스

#### 1. Neon DB 생성 (고객 DB)
```sql
-- Neon 대시보드에서 새 프로젝트 생성
-- 프로젝트명: site-2-customers
-- 리전: ap-southeast-1 (싱가포르)

-- customers 테이블 생성
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. GitHub 리포지토리 복제
```bash
# 새 리포지토리 생성
git clone https://github.com/onsia-realty/Yongin_Honorsville.git Site2_Name
cd Site2_Name

# 리모트 변경
git remote set-url origin https://github.com/onsia-realty/Site2_Name.git
git push -u origin main
```

#### 3. Vercel 프로젝트 생성
```bash
# Vercel 대시보드
New Project → 새 리포지토리 연결

# 환경 변수 설정
DATABASE_URL=postgresql://...site-2-customers...
BLOG_DATABASE_URL=postgresql://...ep-noisy-frog... (동일!)
SOLAPI_API_KEY=xxxxx (동일!)
SOLAPI_API_SECRET=xxxxx (동일!)
```

#### 4. 사이트별 커스터마이징
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: '사이트2 아파트명 | 서브 타이틀',
  description: '사이트2 설명...',
  // ...
}

// components/Header.tsx
// 로고, 전화번호, 주소 등 변경
```

### 블로그 DB 다중 사이트 지원 (향후)

현재는 모든 사이트가 동일한 블로그를 공유합니다.
향후 사이트별 블로그를 구분하려면:

```sql
-- blog_posts 테이블에 site_id 추가
ALTER TABLE blog_posts ADD COLUMN site_id VARCHAR(50) DEFAULT 'yongin-honorsville';

-- 사이트별 조회
SELECT * FROM blog_posts
WHERE site_id = 'site-2-name'
AND status = 'published';
```

---

## 🔧 트러블슈팅

### 문제 1: 블로그 페이지에 기사가 안 보임
**증상**: `/press` 페이지에 "아직 게시된 기사가 없습니다" 표시

**원인**: `BLOG_DATABASE_URL` 환경 변수 누락

**해결**:
1. Vercel Settings → Environment Variables
2. `BLOG_DATABASE_URL` 추가
3. Redeploy

---

### 문제 2: 빌드 에러 - "No database connection string"
**증상**:
```
Error: No database connection string was provided to `neon()`.
```

**원인**: 빌드 타임에 환경 변수가 없음

**해결**: 이미 수정됨 (getSql() 함수 사용)
```typescript
// ❌ 잘못된 방법
const sql = neon(process.env.BLOG_DATABASE_URL!);

// ✅ 올바른 방법
function getSql() {
  if (!process.env.BLOG_DATABASE_URL) {
    throw new Error('BLOG_DATABASE_URL is not set');
  }
  return neon(process.env.BLOG_DATABASE_URL);
}
```

---

### 문제 3: 관심고객 등록 시 SMS 발송 실패
**증상**: 등록은 되지만 SMS가 안 감

**원인**: SOLAPI 환경 변수 누락 또는 잘못됨

**확인**:
```bash
# Vercel Environment Variables 확인
SOLAPI_API_KEY=xxxxx
SOLAPI_API_SECRET=xxxxx
SMS_SENDER_NUMBER=16685257
ADMIN_PHONE=01012345678
```

---

### 문제 4: Google Search Console 소유권 확인 실패
**증상**: "소유권을 확인할 수 없습니다"

**원인**: 메타 태그가 HTML에 없음

**확인**:
```typescript
// app/layout.tsx
verification: {
  google: 'Ee8phSWzCfb70fE-qjRN6MgSk__agI8-X0zmuZdO7H4',
},
```

배포 후 소스 보기에서 확인:
```html
<meta name="google-site-verification" content="Ee8phSWzCfb70fE-qjRN6MgSk__agI8-X0zmuZdO7H4" />
```

---

## 📊 환경 변수 체크리스트

### 최소 배포 (블로그 없음)
- [ ] `DATABASE_URL` (관심고객 DB)
- [ ] `SOLAPI_API_KEY`
- [ ] `SOLAPI_API_SECRET`
- [ ] `SMS_SENDER_NUMBER`
- [ ] `ADMIN_PHONE`

### 블로그 포함 배포
- [ ] `DATABASE_URL` (관심고객 DB)
- [ ] `BLOG_DATABASE_URL` (블로그 DB) ⭐ **필수**
- [ ] `SOLAPI_API_KEY`
- [ ] `SOLAPI_API_SECRET`
- [ ] `SMS_SENDER_NUMBER`
- [ ] `ADMIN_PHONE`

### AI 자동 생성 포함 (Vercel Pro)
- [ ] 위 블로그 포함 배포 항목 전체
- [ ] `ANTHROPIC_API_KEY`
- [ ] `CRON_SECRET`

---

## 🎯 Best Practices

### 1. 환경 변수 관리
- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- `.gitignore`에 `.env*` 포함 확인
- 1Password, Bitwarden 등에 환경 변수 백업

### 2. DB 백업
- Neon DB 자동 백업 설정 (무료 플랜: 7일)
- 중요 데이터는 주기적으로 수동 백업
```sql
-- 고객 데이터 백업
COPY customers TO '/backup/customers.csv' WITH CSV HEADER;

-- 블로그 데이터 백업
COPY blog_posts TO '/backup/blog_posts.csv' WITH CSV HEADER;
```

### 3. 배포 전 체크리스트
- [ ] 환경 변수 모두 설정됨
- [ ] 로컬에서 테스트 완료
- [ ] DB 연결 확인
- [ ] SMS 발송 테스트
- [ ] 블로그 페이지 확인

### 4. 성능 최적화
- [ ] 이미지 최적화 활성화 (`next.config.mjs`)
- [ ] Sitemap 생성 (`/sitemap.xml`)
- [ ] Google Search Console 등록
- [ ] Naver 웹마스터도구 등록

---

## 📚 관련 문서

- [블로그 시스템 설정 가이드](./BLOG-SETUP-GUIDE.md)
- [SEO 전략 문서](./SEO-STRATEGY.md)
- [Naver SEO 가이드](./NAVER-SEO-GUIDE.md)

---

**작성일**: 2025-12-22
**최종 수정**: 2025-12-22
**작성자**: Claude Code (Sonnet 4.5)

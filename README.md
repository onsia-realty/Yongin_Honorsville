# 클러스터용인 경남아너스빌

> Next.js 16 기반 부동산 랜딩페이지 with AI 블로그 시스템

[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [배포](#배포)
- [문서](#문서)
- [라이센스](#라이센스)

## 🏢 프로젝트 개요

**클러스터용인 경남아너스빌**은 용인 반도체 클러스터 인근에 위치한 프리미엄 아파트 분양 사이트입니다.

### 핵심 특징
- 997세대 대단지 (84㎡/123㎡)
- SK하이닉스 10분대, 삼성전자 15분대
- 동용인IC 인접 (5분 거리)

### 기술적 특징
- **AI 블로그 자동 생성**: Claude Opus 4.5 기반 매일 자동 SEO 최적화 기사 발행
- **DB 분리 아키텍처**: 고객 DB와 블로그 DB 분리로 50+ 랜딩페이지 확장 가능
- **SEO 최적화**: Google/Naver 검색 엔진 최적화, Dynamic Sitemap, JSON-LD Schema

## ✨ 주요 기능

### 1. 랜딩페이지 시스템
- **사업개요**: 단지 소개, 사업 개요, 오시는 길
- **프리미엄**: 입지 프리미엄, 단지 배치도
- **단지안내**: 시스템, Club Honors 시설
- **세대안내**: 평면도 (123㎡, 84A㎡, 84B㎡), 인테리어
- **홍보센터**: AI 블로그, 홍보영상
- **분양센터**: 청약 안내, 분양일정, 모집공고, 관심고객 등록

### 2. AI 블로그 시스템
- **자동 기사 생성**: Claude Opus 4.5 API를 활용한 SEO 최적화 기사 생성
- **키워드 로테이션**: 10개 키워드 풀 자동 순환 (10일 주기)
- **Naver 블로그 스타일**: HTML 형식 콘텐츠 with data-ke-size 속성
- **SEO 최적화**: 메타데이터, JSON-LD Schema, 조회수 추적
- **자동화**: Vercel Cron Jobs로 매일 오전 10시 자동 발행

### 3. 관심고객 등록 시스템
- **실시간 SMS 발송**: SOLAPI 연동으로 즉시 알림
- **Neon PostgreSQL**: 서버리스 DB로 빠른 데이터 저장
- **관리자 알림**: 신규 등록 시 관리자에게 SMS 발송

### 4. SEO & 마케팅
- **Google Search Console**: 소유권 인증 완료
- **Dynamic Sitemap**: 블로그 포스트 자동 포함
- **Google Tag Manager**: 전환 추적
- **Naver Ads Pixel**: 네이버 광고 추적
- **Smartlog**: 방문자 분석

## 🛠 기술 스택

### Frontend
- **Next.js 16.1.0**: React 기반 프레임워크 (App Router)
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 유틸리티 퍼스트 CSS
- **Radix UI**: 접근성 높은 UI 컴포넌트

### Backend
- **Next.js API Routes**: 서버리스 API
- **Neon PostgreSQL**: 서버리스 데이터베이스 (2개 인스턴스)
- **@neondatabase/serverless**: Neon DB 클라이언트

### AI & Automation
- **Claude Opus 4.5 API**: AI 기사 생성
- **Vercel Cron Jobs**: 스케줄링 (Vercel Pro 필요)

### Deployment
- **Vercel**: 호스팅 및 배포
- **GitHub**: 버전 관리

## 🚀 시작하기

### 사전 요구사항
- Node.js 18+
- pnpm 패키지 매니저

### 설치

```bash
# 리포지토리 클론
git clone https://github.com/onsia-realty/Yongin_Honorsville.git
cd Yongin_Honorsville

# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 편집하여 실제 값 입력
```

### 환경 변수 설정

`.env.local` 파일에 다음 변수들을 설정하세요:

```bash
# 고객 등록 DB (Neon DB - 사이트별 독립)
DATABASE_URL=postgresql://...

# 블로그 DB (Neon DB - 50+ 사이트 공유)
BLOG_DATABASE_URL=postgresql://...

# SOLAPI (SMS 발송)
SOLAPI_API_KEY=your_api_key
SOLAPI_API_SECRET=your_api_secret
SMS_SENDER_NUMBER=16685257
ADMIN_PHONE=010XXXXXXXX

# Claude API (AI 기사 생성 - 선택사항)
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Vercel Cron Jobs 보안 (선택사항)
CRON_SECRET=random_secret_string

# 사이트 URL
NEXT_PUBLIC_SITE_URL=https://yongin-honorsville.vercel.app
```

### 개발 서버 실행

```bash
pnpm run dev
```

브라우저에서 [http://localhost:3001](http://localhost:3001) 접속

### 빌드

```bash
pnpm run build
pnpm run start
```

## 📦 배포

### Vercel 배포 (권장)

1. **Vercel 계정 연결**
   - https://vercel.com 에서 GitHub 리포지토리 연결

2. **환경 변수 설정**
   - Vercel Dashboard → Settings → Environment Variables
   - `.env.local`의 모든 변수를 추가 (⚠️ `BLOG_DATABASE_URL` 필수)

3. **자동 배포**
   - `main` 브랜치에 푸시하면 자동 배포

4. **Cron Jobs 활성화** (선택사항)
   - Vercel Pro 플랜 필요 ($20/월)
   - `vercel.json` 파일에 이미 설정되어 있음
   - 매일 오전 10시 (UTC) 자동 블로그 기사 생성

### 50+ 랜딩페이지 확장 전략

이 프로젝트는 50개 이상의 부동산 랜딩페이지로 확장 가능하도록 설계되었습니다:

- **고객 DB**: 사이트별 독립 Neon DB 인스턴스
- **블로그 DB**: 모든 사이트가 공유하는 통합 블로그 DB
- **환경 변수**: `DATABASE_URL`만 변경하여 다중 사이트 지원

자세한 내용은 [DEPLOYMENT-GUIDE.md](./docs/DEPLOYMENT-GUIDE.md) 참조

## 📚 문서

### 핵심 가이드
- **[배포 가이드](./docs/DEPLOYMENT-GUIDE.md)**: Vercel 배포, 환경 변수, 다중 사이트 확장
- **[블로그 설정 가이드](./docs/BLOG-SETUP-GUIDE.md)**: AI 블로그 시스템 설정 및 운영
- **[SEO 전략](./docs/SEO-STRATEGY.md)**: Google/Naver SEO 최적화 전략
- **[Naver SEO 가이드](./docs/NAVER-SEO-GUIDE.md)**: 네이버 검색 최적화

### 프로젝트 구조

```
Yongin_Honorsville/
├── app/                          # Next.js 앱 디렉토리
│   ├── api/                      # API 라우트
│   │   ├── generate-blog-post/   # AI 기사 생성 API
│   │   ├── cron/daily-blog/      # Cron job 엔드포인트
│   │   └── register/             # 관심고객 등록 API
│   ├── press/                    # 블로그 페이지
│   │   ├── page.tsx              # 블로그 목록
│   │   └── [slug]/page.tsx       # 개별 기사
│   ├── registration/             # 관심고객 등록
│   ├── layout.tsx                # 루트 레이아웃
│   └── ...                       # 기타 페이지들
├── components/                   # React 컴포넌트
│   ├── Header.tsx                # 네비게이션 헤더
│   ├── Footer.tsx                # 푸터
│   ├── ShareButtons.tsx          # 소셜 공유 버튼
│   └── ui/                       # Radix UI 컴포넌트
├── docs/                         # 문서
│   ├── DEPLOYMENT-GUIDE.md       # 배포 가이드
│   ├── BLOG-SETUP-GUIDE.md       # 블로그 설정
│   ├── SEO-STRATEGY.md           # SEO 전략
│   └── NAVER-SEO-GUIDE.md        # Naver SEO
├── public/                       # 정적 파일
│   ├── blog-images/              # 블로그 이미지
│   └── ...                       # 기타 이미지
├── scripts/                      # 유틸리티 스크립트
│   └── init-blog.sql             # 블로그 DB 초기화
├── vercel.json                   # Vercel Cron Jobs 설정
├── .env.local                    # 환경 변수 (gitignore)
└── package.json                  # 프로젝트 의존성
```

## 🔐 보안

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- API 키와 DB 연결 문자열은 안전하게 보관하세요
- Vercel 환경 변수는 암호화되어 저장됩니다
- CRON_SECRET으로 Cron 엔드포인트 보호

## 📊 모니터링

- **Neon DB Dashboard**: 데이터베이스 사용량 및 쿼리 성능
- **Vercel Analytics**: 웹사이트 트래픽 및 성능
- **Vercel Cron Logs**: Cron Job 실행 기록
- **Claude API Usage**: API 사용량 및 비용 추적
- **Google Search Console**: 검색 성능 및 인덱싱
- **Naver Search Advisor**: 네이버 검색 최적화

## 🤝 기여

이 프로젝트는 (주)온시아의 내부 프로젝트입니다.

## 📄 라이센스

Copyright © 2024 (주)온시아. All rights reserved.

---

**개발**: Claude Code (Sonnet 4.5)
**관리**: (주)온시아
**문의**: 1668-5257

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start Development Server:**
```bash
pnpm run dev
```
Server runs on port 3001 (or next available port if 3001 is occupied).

**Build & Production:**
```bash
pnpm run build  # Build for production
pnpm run start  # Start production server
pnpm run lint   # Run linting
```

## URL Content Extraction

**MANDATORY: Always use Playwright MCP for URL content extraction**

When the user provides a URL to extract content (news articles, blog posts, etc.):

1. **NEVER use WebFetch tool** - many websites block automated requests (403 errors)
2. **ALWAYS use Playwright MCP** - browser automation bypasses anti-bot protections
3. **Standard workflow:**
   ```
   - mcp__playwright__browser_navigate to URL
   - mcp__playwright__browser_snapshot to capture content
   - Extract title, date, content, images from snapshot
   - Close browser with mcp__playwright__browser_close
   ```

**Example use case:** Adding news articles to `/press` page from external URLs

## Blog Content Guidelines

**CRITICAL: News Source Attribution**

When creating blog posts based on news articles:

1. **NEVER include direct source attribution in content body**
   - ❌ BAD: "본 게시글은 핀포인트뉴스(2025.12.22) 보도 내용을 참고하여 작성되었습니다"
   - ❌ BAD: "핀포인트뉴스 보도에 따르면..."
   - ❌ BAD: Any footer text citing news sources

2. **DO include original article link ONLY in database metadata**
   - Store in `source` field (e.g., 'news-pinpoint')
   - Add URL to keywords/metadata if needed
   - Keep attribution minimal and technical

3. **Image Captions for AI-Generated Images**
   - ✅ GOOD: "(이미지는 뉴스 내용을 기반으로 재구성)"
   - ✅ GOOD: "(보도 내용을 바탕으로 제작된 이미지)"
   - ❌ BAD: "(사진=용인특례시)" or "(사진=핀포인트뉴스)"

4. **NEVER include inline CTA sections in blog content**
   - ❌ BAD: Adding HTML blocks with "더 자세한 정보가 필요하신가요?" inside content
   - ❌ BAD: Any CTA buttons (전화 상담하기, 오시는길, 카카오톡 문의) in content body
   - ✅ GOOD: Page layout already has CTA sections at the bottom
   - The blog detail page (`/press/[slug]/page.tsx`) already includes proper CTA sections

**Reasoning**: Direct news source citations can create copyright/plagiarism concerns. Keep content original and attribution technical. Inline CTAs create visual clutter and are redundant with page-level CTAs.

## Architecture Overview

This is a **Next.js 15.2.4** real estate website for "클러스터용인 경남아너스빌" (Cluster Yongin Kyungnam Honorsville) apartment complex, built with the App Router pattern and TypeScript.

### Core Architecture Patterns

**Page Structure:** The site uses Next.js file-based routing with a hierarchical navigation structure:
- **사업개요 (Business)**: `/business`, `/directions`  
- **프리미엄**: `/premium`, `/location`
- **단지안내 (Complex Guide)**: `/site-plan`, `/system`, `/club-honors`
- **세대안내 (Unit Guide)**: `/floor-plan`, `/interior`
- **홍보센터 (PR Center)**: `/press`, `/promotional-video`
- **분양센터 (Sales Center)**: `/subscription-guide`, `/sales-schedule`, `/recruitment-notice`, `/registration`

**Component Architecture:**
- **Header.tsx**: Shared navigation with desktop/mobile responsive dropdown menus
- **Footer.tsx**: Shared footer with contact CTAs (phone + KakaoTalk) and company information
- **ui/ components**: Complete Radix UI + Tailwind component library (shadcn/ui)

### Key Implementation Details

**Styling Approach:** 
- Primary: Tailwind CSS for utility-first styling
- Secondary: styled-jsx for component-specific CSS (legacy pattern from original PHP conversion)
- Mix of both approaches across pages - some use pure Tailwind, others combine with styled-jsx

**Image Handling:**
- All images stored in `/public` folder with Korean filenames (e.g., `단지배치도.jpg`, `시스템.jpg`)
- Uses Next.js `Image` component with proper optimization
- Images are center-aligned across all pages using flex layouts and explicit centering styles

**Interactive Features:**
- **Floor Plan Tabs**: `/floor-plan` page implements React state-based tabs for 123, 84A, 84B floor plans
- **Contact Forms**: `/registration` page includes comprehensive customer registration form with validation
- **Responsive Navigation**: Header component includes mobile hamburger menu with full navigation tree

**State Management:**
- Uses React `useState` for local component state (tabs, forms, mobile menu)
- No external state management library - relies on React built-ins

### Content Management Patterns

**Page Templates:** Most content pages follow consistent pattern:
1. Hero section with gradient background and title
2. Main content section with centered layout (max-width: 6xl)
3. Shared Footer component

**Image Display Pattern:**
```tsx
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
  <Image
    src="/filename.jpg"
    alt="Description"
    width={1600}
    height={1200}
    className="h-auto object-contain"
    style={{ maxWidth: '100%', height: 'auto' }}
  />
</div>
```

**Navigation Structure:** Header component contains complete site map with dropdown menus - all new pages must be manually added to both desktop and mobile navigation sections.

### Korean Language Considerations

- All content is in Korean
- File paths and component names use English
- Image files use Korean names in `/public` folder
- Phone number format: 1668-5257 (consistent across site)
- Company info: (주)온시아, 사업자등록번호: 214-88-01749

### Contact Integration

**Phone Integration:** All phone CTAs use `tel:1668-5257` for mobile click-to-call
**KakaoTalk Integration:** Footer includes KakaoTalk button (currently placeholder link)
**Address:** 경기도 용인시 처인구 양지면 양지리 697번지 일원
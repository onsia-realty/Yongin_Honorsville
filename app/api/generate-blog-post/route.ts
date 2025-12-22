import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// SQL 클라이언트를 함수 내부에서 초기화 (빌드 타임 에러 방지)
function getSql() {
  if (!process.env.BLOG_DATABASE_URL) {
    throw new Error('BLOG_DATABASE_URL environment variable is not set');
  }
  return neon(process.env.BLOG_DATABASE_URL);
}

// 키워드 풀
const KEYWORDS = [
  { keyword: '경남아너스빌', category: '브랜드', priority: 'high' },
  { keyword: '클러스터용인 경남아너스빌', category: '브랜드', priority: 'high' },
  { keyword: '용인 아파트 분양', category: '지역', priority: 'high' },
  { keyword: '용인 반도체 클러스터 아파트', category: '산업', priority: 'medium' },
  { keyword: 'SK하이닉스 인근 아파트', category: '입지', priority: 'medium' },
  { keyword: '삼성전자 용인 아파트', category: '입지', priority: 'medium' },
  { keyword: '용인 양지 분양', category: '지역', priority: 'low' },
  { keyword: '용인 신축 아파트', category: '지역', priority: 'high' },
  { keyword: '처인구 아파트', category: '지역', priority: 'medium' },
  { keyword: '동용인IC 아파트', category: '입지', priority: 'low' },
];

// 카테고리별 기사 주제
const ARTICLE_TOPICS = {
  '부동산 시장 동향': [
    '용인 아파트 시장 최신 동향 분석',
    '반도체 클러스터가 용인 부동산에 미치는 영향',
    '용인 처인구 아파트 투자 가치 전망',
  ],
  '용인 개발 소식': [
    'SK하이닉스 용인 클러스터 개발 현황',
    '삼성전자 용인 반도체 단지 최신 소식',
    '동용인IC 주변 개발 계획',
  ],
  '분양 정보': [
    '경남아너스빌 분양 일정 및 절차 안내',
    '용인 신축 아파트 분양 정보 총정리',
    '클러스터용인 경남아너스빌 입주자 모집 공고',
  ],
  '지역 인프라': [
    '용인 양지 교통 인프라 현황',
    '경남아너스빌 주변 교육 환경',
    '용인 처인구 생활 편의시설 분석',
  ],
  '투자 가이드': [
    '반도체 클러스터 인근 아파트 투자 전략',
    '용인 아파트 투자 시 주의사항',
    '경남아너스빌 투자 가치 분석',
  ],
};

interface GenerateArticleParams {
  mainKeyword: string;
  category: string;
  topic: string;
}

async function generateArticleWithClaude(params: GenerateArticleParams): Promise<{
  title: string;
  content: string;
  excerpt: string;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
}> {
  const { mainKeyword, category, topic } = params;

  // 관련 키워드 3-5개 선택
  const relatedKeywords = KEYWORDS
    .filter(k => k.keyword !== mainKeyword)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map(k => k.keyword);

  const allKeywords = [mainKeyword, ...relatedKeywords];

  const prompt = `당신은 부동산 전문 기자입니다. 다음 조건에 맞는 블로그 기사를 작성해주세요.

**필수 조건:**
- 주제: ${topic}
- 메인 키워드: ${mainKeyword}
- 관련 키워드: ${relatedKeywords.join(', ')}
- 카테고리: ${category}
- 분량: 2000-3000자
- 톤: 전문적이면서 친근한 정보 전달
- 과장 금지, 사실 기반 작성

**기사 구조 (HTML 형식):**

1. 키워드 문단 (data-ke-size="size16"):
<p data-ke-size="size16">${allKeywords.join(', ')}</p>

2. H1 제목:
<h1 data-ke-size="size26">제목</h1>

3. 목차 (TOC):
<div class="toc-container" style="background-color: #f0f0f0; border: 2px solid #000000; border-radius: 10px; padding: 20px; margin: 20px 0;">
  <h2 style="color: #333333; font-size: 18px; font-weight: bold; margin-bottom: 10px;" data-ke-size="size26">📋 목차</h2>
  <ul style="padding-left: 20px; line-height: 1.8;" data-ke-list-type="disc">
    <li><a style="color: #000000; text-decoration: none;" href="#section1">섹션 제목 1</a></li>
    <li><a style="color: #000000; text-decoration: none;" href="#section2">섹션 제목 2</a></li>
    <li><a style="color: #000000; text-decoration: none;" href="#section3">섹션 제목 3</a></li>
    <li><a style="color: #000000; text-decoration: none;" href="#faq">자주 묻는 질문 (FAQ)</a></li>
  </ul>
</div>

4. 본문 섹션 (3-4개):
<h2 id="section1" style="color: #ffffff; background-color: #0b0719; padding: 10px 15px; border-radius: 5px; margin-top: 30px;" data-ke-size="size26">섹션 제목</h2>
<p data-ke-size="size16">내용...</p>

5. FAQ 섹션:
<h2 id="faq" style="color: #ffffff; background-color: #0b0719; padding: 10px 15px; border-radius: 5px; margin-top: 30px;" data-ke-size="size26">❓ 자주 묻는 질문 (FAQ)</h2>
<h3 data-ke-size="size23">Q1. 질문?</h3>
<p data-ke-size="size16">답변...</p>

6. 마무리 문단:
<hr style="margin: 40px 0; border: none; border-top: 1px solid #e0e0e0;">
<p data-ke-size="size16" style="color: #666; text-align: center;">
분양 관련 자세한 내용은 견본주택 및 공식 홈페이지를 통해 확인하시기 바랍니다.
</p>
<p data-ke-size="size16" style="color: #666; text-align: center;">
📞 분양 문의: <a href="tel:1668-5257" style="color: #0066cc; text-decoration: none;"><strong>1668-5257</strong></a> | 🌐 홈페이지: <a href="/business" style="color: #0066cc;">사업개요 보기</a>
</p>

**중요 지침:**
- 경남아너스빌 관련 정보: 997세대, 84㎡/123㎡, SK하이닉스 10분대, 삼성전자 15분대
- 부동산 광고 규제 준수 (과장 금지)
- 키워드를 자연스럽게 본문에 3-5회 포함
- 내부 링크 포함: [사업개요](/business), [분양일정](/sales-schedule), [관심고객등록](/registration)
- 출처 표시 금지 (뉴스, 언론사 등 언급 금지)

**응답 형식 (JSON):**
{
  "title": "기사 제목 (60자 이내)",
  "content": "HTML 형식의 전체 기사 내용",
  "excerpt": "요약문 (150자 이내)",
  "seoTitle": "SEO 제목 (60자 이내)",
  "seoDescription": "SEO 설명 (160자 이내)"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5-20251101',
        max_tokens: 8192,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    const articleText = data.content[0].text;

    // JSON 파싱 (```json 블록 제거)
    const jsonMatch = articleText.match(/```json\n([\s\S]*?)\n```/) || articleText.match(/\{[\s\S]*\}/);
    const articleData = JSON.parse(jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : articleText);

    return {
      ...articleData,
      keywords: allKeywords,
    };
  } catch (error) {
    console.error('Claude API 호출 실패:', error);
    throw error;
  }
}

function generateSlug(title: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7);
  return `${timestamp}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword, category, topic } = body;

    // 파라미터가 없으면 랜덤 선택
    const selectedKeyword = keyword || KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)].keyword;
    const selectedCategory = category || Object.keys(ARTICLE_TOPICS)[Math.floor(Math.random() * Object.keys(ARTICLE_TOPICS).length)];
    const selectedTopic = topic || ARTICLE_TOPICS[selectedCategory as keyof typeof ARTICLE_TOPICS][
      Math.floor(Math.random() * ARTICLE_TOPICS[selectedCategory as keyof typeof ARTICLE_TOPICS].length)
    ];

    // AI 기사 생성
    const article = await generateArticleWithClaude({
      mainKeyword: selectedKeyword,
      category: selectedCategory,
      topic: selectedTopic,
    });

    // slug 생성
    const slug = generateSlug(article.title);

    // DB 클라이언트 가져오기
    const sql = getSql();

    // DB에 저장
    const result = await sql`
      INSERT INTO blog_posts (
        title,
        slug,
        excerpt,
        content,
        keywords,
        category,
        seo_title,
        seo_description,
        published_at,
        status,
        source
      )
      VALUES (
        ${article.title},
        ${slug},
        ${article.excerpt},
        ${article.content},
        ${article.keywords},
        ${selectedCategory},
        ${article.seoTitle},
        ${article.seoDescription},
        NOW(),
        'published',
        'ai-generated'
      )
      RETURNING id, title, slug, published_at
    `;

    // 키워드 사용 기록 업데이트
    for (const kw of article.keywords) {
      await sql`
        INSERT INTO blog_keywords (keyword, usage_count, last_used)
        VALUES (${kw}, 1, NOW())
        ON CONFLICT (keyword)
        DO UPDATE SET
          usage_count = blog_keywords.usage_count + 1,
          last_used = NOW()
      `;
    }

    return NextResponse.json({
      success: true,
      article: result[0],
      keywords: article.keywords,
    });

  } catch (error) {
    console.error('기사 생성 실패:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST 요청으로 기사를 생성하세요',
    endpoints: {
      generate: 'POST /api/generate-blog-post',
      params: {
        keyword: '선택적 - 메인 키워드',
        category: '선택적 - 카테고리',
        topic: '선택적 - 주제',
      },
    },
  });
}

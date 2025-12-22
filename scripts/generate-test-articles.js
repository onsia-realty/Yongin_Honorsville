/**
 * 테스트 블로그 기사 3개 생성 스크립트
 *
 * 사용법:
 * 1. .env.local 파일에 ANTHROPIC_API_KEY 설정 확인
 * 2. 개발 서버 실행: pnpm run dev
 * 3. 새 터미널에서 실행: node scripts/generate-test-articles.js
 */

const testArticles = [
  {
    keyword: '경남아너스빌',
    category: '분양 정보',
    topic: '경남아너스빌 분양 일정 및 절차 안내',
  },
  {
    keyword: '용인 반도체 클러스터 아파트',
    category: '투자 가이드',
    topic: '반도체 클러스터 인근 아파트 투자 전략',
  },
  {
    keyword: 'SK하이닉스 인근 아파트',
    category: '입지 분석',
    topic: 'SK하이닉스 용인 클러스터 개발 현황',
  },
];

async function generateArticle(index, data) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

  try {
    console.log(`\n[${index + 1}/3] 기사 생성 중...`);
    console.log(`  키워드: ${data.keyword}`);
    console.log(`  카테고리: ${data.category}`);
    console.log(`  주제: ${data.topic}`);

    const response = await fetch(`${baseUrl}/api/generate-blog-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    if (result.success) {
      console.log(`  ✅ 생성 성공!`);
      console.log(`     제목: ${result.article.title}`);
      console.log(`     URL: ${baseUrl}/press/${result.article.slug}`);
    } else {
      console.log(`  ❌ 생성 실패: ${result.error}`);
    }

    return result;
  } catch (error) {
    console.error(`  ❌ 오류 발생:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('=================================');
  console.log('블로그 테스트 기사 생성 시작');
  console.log('=================================');

  const results = [];

  for (let i = 0; i < testArticles.length; i++) {
    const result = await generateArticle(i, testArticles[i]);
    results.push(result);

    // API 부하 방지를 위해 2초 대기
    if (i < testArticles.length - 1) {
      console.log('  ⏳ 2초 대기...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n=================================');
  console.log('생성 완료 요약');
  console.log('=================================');

  const successCount = results.filter(r => r.success).length;
  console.log(`성공: ${successCount}개 / 실패: ${results.length - successCount}개`);

  if (successCount > 0) {
    console.log(`\n블로그 확인: http://localhost:3001/press`);
  }

  console.log('\n');
}

main().catch(console.error);

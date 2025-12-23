/**
 * 데이터베이스에서 본문 내 CTA 섹션 완전 제거
 */

import { neon } from '@neondatabase/serverless';

const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

async function removeCTA() {
  try {
    console.log('데이터베이스에서 CTA 섹션 제거 시작...\n');

    // 1. 파란색 그라디언트 CTA 박스 전체 제거
    const result1 = await sql`
      UPDATE blog_posts
      SET content = REGEXP_REPLACE(
        content,
        '<div class="bg-gradient-to-r from-blue-600[^>]*>.*?</div>\s*</div>\s*</div>',
        '',
        'gs'
      )
      WHERE content LIKE '%bg-gradient-to-r from-blue-600%'
      RETURNING id, title
    `;

    if (result1.length > 0) {
      console.log('✅ 파란색 그라디언트 박스 제거 완료!');
      result1.forEach(post => console.log('  -', post.title));
    }

    // 2. "더 자세한 정보가 필요하신가요?" 포함하는 섹션 제거
    const result2 = await sql`
      UPDATE blog_posts
      SET content = REGEXP_REPLACE(
        content,
        '<div[^>]*>[\s\S]*?더 자세한 정보가 필요하신가요\?[\s\S]*?</div>[\s\S]*?</div>[\s\S]*?</div>',
        '',
        'g'
      )
      WHERE content LIKE '%더 자세한 정보가 필요하신가요%'
      RETURNING id, title
    `;

    if (result2.length > 0) {
      console.log('\n✅ "더 자세한 정보" 섹션 제거 완료!');
      result2.forEach(post => console.log('  -', post.title));
    }

    // 3. 전화/오시는길/카카오톡 버튼 3개 조합 제거
    const result3 = await sql`
      UPDATE blog_posts
      SET content = REGEXP_REPLACE(
        content,
        '<div[^>]*>[\s\S]*?전화 상담하기[\s\S]*?오시는길 안내[\s\S]*?카카오톡 문의[\s\S]*?</div>[\s\S]*?</div>',
        '',
        'g'
      )
      WHERE content LIKE '%전화 상담하기%'
        AND content LIKE '%오시는길 안내%'
        AND content LIKE '%카카오톡 문의%'
      RETURNING id, title
    `;

    if (result3.length > 0) {
      console.log('\n✅ 버튼 그룹 제거 완료!');
      result3.forEach(post => console.log('  -', post.title));
    }

    // 4. py-16이 있는 모든 그라디언트 박스 제거
    const result4 = await sql`
      UPDATE blog_posts
      SET content = REGEXP_REPLACE(
        content,
        '<div class="[^"]*py-16[^"]*bg-gradient[^"]*"[^>]*>[\s\S]*?</div>[\s\S]*?</div>[\s\S]*?</div>',
        '',
        'g'
      )
      WHERE content LIKE '%py-16%' AND content LIKE '%bg-gradient%'
      RETURNING id, title
    `;

    if (result4.length > 0) {
      console.log('\n✅ py-16 그라디언트 박스 제거 완료!');
      result4.forEach(post => console.log('  -', post.title));
    }

    console.log('\n🎉 모든 CTA 섹션 제거 완료!\n');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error);
    process.exit(1);
  }
}

removeCTA();

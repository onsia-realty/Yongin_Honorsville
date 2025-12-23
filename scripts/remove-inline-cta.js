/**
 * 뉴스 본문 내 인라인 CTA 섹션 제거
 */

import { neon } from '@neondatabase/serverless';

const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

async function removeInlineCTA() {
  try {
    console.log('본문 내 CTA 섹션 제거 시작...\n');

    // "더 자세한 정보가 필요하신가요?" CTA 섹션 제거
    const result = await sql`
      UPDATE blog_posts
      SET content = REGEXP_REPLACE(
        content,
        '<div class="bg-gradient-to-r from-blue-600[^>]*>.*?더 자세한 정보가 필요하신가요\?.*?</div>\s*</div>\s*</div>',
        '',
        'gs'
      )
      WHERE content LIKE '%더 자세한 정보가 필요하신가요?%'
      RETURNING id, title
    `;

    if (result.length > 0) {
      console.log('✅ CTA 섹션 제거 완료!');
      console.log('-----------------------------------');
      result.forEach(post => {
        console.log('수정된 게시글:', post.title);
      });
      console.log('-----------------------------------\n');
    } else {
      console.log('ℹ️  제거할 CTA 섹션을 찾지 못했습니다.\n');
    }

    console.log('🎉 작업 완료!\n');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error);
    process.exit(1);
  }
}

removeInlineCTA();

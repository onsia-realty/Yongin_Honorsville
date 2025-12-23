/**
 * 본문에 CTA 섹션이 있는지 확인
 */

import { neon } from '@neondatabase/serverless';

const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

async function checkCTA() {
  try {
    console.log('본문 내 CTA 섹션 검색 중...\n');

    // 다양한 패턴으로 검색
    const patterns = [
      '더 자세한 정보가 필요하신가요',
      '전화 상담하기',
      'bg-gradient-to-r from-blue-600',
      'open.kakao.com'
    ];

    for (const pattern of patterns) {
      const result = await sql`
        SELECT id, title, slug,
               SUBSTRING(content, POSITION(${pattern} IN content) - 100, 200) as context
        FROM blog_posts
        WHERE content LIKE ${'%' + pattern + '%'}
      `;

      if (result.length > 0) {
        console.log(`✅ "${pattern}" 패턴 발견!`);
        console.log('-----------------------------------');
        result.forEach(post => {
          console.log('제목:', post.title);
          console.log('Slug:', post.slug);
          console.log('컨텍스트:', post.context?.substring(0, 150) + '...');
          console.log('');
        });
        console.log('-----------------------------------\n');
      } else {
        console.log(`ℹ️  "${pattern}" 패턴 없음\n`);
      }
    }

    console.log('🎉 검색 완료!\n');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error);
    process.exit(1);
  }
}

checkCTA();

/**
 * 모든 게시글에서 CTA 섹션 찾기
 */

import { neon } from '@neondatabase/serverless';

const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

async function findCTA() {
  try {
    console.log('모든 게시글 조회 중...\n');

    const allPosts = await sql`
      SELECT id, title, slug,
             LENGTH(content) as content_length,
             (content LIKE '%더 자세한 정보%') as has_cta_text,
             (content LIKE '%bg-gradient-to-r%') as has_gradient,
             (content LIKE '%전화 상담하기%') as has_phone_btn,
             (content LIKE '%py-16%') as has_py16
      FROM blog_posts
      ORDER BY published_at DESC
    `;

    console.log('=== 전체 게시글 목록 ===\n');
    allPosts.forEach(post => {
      console.log(`📄 ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Content Length: ${post.content_length} chars`);
      console.log(`   CTA 텍스트: ${post.has_cta_text ? '✅ 있음' : '❌ 없음'}`);
      console.log(`   그라디언트: ${post.has_gradient ? '✅ 있음' : '❌ 없음'}`);
      console.log(`   전화버튼: ${post.has_phone_btn ? '✅ 있음' : '❌ 없음'}`);
      console.log(`   py-16: ${post.has_py16 ? '✅ 있음' : '❌ 없음'}`);
      console.log('');
    });

    // CTA가 있는 게시글만 추출
    const postsWithCTA = allPosts.filter(p => p.has_cta_text || p.has_gradient || p.has_phone_btn);

    if (postsWithCTA.length > 0) {
      console.log('\n=== CTA가 포함된 게시글 ===\n');

      for (const post of postsWithCTA) {
        const fullPost = await sql`
          SELECT content
          FROM blog_posts
          WHERE id = ${post.id}
        `;

        console.log(`\n📌 ${post.title}`);
        console.log(`Slug: ${post.slug}\n`);

        // CTA 부분 추출
        const content = fullPost[0].content;
        const ctaIndex = content.indexOf('더 자세한 정보');
        if (ctaIndex > -1) {
          console.log('CTA 위치:', ctaIndex);
          console.log('CTA 주변 내용:');
          console.log(content.substring(ctaIndex - 50, ctaIndex + 300));
        }

        const gradientIndex = content.indexOf('bg-gradient-to-r from-blue-600');
        if (gradientIndex > -1) {
          console.log('\n그라디언트 위치:', gradientIndex);
          console.log('그라디언트 주변 내용:');
          console.log(content.substring(gradientIndex - 50, gradientIndex + 300));
        }

        console.log('\n' + '='.repeat(80) + '\n');
      }
    } else {
      console.log('ℹ️  CTA 섹션이 있는 게시글을 찾지 못했습니다.\n');
    }

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error);
    process.exit(1);
  }
}

findCTA();

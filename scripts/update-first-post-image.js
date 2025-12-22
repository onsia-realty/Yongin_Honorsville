import { neon } from '@neondatabase/serverless';

const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

async function updateImage() {
  console.log('블로그 게시글 이미지 업데이트 시작...\n');

  try {
    const result = await sql`
      UPDATE blog_posts
      SET featured_image = '/blog-images/yongin-semiconductor-cluster.webp'
      WHERE slug = '1734912000000-yongin-semiconductor'
      RETURNING id, title, featured_image
    `;

    if (result.length > 0) {
      console.log('✅ 이미지 업데이트 성공!');
      console.log('-----------------------------------');
      console.log('ID:', result[0].id);
      console.log('제목:', result[0].title);
      console.log('이미지:', result[0].featured_image);
      console.log('-----------------------------------');
    } else {
      console.log('❌ 게시글을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  }

  console.log('\n🎉 작업 완료!');
}

updateImage();

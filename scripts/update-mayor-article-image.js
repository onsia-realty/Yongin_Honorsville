/**
 * 시장 현장점검 기사 이미지 업데이트
 */

import { neon } from '@neondatabase/serverless';

const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

async function updateImage() {
  try {
    console.log('이미지 경로 업데이트 시작...\n');

    // featured_image 업데이트
    const result = await sql`
      UPDATE blog_posts
      SET featured_image = '/blog/mayor-inspection.png'
      WHERE slug = '1734912000000-yongin-mayor-honorsville-inspection'
      RETURNING id, title, featured_image
    `;

    if (result.length > 0) {
      console.log('✅ 썸네일 이미지 업데이트 성공!');
      console.log('-----------------------------------');
      console.log('ID:', result[0].id);
      console.log('제목:', result[0].title);
      console.log('이미지:', result[0].featured_image);
      console.log('-----------------------------------\n');
    }

    // 본문 content의 이미지 경로도 업데이트
    const contentResult = await sql`
      UPDATE blog_posts
      SET content = REPLACE(content, '/blog/mayor-inspection.jpg', '/blog/mayor-inspection.png')
      WHERE slug = '1734912000000-yongin-mayor-honorsville-inspection'
      RETURNING id
    `;

    console.log('✅ 본문 이미지 경로 업데이트 완료!\n');
    console.log('🎉 모든 작업이 완료되었습니다!\n');
    console.log('웹사이트에서 확인: http://localhost:3001/press/1734912000000-yongin-mayor-honorsville-inspection\n');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error);
    process.exit(1);
  }
}

updateImage();

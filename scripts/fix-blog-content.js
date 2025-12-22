import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

async function updateContent() {
  console.log('블로그 콘텐츠 수정 시작...\n');

  try {
    // temp-blog-post.html에서 수정된 HTML 읽기
    const htmlPath = join(__dirname, '..', 'temp-blog-post.html');
    const updatedContent = readFileSync(htmlPath, 'utf-8');

    // DB 업데이트
    const result = await sql`
      UPDATE blog_posts
      SET content = ${updatedContent}
      WHERE slug = '1734912000000-yongin-semiconductor'
      RETURNING id, title, slug
    `;

    if (result.length > 0) {
      console.log('✅ 콘텐츠 업데이트 성공!');
      console.log('-----------------------------------');
      console.log('ID:', result[0].id);
      console.log('제목:', result[0].title);
      console.log('Slug:', result[0].slug);
      console.log('-----------------------------------');
      console.log('\n변경 사항:');
      console.log('1. 서울신문 출처 문구 삭제');
      console.log('2. 전화번호 1668-5257을 클릭 가능한 tel: 링크로 변경');
    } else {
      console.log('❌ 게시글을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  }

  console.log('\n🎉 작업 완료!');
}

updateContent();

/**
 * 기사 출처 표기 제거 및 이미지 캡션 수정
 */

import { neon } from '@neondatabase/serverless';

const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

async function fixAttribution() {
  try {
    console.log('기사 출처 표기 수정 시작...\n');

    // 1. 이미지 캡션 수정
    await sql`
      UPDATE blog_posts
      SET content = REPLACE(
        content,
        '이상일 용인특례시장이 경남아너스빌 현장을 점검하고 있다. (사진=용인특례시)',
        '이상일 용인특례시장이 경남아너스빌 현장을 점검하는 모습 (이미지는 뉴스 내용을 기반으로 재구성)'
      )
      WHERE slug = '1734912000000-yongin-mayor-honorsville-inspection'
    `;
    console.log('✅ 이미지 캡션 수정 완료!');

    // 2. 다른 이미지 캡션도 수정 (있을 경우)
    await sql`
      UPDATE blog_posts
      SET content = REPLACE(
        content,
        '이상일 용인특례시장이 24일 처인구 이통장연합회가 남사읍 주민자치센터에서 개최한 송탄 상수원 보호구역 해제 협약 기념 연합회의에 참석해 관계자들과 기념촬영을 하고 있다. (사진=용인특레시)',
        '이상일 용인특례시장이 송탄 상수원 보호구역 해제 기념 행사에 참석한 모습 (이미지는 뉴스 내용을 기반으로 재구성)'
      )
      WHERE slug = '1734912000000-yongin-mayor-honorsville-inspection'
    `;

    await sql`
      UPDATE blog_posts
      SET content = REPLACE(
        content,
        '이상일 용인특례시장이 지난 9월 30일 처인구 지역 학부모들과 간담회를 열고 학교 교육환경 개선과 학생 안전 대책 등에 대해 의견을 나누고 있다. (사진=용인특례시)',
        '이상일 용인특례시장이 학부모들과 교육 환경 개선을 논의하는 모습 (이미지는 뉴스 내용을 기반으로 재구성)'
      )
      WHERE slug = '1734912000000-yongin-mayor-honorsville-inspection'
    `;

    console.log('✅ 추가 이미지 캡션 수정 완료!');

    // 3. 출처 표기 제거
    await sql`
      UPDATE blog_posts
      SET content = REPLACE(
        content,
        '<p data-ke-size="size16" style="color: #666; text-align: center;">
본 게시글은 핀포인트뉴스(2025.12.22) 보도 내용을 참고하여 작성되었습니다.
</p>',
        ''
      )
      WHERE slug = '1734912000000-yongin-mayor-honorsville-inspection'
    `;

    // 줄바꿈 문자 처리를 위한 추가 업데이트
    await sql`
      UPDATE blog_posts
      SET content = REGEXP_REPLACE(
        content,
        '<p[^>]*>[\s\n]*본 게시글은[^<]*핀포인트뉴스[^<]*참고하여 작성되었습니다\.[\s\n]*</p>',
        '',
        'g'
      )
      WHERE slug = '1734912000000-yongin-mayor-honorsville-inspection'
    `;

    console.log('✅ 출처 표기 제거 완료!');

    // 4. 원본 기사 URL 유지 (하단 링크는 보존)
    console.log('✅ 원본 기사 링크는 하단에 유지됨');

    console.log('\n🎉 모든 수정 작업 완료!');
    console.log('\n웹사이트에서 확인: http://localhost:3001/press/1734912000000-yongin-mayor-honorsville-inspection\n');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error);
    process.exit(1);
  }
}

fixAttribution();

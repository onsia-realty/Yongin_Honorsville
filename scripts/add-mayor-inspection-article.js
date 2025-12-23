/**
 * 핀포인트뉴스 - 이상일 시장 경남아너스빌 현장점검 기사 삽입
 *
 * 사용법: node scripts/add-mayor-inspection-article.js
 */

import { neon } from '@neondatabase/serverless';

// 블로그 DB URL
const BLOG_DB_URL = 'postgresql://neondb_owner:npg_fx14bzlyYkPg@ep-noisy-frog-a1h4jgyt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(BLOG_DB_URL);

const content = `<p data-ke-size="size16">용인특례시장, 경남아너스빌, 이상일시장, 아파트하자, 품질점검, 입주민감사, 용인시정</p>

<h1 data-ke-size="size26">"용인 르네상스" 이끈 이상일 용인특례시장…경남아너스빌 현장점검</h1>

<div class="toc-container" style="background-color: #f0f0f0; border: 2px solid #000000; border-radius: 10px; padding: 20px; margin: 20px 0;">
  <h2 style="color: #333333; font-size: 18px; font-weight: bold; margin-bottom: 10px;" data-ke-size="size26">📋 목차</h2>
  <ul style="padding-left: 20px; line-height: 1.8;" data-ke-list-type="disc">
    <li><a style="color: #000000; text-decoration: none;" href="#section1">이상일 시장, 경남아너스빌 현장점검</a></li>
    <li><a style="color: #000000; text-decoration: none;" href="#section2">민선8기 3년 반의 성과</a></li>
    <li><a style="color: #000000; text-decoration: none;" href="#section3">아파트 하자 문제 완벽 해결</a></li>
    <li><a style="color: #000000; text-decoration: none;" href="#section4">입주민들의 감사 인사</a></li>
    <li><a style="color: #000000; text-decoration: none;" href="#section5">품질 관리 시스템 확립</a></li>
    <li><a style="color: #000000; text-decoration: none;" href="#faq">자주 묻는 질문 (FAQ)</a></li>
  </ul>
</div>

<h2 id="section1" style="color: #ffffff; background-color: #0b0719; padding: 10px 15px; border-radius: 5px; margin-top: 30px;" data-ke-size="size26">🏗️ 이상일 시장, 경남아너스빌 현장점검</h2>

<p data-ke-size="size16">
이상일 용인특례시장이 지난 18일 처인구 양지면 <strong>경남아너스빌 아파트 공사 현장</strong>을 방문해 공사 진행 상황과 하자 여부 등을 점검했습니다.
</p>

<p data-ke-size="size16">
이번 현장 점검은 용인시의 <strong>'문제 해결 행정'</strong>의 일환으로, 입주민들의 주거 품질을 직접 확인하고 개선하기 위한 노력의 일부입니다.
</p>

<figure style="margin: 30px 0; text-align: center;">
  <img src="/blog/mayor-inspection.jpg" alt="이상일 용인특례시장 경남아너스빌 현장점검" style="max-width: 100%; height: auto; border-radius: 10px;">
  <figcaption style="color: #666; font-size: 14px; margin-top: 10px;">이상일 용인특례시장이 경남아너스빌 현장을 점검하는 모습 (이미지는 뉴스 내용을 기반으로 재구성)</figcaption>
</figure>

<h2 id="section2" style="color: #ffffff; background-color: #0b0719; padding: 10px 15px; border-radius: 5px; margin-top: 30px;" data-ke-size="size26">🏆 민선8기 3년 반의 성과</h2>

<p data-ke-size="size16">
용인특례시와 이상일 시장은 지난 3년 반 동안 기관과 개인 명의로 <strong>수백개의 상과 감사패</strong>를 받은 것으로 알려져 눈길을 끌고 있습니다.
</p>

<table class="potato-table" style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #ddd;">
  <thead>
    <tr style="background-color: #f8f9fa;">
      <th style="padding: 12px; border: 1px solid #ddd; text-align: left; font-weight: bold;">구분</th>
      <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">내용</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd;"><strong>기관표창</strong></td>
      <td style="padding: 12px; border: 1px solid #ddd;">총 294건 (대통령 표창 5건 포함)</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd;"><strong>개인표창</strong></td>
      <td style="padding: 12px; border: 1px solid #ddd;">25건</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd;"><strong>감사패</strong></td>
      <td style="padding: 12px; border: 1px solid #ddd;">153건</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd;"><strong>주요 성과</strong></td>
      <td style="padding: 12px; border: 1px solid #ddd;">반도체 국가산단 유치, 송탄상수원보호구역 해제, 경안천변 수변구역 해제</td>
    </tr>
  </tbody>
</table>

<h2 id="section3" style="color: #ffffff; background-color: #0b0719; padding: 10px 15px; border-radius: 5px; margin-top: 30px;" data-ke-size="size26">🔧 아파트 하자 문제 완벽 해결</h2>

<p data-ke-size="size16">
경남아너스빌디센트 아파트는 지난해 11월 입주 전 사전점검 과정에서 <strong>지하주차장 천장과 외벽에서 누수</strong>가 발견되는 등 다수의 하자가 발견되었습니다.
</p>

<h3 data-ke-size="size23">시장의 신속한 대응</h3>

<p data-ke-size="size16">
시공사가 제대로 해결해 주지 않자 입주예정자들이 이상일 시장에게 지원을 요청했고, 이 시장은:
</p>

<ul data-ke-list-type="disc" style="padding-left: 20px; line-height: 1.8;">
  <li><strong>직접 현장 방문</strong>: 4번이나 현장을 방문하여 실상 파악</li>
  <li><strong>준공불허 카드</strong>: 초강경 조치로 시공사 압박</li>
  <li><strong>완벽한 하자 해결</strong>: 모든 하자를 깨끗이 해결</li>
  <li><strong>시스템 개선</strong>: 용인시 전체 신축아파트 품질 관리 대책 수립</li>
</ul>

<h2 id="section4" style="color: #ffffff; background-color: #0b0719; padding: 10px 15px; border-radius: 5px; margin-top: 30px;" data-ke-size="size26">💐 입주민들의 감사 인사</h2>

<p data-ke-size="size16">
지난 4월 4일, 경남아너스빌디센트 입주민들은 용인특례시청을 방문해 이상일 시장에게 <strong>감사패를 전달</strong>했습니다.
</p>

<blockquote style="border-left: 4px solid #0b0719; padding-left: 20px; margin: 20px 0; color: #555; font-style: italic;">
  "아파트 하자 문제를 깨끗하게 해결해 주셔서 대단히 감사합니다. 시장님의 노력 덕분에 안심하고 입주할 수 있게 되었습니다."
  <br><br>
  - 경남아너스빌디센트 입주민 대표
</blockquote>

<p data-ke-size="size16">
입주민들은 시청 홈페이지를 통해서도 감사 인사를 전했으며, 이는 용인시의 <strong>'문제 해결 행정력'</strong>을 보여주는 대표적인 사례로 평가받고 있습니다.
</p>

<h2 id="section5" style="color: #ffffff; background-color: #0b0719; padding: 10px 15px; border-radius: 5px; margin-top: 30px;" data-ke-size="size26">✅ 품질 관리 시스템 확립</h2>

<p data-ke-size="size16">
이상일 시장은 경남아너스빌 사례를 계기로 <strong>용인시 전체 신축아파트의 부실을 원천 차단하는 대책</strong>을 수립했습니다.
</p>

<h3 data-ke-size="size23">주요 대책</h3>

<ul data-ke-list-type="disc" style="padding-left: 20px; line-height: 1.8;">
  <li>입주 전 <strong>사전점검 강화</strong></li>
  <li>하자 발견 시 <strong>준공 불허 조치</strong> 시행</li>
  <li>시공사 <strong>책임 강화</strong> 제도 도입</li>
  <li>입주민 <strong>보호 시스템</strong> 구축</li>
</ul>

<p data-ke-size="size16">
이러한 노력으로 용인시는 <strong>아파트 품질 관리의 모범 사례</strong>로 자리잡고 있습니다.
</p>

<h2 id="faq" style="color: #ffffff; background-color: #0b0719; padding: 10px 15px; border-radius: 5px; margin-top: 30px;" data-ke-size="size26">❓ 자주 묻는 질문 (FAQ)</h2>

<h3 data-ke-size="size23">Q1. 경남아너스빌 하자 문제는 완전히 해결되었나요?</h3>
<p data-ke-size="size16">
네, 이상일 시장의 4차례 현장 방문과 강력한 조치로 모든 하자가 완벽하게 해결되었습니다. 입주민들도 만족하며 감사패를 전달했습니다.
</p>

<h3 data-ke-size="size23">Q2. 다른 신축 아파트도 같은 혜택을 받을 수 있나요?</h3>
<p data-ke-size="size16">
네, 용인시는 이번 사례를 계기로 <strong>전체 신축아파트 품질 관리 시스템</strong>을 구축했습니다. 모든 신축 아파트에 대해 엄격한 사전점검과 하자 관리가 이루어집니다.
</p>

<h3 data-ke-size="size23">Q3. 경남아너스빌은 어디에 위치하나요?</h3>
<p data-ke-size="size16">
경기도 용인시 처인구 양지면에 위치해 있으며, SK하이닉스 반도체 클러스터와 약 10분 거리입니다. 자세한 위치는 <a href="/directions" style="color: #0066cc; text-decoration: underline;">오시는 길</a>에서 확인하실 수 있습니다.
</p>

<h3 data-ke-size="size23">Q4. 분양 관련 문의는 어디로 하나요?</h3>
<p data-ke-size="size16">
<strong>1668-5257</strong>로 전화 주시거나 <a href="/registration" style="color: #0066cc; text-decoration: underline;">관심고객 등록</a>을 하시면 전문 상담원이 자세히 안내해드립니다.
</p>

<hr style="margin: 40px 0; border: none; border-top: 1px solid #e0e0e0;">

<p data-ke-size="size16" style="color: #666; text-align: center;">
본 게시글은 핀포인트뉴스(2025.12.22) 보도 내용을 참고하여 작성되었습니다.
</p>

<p data-ke-size="size16" style="color: #666; text-align: center;">
📰 원본 기사: <a href="https://www.pinpointnews.co.kr/news/articleView.html?idxno=409258" target="_blank" style="color: #0066cc;">핀포인트뉴스</a>
</p>

<p data-ke-size="size16" style="color: #666; text-align: center;">
📞 분양 문의: <strong>1668-5257</strong> | 🌐 홈페이지: <a href="/business" style="color: #0066cc;">사업개요 보기</a>
</p>`;

async function insertPost() {
  try {
    console.log('핀포인트뉴스 기사 DB 삽입 시작...\n');

    // 게시글 삽입
    const result = await sql`
      INSERT INTO blog_posts (
        title,
        slug,
        excerpt,
        content,
        keywords,
        category,
        author,
        seo_title,
        seo_description,
        status,
        source,
        featured_image
      ) VALUES (
        '"용인 르네상스" 이끈 이상일 용인특례시장…경남아너스빌 현장점검',
        '1734912000000-yongin-mayor-honorsville-inspection',
        '이상일 용인특례시장이 처인구 양지면 경남아너스빌 아파트 공사 현장을 방문해 공사 진행 상황과 하자 여부를 점검했습니다. 입주민들의 하자 문제를 4차례 현장 방문을 통해 완벽히 해결하여 감사패를 받았으며, 용인시 전체 신축아파트 품질 관리 대책을 마련했습니다.',
        ${content},
        ARRAY['용인특례시장', '경남아너스빌', '이상일시장', '아파트하자', '품질점검', '입주민감사'],
        '언론보도',
        '핀포인트뉴스',
        '이상일 용인특례시장 경남아너스빌 현장점검, 하자 문제 완벽 해결 | 경남아너스빌',
        '용인특례시장 이상일이 경남아너스빌 현장을 4차례 방문해 하자 문제를 완벽 해결. 입주민 감사패 수여, 신축아파트 품질 관리 시스템 확립',
        'published',
        'news-pinpoint',
        '/blog/mayor-inspection.jpg'
      )
      RETURNING id, title, slug, category, published_at
    `;

    console.log('✅ 게시글 삽입 성공!');
    console.log('-----------------------------------');
    console.log('ID:', result[0].id);
    console.log('제목:', result[0].title);
    console.log('Slug:', result[0].slug);
    console.log('카테고리:', result[0].category);
    console.log('발행일:', result[0].published_at);
    console.log('-----------------------------------\n');

    // 키워드 업데이트
    await sql`
      INSERT INTO blog_keywords (keyword, usage_count, last_used)
      VALUES
        ('용인특례시장', 1, NOW()),
        ('경남아너스빌', 1, NOW()),
        ('이상일시장', 1, NOW()),
        ('아파트하자', 1, NOW()),
        ('품질점검', 1, NOW()),
        ('입주민감사', 1, NOW())
      ON CONFLICT (keyword)
      DO UPDATE SET
        usage_count = blog_keywords.usage_count + 1,
        last_used = NOW()
    `;

    console.log('✅ 키워드 업데이트 완료!\n');

    console.log('🎉 모든 작업이 완료되었습니다!');
    console.log('\n웹사이트에서 확인: http://localhost:3001/press');
    console.log(`개별 기사: http://localhost:3001/press/${result[0].slug}\n`);

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error);
    process.exit(1);
  }
}

insertPost();

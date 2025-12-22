-- 블로그 시스템 데이터베이스 스키마
-- 실행: Neon DB 콘솔에서 실행 또는 psql 사용

-- 1. 블로그 기사 테이블
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(250) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  category VARCHAR(50) NOT NULL,
  author VARCHAR(50) DEFAULT 'AI Reporter',
  featured_image VARCHAR(500),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  views INT DEFAULT 0,
  seo_title VARCHAR(200),
  seo_description VARCHAR(300),
  status VARCHAR(20) DEFAULT 'published',
  source VARCHAR(50) DEFAULT 'ai-generated',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);

-- 2. 블로그 키워드 관리 테이블
CREATE TABLE IF NOT EXISTS blog_keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword VARCHAR(100) NOT NULL UNIQUE,
  search_volume INT DEFAULT 0,
  competition VARCHAR(20) DEFAULT 'medium',
  last_used TIMESTAMPTZ DEFAULT NOW(),
  usage_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_blog_keywords_keyword ON blog_keywords(keyword);
CREATE INDEX IF NOT EXISTS idx_blog_keywords_last_used ON blog_keywords(last_used DESC);

-- 3. 블로그 분석 데이터 테이블
CREATE TABLE IF NOT EXISTS blog_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INT DEFAULT 0,
  clicks INT DEFAULT 0,
  impressions INT DEFAULT 0,
  avg_position DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, date)
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_blog_analytics_post_id ON blog_analytics(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_analytics_date ON blog_analytics(date DESC);

-- 기본 키워드 데이터 삽입
INSERT INTO blog_keywords (keyword, search_volume, competition) VALUES
  ('경남아너스빌', 5000, 'high'),
  ('클러스터용인 경남아너스빌', 3000, 'medium'),
  ('용인 아파트 분양', 8000, 'high'),
  ('용인 반도체 클러스터 아파트', 2000, 'low'),
  ('SK하이닉스 인근 아파트', 1500, 'medium'),
  ('삼성전자 용인 아파트', 1200, 'medium'),
  ('용인 양지 분양', 1000, 'low'),
  ('용인 신축 아파트', 4000, 'high'),
  ('처인구 아파트', 2500, 'medium'),
  ('동용인IC 아파트', 800, 'low')
ON CONFLICT (keyword) DO NOTHING;

-- 테스트 데이터 (선택사항)
-- INSERT INTO blog_posts (title, slug, excerpt, content, category, seo_title, seo_description) VALUES
-- ('용인 반도체 클러스터 아파트 투자 가이드',
--  'yongin-semiconductor-cluster-apartment-guide',
--  '용인 반도체 클러스터 중심, 경남아너스빌 투자 가치 분석',
--  '# 용인 반도체 클러스터 아파트 투자 가이드\n\n용인시는 SK하이닉스와 삼성전자의 반도체 클러스터가 조성되면서...',
--  '투자 가이드',
--  '용인 반도체 클러스터 아파트 투자 가이드 | 경남아너스빌',
--  '용인 반도체 클러스터 중심, SK하이닉스 10분대 경남아너스빌 아파트 투자 가치와 전망 분석');

-- 완료 메시지
SELECT 'Blog database schema created successfully!' AS message;

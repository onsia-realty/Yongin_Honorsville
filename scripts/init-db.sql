-- 클러스터용인 경남아너스빌 고객 등록 테이블
-- 여러 현장 데이터를 하나의 테이블로 관리

CREATE TABLE IF NOT EXISTS customer_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site VARCHAR(100) NOT NULL,          -- 현장명 (예: 'yongin-honorsville')
  name VARCHAR(50) NOT NULL,           -- 고객 이름
  phone VARCHAR(20) NOT NULL,          -- 연락처
  inquiry TEXT,                        -- 문의사항 (선택)
  source VARCHAR(50),                  -- 유입 경로 (예: 'homepage', 'registration-page')
  created_at TIMESTAMPTZ DEFAULT NOW() -- 등록 시간
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_site_created ON customer_registrations(site, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_phone ON customer_registrations(phone);
CREATE INDEX IF NOT EXISTS idx_created_at ON customer_registrations(created_at DESC);

-- 샘플 데이터 조회 쿼리
-- SELECT * FROM customer_registrations WHERE site = 'yongin-honorsville' ORDER BY created_at DESC LIMIT 10;

-- 현장별 통계
-- SELECT site, COUNT(*) as total_registrations FROM customer_registrations GROUP BY site;

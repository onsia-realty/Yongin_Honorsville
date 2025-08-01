// Supabase를 사용한 데이터베이스 저장
// 1. supabase.com에서 무료 프로젝트 생성
// 2. 테이블 생성: customers (id, name, phone, inquiry, created_at)
// 3. 환경 변수에 URL과 ANON_KEY 추가

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveToSupabase(data: {
  name: string
  phone: string
  inquiry?: string
}) {
  try {
    const { data: result, error } = await supabase
      .from('customers')
      .insert([
        {
          name: data.name,
          phone: data.phone,
          inquiry: data.inquiry || '',
          created_at: new Date().toISOString()
        }
      ])

    if (error) throw error

    return { success: true, data: result }
  } catch (error) {
    console.error('Error saving to Supabase:', error)
    return { success: false, error }
  }
}

// Supabase 테이블 생성 SQL
/*
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  inquiry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security 활성화
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Insert 권한만 허용 (읽기는 관리자만)
CREATE POLICY "Anyone can insert" ON customers
  FOR INSERT WITH CHECK (true);
*/
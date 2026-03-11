-- Supabase에서 실행할 SQL 스키마
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- posts 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  thumbnail TEXT,
  body TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ,
  "viewCount" INTEGER NOT NULL DEFAULT 0
);

-- slug로 빠른 검색을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts("createdAt" DESC);

-- RLS (Row Level Security) 설정
-- 모든 사용자가 읽을 수 있도록 설정
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 읽기는 누구나 가능
CREATE POLICY "Anyone can read posts" ON posts
  FOR SELECT
  USING (true);

-- 쓰기/수정/삭제는 인증된 사용자만 가능 (실제 권한 체크는 애플리케이션 레벨에서)
-- Supabase RLS는 여기서는 열어두고, NextAuth로 관리자 체크를 합니다
CREATE POLICY "Authenticated users can insert posts" ON posts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts" ON posts
  FOR UPDATE
  USING (true);

CREATE POLICY "Authenticated users can delete posts" ON posts
  FOR DELETE
  USING (true);

-- 조회수 컬럼 (테이블이 이미 존재하는 경우 아래 실행)
-- ALTER TABLE posts ADD COLUMN IF NOT EXISTS "viewCount" INTEGER NOT NULL DEFAULT 0;

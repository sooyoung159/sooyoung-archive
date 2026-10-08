-- Supabase에서 실행할 SQL 스키마
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- categories 테이블 생성
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 검색 및 계층 구조용 인덱스
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);

-- categories RLS 설정
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 읽기는 누구나 가능
DROP POLICY IF EXISTS "Anyone can read categories" ON categories;
CREATE POLICY "Anyone can read categories" ON categories
  FOR SELECT
  USING (true);

-- 쓰기는 서버 전용 service_role만 가능. NextAuth 세션은 Supabase 인증이 아닙니다.
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON categories;

DROP POLICY IF EXISTS "Authenticated users can update categories" ON categories;

DROP POLICY IF EXISTS "Authenticated users can delete categories" ON categories;
REVOKE INSERT, UPDATE, DELETE ON categories FROM PUBLIC, anon, authenticated;
GRANT SELECT ON categories TO anon, authenticated;
GRANT ALL ON categories TO service_role;

-- posts 테이블 생성 (만약 처음 생성하는 경우)
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

-- 기존 posts 테이블에 category_id 컬럼이 없다면 추가 (이미 있는 테이블 대응)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- slug로 빠른 검색을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts(category_id);

-- RLS (Row Level Security) 설정
-- 모든 사용자가 읽을 수 있도록 설정
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 읽기는 누구나 가능
DROP POLICY IF EXISTS "Anyone can read posts" ON posts;
CREATE POLICY "Anyone can read posts" ON posts
  FOR SELECT
  USING (true);

-- 공개 키로는 글을 변경할 수 없습니다.
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;

DROP POLICY IF EXISTS "Authenticated users can update posts" ON posts;

DROP POLICY IF EXISTS "Authenticated users can delete posts" ON posts;
REVOKE INSERT, UPDATE, DELETE ON posts FROM PUBLIC, anon, authenticated;
GRANT SELECT ON posts TO anon, authenticated;
GRANT ALL ON posts TO service_role;

-- 조회수 컬럼 (테이블이 이미 존재하는 경우 아래 실행)
-- ALTER TABLE posts ADD COLUMN IF NOT EXISTS "viewCount" INTEGER NOT NULL DEFAULT 0;

-- comments 테이블 생성
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL REFERENCES posts(slug) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  password TEXT NOT NULL, -- bcrypt hash only; never a plaintext password
  content TEXT NOT NULL,
  user_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 검색을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at ASC);

-- comments RLS 설정
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read comments" ON comments;

DROP POLICY IF EXISTS "Anyone can insert comments" ON comments;

DROP POLICY IF EXISTS "Anyone can delete comments" ON comments;
REVOKE ALL ON comments FROM PUBLIC, anon, authenticated;
GRANT ALL ON comments TO service_role;

-- Also run supabase/migrations/202610080001_secure_public_access.sql
-- for existing password migration, API limits, counters and Storage policies.

BEGIN;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Table grants also close access if an old permissive policy remains.
REVOKE ALL ON public.posts, public.categories, public.comments FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.posts, public.categories TO anon, authenticated;
GRANT ALL ON public.posts, public.categories, public.comments TO service_role;

DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated users can update categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated users can delete categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can read comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can insert comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can delete comments" ON public.comments;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
-- Hash in the database: existing passwords are never exported to a script.
UPDATE public.comments SET password = extensions.crypt(password, extensions.gen_salt('bf', 12))
WHERE nickname <> '__like__' AND password !~ '^\$2[aby]\$[0-9]{2}\$';

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO service_role;
CREATE TABLE IF NOT EXISTS private.api_limits (
  action_key TEXT PRIMARY KEY,
  requests INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
REVOKE ALL ON private.api_limits FROM PUBLIC, anon, authenticated;
GRANT ALL ON private.api_limits TO service_role;

CREATE OR REPLACE FUNCTION public.consume_api_limit(action_key TEXT, window_seconds INTEGER, max_requests INTEGER)
RETURNS BOOLEAN LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE current_requests INTEGER;
BEGIN
  IF window_seconds < 1 OR window_seconds > 86400 OR max_requests < 1 THEN RETURN FALSE; END IF;
  DELETE FROM private.api_limits WHERE expires_at < NOW();
  INSERT INTO private.api_limits AS limits (action_key, requests, expires_at)
  VALUES (action_key, 1, NOW() + make_interval(secs => window_seconds))
  ON CONFLICT ON CONSTRAINT api_limits_pkey DO UPDATE
  SET requests = limits.requests + 1
  RETURNING requests INTO current_requests;
  RETURN current_requests <= max_requests;
END;
$$;
REVOKE ALL ON FUNCTION public.consume_api_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_api_limit(TEXT, INTEGER, INTEGER) TO service_role;

CREATE OR REPLACE FUNCTION public.increment_post_views(post_id TEXT)
RETURNS INTEGER LANGUAGE sql SET search_path = '' AS $$
  UPDATE public.posts SET "viewCount" = COALESCE("viewCount", 0) + 1
  WHERE id::text = post_id RETURNING "viewCount";
$$;
REVOKE ALL ON FUNCTION public.increment_post_views(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_post_views(TEXT) TO service_role;

-- Restrictive rules protect only this site's upload bucket, not other buckets.
DROP POLICY IF EXISTS "Block direct archive uploads" ON storage.objects;
CREATE POLICY "Block direct archive uploads" ON storage.objects AS RESTRICTIVE
FOR INSERT TO anon, authenticated WITH CHECK (bucket_id <> 'uploads');
DROP POLICY IF EXISTS "Block direct archive file updates" ON storage.objects;
CREATE POLICY "Block direct archive file updates" ON storage.objects AS RESTRICTIVE
FOR UPDATE TO anon, authenticated USING (bucket_id <> 'uploads') WITH CHECK (bucket_id <> 'uploads');
DROP POLICY IF EXISTS "Block direct archive file deletion" ON storage.objects;
CREATE POLICY "Block direct archive file deletion" ON storage.objects AS RESTRICTIVE
FOR DELETE TO anon, authenticated USING (bucket_id <> 'uploads');

COMMIT;

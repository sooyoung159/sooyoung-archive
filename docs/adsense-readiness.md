# AdSense and production readiness

This checklist records operational dependencies, not guaranteed approval criteria.

## Release order

1. Configure `SUPABASE_SERVICE_ROLE_KEY` as a server-only secret in the Vercel
   Production environment. Never use a `NEXT_PUBLIC_` prefix or expose it in a
   post, response, build log or client bundle. Preview environments should not
   receive unrestricted access to the production database.
2. Deploy and verify the new server routes and MyCamp image assets.
3. Apply `supabase/migrations/202610080001_secure_public_access.sql` to the linked
   archive project. Public posts/categories remain readable; mutations,
   comment credentials and upload mutations become server-only.
4. Verify anonymous database write denial, comment API reads, admin API denial,
   hash verification and rate limit behavior. Do not insert disposable rows into
   production without explicit authorization.
5. Publish reviewed content from the original backup, preserving IDs, slugs,
   category membership, thumbnails and creation dates. Concurrent edits abort
   publication instead of being overwritten.
6. Check desktop/mobile views, image zoom, links, canonical URLs, sitemap and
   `ads.txt` on the public domain.

## Hosting and advertisements

The Vercel dashboard showed Hobby on 2026-10-08. Its documentation limits Hobby
to non-commercial personal use. Before monetization, the owner must choose an
appropriate plan or hosting provider. No subscription or billing change is
authorized by this checklist.

AdSense identity metadata, `ads.txt` and the post-page loader already exist. An
unfilled ad does not establish whether a site is approved. Check the current
AdSense Sites status before requesting review or enabling ads. Auto ads can be
configured after the site is ready; keep management/login/privacy pages out of
ad placements. Ad approval and Google indexing are separate decisions.
The loader is disabled by default. Only set `NEXT_PUBLIC_ADSENSE_ENABLED=true`
and rebuild after both the hosting conditions and AdSense approval are met.
Ownership metadata and `ads.txt` remain available without the ad-serving script.

## References

- https://support.google.com/adsense/answer/10015918?hl=ko
- https://support.google.com/adsense/answer/1348695?hl=ko
- https://support.google.com/adsense/answer/9261307?hl=ko
- https://vercel.com/docs/plans/hobby

## Verification completed locally

- TypeScript check and webpack production build passed after Next.js 16.4.0
  security update.
- Password hash and comment input validation unit tests passed.
- Changed-file lint passed with pre-existing unused no-console directives in
  `src/lib/posts.ts` as warnings.
- Existing non-reaction comments: 0 (count only; passwords were not retrieved).
- Supabase migration dry run reached the remote database successfully.
- Unauthenticated local post/category/upload requests returned 401 using an
  ephemeral local session secret; legacy password login returned 410.
- At 390px and 1280px, MyCamp had no horizontal page overflow, all four actual
  images loaded and image zoom opened/closed correctly.
- 19 text-only post updates were published and read back. IDs, slugs, creation
  dates, categories and thumbnails were preserved. The MyCamp release article
  awaits image asset deployment.
- Runtime dependency audit has no high/critical findings; two moderate findings
  remain in the typography parser dependency. No force downgrade was applied.
- Final six unit/contract/content tests passed. Client JavaScript assets do not
  contain the server-only database key. An actual public canonical article check
  showed one H1, the self-referencing canonical and no mislabeled stock image.
- Schema-only backup could not run because Docker is not running. The complete
  original posts backup is at `/private/tmp/sooyoung-posts-backup-20261008.json`.

## Production deployment on 2026-10-08

- Production-only `SUPABASE_SERVICE_ROLE_KEY` was saved as Secret through the
  official Vercel CLI. It was not registered for Preview or exposed in output.
- Deployment `dpl_J6Pqbq73J7F7w1kHeSDEDNCVDyGB` reached READY and was aliased to
  `https://sooyoung.pe.kr`.
- MyCamp, privacy, `ads.txt`, sitemap, comment reads and like-count reads returned
  200. All four MyCamp screenshots loaded on the public site.
- The MyCamp release article now includes actual screens and Android release
  verification guidance. Its existing slug and creation date were preserved.
- Seven local tests pass, including the default-disabled advertisement contract.
- The permission migration has NOT been applied: production access changes were
  blocked by security review pending explicit approval of their scope. The new
  mutation APIs fail closed (503) until their database helpers are available.
  Comment posting, liking and view-count increments are temporarily restricted;
  published content and comment reads remain available.
- No paid hosting change or AdSense review request has been performed.

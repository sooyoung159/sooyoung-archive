import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { getPosts, getPostsCount } from "@/lib/posts";

export const dynamic = "force-dynamic";

const FEATURED_SLUGS = [
  "sooyoung-archive-제작기",
  "개인-블로그-만들기부터-adsense-수익화까지-완벽-가이드",
  "친구",
];

function renderThumbnail(post: { thumbnail?: string; title: string }) {
  if (!post.thumbnail) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-muted">
      {post.thumbnail.startsWith("/") ? (
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover" />
      )}
    </div>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const postsPerPage = 9;

  const [posts, totalPosts] = await Promise.all([
    getPosts(currentPage, postsPerPage),
    getPostsCount(),
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const shouldShowPagination = totalPosts >= 10;
  const featuredPosts = FEATURED_SLUGS.map((slug) => posts.find((post) => post.slug === slug)).filter(
    (post): post is NonNullable<(typeof posts)[number]> => Boolean(post),
  );
  const featuredIds = new Set(featuredPosts.map((post) => post.id));
  const recentPosts = currentPage === 1 ? posts.filter((post) => !featuredIds.has(post.id)) : posts;

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            개인 개발 아카이브
          </span>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              직접 만들고 부딪히며 기록한 개발 로그를 정리하는 곳
            </h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Next.js, React, TypeScript, Supabase 기반 프로젝트를 만들면서 겪은 시행착오와
              문제 해결 과정을 꾸준히 기록합니다. 배포 후기, 트러블슈팅, 제품 설계 판단까지
              실전에서 부딪힌 내용을 중심으로 남깁니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1">프로젝트 회고</span>
            <span className="rounded-full bg-muted px-3 py-1">트러블슈팅</span>
            <span className="rounded-full bg-muted px-3 py-1">배포 & 운영</span>
            <span className="rounded-full bg-muted px-3 py-1">기술 실험 기록</span>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && currentPage === 1 && (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">먼저 읽어볼 글</h2>
            <p className="text-sm text-muted-foreground">
              블로그 방향과 작업 스타일을 가장 잘 보여주는 글부터 골라봤어요.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
                  {renderThumbnail({ thumbnail: post.thumbnail, title: post.title })}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3 text-sm leading-6">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <time className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                      {" · "}
                      {post.viewCount ?? 0}회 조회
                    </time>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">최신 글</h2>
          <p className="text-sm text-muted-foreground">
            최근에 작업하며 남긴 개발 기록과 문제 해결 로그예요.
          </p>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-muted-foreground">아직 글이 없습니다.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/post/${post.slug}`}>
                  <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
                    {renderThumbnail({ thumbnail: post.thumbnail, title: post.title })}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-3 text-sm leading-6">
                          {post.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <time className="text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                        {" · "}
                        {post.viewCount ?? 0}회 조회
                      </time>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {shouldShowPagination && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </section>
    </div>
  );
}

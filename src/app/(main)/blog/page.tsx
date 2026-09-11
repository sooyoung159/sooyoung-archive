import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { getPosts, getPostsCount } from "@/lib/posts";

import { getAllSeries } from "@/lib/series";
import { BookOpen, ArrowRight } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "개발일지 & 블로그 | 수영장 (Sooyoung Archive)",
  description: "웹 개발자 수영의 개발 일지와 학습 기록, 이슈 해결 로그 모음입니다.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "개발일지 | 수영장 (Sooyoung Archive)",
    description: "웹 개발자 수영의 개발 일지와 기술 노하우 모음",
    url: "https://sooyoung.pe.kr/blog",
  },
};

function renderThumbnail(post: { thumbnail?: string; title: string }, priority = false) {
  if (!post.thumbnail) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-muted">
      <Image
        src={post.thumbnail}
        alt={post.title}
        fill
        priority={priority}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

export default async function BlogPage({
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

  const allSeries = getAllSeries();
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const shouldShowPagination = totalPosts >= 10;

  return (
    <div className="space-y-10">
      <div className="space-y-2 border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">개발일지 (Devlog)</h1>
        <p className="text-muted-foreground">
          프로젝트를 만들며 겪은 시행착오와 문제 해결 과정, 기술적 고민들을 기록한 공간입니다.
        </p>
      </div>

      {/* 연재 시리즈 모아보기 섹션 */}
      <section className="space-y-3.5 rounded-2xl border border-border/80 bg-muted/30 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground sm:text-base">
                연재 시리즈 정주행하기
              </h2>
              <p className="text-xs text-muted-foreground hidden sm:block">
                프로젝트 기획부터 출시와 배포까지의 모든 여정을 순서대로 읽어보세요.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {allSeries.map((series) => {
            const firstPost = series.posts[0];
            return (
              <Link
                key={series.id}
                href={`/post/${encodeURIComponent(firstPost.slug)}`}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      총 {series.posts.length}편
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground group-hover:text-primary transition flex items-center gap-0.5">
                      1편 시작
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition">
                    {series.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {series.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {posts.length === 0 ? (
        <p className="text-muted-foreground py-10 text-center">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <li key={post.id}>
              <Link href={`/post/${post.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
                  {renderThumbnail({ thumbnail: post.thumbnail, title: post.title }, idx === 0)}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
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
        <div className="pt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

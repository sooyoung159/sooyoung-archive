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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "개발일지 & 블로그 | 수영장 (Sooyoung Archive)",
  description: "웹 개발자 수영의 개발 일지와 학습 기록, 이슈 해결 로그 모음입니다.",
  openGraph: {
    title: "개발일지 | 수영장 (Sooyoung Archive)",
    description: "웹 개발자 수영의 개발 일지와 기술 노하우 모음",
    url: "https://sooyoung.pe.kr/blog",
  },
};

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

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const shouldShowPagination = totalPosts >= 10;

  return (
    <div className="space-y-8">
      <div className="space-y-2 border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">개발일지 (Devlog)</h1>
        <p className="text-muted-foreground">
          프로젝트를 만들며 겪은 시행착오와 문제 해결 과정, 기술적 고민들을 기록한 공간입니다.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground py-10 text-center">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.slug}`}>
                <Card className="h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
                  {renderThumbnail({ thumbnail: post.thumbnail, title: post.title })}
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

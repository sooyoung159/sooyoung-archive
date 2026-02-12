import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { getPosts, getPostsCount } from "@/lib/posts";

// 배포 환경에서도 항상 최신 글 목록을 보여주기 위해
// 이 페이지는 정적이 아니라 동적으로 렌더링한다.
export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 8;

  const [posts, totalPosts] = await Promise.all([
    getPosts(currentPage, postsPerPage),
    getPostsCount(),
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const shouldShowPagination = totalPosts >= 9;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-2xl font-semibold">글 목록</h1>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">아직 글이 없습니다.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/post/${post.slug}`}>
                  <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
                    {post.thumbnail && (
                      <div className="relative aspect-video w-full bg-muted overflow-hidden">
                        {post.thumbnail.startsWith("/") ? (
                          <Image
                            src={post.thumbnail}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.thumbnail}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        {post.title}
                      </CardTitle>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <time className="text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                      </time>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* 페이지네이션 - 9개 이상의 게시물이 있을 때만 표시 */}
        {shouldShowPagination && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </main>
    </div>
  );
}

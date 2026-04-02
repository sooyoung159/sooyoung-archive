import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { getPosts, getPostsCount } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const categorySlug = resolvedParams.slug;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const currentPage = Number(resolvedSearchParams.page) || 1;
  const postsPerPage = 9;

  const [posts, totalPosts] = await Promise.all([
    getPosts(currentPage, postsPerPage, category.id),
    getPostsCount(category.id),
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const shouldShowPagination = totalPosts >= 10;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 flex flex-col lg:flex-row gap-8">
        <Sidebar currentCategorySlug={categorySlug} />
        <main className="flex-1 min-w-0">
          <h1 className="mb-8 text-2xl font-semibold">{category.name}</h1>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">아직 이 카테고리에 글이 없습니다.</p>
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
        </main>
      </div>
      <footer className="border-t bg-background mt-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-between">
            <p>© 2026 sooyoung archive. All rights reserved.</p>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                연락처
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

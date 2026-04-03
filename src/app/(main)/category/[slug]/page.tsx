import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { getPosts, getPostsCount } from "@/lib/posts";
import { getCategoryBySlug, getCategories } from "@/lib/categories";

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
  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getCategories()
  ]);

  if (!category) {
    notFound();
  }

  const childCategories = allCategories.filter((c) => c.parent_id === category.id);
  const categoryIds = [category.id, ...childCategories.map((c) => c.id)];

  const currentPage = Number(resolvedSearchParams.page) || 1;
  const postsPerPage = 9;

  const [posts, totalPosts] = await Promise.all([
    getPosts(currentPage, postsPerPage, categoryIds),
    getPostsCount(categoryIds),
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const shouldShowPagination = totalPosts >= 10;

  return (
    <>
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
    </>
  );
}

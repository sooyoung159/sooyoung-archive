import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types";
import { Sparkles, Calendar, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RelatedPostsProps {
  posts: Post[];
  categoryName?: string;
}

function renderThumbnail(post: Post) {
  if (!post.thumbnail) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-emerald-500/10 via-muted to-muted flex items-center justify-center p-4">
        <span className="text-2xl">🏊‍♂️</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-muted">
      {post.thumbnail.startsWith("/") ? (
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.thumbnail}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </div>
  );
}

export function RelatedPosts({ posts, categoryName }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-12 space-y-6 pt-6 border-t border-border/80">
      <div className="flex items-center gap-2">
        <div className="inline-flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <Sparkles className="size-4" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            함께 읽으면 좋은 다른 개발일지
          </h2>
          {categoryName && (
            <p className="text-xs text-muted-foreground">
              '{categoryName}' 및 추천 아카이브 글 모음
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.slug}`} className="group block h-full">
            <Card className="h-full overflow-hidden border-border/80 bg-card/60 transition-all duration-200 group-hover:border-emerald-500/40 group-hover:shadow-md flex flex-col justify-between">
              <div>
                {renderThumbnail(post)}
                <CardHeader className="p-4 space-y-2">
                  {post.category && (
                    <span className="inline-block text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">
                      {post.category.name}
                    </span>
                  )}
                  <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-emerald-500 transition-colors leading-snug">
                    {post.title}
                  </CardTitle>
                  {post.excerpt && (
                    <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>
              </div>

              <CardContent className="px-4 pb-4 pt-0 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3 text-emerald-500" />
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                  </time>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="size-3 text-emerald-500" />
                  <span>{post.viewCount ?? 0}회</span>
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

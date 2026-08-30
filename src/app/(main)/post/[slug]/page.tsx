import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerAuthSession } from "@/auth";
import { Button } from "@/components/ui/button";
import { isAdminSession } from "@/lib/auth";
import { getPostBySlug, getAdjacentPosts, getRelatedPosts } from "@/lib/posts";
import {
  normalizeMarkdownImages,
  extractToc,
  calculateReadingTime,
} from "@/lib/markdown";
import { PostActions } from "./post-actions";
import { PostViewTracker } from "./post-view-tracker";
import { Comments } from "@/components/comments";
import { ReadingProgressBar } from "@/components/reading-progress-bar";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import { PostShareButtons } from "@/components/post-share-buttons";
import { PostNavigation } from "@/components/post-navigation";
import { RelatedPosts } from "@/components/related-posts";
import { Clock, Calendar, Eye, ArrowLeft, Tag } from "lucide-react";
import { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

  const plainTextBody = post.body.replace(/[#*`_\[\]()]/g, "").slice(0, 160) + "...";
  const description = post.excerpt || plainTextBody;

  const categoryName = post.category ? post.category.name : "Devlog";
  const dynamicOgUrl = `https://sooyoung.pe.kr/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(categoryName)}`;
  const imageUrl = post.thumbnail && post.thumbnail.startsWith("http") ? post.thumbnail : dynamicOgUrl;

  return {
    title: `${post.title} | 수영장 (Sooyoung Archive)`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `https://sooyoung.pe.kr/post/${post.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const session = await getServerAuthSession();
  const isAdmin = isAdminSession(session);

  const normalizedBody = normalizeMarkdownImages(post.body);
  const toc = extractToc(normalizedBody);
  const readingMinutes = calculateReadingTime(normalizedBody);

  const [{ prev, next }, relatedPosts] = await Promise.all([
    getAdjacentPosts(post.id, post.createdAt, post.category_id),
    getRelatedPosts(post.id, post.category_id, 3),
  ]);

  return (
    <>
      <ReadingProgressBar />
      <PostViewTracker slug={post.slug} />

      <div className="mx-auto w-full max-w-7xl px-0 py-2 lg:py-4">
        {/* Top Back & Admin Action Nav */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" asChild>
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              개발일지 목록
            </Link>
          </Button>
          {isAdmin && <PostActions slug={post.slug} />}
        </div>

        {/* 2-Column Layout for Desktop TOC */}
        <div className="flex flex-col xl:flex-row items-start justify-center gap-10">
          <article className="w-full max-w-3xl min-w-0">
            {/* Post Header */}
            <header className="mb-10 space-y-4 text-center sm:text-left">
              {post.category && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                  <Tag className="size-3" />
                  <span>{post.category.name}</span>
                </div>
              )}

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground leading-[1.15]">
                {post.title}
              </h1>

              {/* Meta Info Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4 text-emerald-500" />
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock className="size-4 text-emerald-500" />
                  <span>약 {readingMinutes}분 소요</span>
                </span>

                <span className="flex items-center gap-1.5">
                  <Eye className="size-4 text-emerald-500" />
                  <span>{post.viewCount ?? 0}회 조회</span>
                </span>
              </div>
            </header>

            {/* Mobile & Tablet Collapsible TOC */}
            <TableOfContents toc={toc} />

            {/* Post Body Container */}
            <div className="rounded-3xl border border-border/80 bg-card/70 p-6 shadow-sm sm:p-10 backdrop-blur-sm">
              <MarkdownRenderer content={normalizedBody} />
            </div>

            {/* Social Share & Copy Link */}
            <PostShareButtons title={post.title} slug={post.slug} />

            {/* Previous / Next Post Navigation */}
            <PostNavigation prev={prev} next={next} />

            {/* Related Posts Recommendation */}
            <RelatedPosts posts={relatedPosts} categoryName={post.category?.name} />

            {/* Comments Section */}
            <Comments slug={post.slug} />
          </article>

          {/* Desktop Sticky TOC Sidebar */}
          {toc.length > 0 && (
            <aside className="hidden xl:block w-64 shrink-0">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <TableOfContents toc={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}

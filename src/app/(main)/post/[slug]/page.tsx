import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getServerAuthSession } from "@/auth";
import { Button } from "@/components/ui/button";
import { isAdminSession } from "@/lib/auth";
import { getPostBySlug } from "@/lib/posts";
import { normalizeMarkdownImages } from "@/lib/markdown";
import { PostActions } from "./post-actions";
import { PostViewTracker } from "./post-view-tracker";
import { Comments } from "@/components/comments";

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

  return (
    <>
      <PostViewTracker slug={post.slug} />
      <div className="mx-auto w-full max-w-7xl px-0 py-2 lg:py-4">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">← 목록</Link>
          </Button>
          {isAdmin && <PostActions slug={post.slug} />}
        </div>

        <article className="mx-auto max-w-3xl">
          <header className="mb-10 text-center">
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Sooyoung Archive
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <time className="mt-4 block text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" · "}
              {post.viewCount ?? 0}회 조회
            </time>
          </header>

          <div className="rounded-2xl border bg-card/70 p-6 shadow-sm sm:p-10">
            <div className="prose prose-slate dark:prose-invert max-w-none prose-img:rounded-lg">
              <ReactMarkdown>
                {normalizeMarkdownImages(post.body)}
              </ReactMarkdown>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <Comments slug={post.slug} />
        </article>
      </div>
    </>
  );
}

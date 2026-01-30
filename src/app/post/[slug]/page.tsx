import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-3xl px-4 py-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/">← 목록</Link>
        </Button>
        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
            <time className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("ko-KR")}
            </time>
          </header>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}

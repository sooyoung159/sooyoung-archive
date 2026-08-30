import Link from "next/link";
import type { Post } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostNavigationProps {
  prev: Post | null;
  next: Post | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="이전 및 다음 글 내비게이션"
      className="my-10 grid gap-4 sm:grid-cols-2"
    >
      {/* 1. Previous Post Card */}
      {prev ? (
        <Link
          href={`/post/${prev.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card/60 p-5 transition-all hover:border-emerald-500/40 hover:bg-card hover:shadow-md"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-emerald-500 transition-colors mb-2">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span>이전 글</span>
            {prev.category && (
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {prev.category.name}
              </span>
            )}
          </div>
          <div className="font-bold text-sm sm:text-base text-foreground line-clamp-2 leading-snug group-hover:text-emerald-500 transition-colors">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* 2. Next Post Card */}
      {next ? (
        <Link
          href={`/post/${next.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card/60 p-5 transition-all hover:border-emerald-500/40 hover:bg-card hover:shadow-md text-right sm:text-right"
        >
          <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-emerald-500 transition-colors mb-2">
            {next.category && (
              <span className="mr-auto text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {next.category.name}
              </span>
            )}
            <span>다음 글</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </div>
          <div className="font-bold text-sm sm:text-base text-foreground line-clamp-2 leading-snug group-hover:text-emerald-500 transition-colors">
            {next.title}
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}

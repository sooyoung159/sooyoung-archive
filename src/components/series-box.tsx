"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import type { SeriesContext } from "@/lib/series";

interface SeriesBoxProps {
  context: SeriesContext;
  currentSlug: string;
}

export function SeriesBox({ context, currentSlug }: SeriesBoxProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { series, currentIndex, totalCount, prevPost, nextPost } = context;

  const colorStyles = {
    emerald: {
      border: "border-emerald-500/30 dark:border-emerald-500/20",
      bg: "bg-emerald-500/5 dark:bg-emerald-950/20",
      badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      activeItem: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-semibold",
      bullet: "bg-emerald-500 text-white",
    },
    indigo: {
      border: "border-indigo-500/30 dark:border-indigo-500/20",
      bg: "bg-indigo-500/5 dark:bg-indigo-950/20",
      badge: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
      activeItem: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-semibold",
      bullet: "bg-indigo-500 text-white",
    },
    amber: {
      border: "border-amber-500/30 dark:border-amber-500/20",
      bg: "bg-amber-500/5 dark:bg-amber-950/20",
      badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
      activeItem: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 font-semibold",
      bullet: "bg-amber-500 text-white",
    },
    sky: {
      border: "border-sky-500/30 dark:border-sky-500/20",
      bg: "bg-sky-500/5 dark:bg-sky-950/20",
      badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
      activeItem: "bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300 font-semibold",
      bullet: "bg-sky-500 text-white",
    },
  }[series.color || "emerald"];

  return (
    <aside
      aria-label="시리즈 목차"
      className={`my-8 overflow-hidden rounded-2xl border ${colorStyles.border} ${colorStyles.bg} transition-all duration-200 shadow-sm`}
    >
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-black/5 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background border border-border/80 shadow-xs">
            <BookOpen className="size-4.5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                연재 시리즈
              </span>
              <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${colorStyles.badge}`}>
                {currentIndex + 1} / {totalCount}편
              </span>
            </div>
            <h3 className="truncate text-base font-bold text-foreground sm:text-lg">
              {series.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {isOpen ? "목차 접기" : "목차 보기"}
          </span>
          <div
            className={`flex size-7 items-center justify-center rounded-lg bg-background/80 border border-border/60 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="size-4 text-muted-foreground" />
          </div>
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="border-t border-border/40 px-5 pt-3 pb-5 space-y-4">
          {series.description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
              {series.description}
            </p>
          )}

          {/* List of Posts */}
          <ol className="space-y-1.5 pt-1">
            {series.posts.map((post, idx) => {
              const isCurrent = idx === currentIndex;
              const encodedSlug = encodeURIComponent(post.slug);

              if (isCurrent) {
                return (
                  <li
                    key={post.slug}
                    className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm ${colorStyles.activeItem} shadow-2xs`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold font-mono">
                        {idx + 1}
                      </span>
                      <span className="truncate text-foreground font-semibold">
                        {post.title}
                      </span>
                    </div>
                    <span className="shrink-0 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-bold text-primary shadow-xs">
                      <CheckCircle2 className="size-3" />
                      읽는 중
                    </span>
                  </li>
                );
              }

              return (
                <li key={post.slug}>
                  <Link
                    href={`/post/${encodedSlug}`}
                    className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition hover:bg-background/80 hover:text-foreground group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-mono text-muted-foreground group-hover:text-foreground">
                        {idx + 1}
                      </span>
                      <span className="truncate group-hover:underline underline-offset-4">
                        {post.title}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground shrink-0" />
                  </Link>
                </li>
              );
            })}
          </ol>

          {/* Quick Prev / Next Bar inside Series */}
          {(prevPost || nextPost) && (
            <div className="pt-3 border-t border-border/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
              {prevPost ? (
                <Link
                  href={`/post/${encodeURIComponent(prevPost.slug)}`}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition py-1 px-2 rounded-lg hover:bg-background/60"
                >
                  <ArrowLeft className="size-3.5" />
                  <span className="truncate max-w-[220px]">
                    이전 편: {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/post/${encodeURIComponent(nextPost.slug)}`}
                  className="flex items-center justify-end gap-1.5 text-primary font-medium hover:underline transition py-1 px-2 rounded-lg hover:bg-background/60 ml-auto"
                >
                  <span className="truncate max-w-[220px]">
                    다음 편: {nextPost.title}
                  </span>
                  <ArrowRight className="size-3.5" />
                </Link>
              ) : (
                <span className="text-muted-foreground text-[11px] py-1 px-2 ml-auto">
                  🎉 시리즈의 마지막 편입니다
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

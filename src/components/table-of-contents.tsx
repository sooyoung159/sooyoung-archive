"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/lib/markdown";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (toc.length === 0) return;

    const headingElements = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [toc]);

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash without jump
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  if (toc.length === 0) return null;

  return (
    <>
      {/* 1. Mobile & Tablet Collapsible TOC (Top of Article) */}
      <div className="xl:hidden my-6 rounded-2xl border border-border/80 bg-card/60 p-4 shadow-sm backdrop-blur-sm">
        <button
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="flex w-full items-center justify-between font-semibold text-sm text-foreground"
          type="button"
        >
          <span className="flex items-center gap-2">
            <List className="size-4 text-emerald-500" />
            <span>목차 (Table of Contents)</span>
            <span className="text-xs text-muted-foreground font-normal">
              ({toc.length}개 항목)
            </span>
          </span>
          {isOpenMobile ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>

        {isOpenMobile && (
          <nav className="mt-4 pt-3 border-t border-border/60 space-y-1 text-sm max-h-72 overflow-y-auto">
            {toc.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToHeading(e, item.id)}
                  className={`block py-1.5 transition-colors rounded px-2 ${
                    item.level === 3 ? "pl-6 text-xs" : "font-medium"
                  } ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.text}
                </a>
              );
            })}
          </nav>
        )}
      </div>

      {/* 2. Desktop Floating Sticky TOC Sidebar */}
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <div className="flex items-center gap-2 mb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
            <List className="size-3.5 text-emerald-500" />
            <span>목차</span>
          </div>

          <nav className="space-y-1 text-xs border-l border-border/70 pl-3">
            {toc.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToHeading(e, item.id)}
                  className={`block py-1 transition-all -ml-[13px] pl-3 border-l-2 ${
                    item.level === 3 ? "ml-1 pl-4" : ""
                  } ${
                    isActive
                      ? "border-emerald-500 text-emerald-500 font-semibold translate-x-0.5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                  }`}
                >
                  <span className="line-clamp-2">{item.text}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

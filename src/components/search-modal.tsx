"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, ArrowRight, Loader2, Command } from "lucide-react";

interface SearchResultPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  createdAt: string;
  category?: { name: string } | null;
}

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Detect OS for shortcut hint
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K) & Custom Event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Fetch search results from API
  const fetchResults = useCallback(async (searchQuery: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.posts || []);
        setSelectedIndex(0);
      }
    } catch (err) {
      console.error("Search fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search trigger
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      fetchResults(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, isOpen, fetchResults]);

  // Handle keyboard navigation inside search list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[selectedIndex];
      if (target) {
        setIsOpen(false);
        router.push(`/post/${target.slug}`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-md transition-all animate-in fade-in duration-200">
      {/* Backdrop overlay click */}
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-2xl transition-all">
        {/* Search Input Bar */}
        <div className="flex items-center border-b px-4 py-3">
          <Search className="size-5 text-muted-foreground shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="개발일지 및 아카이브 검색... (제목, 내용)"
            className="w-full bg-transparent text-base sm:text-lg font-medium outline-none placeholder:text-muted-foreground/70"
          />
          {loading && <Loader2 className="size-4 text-primary animate-spin shrink-0 ml-2" />}
          {query && !loading && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md ml-1"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="ml-2 text-xs font-mono text-muted-foreground border rounded px-1.5 py-0.5 hover:bg-muted"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && !loading && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              {query ? (
                <p>&ldquo;{query}&rdquo;에 관한 포스팅을 찾을 수 없습니다.</p>
              ) : (
                <p>검색어를 입력하거나 최근 개발 일지를 확인하세요.</p>
              )}
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {query ? "검색 결과" : "최근 포스팅"} ({results.length})
              </div>

              {results.map((post, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={post.id}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/post/${post.slug}`);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${
                      isSelected
                        ? "bg-primary/10 border-primary/20 text-foreground"
                        : "hover:bg-muted/60 text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <FileText className="size-4" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
                          {post.title}
                        </span>
                        {post.category?.name && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full border bg-secondary/50 text-secondary-foreground shrink-0 font-medium">
                            {post.category.name}
                          </span>
                        )}
                      </div>
                      {post.excerpt && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      className={`size-4 self-center transition-transform ${
                        isSelected ? "text-primary translate-x-1" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Keyboard Hints */}
        <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ↓
              </kbd>
              <span>이동</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ↵
              </kbd>
              <span>선택</span>
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[11px]">
            <Command className="size-3" />
            <span>+ K 로 언제든 열기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

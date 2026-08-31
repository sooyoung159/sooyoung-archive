"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PenLine, LogIn, LogOut, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function handleLogout() {
    await signOut({ redirect: false });
    router.refresh();
  }

  const isAdmin = session?.isAdmin ?? false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center text-primary">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 9c2-2 4-2 6 0s4 2 6 0s4-2 6 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M3 14c2-2 4-2 6 0s4 2 6 0s4-2 6 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-base font-semibold tracking-tight flex items-center gap-1.5">
            수영장
            <span className="text-xs font-normal text-muted-foreground hidden sm:inline">
              (Sooyoung Archive)
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">홈</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">개발일지</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 font-medium"
            asChild
          >
            <Link href="/apps/mycamp" className="flex items-center gap-1">
              <span>이번캠</span>
              <span className="text-[10px] rounded-full bg-emerald-500/15 px-1.5 py-0.5 font-semibold text-emerald-500 hidden sm:inline">
                App
              </span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/about">소개</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
            className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Search className="size-3.5 text-muted-foreground" />
            <span className="hidden md:inline">검색</span>
            <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span>⌘</span>K
            </kbd>
          </Button>

          <ThemeToggle />

          {status === "authenticated" && (
            <>
              {isAdmin && (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/categories/manage">카테고리 관리</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/write">
                      <PenLine className="size-4" />
                      작성
                    </Link>
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="size-4" />
                로그아웃
              </Button>
            </>
          )}
          {status === "unauthenticated" && (
            <Button variant="ghost" size="sm" onClick={() => signIn("github")}>
              <LogIn className="size-4" />
              로그인
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

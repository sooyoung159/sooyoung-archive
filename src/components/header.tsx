"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PenLine, LogIn, LogOut } from "lucide-react";

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
          <span className="text-base font-semibold tracking-tight">
            sooyoung
            <span className="text-primary">archive</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/about">소개</Link>
          </Button>
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

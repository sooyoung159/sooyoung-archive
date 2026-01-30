"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PenLine, LogIn, LogOut } from "lucide-react";

export function Header() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin === true))
      .catch(() => setIsAdmin(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAdmin(false);
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-semibold text-foreground">
          Sooyoung Archive
        </Link>
        <nav className="flex items-center gap-2">
          {isAdmin === true && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/write">
                  <PenLine className="size-4" />
                  작성
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="size-4" />
                로그아웃
              </Button>
            </>
          )}
          {isAdmin === false && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">
                <LogIn className="size-4" />
                로그인
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

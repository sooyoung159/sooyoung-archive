"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin() {
    await signIn("github", { callbackUrl: "/write" });
    router.refresh();
  }

  return (
    <div className="container flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>관리자 로그인</CardTitle>
          <CardDescription>GitHub 계정으로 로그인합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button onClick={handleLogin}>GitHub로 로그인</Button>
            <p className="text-xs text-muted-foreground">
              로그인한 계정만 글 작성/수정/삭제가 가능합니다.
            </p>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="/" className="underline hover:text-foreground">
              목록으로
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

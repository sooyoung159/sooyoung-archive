"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type PostActionsProps = {
  slug: string;
};

export function PostActions({ slug }: PostActionsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("정말 삭제할까요? 이 작업은 되돌릴 수 없습니다.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "삭제에 실패했습니다.");
        return;
      }
      router.push("/");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" asChild>
        <Link href={`/write/${slug}`}>수정</Link>
      </Button>
      <Button variant="destructive" disabled={deleting} onClick={handleDelete}>
        {deleting ? "삭제 중..." : "삭제"}
      </Button>
    </div>
  );
}

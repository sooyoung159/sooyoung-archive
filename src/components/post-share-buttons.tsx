"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostShareButtonsProps {
  title: string;
  slug: string;
}

export function PostShareButtons({ title, slug }: PostShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://sooyoung.pe.kr/post/${slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${title}" - 수영장 (Sooyoung Archive)\n`);
    const url = encodeURIComponent(currentUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `수영장 블로그: ${title}`,
          url: currentUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share error:", err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="my-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/60 p-5 shadow-sm">
      <div className="space-y-0.5 text-center sm:text-left">
        <div className="text-sm font-semibold text-foreground">
          이 글이 유익하셨나요?
        </div>
        <div className="text-xs text-muted-foreground">
          동료 개발자들과 경험과 노하우를 공유해 보세요.
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="rounded-full gap-1.5 text-xs font-medium"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              <span className="text-emerald-500">주소 복사됨!</span>
            </>
          ) : (
            <>
              <Link2 className="size-3.5" />
              <span>링크 복사</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleShareTwitter}
          className="rounded-full gap-1.5 text-xs font-medium"
        >
          <span>𝕏 트위터 공유</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="rounded-full gap-1.5 text-xs font-medium"
        >
          <Share2 className="size-3.5" />
          <span>공유하기</span>
        </Button>
      </div>
    </div>
  );
}

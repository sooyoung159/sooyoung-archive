"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ZoomIn, X } from "lucide-react";

interface ImageZoomProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | Blob;
  alt?: string;
}

export function ImageZoom({ src, alt, className, ...props }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // 모달 오픈 시 배경 스크롤 차단
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ESC 키로 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!src || typeof src !== "string") return null;

  return (
    <>
      {/* 인라인 본문 이미지 */}
      <figure className="my-6 block text-center">
        <span
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          className="group relative inline-block cursor-zoom-in overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-sm transition hover:border-primary/50 hover:shadow-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || "포스트 본문 이미지"}
            className={`block max-h-[600px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01] ${className || ""}`}
            loading="lazy"
            {...props}
          />

          {/* 돋보기 뱃지 힌트 */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-xs transition group-hover:opacity-100 shadow-sm">
            <ZoomIn className="size-3.5" />
            <span className="hidden sm:inline">클릭하여 확대</span>
          </div>
        </span>

        {/* 하단 캡션 (alt 내용이 있고 의미 있는 텍스트일 때) */}
        {alt && alt.trim() !== "" && !alt.startsWith("http") && (
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {alt}
          </figcaption>
        )}
      </figure>

      {/* 전체화면 확대 모달 (Portal 렌더링) */}
      {isOpen &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="이미지 확대 보기"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-opacity duration-200 animate-in fade-in cursor-zoom-out select-none"
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="닫기"
              className="fixed top-4 right-4 z-[110] flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-105 active:scale-95"
            >
              <X className="size-5" />
            </button>

            {/* 확대된 이미지 */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center justify-center max-w-[95vw] max-h-[90vh]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || "확대된 이미지"}
                onClick={() => setIsOpen(false)}
                className="max-h-[85vh] max-w-[95vw] w-auto h-auto rounded-xl object-contain shadow-2xl ring-1 ring-white/10 cursor-zoom-out"
              />

              {alt && alt.trim() !== "" && !alt.startsWith("http") && (
                <p className="mt-3 text-center text-xs sm:text-sm text-zinc-300 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xs">
                  {alt}
                </p>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

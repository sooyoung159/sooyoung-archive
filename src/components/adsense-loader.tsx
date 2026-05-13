"use client";

import { useEffect } from "react";

const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6835019974856590";

/**
 * HTML 페이지에서만 AdSense 스크립트를 주입합니다.
 * 루트 layout의 <head><script>는 sitemap.xml 등 메타데이터 응답에
 * <script/> 노드가 섞이는 환경이 있어, 클라이언트 주입으로 분리합니다.
 */
export function AdsenseLoader() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector(`script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`)) {
      return;
    }
    const s = document.createElement("script");
    s.async = true;
    s.src = ADSENSE_SRC;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

type Props = { slug: string };

export function PostViewTracker({ slug }: Props) {
  useEffect(() => {
    void fetch(`/api/posts/${encodeURIComponent(slug)}/view`, {
      method: "POST",
    });
  }, [slug]);

  return null;
}

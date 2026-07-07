import { getPosts } from "@/lib/posts";
import { getCategories } from "@/lib/categories";

export const revalidate = 3600; // 1시간 캐싱

export async function GET() {
  const [posts, categories] = await Promise.all([
    getPosts(1, 1000),
    getCategories(),
  ]);

  const baseUrl = "https://sooyoung.pe.kr";

  const staticUrls = [
    baseUrl,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/privacy`,
  ];

  const categoryUrls = categories.map(
    (category) => `${baseUrl}/category/${encodeURIComponent(category.slug)}`
  );

  const postUrls = posts.map(
    (post) => `${baseUrl}/post/${encodeURIComponent(post.slug)}`
  );

  const allUrls = [...staticUrls, ...categoryUrls, ...postUrls];
  
  // 텍스트 사이트맵은 URL만 한 줄씩 출력하는 구조입니다.
  const sitemapContent = allUrls.join("\n");

  return new Response(sitemapContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

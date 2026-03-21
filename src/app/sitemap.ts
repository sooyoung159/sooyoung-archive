import { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 모든 포스트를 가져와서 동적으로 사이트맵 리스트 생성
  // (게시물이 매우 많을 경우를 대비해 1000개 정도 넉넉히 호출)
  const posts = await getPosts(1, 1000);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://sooyoung-archive.vercel.app/post/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 고정 URL 및 포스트 URL 반환
  return [
    {
      url: "https://sooyoung-archive.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...postEntries,
  ];
}

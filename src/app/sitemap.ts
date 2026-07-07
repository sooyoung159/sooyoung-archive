import { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getCategories } from "@/lib/categories";

export const revalidate = 3600; // 1 hour caching


function safeLastModified(iso?: string | null): Date {
  if (!iso) return new Date();
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    getPosts(1, 1000),
    getCategories(),
  ]);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://sooyoung.pe.kr/post/${encodeURIComponent(post.slug)}`,
    lastModified: safeLastModified(post.updatedAt || post.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `https://sooyoung.pe.kr/category/${encodeURIComponent(category.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/contact", "/privacy"].map(
    (route) => ({
      url: `https://sooyoung.pe.kr${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "monthly",
      priority: route === "" ? 1 : 0.5,
    })
  );

  return [...staticRoutes, ...categoryEntries, ...postEntries];
}

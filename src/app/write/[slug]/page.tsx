import { notFound } from "next/navigation";
import { WriteEditor } from "../write-editor";
import { getPostBySlug } from "@/lib/posts";
import { getCategories } from "@/lib/categories";

type Props = { params: Promise<{ slug: string }> };

export default async function WriteEditPage({ params }: Props) {
  const { slug } = await params;
  const [post, categories] = await Promise.all([
    getPostBySlug(slug),
    getCategories()
  ]);
  
  if (!post) notFound();

  return <WriteEditor initialPost={post} categories={categories} />;
}

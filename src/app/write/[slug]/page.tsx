import { notFound } from "next/navigation";
import { WriteEditor } from "../write-editor";
import { getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export default async function WriteEditPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return <WriteEditor initialPost={post} />;
}

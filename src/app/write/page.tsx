import { WriteEditor } from "./write-editor";
import { getCategories } from "@/lib/categories";

export default async function WritePage() {
  const categories = await getCategories();
  return <WriteEditor categories={categories} />;
}

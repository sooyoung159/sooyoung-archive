import { getCategories } from "@/lib/categories";
import { SidebarClient } from "./SidebarClient";

export async function Sidebar() {
  const categories = await getCategories();
  return <SidebarClient categories={categories} />;
}

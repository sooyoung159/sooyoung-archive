import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { isAdminSession } from "@/lib/auth";
import { Header } from "@/components/header";
import { CategoryManager } from "./category-manager";

export const dynamic = "force-dynamic";

export default async function ManageCategoriesPage() {
  const session = await getServerSession(authOptions);
  
  if (!isAdminSession(session)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-2xl font-semibold">카테고리 관리</h1>
        <CategoryManager />
      </main>
    </div>
  );
}

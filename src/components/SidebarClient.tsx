"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Category } from "@/lib/types";

export function SidebarClient({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  
  // 현재 URL 경로에서 카테고리 슬러그 추출
  let currentCategorySlug = "";
  if (pathname && pathname.startsWith("/category/")) {
    currentCategorySlug = pathname.replace("/category/", "").split("/")[0];
  }

  // 1단계 카테고리
  const mainCategories = categories.filter((c) => !c.parent_id);

  // parent_id 기준으로 2단계 묶기
  const subCategoriesMap = categories.reduce((acc, cat) => {
    if (cat.parent_id) {
      if (!acc[cat.parent_id]) acc[cat.parent_id] = [];
      acc[cat.parent_id].push(cat);
    }
    return acc;
  }, {} as Record<string, typeof categories>);

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-20 flex flex-col gap-4">
        {/* 모바일 가로 스크롤, 데스크탑 세로 리스트 */}
        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar gap-2 lg:gap-1">
          <Link
            href="/"
            className={`px-3 py-2 rounded-md whitespace-nowrap transition-colors ${
              !currentCategorySlug && pathname === "/"
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted font-medium"
            }`}
          >
            전체보기
          </Link>

          {mainCategories.map((mainCat) => {
            const isMainActive = currentCategorySlug === mainCat.slug;
            const subCats = subCategoriesMap[mainCat.id] || [];
            const isSubActive = subCats.some((s) => s.slug === currentCategorySlug);

            return (
              <div key={mainCat.id} className="flex flex-col gap-1">
                <Link
                  href={`/category/${mainCat.slug}`}
                  className={`px-3 py-2 rounded-md whitespace-nowrap transition-colors ${
                    isMainActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted font-medium"
                  }`}
                >
                  {mainCat.name}
                </Link>

                {/* 데스크탑에서만 기본적으로 하위 카테고리 표시되거나, 모바일에서는 하위 카테고리도 옆으로 나열 */}
                {subCats.length > 0 && (
                  <div className="flex lg:flex-col flex-row gap-1 lg:pl-4">
                    {subCats.map((subCat) => (
                      <Link
                        key={subCat.id}
                        href={`/category/${subCat.slug}`}
                        className={`text-sm px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                          currentCategorySlug === subCat.slug
                            ? "text-primary font-medium bg-primary/10"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {subCat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

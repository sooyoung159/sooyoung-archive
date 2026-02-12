import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl = '/' }: PaginationProps) {
  if (totalPages <= 1) return null;

  // 현재 페이지를 중심으로 최대 3개의 페이지 번호만 표시
  const getVisiblePages = () => {
    const pages: number[] = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* 이전 버튼 */}
      <Link
        href={isFirstPage ? '#' : `${baseUrl}?page=${currentPage - 1}`}
        className={`p-2 rounded-md transition-colors ${
          isFirstPage
            ? 'text-muted-foreground cursor-not-allowed'
            : 'text-foreground hover:bg-muted'
        }`}
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : 0}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* 페이지 번호 */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* 다음 버튼 */}
      <Link
        href={isLastPage ? '#' : `${baseUrl}?page=${currentPage + 1}`}
        className={`p-2 rounded-md transition-colors ${
          isLastPage
            ? 'text-muted-foreground cursor-not-allowed'
            : 'text-foreground hover:bg-muted'
        }`}
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : 0}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}

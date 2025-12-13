import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationMeta } from '@/types';
import { useHydration } from '@/hooks/useHydration';



interface ReusablePaginationProps {
  meta: PaginationMeta| null;
  paginatedDataName?:string
  onPageChange: (page: number) => void;
}

export const ReusablePagination: React.FC<ReusablePaginationProps> = ({ meta, onPageChange ,paginatedDataName}) => {

  if(!useHydration()){
    return<div>
      <h1>Loading....</h1>
    </div>
  }

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (meta!.last_page <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= meta!.last_page; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (meta!.current_page > 3) {
        pages.push('ellipsis-start');
      }

      // Show pages around current page
      const startPage = Math.max(2, meta!.current_page - 1);
      const endPage = Math.min(meta!.last_page - 1, meta!.current_page + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== meta!.last_page) {
          pages.push(i);
        }
      }

      if (meta!.current_page < meta!.last_page - 2) {
        pages.push('ellipsis-end');
      }

      // Always show last page
      pages.push(meta!.last_page);
    }

    return pages;
  };

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (meta!.current_page > 1) {
      onPageChange(meta!.current_page - 1);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (meta!.current_page < meta!.last_page) {
      onPageChange(meta!.current_page + 1);
    }
  };

  const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <div className="px-4 lg:px-6 space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Showing {meta?.from} to {meta?.to} of {meta?.total} {paginatedDataName}
            </div>
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            className={meta?.current_page === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {generatePageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === 'string' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => handlePageClick(e, page)}
                isActive={page === meta?.current_page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            className={
              meta?.current_page === meta?.last_page ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
  );
};
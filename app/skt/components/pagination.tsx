import { usePagination } from "react-instantsearch";
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function Pagination() {
  const {
    pages,
    currentRefinement,
    isFirstPage,
    isLastPage,
    canRefine,
    refine,
    createURL,
  } = usePagination();

  if (!canRefine) return null;

  return (
    <PaginationUI>
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious
              href={createURL(currentRefinement - 1)}
              onClick={() => refine(currentRefinement - 1)}
            />
          </PaginationItem>
        )}
        {pages.map((page) => (
          <PaginationItem key={`pagination-item-${page}`}>
            <PaginationLink
              href={createURL(page)}
              onClick={() => refine(page)}
              isActive={page == currentRefinement}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {!isLastPage && (
          <PaginationItem>
            <PaginationNext
              href={createURL(currentRefinement + 1)}
              onClick={() => refine(currentRefinement + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationUI>
  );
}

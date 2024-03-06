import { usePagination } from "react-instantsearch";
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  mobile?: boolean;
}

export function Pagination({ mobile }: PaginationProps) {
  const {
    pages,
    currentRefinement,
    isFirstPage,
    isLastPage,
    canRefine,
    refine,
    createURL,
  } = usePagination({ padding: mobile ? 1 : 3 });

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

import { ReactNode, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { styled } from 'styled-components';

// finish styling
// commit
// add to components
// commit
const StyledPagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  font-weight: 500;
  border-radius: 0 0 0.25rem 0.25rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  ${({ theme }) => theme.shadow};

  .page-item {
    display: flex;
  }
  .page-link {
    padding: 0.375rem 0.75rem;
  }

  .active {
    background: ${({ theme }) => theme.colors.hover};
    border-radius: 0.25rem;
    ${({ theme }) => theme.shadow};
  }

  .disabled {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const usePagination = (itemsPerPage = '10', itemLength = 0) => {
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPageNumber = useMemo(() => Number(itemsPerPage), [itemsPerPage]);

  if (isNaN(itemsPerPageNumber)) {
    throw new Error('itemsPerPage must be a valid number');
  }

  const pageCount = useMemo(() => {
    return Math.ceil(itemLength / itemsPerPageNumber);
  }, [itemLength, itemsPerPageNumber]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    setOffset((event.selected * itemsPerPageNumber) % itemLength);
  };

  return {
    offset,
    currentPage,
    pageCount,
    handlePageClick,
  };
};

export interface PaginateProps {
  currentPage: number;
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;

  breakLabel?: ReactNode;
  nextLabel?: string;
  previousLabel?: string;
  pageRangeDisplayed?: number;
  renderOnZeroPageCount?: null;
}

export const Pagination = ({
  currentPage,
  pageCount,
  handlePageClick,

  breakLabel,
  nextLabel,
  previousLabel,
  pageRangeDisplayed,
  renderOnZeroPageCount = null,
}: PaginateProps) => {
  if (pageCount <= 1) return null;
  return (
    <StyledPagination
      forcePage={currentPage}
      pageCount={pageCount > 1 ? pageCount : 1}
      onPageChange={handlePageClick}
      breakLabel={breakLabel ?? '...'}
      previousLabel={previousLabel ?? '<'}
      nextLabel={nextLabel ?? '>'}
      pageRangeDisplayed={pageRangeDisplayed ?? 3}
      renderOnZeroPageCount={renderOnZeroPageCount ?? null}
      marginPagesDisplayed={2}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item previous"
      previousLinkClassName="page-link previous"
      nextClassName="page-item next"
      nextLinkClassName="page-link next"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
    />
  );
};

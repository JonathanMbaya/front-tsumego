import React from 'react';
import { usePagination } from '../../utils/usePagination';

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const paginationRange = usePagination({ currentPage, totalCount, pageSize });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onPageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <li
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => onPageClick(currentPage - 1)}
      >
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return <li key={index} className="dots">...</li>;
        }
        return (
          <li
            key={index}
            className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => onPageClick(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`page-item ${currentPage === Math.ceil(totalCount / pageSize) ? 'disabled' : ''}`}
        onClick={() => onPageClick(currentPage + 1)}
      >
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </li>
    </div>
  );
};

export default Pagination;

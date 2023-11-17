/**
 * Pagination.tsx
 * Copyright (c) 2023 Flexera Assigment
 *
 * Description : This file includes Pagination and it includes Prev and Next button (Prev , Next I am using Left and Right arrow icons)
 */

import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => (
  <div className="pagination">
    <button onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 1}>
      &#8592; {/* Left arrow symbol */}
    </button>
    <span>Page {page}</span>
    <button onClick={() => setPage((prevPage) => prevPage + 1)}>
      &#8594; {/* Right arrow symbol */}
    </button>
  </div>
);

export default Pagination;

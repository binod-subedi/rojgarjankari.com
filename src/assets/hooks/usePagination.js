import { useState, useEffect } from "react";

export const usePagination = (items, itemsPerPage = 8) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page if items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const changePage = (page) => setCurrentPage(page);

  return {
    currentPage,
    changePage,
    totalPages,
    currentItems,
  };
};

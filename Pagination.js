import React, { useEffect, useState } from "react";
//for rendering custom pagination
function CustomPagination({ totalPages, setPageNum, activePage }) {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // This effect will run whenever activePage changes
    setCurrentPage(activePage);
  }, [activePage]);
  // Handle page change
  const handleChange = (page) => {
    setCurrentPage(page);
    setPageNum(page);
  };
  // Handle previous page click
  const previousPage = () => {
    if (currentPage > 1) {
      handleChange(currentPage - 1);
    }
  };
  // Handle next page click
  const nextPage = () => {
    if (currentPage < totalPages) {
      handleChange(currentPage + 1);
    }
  };
  // Function to create a range of page numbers with ellipsis
  const getPageNumbers = () => {
    const maxPageNumbersToShow = 5; // Max pages to show in the pagination
    const pages = [];
    let startPage, endPage;
    if (totalPages <= maxPageNumbersToShow) {
      // Show all pages if total pages are less than maxPageNumbersToShow
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate the start and end pages to show
      const maxPagesBeforeCurrentPage = Math.floor(maxPageNumbersToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageNumbersToShow / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPageNumbersToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPageNumbersToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    // Add first page and ellipsis if startPage is greater than 1
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }
    // Add range of page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    // Add last page and ellipsis if endPage is less than totalPages
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };
  const pageNumbers = getPageNumbers();
  return (
    <div style={styles.outerContainer}>
      {totalPages > 1 ? (
        <div style={styles.paginationWrapper}>
          {currentPage !== 1 && (
            <div
              style={styles.nextAndPreviousItem}
              onClick={previousPage}
            >
              <i className="fa-solid fa-chevron-left" />
            </div>
          )}
          {pageNumbers.map((pageNumber, index) => (
            <div
              key={index}
              className={pageNumber === currentPage ? "text-white " : ""}
              style={{
                backgroundColor: pageNumber === currentPage ? "blue" : "white",
                ...styles.paginationItem,
                cursor: pageNumber === "..." ? "default" : "pointer",
              }}
              onClick={() => pageNumber !== "..." && handleChange(pageNumber)}
            >
              {pageNumber}
            </div>
          ))}
          {currentPage !== totalPages && (
            <div style={styles.nextAndPreviousItem} onClick={nextPage}>
              <i className="fa-solid fa-chevron-right" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
export default CustomPagination;
const styles = {
  outerContainer: { display: "flex", justifyContent: "flex-end" },
  paginationWrapper: {
    display: "flex",
    flexDirection: "row",
    columnGap: 8,
    margin: "1rem",
    borderRadius: "3rem",
  },
  nextAndPreviousItem: {
    height: "2rem",
    width: "2rem",
    borderRadius: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  paginationItem: {
    height: "2rem",
    minWidth: "2rem",
    borderRadius: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
};

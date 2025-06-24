import { useState } from "react";

const usePagination = (maxPages = 20) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  // Function to go to next page
  const goToNextPage = () => {
    if (currentPageNumber < maxPages) {
      setCurrentPageNumber(currentPageNumber + 1);
      // Scroll to top of page
      window.scrollTo(0, 0);
    }
  };

  // Function to go to previous page
  const goToPreviousPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
      // Scroll to top of page
      window.scrollTo(0, 0);
    }
  };

  // Function to go to specific page
  const goToPage = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  // Create an array of 5 pages
  const getPageNumbers = () => {
    const pages = [];
    
    // Calculate which 5 pages to show
    let startPage = currentPageNumber - 2;
    let endPage = currentPageNumber + 2;
    
    // If we're near the beginning, show pages 1-5
    if (startPage < 1) {
      startPage = 1;
      endPage = 5;
    }
    
    // If we're near the end, show last 5 pages
    if (endPage > maxPages) {
      endPage = maxPages;
      startPage = Math.max(1, maxPages - 4);
    }
    
    // Add the page numbers to our array
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return {
    currentPageNumber, maxPages, goToNextPage, goToPreviousPage, goToPage, getPageNumbers
  };
};

export default usePagination; 
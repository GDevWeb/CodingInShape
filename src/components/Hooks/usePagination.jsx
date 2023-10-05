import { useState } from "react";

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  
  const lastPage = Math.ceil(data.length / itemsPerPage);


  const displayedData = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(data.length / itemsPerPage);

  const setPage = (page) => {
    if (page > 0 && page <= pageNumbers) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    displayedData,
    pageNumbers,
    lastPage,
    setPage,
    itemsPerPage, 
  };
}

export default usePagination;

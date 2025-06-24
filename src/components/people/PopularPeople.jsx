import React, { useState, useEffect } from "react";
import PeopleCard from "./PeopleCard";
import { getPopularPeople } from "../../services/api";
import usePagination from "../pagination-logic/usePagination";

const PopularPeople = () => {
  // State to store the list of people
  const [peopleList, setPeopleList] = useState([]);
  
  // Use pagination hook
  const {currentPageNumber, maxPages, goToNextPage, goToPreviousPage, goToPage, getPageNumbers} = usePagination(20);

  // Load people when component starts or page changes
  useEffect(() => {
    loadPeopleFromAPI(currentPageNumber);
  }, [currentPageNumber]);

  // Function to get people from the API
  const loadPeopleFromAPI = async (pageNumber) => {
    const response = await getPopularPeople(pageNumber);
    setPeopleList(response.results);
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Popular People</h1>
      
      {/* Grid of People Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {peopleList.map((person) => (
          <PeopleCard key={person.id} person={person} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        {/* Previous Button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPageNumber === 1}
          className="px-4 py-2 text-white rounded hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
          style={{ backgroundColor: currentPageNumber === 1 ? '#d1d5db' : '#605DFF' }}
        >
          ← Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`px-3 py-2 rounded ${
                currentPageNumber === pageNumber
                  ? 'text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              style={{
                backgroundColor: currentPageNumber === pageNumber ? '#605DFF' : undefined
              }}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPageNumber === maxPages}
          className="px-4 py-2 text-white rounded hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
          style={{ backgroundColor: currentPageNumber === maxPages ? '#d1d5db' : '#605DFF' }}
        >
          Next →
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center text-gray-600 mt-4">
        Page {currentPageNumber} of {maxPages}
      </div>
    </div>
  );
};

export default PopularPeople; 
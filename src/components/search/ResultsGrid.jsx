import React from 'react';
import MovieCard from '../movie-tv/MovieCard';

// component to display a grid of search results
const ResultsGrid = ({ results, loadMore }) => {
  // renders the grid of movie cards and a load more button
  return (
    <div className="flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {results.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={loadMore}
          className="btn btn-primary w-full"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default ResultsGrid; 
import React from 'react';
import SortFilter from './SortFilter';

// sidebar component for search page filters
const SearchSidebar = ({
  mediaType,
  sortBy,
  onSortChange,
  filters,
  handleFilterChange,
  handleSliderChange,
  genres,
  selectedGenres,
  handleGenreChange,
  certifications,
  keyword,
  setKeyword,
  handleSearch,
}) => {
  // determines date filter name based on media type
  const dateFilterNamePrefix = mediaType === 'movie' ? 'release_date' : 'air_date';

  // renders the sidebar layout and filter options
  return (
    <div className="menu p-4 w-full lg:w-80 bg-base-100 text-base-content">
      <SortFilter
        mediaType={mediaType}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
      <div className="collapse bg-base-200 collapse-arrow mt-4">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-xl font-medium">Filters</div>
        <div className="collapse-content">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Release Dates</h3>
            <div className="mb-2">
              <label htmlFor="from" className="text-sm">From</label>
              <input type="date" id="from" name={`${dateFilterNamePrefix}_gte`} onChange={handleFilterChange} className="w-full p-1 border rounded" />
            </div>
            <div>
              <label htmlFor="to" className="text-sm">To</label>
              <input type="date" id="to" name={`${dateFilterNamePrefix}_lte`} onChange={handleFilterChange} className="w-full p-1 border rounded" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button key={genre.id} onClick={() => handleGenreChange(genre.id)} className={`px-2 py-1 border rounded text-sm ${selectedGenres.includes(genre.id) ? "bg-blue-500 text-white" : ""}`}>
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Certification</h3>
            <select name="certification" onChange={handleFilterChange} className="w-full p-1 border rounded">
              <option value="">All</option>
              {certifications.map((cert) => (
                <option key={cert.certification} value={cert.certification}>
                  {cert.certification}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">User Score</h3>
            <input type="range" min="0" max="10" value={filters["vote_average.gte"]} step="1" onChange={handleSliderChange} className="w-full" />
            <div className="flex justify-between text-xs">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Keywords</h3>
            <input type="text" placeholder="Filter by keywords..." value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button onClick={handleSearch} className="btn w-full">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchSidebar; 
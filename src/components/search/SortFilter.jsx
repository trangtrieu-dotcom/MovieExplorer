import React from 'react';

// sort filter component for search results
const SortFilter = ({ mediaType, sortBy, onSortChange }) => {
  // common sort options for both movies and tv
  const commonSortOptions = {
    'popularity.desc': 'Popularity Descending',
    'popularity.asc': 'Popularity Ascending',
    'vote_average.desc': 'Rating Descending',
    'vote_average.asc': 'Rating Ascending',
  };

  // movie specific sort options
  const movieSortOptions = {
    ...commonSortOptions,
    'primary_release_date.desc': 'Release Date Descending',
    'primary_release_date.asc': 'Release Date Ascending',
    'original_title.asc': 'Name (A-Z)',
    'original_title.desc': 'Name (Z-A)',
  };

  // tv show specific sort options
  const tvSortOptions = {
    ...commonSortOptions,
    'first_air_date.desc': 'First Air Date Descending',
    'first_air_date.asc': 'First Air Date Ascending',
  };

  // dynamically select options based on media type
  const options = mediaType === 'movie' ? movieSortOptions : tvSortOptions;

  // renders the sort dropdown
  return (
    <div className="collapse bg-base-200 collapse-arrow">
      <input type="checkbox" defaultChecked />
      <div className="collapse-title text-xl font-medium">
        Sort
      </div>
      <div className="collapse-content">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Sort Results By</span>
          </label>
          <select 
            className="select select-bordered w-full" 
            value={sortBy} 
            onChange={e => onSortChange(e.target.value)}
          >
            {Object.entries(options).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortFilter;

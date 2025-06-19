import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function SearchBar() {
  // state management
  const [searchQuery, setSearchQuery] = useState(""); //searchQuery: current search input value
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // validate search query
  const { theme } = useTheme();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // prevent empty searches
    
    setIsLoading(true); 
    setError(null); // clear any previous errors
    
    // navigate to search results page with url encoded query 
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsLoading(false);
  };

  return (
    // hero section
    <div
      className="flex flex-col items-center w-full mb-10 bg-base-200 py-12 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-base-200/40 z-0" />
      
      <div className="w-full max-w-3xl relative z-10">
        {/* title and subtitle */}
        <h1 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Welcome.</h1>
        <p className={`text-base mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        
        {/* search form */}
        <form onSubmit={handleSearch} className="flex w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movie, tv show, person..."
            className="input input-bordered rounded-full w-full bg-white text-black placeholder-gray-500 focus:outline-none"
          />
          
          <button
            type="submit"
            className="btn btn-neutral rounded-full ml-2 px-6"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
          
          {/* error message display */}
          {error && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-error text-error-content p-2 rounded-lg text-sm">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SearchBar;

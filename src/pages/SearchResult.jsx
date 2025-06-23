import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import SearchSidebar from "../components/search/SearchSidebar";
import { searchMulti } from "../services/api";

// order of category
const CATEGORY_ORDER = [
  "tv",
  "movie",
  "person",
  "collection",
  "company",
];


// custom hook to extract and parse URL query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// determine search result items
const getCategory = (item) => {
  if (item.media_type) return item.media_type; // if item has media type
  if (item.name && item.first_air_date) return "tv"; // check tv shows
  if (item.title && item.release_date) return "movie"; // check movies
  return "other";
};

/**
 * SearchResult Component
 * 
 * Main search results page that displays and filters search results
 * from the TMDB API. Integrates with SearchBar and SideBar components.
 * 
 * Features:
 * - Fetches search results based on URL query parameter
 * - Categorizes results by media type (movies, TV shows, people, etc.)
 * - Provides category-based filtering via sidebar
 * - Handles navigation to detail pages
 * - Shows loading states and error messages
 * - Responsive layout with sidebar and main content area
 * 
 * URL Parameters:
 * - query: Search term (e.g., /search?query=batman)
 * 
 * State Management:
 * - results: All search results from API
 * - counts: Count of results per category
 * - selectedCategory: Currently active filter
 * - loading: API request loading state
 * - error: Error message if search fails
 * 
 * Component Integration:
 * - Uses SearchBar for consistent search interface
 * - Uses SideBar for category filtering
 * - Integrates with React Router for navigation
 */
export default function SearchResults() {
  // xxtract search query from url parameters
  const query = useQuery().get("query") || "";
  
  // state management
  const [results, setResults] = useState([]);
  const [counts, setCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("tv");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // navigate search query

  // fetch search when query changes
  useEffect(() => {
    if (!query) return; // skip if no search query
    
    setLoading(true);
    setError(null);
    
    // fetch search results from TMDB API
    searchMulti(query)
      .then((data) => {
        // initialize categorized results object
        const categorized = {};
        CATEGORY_ORDER.forEach((cat) => (categorized[cat] = []));
        
        // categorize each result by its media type
        data.results.forEach((item) => {
          const cat = getCategory(item);
          if (categorized[cat]) categorized[cat].push(item);
        });
        
        // update state with results and counts
        setResults(data.results);
        const newCounts = {};
        CATEGORY_ORDER.forEach((cat) => {
          newCounts[cat] = categorized[cat].length;
        });
        setCounts(newCounts);
        
        // set default category to first non-empty category
        const firstNonEmpty = CATEGORY_ORDER.find((cat) => newCounts[cat] > 0) || "tv";
        setSelectedCategory(firstNonEmpty);
      })
      .catch(() => setError("Failed to fetch search results."))
      .finally(() => setLoading(false));
  }, [query]);

  // filter results based on selected category
  const categorizedResults = results.filter((item) => getCategory(item) === selectedCategory);


  // handles navigation to detail pages when a search result is clicked
  const handleResultClick = (item) => {
    switch (getCategory(item)) {
      case "movie":
        navigate(`/movie/${item.id}`);
        break;
      case "tv":
        navigate(`/tv/${item.id}`);
        break;
      case "person":
        navigate(`/person/${item.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <SearchBar />
      
      {/* main content area */}
      <div className="flex bg-base-100 text-base-content">
        {/* Category filter sidebar */}
        <SearchSidebar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          counts={counts}
        />
        
        {/* search results display area */}
        <main className="flex-1 p-6">
          {/* loading and error state */}
          {loading && <div className="text-center text-lg">Loading...</div>}
          {error && <div className="text-center text-error">{error}</div>}
          {/* No results state */}
          {!loading && !error && categorizedResults.length === 0 && (
            <div className="text-center text-gray-400 mt-10">
              No results found for "{query}".
            </div>
          )}
          
          {/* results list */}
          {!loading && !error && categorizedResults.length > 0 && (
            <div className="space-y-4">
              {/* map through filtered results */}
              {categorizedResults.map((item) => (
                <div
                  key={item.id + getCategory(item)} // unique key for mixed media types
                  className="flex bg-base-200 rounded-lg shadow p-4 cursor-pointer hover:bg-base-300 transition"
                  onClick={() => handleResultClick(item)}
                >
                  {/* media poster/profile image */}
                  <div className="w-24 h-36 flex-shrink-0 mr-4">
                    {item.poster_path || item.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${item.poster_path || item.profile_path}`}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      // placeholder for items without images
                      <div className="w-full h-full bg-base-300 rounded flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  
                  {/* media info */}
                  <div className="flex-1">
                    <div className="text-lg font-semibold">
                      {item.title || item.name}
                      {item.original_name && item.original_name !== item.name && (
                        <span className="ml-2 text-gray-400 text-base">
                          ({item.original_name})
                        </span>
                      )}
                    </div>
                    
                    {/* release date info */}
                    <div className="text-sm text-gray-400 mb-1">
                      {(item.release_date || item.first_air_date) && (
                        <span>
                          {new Date(item.release_date || item.first_air_date).toLocaleDateString(
                            undefined, 
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </span>
                      )}
                    </div>
                    
                    {/* description */}
                    <div className="text-base-content text-sm line-clamp-3">
                      {item.overview || item.known_for_department || "No description available."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 
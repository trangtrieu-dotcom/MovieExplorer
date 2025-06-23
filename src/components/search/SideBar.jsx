import React from "react";

// category label
const CATEGORY_LABELS = {
  tv: "TV Shows",
  movie: "Movies",
  person: "People",
  collection: "Collections",
  company: "Companies",
};


 // order of categories in the sidebar
const CATEGORY_ORDER = [
  "tv",
  "movie",
  "person",
  "collection",
  "company",
];

/**
 * SideBar Component
 * 
 * A filterable sidebar component for search results that allows users to
 * filter results by different media types and categories.
 * 
 * Features:
 * - Category-based filtering with visual indicators
 * - Dynamic count badges showing number of results per category
 * - Disabled state for categories with no results
 * - Active state highlighting for selected category
 * 
 * Props:
 * @param {string} selectedCategory - Currently selected category filter
 * @param {function} setSelectedCategory - Function to update selected category
 * @param {object} counts - Object containing count of results for each category
 *                        Format: { tv: 5, movie: 12, person: 3, ... }
 */
export default function SideBar({ selectedCategory, setSelectedCategory, counts }) {
  return (
    <aside className="w-64 m-6 flex-shrink-0">
      <div className="card bg-base-200 shadow">
        <div className="card-body p-4">
          <h2 className="card-title text-lg">Search Results</h2>
          
          <ul className="menu bg-base-200 rounded-box">
            {/* map through categories in defined order */}
            {CATEGORY_ORDER.map((cat) => (
              <li key={cat}>
                {/* category filter button */}
                <button
                  className={
                    selectedCategory === cat
                      ? "active flex justify-between items-center"
                      : "flex justify-between items-center"
                  }
                  onClick={() => setSelectedCategory(cat)}
                  disabled={counts[cat] === 0} // disable if no results for this category
                >
                  {/* category label */}
                  <span>{CATEGORY_LABELS[cat]}</span>
                  
                  {/* result count badge */}
                  <span 
                    className={`badge ${
                      selectedCategory === cat ? "badge-primary" : "badge-ghost"
                    }`}
                  >
                    {counts[cat] || 0}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import {
  discoverMovies,
  discoverTVShows,
  getMovieGenres,
  getTVGenres,
  getMovieCertifications,
  getTVCertifications,
  searchKeywords,
} from "../../services/api";
import SearchSidebar from "./SearchSidebar";
import ResultsGrid from "./ResultsGrid";
import { SlidersHorizontal } from 'lucide-react';

// main component for the advanced search page
const AdvancedSearch = ({ mediaType }) => {
  // state management
  const [results, setResults] = useState([]); // search results
  const [page, setPage] = useState(1); // pagination
  const [filters, setFilters] = useState({
    "vote_average.gte": 0,
    "vote_average.lte": 10,
  }); // filters
  const [genres, setGenres] = useState([]); // genres
  const [certifications, setCertifications] = useState([]); // certifications
  const [selectedGenres, setSelectedGenres] = useState([]); // selected genres
  const [keyword, setKeyword] = useState(""); // keyword input
  const [keywordId, setKeywordId] = useState(null); // keyword id
  const [sortBy, setSortBy] = useState("popularity.desc"); // sort order
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile sidebar visibility

  // function to load search results
  const loadResults = useCallback(
    async (reset = false, kwId = keywordId) => {
      const currentPage = reset ? 1 : page;
      const discoverFunc =
        mediaType === "movie" ? discoverMovies : discoverTVShows;

      const params = { ...filters, sort_by: sortBy };
      if (selectedGenres.length > 0) {
        params.with_genres = selectedGenres.join(",");
      }

      if (kwId) {
        params.with_keywords = kwId;
      }

      if (mediaType === "movie") {
        if (filters.release_date_gte)
          params["primary_release_date.gte"] = filters.release_date_gte;
        if (filters.release_date_lte)
          params["primary_release_date.lte"] = filters.release_date_lte;
      } else {
        if (filters.air_date_gte)
          params["first_air_date.gte"] = filters.air_date_gte;
        if (filters.air_date_lte)
          params["first_air_date.lte"] = filters.air_date_lte;
      }

      const data = await discoverFunc({ ...params, page: currentPage });
      if (data.results) {
        setResults((prev) =>
          reset ? data.results : [...prev, ...data.results]
        );
        setPage(currentPage + 1);
      }
    },
    [mediaType, page, filters, selectedGenres, keywordId, sortBy]
  );

  // effect to fetch metadata on component mount or media type change
  useEffect(() => {
    const fetchMetadata = async () => {
      const getGenres = mediaType === "movie" ? getMovieGenres : getTVGenres;
      const getCertifications =
        mediaType === "movie"
          ? getMovieCertifications
          : getTVCertifications;

      const genresData = await getGenres();
      setGenres(genresData);

      const certsData = await getCertifications();
      if (mediaType === "movie" && certsData.US) {
        setCertifications(certsData.US);
      } else if (mediaType === "tv" && certsData.results) {
        setCertifications(
          certsData.results.filter((c) => c.iso_3166_1 === "US")
        );
      }
    };

    setResults([]);
    setPage(1);
    fetchMetadata();
    setFilters((prev) => ({
      "vote_average.gte": prev["vote_average.gte"],
      "vote_average.lte": prev["vote_average.lte"],
    }));
    setSelectedGenres([]);
    setKeyword("");
    setKeywordId(null);
    setSortBy("popularity.desc");
  }, [mediaType]);

  // effect to load initial results
  useEffect(() => {
    if (results.length === 0) {
      loadResults(true, null);
    }
  }, [results.length, loadResults]);

  // handler for filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // handler for genre selection
  const handleGenreChange = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  // handler for user score slider
  const handleSliderChange = (e) => {
    setFilters((prev) => ({ ...prev, "vote_average.gte": e.target.value }));
  };

  // handler for search button click
  const handleSearch = async () => {
    let kwId = null;
    if (keyword) {
      const keywordResults = await searchKeywords(keyword);
      if (keywordResults && keywordResults.length > 0) {
        kwId = keywordResults[0].id;
      } else {
        console.log("no keyword found for", keyword);
      }
    }
    setKeywordId(kwId);
    loadResults(true, kwId);
  };

  // handler for sort option change
  const handleSortChange = (value) => {
    setSortBy(value);
    loadResults(true);
  };

  // props for sidebar component
  const sidebarProps = {
    mediaType,
    sortBy,
    onSortChange: handleSortChange,
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
  };

  // renders the advanced search page layout
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold ml-5">
          {mediaType === "movie" ? "All Movies" : "All TV Shows"}
        </h1>
        <button
          className="btn btn-ghost lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <SlidersHorizontal />
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block">
          <SearchSidebar {...sidebarProps} />
        </div>
        {isSidebarOpen && (
          <div className="lg:hidden">
            <SearchSidebar {...sidebarProps} />
          </div>
        )}
        <ResultsGrid results={results} loadMore={() => loadResults()} />
      </div>
    </div>
  );
};

export default AdvancedSearch;

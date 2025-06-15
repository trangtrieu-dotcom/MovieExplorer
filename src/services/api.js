const API_KEY = "c9f30a7b1101b3b3521afa24010174f3";
const BASE_URL = "https://api.themoviedb.org/3";

// fetch popular movies
// FIXME: fetch API or Axios API
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// fetch top rated movies
export const getTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// fetch trending movies
export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// fetch recommendations by genre
export const getRecommendationsByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
};

// fetch user favorites (simulate with popular for now)
export const getUserFavorites = async () => {
  // In a real app, this would be user-specific. For now, use popular movies as a placeholder.
  return getPopularMovies();
};

// fetch user watchlist (simulate with trending for now)
export const getUserWatchlist = async () => {
  // In a real app, this would be user-specific. For now, use trending movies as a placeholder.
  return getTrendingMovies();
};

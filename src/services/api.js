const API_KEY = "c9f30a7b1101b3b3521afa24010174f3";
const BASE_URL = "https://api.themoviedb.org/3";

// fetch api of popular movies
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

// fetch upcoming movies
export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// search endpoint
export const searchMulti = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=1`
  );
  return response.json();
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

// fetch detailed info for a single movie
export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// MOVIES

// fetch movie credits
export const getMovieCredits = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

// fetch trailer videos
export const getMovieVideos = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

// fetch similar movies
export const getSimilarMovies = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

// TV SHOWS

// fetch show details
export const getTVDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return await res.json();
};

// fetch show credits
export const getTVCredits = async (id) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
  return await res.json();
};

// fetch show videos
export const getTVVideos = async (id) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
  return await res.json();
};

// fetch similar shows
export const getSimilarTVShows = async (id) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

// discover movies based on filters
export const discoverMovies = async (filters) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    ...filters,
  });
  const response = await fetch(`${BASE_URL}/discover/movie?${params}`);
  return response.json();
};

// discover tv shows based on filters
export const discoverTVShows = async (filters) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    ...filters,
  });
  const response = await fetch(`${BASE_URL}/discover/tv?${params}`);
  return response.json();
};

// fetch all movie genres
export const getMovieGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres;
};

// fetch all tv show genres
export const getTVGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};

// fetch all movie certifications
export const getMovieCertifications = async () => {
  const response = await fetch(
    `${BASE_URL}/certification/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.certifications;
};

// fetch all tv show certifications
export const getTVCertifications = async () => {
  const response = await fetch(
    `${BASE_URL}/certification/tv/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.certifications;
};

// search for keywords by query
export const searchKeywords = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/keyword?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

// GET the customer's account ID
export const getAccountId = async () => {
  const sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    throw new Error("No session found");
  }

  const response = await fetch(
    `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
  );
  const data = await response.json();
  return data.id;
};

// Add to favorites POST request
export const addToFavorites = async (
  movieId,
  favorite = true,
  mediaType = "movie"
) => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = await getAccountId();

  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: mediaType,
        media_id: movieId,
        favorite: favorite,
      }),
    }
  );

  return await response.json();
};

// Add to watchlist POST request
export const addToWatchlist = async (
  movieId,
  watchlist = true,
  mediaType = "movie"
) => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = await getAccountId();

  const response = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: mediaType,
        media_id: movieId,
        watchlist: watchlist,
      }),
    }
  );

  return await response.json();
};

// Get user's favorite movies GET request
export const getUserFavoriteMovies = async () => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = await getAccountId();

  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
  );
  const data = await response.json();
  return data.results;
};

// Get user's watchlist movies GET request
export const getUserWatchlistMovies = async () => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = await getAccountId();

  const response = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`
  );
  const data = await response.json();
  return data.results;
};

// Get user's favorite TV shows
export const getUserFavoriteTVShows = async () => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = await getAccountId();

  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}`
  );
  const data = await response.json();
  return data.results;
};

// Get user's watchlist TV shows
export const getUserWatchlistTVShows = async () => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = await getAccountId();

  const response = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}`
  );
  const data = await response.json();
  return data.results;
};

// PEOPLE

// fetch popular people with pagination
export const getPopularPeople = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/person/popular?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

// fetch person details
export const getPersonDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// Get person combined credits (movies + TV)
export const getPersonCredits = async (personId) => {
  const res = await fetch(`${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};


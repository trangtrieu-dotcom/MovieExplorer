const API_KEY = "c9f30a7b1101b3b3521afa24010174f3";
const BASE_URL = "https://api.themoviedb.org/3";

// fetch api of popular movies
// FIXME: fetch API or Axios API
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

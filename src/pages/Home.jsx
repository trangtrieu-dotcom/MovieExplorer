import MovieCard from "../components/MovieCard.jsx";
import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/api.js";

function Home() {
  // state for movies, error, and loading
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch popular movies 
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies(); 
        setMovies(popularMovies);
      } catch (error) {
        setError("Failed to load movies", error);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  return (
    // TODO: will move to components/PopularMovies maybe
    <div className="min-h-screen bg-base-200 px-8 py-8">
      {/* section title */}
      <h2 className="text-xl font-semibold text-white mb-6">Popular</h2>
      {loading ? (
        // loading state
        <div className="text-white">Loading...</div>
      ) : error ? (
        // error state
        <div className="text-red-400">{error}</div>
      ) : (
        // movie cards
        // FIXME: not responsive enough
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {/* IMPORTANT: maps over `movies` array, renders a MovieCard for each `movie` */}
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
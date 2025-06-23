import MovieCarousel from "../components/movie-tv/MovieCarousel.jsx";
import SearchBar from "../components/search/SearchBar.jsx";
import UpcomingMovies from "../components/movie-tv/UpcomingMovies.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-base-100 pb-8">
      <SearchBar />
      <div className="px-8">
        <h2 className="text-xl font-semibold mt-12 mb-6">Popular</h2>
        <MovieCarousel type="popular" />

        <h2 className="text-xl font-semibold mt-12 mb-6">Coming Soon</h2>
        <UpcomingMovies />

        <h2 className="text-xl font-semibold mt-12 mb-6">Top Rated</h2>
        <MovieCarousel type="topRated" />
      </div>
    </div>
  );
}

export default Home;
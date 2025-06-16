import MovieCarousel from "../components/home/MovieCarousel.jsx";
import SearchBar from "../components/home/SearchBar.jsx";
import UpcomingMovies from "../components/home/UpcomingMovies.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-base-100 pb-8">
      <SearchBar />
      <div className="px-8">
        <h2 className="text-xl font-semibold text-white mt-12 mb-6">Popular</h2>
        <MovieCarousel type="popular" />

        <h2 className="text-xl font-semibold text-white mt-12 mb-6">Upcoming</h2>
        <UpcomingMovies />

        <h2 className="text-xl font-semibold text-white mt-12 mb-6">Top Rated</h2>
        <MovieCarousel type="topRated" />
      </div>
    </div>
  );
}

export default Home;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/layout/NavBar";
import MovieDetails from "./pages/MovieDetails";
import FavoriteWatchlistRecommendations from "./pages/Favorite_Watchlist_Recommendations";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/favorites-watchlist-recommendations"
          element={<FavoriteWatchlistRecommendations />}
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

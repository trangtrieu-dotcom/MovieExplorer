import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import FavoriteWatchlistRecommendations from "./pages/Favorite_Watchlist_Recommendations";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< Updated upstream
        <Route path="/favorites-watchlist-recommendations" element={<FavoriteWatchlistRecommendations />} />
=======
        <Route
          path="/favorites-watchlist-recommendations"
          element={<FavoriteWatchlistRecommendations />}
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;

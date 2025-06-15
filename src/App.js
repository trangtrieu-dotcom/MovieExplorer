import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Navbar from "./components/layout/NavBar";
import MovieDetails from "./pages/MovieDetails";
import FavoriteWatchlistRecommendations from "./pages/Favorite_Watchlist_Recommendations";
import Login from "./pages/Login";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/favorites-watchlist-recommendations"
            element={<FavoriteWatchlistRecommendations />}
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

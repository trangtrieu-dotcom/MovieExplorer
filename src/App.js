import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import FavoriteWatchlistRecommendations from "./pages/Favorite_Watchlist_Recommendations";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/favorites-watchlist-recommendations">Favorites/Watchlist/Recommendations</Link></li>
//         </ul>
//       </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites-watchlist-recommendations" element={<FavoriteWatchlistRecommendations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Navbar from "./components/layout/NavBar";
import MovieDetails from "./pages/MovieDetails";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import Footer from "./components/layout/Footer";
import TVDetails from "./pages/TVDetails";
import SearchResult from "./pages/SearchResult";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import People from "./pages/People";
import ActorDetails from "./pages/ActorDetails";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites-watchlist" element={<Favorite />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/tv-shows" element={<TVShows />} />
                <Route path="/tv/:id" element={<TVDetails />} />
                <Route path="/search" element={<SearchResult />} />
                <Route path="/people" element={<People />} />
                <Route path="/person/:id" element={<ActorDetails />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

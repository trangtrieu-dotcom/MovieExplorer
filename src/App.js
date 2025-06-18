import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Navbar from "./components/layout/NavBar";
import MovieDetails from "./pages/MovieDetails";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import Footer from "./components/layout/Footer";
import TVDetails from "./pages/TVDetails";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favorites-watchlist" element={<Favorite />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/tv/:id" element={<TVDetails />} />
              <Route path="/search" element={<SearchResult />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

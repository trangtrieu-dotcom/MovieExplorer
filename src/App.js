import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Navbar from "./components/layout/NavBar";
import MovieDetails from "./pages/MovieDetails";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import Footer from "./components/layout/Footer";

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
              <Route
                path="/favorites-watchlist-recommendations"
                element={<Favorite />}
              />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


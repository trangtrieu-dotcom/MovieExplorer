import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieCard from "./MovieCard.jsx";
import { getUserFavoriteMovies, getUserWatchlistMovies } from "../services/api";

function FavoriteCarousel({ type }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const movieType = {
        favorites: getUserFavoriteMovies,
        watchlist: getUserWatchlistMovies,
      }

      try {
        const fetchFunction = movieType[type];
        if (!fetchFunction) {
          throw new Error(`Unknown movie type: ${type}`);
        }
        const results = await fetchFunction();
        setMovies(results || []);
      } catch (error) {
        setError(`Failed to load ${type} movies`);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [type]);

  // carousel settings - matching MovieCarousel for consistent spacing
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 8,
    slidesToScroll: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          centerMode: true,
          centerPadding: "20px"
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "16px"
        }
      }
    ]
  };

  if (loading) return <div className="text-white px-4 py-2">Loading...</div>;
  if (error) return <div className="text-red-500 px-4 py-2">{error}</div>;
  if (!movies || movies.length === 0) return <div className="text-gray-400 px-4 py-2">No movies found.</div>;

  // Always use carousel for consistent layout
  return (
    <div className="w-full px-4">
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Slider>
    </div>
  );
}

export default FavoriteCarousel; 
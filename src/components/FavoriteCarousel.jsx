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

  const settings = {
    dots: false,
    infinite: movies.length >= 8, 
    speed: 500,
    arrows: movies.length > 8, // Only show arrows if we have more movies than can fit
    slidesToShow: Math.min(8, movies.length || 1), 
    slidesToScroll: Math.min(4, movies.length || 1),
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: Math.min(6, movies.length || 1),
          slidesToScroll: Math.min(3, movies.length || 1),
          arrows: movies.length > 6,
          infinite: movies.length >= 6
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(5, movies.length || 1),
          slidesToScroll: Math.min(3, movies.length || 1),
          arrows: movies.length > 5,
          infinite: movies.length >= 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, movies.length || 1),
          slidesToScroll: Math.min(2, movies.length || 1),
          arrows: movies.length > 4,
          infinite: movies.length >= 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, movies.length || 1),
          slidesToScroll: Math.min(2, movies.length || 1),
          arrows: movies.length > 3,
          infinite: movies.length >= 3,
          centerMode: false,
          centerPadding: "0px"
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: Math.min(2, movies.length || 1),
          slidesToScroll: 1,
          arrows: movies.length > 2,
          infinite: movies.length >= 2,
          centerMode: false,
          centerPadding: "0px"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: movies.length > 1,
          infinite: movies.length >= 2,
          centerMode: false,
          centerPadding: "0px"
        }
      }
    ]
  };

  if (loading) return <div className="text-white px-4 py-2">Loading...</div>;
  if (error) return <div className="text-red-500 px-4 py-2">{error}</div>;
  if (!movies || movies.length === 0) return <div className="text-gray-400 px-4 py-2">No movies found.</div>;

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
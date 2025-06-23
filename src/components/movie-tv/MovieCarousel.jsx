import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieCard from "./MovieCard.jsx";
import { getPopularMovies, getTopRatedMovies, getUserFavoriteMovies, getUserWatchlistMovies, getUserFavoriteTVShows, getUserWatchlistTVShows} from "../../services/api.js";

function MovieCarousel({ type, title, fetchMovie, initialMovies }) {
  const [movies, setMovies] = useState(initialMovies || []);
  const [loading, setLoading] = useState(!initialMovies);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialMovies) {
      setMovies(initialMovies);
      setLoading(false);
      return;
    }

    // fetch movies
    const loadMovies = async () => {
      const movieType = {
        popular: getPopularMovies,
        topRated: getTopRatedMovies,
        favorites: getUserFavoriteMovies,
        watchlist: getUserWatchlistMovies,
        favoritesTv: getUserFavoriteTVShows,
        watchlistTv: getUserWatchlistTVShows,
      }

      const fetchFunction = fetchMovie || movieType[type];
      if (!fetchFunction) {
        setError(`Unknown movie type: ${type}`);
        setLoading(false);
        return;
      }

      const results = await fetchFunction();
      setMovies(results || []);
      setLoading(false);
    };
    
    loadMovies();
  }, [type, fetchMovie, initialMovies]);

  // responsive carousel setup from react-slick tailwind library
  const settings = {
    dots: true,
    infinite: movies.length >= 8,
    speed: 500,
    arrows: movies.length > 8,
    slidesToShow: Math.min(8, movies.length || 1),
    slidesToScroll: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: Math.min(6, movies.length || 1),
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(5, movies.length || 1),
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, movies.length || 1),
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

  if (loading) return <div className=" px-4 py-2">Loading...</div>;
  if (error) return <div className="text-red-500 px-4 py-2">{error}</div>;
  if (!movies || movies.length === 0) return <div className=" px-4 py-2">No movies found.</div>;

  // https://react-slick.neostack.com/docs/example/responsive
  return (
    <div className="w-full px-4">
      {title && <h2 className="text-xl font-semibold mb-4 ">{title}</h2>}
      <Slider {...settings}>
         {/* IMPORTANT: maps over `movies` array, renders a MovieCard for each `movie` */}
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Slider>
    </div>
  );
}

export default MovieCarousel;
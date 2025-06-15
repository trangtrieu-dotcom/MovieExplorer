import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieCard from "../MovieCard.jsx";
import { getPopularMovies, getTopRatedMovies } from "../../services/api";

function MovieCarousel({ type, title }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);


  useEffect(() => {
    // fetch designed API from
    const loadMovies = async () => {
      const movieType = {
        popular: getPopularMovies,
        topRated: getTopRatedMovies,
      }

      try {
        const fetchFunction = movieType[type];
        if (!fetchFunction) {
          throw new Error(`Unknown movie type: ${type}`);
        }
        const results = await fetchFunction();
        setMovies(results);
      } catch (error) {
        setError(`Failed to load ${type} movies`, error);
        console.error(`Failed to load ${type} movies: ${error.message}`);
      }  finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [type]);

  // responsive carousel setup from react-slick tailwind library
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

  // https://react-slick.neostack.com/docs/example/responsive
  return (
    <div className="w-full px-4">
      {title && <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>}
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
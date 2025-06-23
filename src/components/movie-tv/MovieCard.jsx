import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // https://developer.themoviedb.org/docs/image-basics
  // https://developer.themoviedb.org/docs/image-languages
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  // Use .title or .name (TV shows use 'name')
  const title = movie.title || movie.name;

  // Use .release_date or .first_air_date
  const releaseDate = movie.release_date || movie.first_air_date;

  // Detect type for link
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");

  // template from DaisyUI
  return (
    // link to movie details
    <Link to={`/${mediaType}/${movie.id}`} className="block">
      <div className="card bg-base-200 w-40 shadow-sm border border-base-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* image section */}
        <figure className="overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
        </figure>
        {/* car body section */}
        <div className="card-body p-3">
            {/* rating */}
            <div className="badge badge-secondary text-xs">
              Rating: {movie.vote_average?.toFixed(1)}/10
            </div>
          {/* title */}
          <h2 className="card-title text-sm line-clamp-2 min-h-[2.5rem]">
            {title}
          </h2>
          {/* release date */}
          <p className=" text-xs">
            {releaseDate ? new Date(movie.release_date).toLocaleDateString() : "Unknown release date"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
import React from "react";

const MovieCard = ({ movie }) => {
  // https://developer.themoviedb.org/docs/image-basics
  // https://developer.themoviedb.org/docs/image-languages
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  // template from DaisyUI
  return (
    <div className="card bg-base-300 w-40 shadow-sm border border-base-200 rounded-lg overflow-hidden">
      {/* image section */}
      <figure className="overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
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
        <h2 className="card-title text-white text-sm line-clamp-2 min-h-[2.5rem]">
          {movie.title}
        </h2>
        {/* release date */}
        <p className="text-gray-400 text-xs">
          {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "Unknown release date"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
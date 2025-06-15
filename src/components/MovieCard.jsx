import React from "react";

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  // template from DaisyUI
  return (
    <div className="card bg-base-300 w-40 shadow-sm border border-base-200 rounded-lg overflow-hidden">
      <figure className="overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </figure>
      <div className="card-body p-3">
          <div className="badge badge-secondary text-xs">
            Rating: {movie.vote_average?.toFixed(1)}/10
          </div>
        <h2 className="card-title text-white text-sm line-clamp-2 min-h-[2.5rem]">
          {movie.title}
        </h2>
        <p className="text-gray-400 text-xs">
          {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "Unknown release date"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
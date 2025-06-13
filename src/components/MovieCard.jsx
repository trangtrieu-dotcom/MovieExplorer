
const MovieCard = ({ movie }) => {
  // https://developer.themoviedb.org/docs/image-basics
  // https://developer.themoviedb.org/docs/image-languages
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className="card bg-base-100 w-80 shadow-sm border border-base-200">
      {/* image section */}
      <figure>
        <img
          src={imageUrl}
          alt={movie.title}
          className="object-cover h-70 w-full bg-base-150 m-4"
        />
      </figure>
      {/* car body section */}
      <div className="card-body">
        {/* rating */}
        <div className="badge badge-secondary">
          Rating: {Math.round(movie.vote_average*100)/100}
        </div>
        {/* title */}
        <h2 className="card-title text-white">
          {movie.title}
        </h2>
        {/* release date */}
        <p className="text-gray-400">
          {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "Unknown release date"}
        </p>
        {/* badge popular */}
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Popular</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
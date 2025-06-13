import React from "react";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

function MovieHero({ movie, trailerKey }) {
    const { title, poster_path, backdrop_path, release_date, vote_average, genres, runtime, original_language, status } = movie;

    const year = release_date ? new Date(release_date).getFullYear() : "";
    const genreList = genres.map((g) => g.name).join(", ");
    const rating = vote_average?.toFixed(1);

    return (
        <div className="bg-cover bg-center text-white py-10 px-4"
        style={{ backgroundImage: `url(${BACKDROP_URL + backdrop_path})` }}
        >
            <div className="bg-black/70 p-6 rounded-lg max-w-6xl mx-auto shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {title} <span className="text-grey-300">({year})</span>
                        </h1>
                        <p className="text-sm text-gray-300">
                            {genreList} • {runtime} min
                        </p>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <div>
                            <p className="text-sm text-gray-400">User Rating</p>
                            <p className="text-yellow-400 font-bold">⭐ {rating}/10</p>
                        </div>
                        <button className="btn btn-sm btn-primary">Watchlist</button>
                        <button className="btn btn-sm btn-secondary">Favorites</button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="flex flex-col lg:flex-row items-start">
                        <img src={IMG_URL + poster_path} alt={title} className="w-48 md:w-60 h-[360px] object-cover rounded-lg shadow"/>
                    </div>
                        
                        {trailerKey ? (
                            <div className="ml-10 lg:ml-16 w-[640px] h-[360px] rounded-lg overflow-hidden">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailerKey}`}
                                    title="Trailer"
                                    allowFullScreen
                                    className="w-full h-full"
                                >
                                </iframe> 
                            </div>
                            
                        ): (
                            <p className="text-gray-300 ml-6">No trailer available</p>
                        )}
                    
                </div>

                <div className="text-sm text-gray-400 mt-6">
                    <p>
                        ({original_language?.toUpperCase()} • {status})
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MovieHero;
import React from "react";
import { Link } from "react-router-dom";

const IMG_URL = "https://image.tmdb.org/t/p/w300";

function SimilarMovies({ movies }) {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="px-4 md:px-10 lg:px-24 py-8">
            <h2 className="text-2x1 font-bold mb-4">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols lg:grid-cols-5 gap-4">
                {movies.slice(0, 5).map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className="hover:scale-105 transition-transform">
                        <img src={IMG_URL + movie.poster_path} alt={movie.title} className="rounded-lg shadow w-full"/>
                        <p className="text-sm mt-2">{movie.title}</p>
                    </Link>
                ))}
                
            </div>
        </div>
    )
}

export default SimilarMovies;
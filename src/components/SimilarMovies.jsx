import React from "react";
import { Link } from "react-router-dom";

const IMG_URL = "https://image.tmdb.org/t/p/w300";

function SimilarMovies({ movies }) {
    if (!movies || movies === 0) return null;

    return (
        <div className="px-4 md:px-10 lg:px-24 py-8">
            <h2 className="text-2x1 font-bold mb-4">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid">
                <Link>
                    <img/>
                    <p className="text-sm mt-2">{movies.title}</p>
                </Link>
            </div>
        </div>
    )
}
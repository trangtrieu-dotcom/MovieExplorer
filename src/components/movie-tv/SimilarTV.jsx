import React from "react";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";

const IMG_URL = "https://image.tmdb.org/t/p/w300";

function SimilarTV({ shows }) {
    if (!shows || shows.length === 0) return null;

    return (
        <div className="px-4 md:px-10 lg:px-24 py-8">
            <h2 className="text-2x1 font-bold mb-4">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols lg:grid-cols-5 gap-4">
                {shows.slice(0, 5).map((tv) => (
                    <Link to={`/tv/${tv.id}`} key={tv.id} className="hover:scale-105 transition-transform">
                        {tv.poster_path ? (
                            <img
                                src={IMG_URL + tv.poster_path}
                                alt={tv.name}
                                className="rounded-lg shadow w-full"
                            />
                            ) : (
                            <div className="w-full aspect-[2/3] flex items-center justify-center bg-gray-800 text-gray-400 rounded-lg shadow">
                                <Film size={48} />
                            </div>
                        )}
                        <p className="text-sm mt-2">{tv.name}</p>
                    </Link>
                ))}
                
            </div>
        </div>
    )
}

export default SimilarTV;
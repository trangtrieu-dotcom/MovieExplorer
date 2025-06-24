import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const IMG_URL = "https://image.tmdb.org/t/p/w185";

export default function CastCard({ actor }) {
    const hasImage = actor.profile_path;

    return (
        <Link to={`/person/${actor.id}`} className="flex flex-col items-center text-center w-40 hover:scale-105 transition-transform">
            {hasImage ? (
                <img
                    src={IMG_URL + actor.profile_path}
                    alt={actor.name}
                    className="w-32 h-32 rounded-full object-cover mb-2"
                />
            ) : (
                <div className="w-32 h-32 rounded-full bg-base-200 flex items-center justify-center mb-2">
                    <User size={40} />
                </div>
            )}
            <p className="text-sm font-semibold">{actor.name}</p>
            <p className="text-xs">{actor.character}</p>
        </Link>
    )
}

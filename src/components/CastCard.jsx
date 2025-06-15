import React from "react";

const IMG_URL = "https://image.tmdb.org/t/p/w185";

export default function CastCard({ actor }) {
    return (
        <div className="flex flex-col items-center text-center w-40">
            <img src={actor.profile_path ? IMG_URL + actor.profile_path : "/fallback.jpg"} 
                alt={actor.name} className="w-32 h-32 rounded-full object-cover mb-2"/>
            <p className="text-sm font-semibold">{actor.name}</p>
            <p className="text-xs text-gray-400">{actor.character}</p>
        </div>
    )
}
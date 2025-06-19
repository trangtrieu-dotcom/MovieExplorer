import React from "react";
import { User } from "lucide-react";

const IMG_URL = "https://image.tmdb.org/t/p/w185";

export default function CastCard({ actor }) {
    const hasImage = actor.profile_path;

    return (
        <div className="flex flex-col items-center text-center w-40">
            {hasImage ? (
                <img
                    src={IMG_URL + actor.profile_path}
                    alt={actor.name}
                    className="w-32 h-32 rounded-full object-cover mb-2"
                />
            ) : (
                <div className="w-32 h-32 rounded-full bg-base-200 flex items-center justify-center mb-2">
                    <User size={40} className="" />
                </div>
            )}
            <p className="text-sm font-semibold">{actor.name}</p>
            <p className="text-xs ">{actor.character}</p>
        </div>
    )
}
import React from "react";
import { X } from "lucide-react";

export default function TrailerModal ({isOpen, onClose, trailerKey, title, tagline, overview, releaseDate, autoplay = false }) {
    if (!isOpen) return null;

    // autoplay if requested (upcoming movies in home page)
    const src = trailerKey
        ? `https://www.youtube.com/embed/${trailerKey}${autoplay ? '?autoplay=1' : ''}`
        : '';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-base-100 p-0 rounded-lg shadow-lg max-w-3xl w-full overflow-hidden">
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                    <h3 className="text-xl font-semibold">Trailer</h3>
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
                        <X size={18} />
                    </button>
                </div>
                <div className="aspect-video">
                    <iframe
                        src={src}
                        title="Trailer"
                        allowFullScreen
                        className="w-full h-full rounded"
                    ></iframe>
                </div>

                {/* movie info section below video (upcoming movies) */}
                <div className="bg-base-200 px-6 py-5">
                    {title && <div className="text-lg font-bold mb-1">{title}</div>}
                    {tagline && <div className="text-base mb-2">{tagline}</div>}
                    {overview && <div className="text-sm mb-2">{overview}</div>}
                    {releaseDate && (
                        <div className="text-xs mt-2">
                            Release Date: {releaseDate ? new Date(releaseDate).toLocaleDateString() : "Unknown release date"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
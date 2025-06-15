import React from "react";
import { X } from "lucide-react";

export default function TrailerModal ({isOpen, onClose, trailerKey }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-base-100 p-4 rounded-lg shadow-lg max-w-3xl w-full">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Trailer</h3>
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
                        <X size={18} />
                    </button>
                </div>
                <div className="aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="Trailer"
                        allowFullScreen
                        className="w-full h-full rounded"
                    ></iframe>
                </div>
            </div>
        </div>
    )

}
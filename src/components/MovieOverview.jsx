import react from "react";

function MovieOverview({ movie, director, topCast}) {
    return (
        <div className="px-4 md:px-10 lg:px-24 py-6">
            <div className="bg-base-200 p-6 rounded-lg shadow max-w-5x1 mx-auto">
                <h2 className="text-2x1 font-bold mb-3">Overview</h2>

                <p className="text-base-content mb-4">
                    {movie.overview || "No description available."}
                </p>

                <p className="text-sm text-gray-400 mb-1">
                    <span className="font-semibold text-base-content">Director:</span>{" "}
                    {director?.name || "Unknown"}
                </p>

                <p className="test-sm text-gray-400">
                    <span className="font-semibold text-base-content">Stars:</span>{" "}
                    {topCast && topCast.length > 0
                        ? topCast.slice(onabort, 3).map((actor) => actor.name).join(", ") : "Unknown"}
                </p>
            </div>
        </div>
        
    );
}

export default MovieOverview;
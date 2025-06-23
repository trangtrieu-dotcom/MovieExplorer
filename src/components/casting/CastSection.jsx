
import CastCard from "./CastCard";

export default function CastSection({ cast }) {

    if (!cast || cast.length === 0) return null;

    return (
        <div className="px-4 md:px-10 lg:px-24 py-8">
            <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
            <div className="relative">
                
                <div className="flex overflow-x-auto space-x-4 scrollbar-hide px-6">
                {cast.slice(0, 10).map((actor) => (
                    <CastCard key={actor.id} actor={actor} />
                ))}
                </div>

                
            </div>
        </div>
    );
}
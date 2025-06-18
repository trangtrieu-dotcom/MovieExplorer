import React, { useEffect, useState } from "react";
import { getUpcomingMovies, getMovieVideos } from "../../services/api";
import TrailerModal from "../TrailerModal";
import { Play } from "lucide-react";

// get youtube thumbnail from video key
const getYoutubeThumbnail = (key) =>
  `https://img.youtube.com/vi/${key}/hqdefault.jpg`;

export default function UpComingMovies() {
  // state management
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalTrailer, setModalTrailer] = useState(null);

  useEffect(() => {
    // fetch upcoming movies and their trailers
    const fetchTrailers = async () => {
      setLoading(true);
      setError(null);

      try {
        //  fetch all upcoming movies
        const upcomingMovies = await getUpcomingMovies();
         // some upcoming movie's release date is in the past => need filter
        const targetDate = new Date('2025-06-18');
        const filteredMovies = upcomingMovies
          .filter(movie => {
            if (!movie.release_date) return false;
            const releaseDate = new Date(movie.release_date);
            return releaseDate > targetDate; // only return movie with release date in the future
          });

        // for each movie, fetch its videos (trailers)
        const trailerPromises = filteredMovies.map(async (movie) => {
          const videos = await getMovieVideos(movie.id);
          // find yt video that is a trailer/teaser
          const trailer = videos.results?.find(
            (vid) =>
              vid.site === "YouTube" &&
              (vid.type === "Trailer" || vid.type === "Teaser")
          );
          // if found, return needed data
          if (trailer) {
            return {
              title: movie.title,
              trailerName: trailer.name,
              trailerKey: trailer.key,
              overview: movie.overview,
              poster: movie.poster_path, // for thumbnail
              releaseDate: movie.release_date
            };
          }
          return null;
        });

        // complete load all trailers
        const allTrailers = (await Promise.all(trailerPromises)).filter(Boolean);
        setTrailers(allTrailers);
      } catch (err) {
        setError("Failed to load trailers.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrailers();
  }, []);

  return (
    <div className="w-full">
      {/* loading/error state */}
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : error ? (
        <div className="text-center text-error">{error}</div>
      ) : (
        // success state
        <div className="flex gap-6 overflow-x-auto pb-2 justify-center mx-auto" style={{ maxWidth: '100%' }}>
          {trailers.map((trailer, idx) => (
            <div
              key={trailer.trailerKey + idx}
              className="bg-base-200 rounded-lg shadow w-72 flex-shrink-0 relative group cursor-pointer"
              onClick={() => setModalTrailer(trailer)}
            >

              {/* thumbnail with play icon */}
              <div className="relative">
                <img
                  src={trailer.poster ? `https://image.tmdb.org/t/p/w500${trailer.poster}` : getYoutubeThumbnail(trailer.trailerKey)}
                  alt={trailer.title}
                  className="w-full h-44 object-cover rounded-t-lg"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"
                >
                  <Play size={48} className="text-white" />
                </div>
              </div>

              {/* trailer info */}
              <div className="p-3">
                <div className="font-bold text-white leading-tight truncate">
                  {trailer.title}
                </div>
                <div className="text-xs text-gray-300 truncate">
                  {trailer.trailerName}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {trailer.releaseDate ? new Date(trailer.releaseDate).toLocaleDateString() : "Unknown release date"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* popup modal for trailer */}
      <TrailerModal
        isOpen={!!modalTrailer}
        onClose={() => setModalTrailer(null)}
        trailerKey={modalTrailer?.trailerKey}
        title={modalTrailer?.title}
        tagline={modalTrailer?.trailerName}
        overview={modalTrailer?.overview}
        releaseDate={modalTrailer?.releaseDate}
        autoplay={true}
      />
    </div>
  );
}

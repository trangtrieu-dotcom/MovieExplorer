import React, { useState, useEffect } from "react";
import { Star, Heart, Bookmark, Film} from "lucide-react";
import TrailerModal from "./TrailerModal";
import AlertModal from "../alert/AlertModal";
import { addToFavorites, addToWatchlist, getUserFavoriteMovies, getUserWatchlistMovies } from "../../services/api";
import { authService } from "../../services/auth";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

function MovieHero({ movie, trailerKey }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // alert modal state
    const [alertModal, setAlertModal] = useState({
        isOpen: false,
        message: ""
    });

    const { title, poster_path, backdrop_path, release_date, vote_average, genres, runtime, original_language, status } = movie;

    const year = release_date ? new Date(release_date).getFullYear() : "";
    const genreList = genres.map((g) => g.name).join(", ");
    const rating = vote_average?.toFixed(1);

    useEffect(() => {
        const checkStatus = async () => {
            if (!authService.isAuthenticated()) return;
            
            try {
                // Get user's favorites and watchlist
                const favorites = await getUserFavoriteMovies();
                const watchlist = await getUserWatchlistMovies();
                
                // Check if the current movie is in the user's favorites/watchlist
                setIsFavorite(favorites.some(fav => fav.id === movie.id));
                setIsInWatchlist(watchlist.some(watch => watch.id === movie.id));
            } catch (error) {
                // If the API fails, just keep buttons as false (not favorite/watchlist)
                setIsFavorite(false);
                setIsInWatchlist(false);
            }
        };
        
        checkStatus();
    }, [movie.id]);

    const showAlert = (message) => {
        setAlertModal({
            isOpen: true,
            message: message
        });
    };

    const closeAlert = () => {
        setAlertModal({
            isOpen: false,
            message: ""
        });
    };

    // Toggle favorite button
    const handleFavoriteToggle = async () => {
        if (!authService.isAuthenticated()) {
            showAlert("Please log in to add to favorites");
            return;
        }
        
        setLoading(true);
        
        try {
            // Try to add to favorites
            await addToFavorites(movie.id, !isFavorite);
            // If it's successful, update the state
            setIsFavorite(!isFavorite);
        } catch (error) {
            showAlert("Failed to update favorites. Please try again.");
        }
        
        setLoading(false);
    };

    // Toggle watchlist button
    const handleWatchlistToggle = async () => {
        if (!authService.isAuthenticated()) {
            showAlert("Please log in to add to watchlist");
            return;
        }
        
        setLoading(true);
        
        try {
            // Try to add to watchlist
            await addToWatchlist(movie.id, !isInWatchlist);
            // If it's successful, update the state
            setIsInWatchlist(!isInWatchlist);
        } catch (error) {
            showAlert("Failed to update watchlist. Please try again.");
        }
        
        setLoading(false);
    };

    return (
        <div className="bg-cover bg-center py-10 px-4"
        style={{ backgroundImage: `url(${BACKDROP_URL + backdrop_path})` }}
        >
            <div className="bg-black/70 p-6 rounded-lg max-w-6xl mx-auto shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {title} <span className="text-grey-300">({year})</span>
                        </h1>
                        <p className="text-sm ">
                            {genreList} • {runtime} min
                        </p>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <div>
                            <p className="text-sm ">User Rating</p>
                            <p className="flex items-center text-yellow-400 font-bold"><Star className="fill-yellow-400 mr-1" size={18}/>  {rating}/10</p>
                        </div>
                        <button 
                            className={`btn btn-sm ${isInWatchlist ? 'btn-warning' : 'btn-primary'}`}
                            onClick={handleWatchlistToggle}
                            disabled={loading}
                        >
                            <Bookmark size={16} />
                            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        </button>
                        <button 
                            className={`btn btn-sm ${isFavorite ? 'btn-error' : 'btn-secondary'}`}
                            onClick={handleFavoriteToggle}
                            disabled={loading}
                        >
                            <Heart size={16} />
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="flex flex-col lg:flex-row items-start">
                        {poster_path ? (
                            <img src={IMG_URL + poster_path} alt={title} className="w-48 md:w-60 h-[360px] object-cover rounded-lg shadow"/> 
                            ):(
                            <div className="w-48 md:w-60 h-[360px] flex items-center justify-center bg-gray-800 text-gray-400 rounded-lg shadow">
                                <Film />
                            </div>
                            )
                        }
                    </div>
                        
                        {trailerKey ? (
                            <div className="ml-10 lg:ml-16 w-[640px] h-[360px] rounded-lg overflow-hidden relative group"
                                style={{
                                backgroundImage: `url(https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}>
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 flex items-center justify-center">
                                    <button
                                        className="btn btn-accent"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Watch Trailer
                                    </button>
                                </div>
                                
                            </div>
                            
                        ): (
                            <p className=" ml-6">No trailer available</p>
                        )}
                    
                </div>

                <div className="text-sm  mt-6">
                    <p>
                        ({original_language?.toUpperCase()} • {status})
                    </p>
                </div>

                <TrailerModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    trailerKey={trailerKey}
                />

                <AlertModal
                    isOpen={alertModal.isOpen}
                    onClose={closeAlert}
                    message={alertModal.message}
                />
            </div>
        </div>
    );
}

export default MovieHero;
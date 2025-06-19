import React from 'react';
import MovieCarousel from '../components/home/MovieCarousel';
import { authService } from '../services/auth';

const Favorite = () => {
    if (!authService.isAuthenticated()) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-red-500 text-xl">Please log in to view your favorites and watchlist.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 pb-8">
            <div className="px-8">
                <h2 className="text-xl font-semibold mt-12 mb-6">Your Favorites</h2>
                <MovieCarousel type="favorites" />

                <h2 className="text-xl font-semibold mt-12 mb-6">Your Watchlist</h2>
                <MovieCarousel type="watchlist" />

                <h2 className="text-xl font-semibold mt-12 mb-6">Your Favorite TV Shows</h2>
                <MovieCarousel type="favoritesTv" />

                <h2 className="text-xl font-semibold mt-12 mb-6">Your TV Show Watchlist</h2>
                <MovieCarousel type="watchlistTv" />
            </div>
        </div>
    );
};

export default Favorite; 
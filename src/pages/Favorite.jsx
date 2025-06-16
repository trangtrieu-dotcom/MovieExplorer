import React from 'react';
import FavoriteCarousel from '../components/FavoriteCarousel';
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
                <h2 className="text-xl font-semibold text-white mt-12 mb-6">Your Favorites</h2>
                <FavoriteCarousel type="favorites" />

                <h2 className="text-xl font-semibold text-white mt-12 mb-6">Your Watchlist</h2>
                <FavoriteCarousel type="watchlist" />
            </div>
        </div>
    );
};

export default Favorite; 
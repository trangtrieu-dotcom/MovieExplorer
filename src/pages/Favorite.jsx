import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getUserFavoriteMovies, getUserWatchlistMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { authService } from '../services/auth';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carousel settings same as MovieCarousel TODO: MOVE IT TO MOVIE CAROUSEL OR IMPLEMENT MOVIE CAROUSEL IN THIS PAGE
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 8,
        slidesToScroll: 4,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2,
                    centerMode: true,
                    centerPadding: "20px"
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "20px"
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "16px"
                }
            }
        ]
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!authService.isAuthenticated()) {
                setLoading(false);
                return;
            }

            try {
                const [favoritesData, watchlistData] = await Promise.all([
                    getUserFavoriteMovies(),
                    getUserWatchlistMovies()
                ]);

                setFavorites(favoritesData || []);
                setWatchlist(watchlistData || []);
            } catch (error) {
                // Handle error silently
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!authService.isAuthenticated()) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-red-500 text-xl">Please log in to view your favorites and watchlist.</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 pb-8">
            <div className="px-8">
                {/* Favorites Section */}
                <h2 className="text-xl font-semibold text-white mt-12 mb-6">Your Favorites</h2>
                {favorites.length === 0 ? (
                    <div className="text-gray-400 px-4 py-2">No favorite movies yet.</div>
                ) : (
                    <div className="w-full px-4">
                        {favorites.length <= 4 ? (
                            <div className="flex gap-4">
                                {favorites.map((movie) => (
                                    <MovieCard movie={movie} key={movie.id} />
                                ))}
                            </div>
                        ) : (
                            <Slider {...{...settings, slidesToShow: Math.min(settings.slidesToShow, favorites.length)}}>
                                {favorites.map((movie) => (
                                    <MovieCard movie={movie} key={movie.id} />
                                ))}
                            </Slider>
                        )}
                    </div>
                )}

                {/* Watchlist Section */}
                <h2 className="text-xl font-semibold text-white mt-12 mb-6">Your Watchlist</h2>
                {watchlist.length === 0 ? (
                    <div className="text-gray-400 px-4 py-2">No movies in watchlist yet.</div>
                ) : (
                    <div className="w-full px-4">
                        {watchlist.length <= 4 ? (
                            <div className="flex gap-4">
                                {watchlist.map((movie) => (
                                    <MovieCard movie={movie} key={movie.id} />
                                ))}
                            </div>
                        ) : (
                            <Slider {...{...settings, slidesToShow: Math.min(settings.slidesToShow, watchlist.length)}}>
                                {watchlist.map((movie) => (
                                    <MovieCard movie={movie} key={movie.id} />
                                ))}
                            </Slider>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorite; 
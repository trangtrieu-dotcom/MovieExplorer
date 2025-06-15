import React, { useEffect, useState } from 'react';
import { getUserFavorites, getUserWatchlist, getRecommendationsByGenre } from '../services/api';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

// function to get most-watched genre from localStorage (since we don't have a database)
function getMostWatchedGenre() {
    const genreCounts = JSON.parse(localStorage.getItem('genreCounts')) || {};
    let max = 0;
    let maxGenre = null;
    for (const [genre, count] of Object.entries(genreCounts)) {
        if (count > max) {
            max = count;
            maxGenre = genre;
        }
    }
    return maxGenre;
}

// function to increment genre count 
function incrementGenreCount(genreCounts, genreId) {
    return {
        ...genreCounts,
        [genreId]: (genreCounts[genreId] || 0) + 1,
    };
}

const FavoriteWatchlistRecommendations = () => {
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const favs = await getUserFavorites();
            setFavorites(favs.slice(0, 4));
            const watch = await getUserWatchlist();
            setWatchlist(watch.slice(0, 3));
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const genre = getMostWatchedGenre() || 28; // default to Action
            const recs = await getRecommendationsByGenre(genre);
            setRecommendations(recs.slice(0, 4));
        };
        fetchRecommendations();
    }, [watchlist]);

    const handleMarkAsWatched = (movie) => {
        let genreCounts = JSON.parse(localStorage.getItem('genreCounts')) || {};
        (movie.genre_ids || []).forEach((id) => {
            genreCounts = incrementGenreCount(genreCounts, id);
        });
        localStorage.setItem('genreCounts', JSON.stringify(genreCounts));
        setWatchlist(watchlist.filter((item) => item.id !== movie.id));
    };

    return (
        <div>
            {/* Favorites Section */}
            <section>
                <h2>Your Favorites</h2>
                <div>
                    {favorites.length === 0 ? (
                        <div>No favorites yet.</div>
                    ) : (
                        favorites.map((fav) => (
                            <div key={fav.id}>
                                {fav.poster_path ? (
                                    <img src={`${IMAGE_BASE_URL}${fav.poster_path}`} alt={fav.title} />
                                ) : (
                                    <div>No Image</div>
                                )}
                                <div>Rating: {fav.vote_average}/10</div>
                                <div>{fav.title}</div>
                                <button>Remove from Favorites</button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Watchlist Section */}
            <section>
                <h2>Your Watchlist</h2>
                <div>
                    {watchlist.length === 0 ? (
                        <div>No movies in watchlist.</div>
                    ) : (
                        watchlist.map((item) => (
                            <div key={item.id}>
                                {item.poster_path ? (
                                    <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title} />
                                ) : (
                                    <div>No Image</div>
                                )}
                                <div>{item.title}</div>
                                <button onClick={() => handleMarkAsWatched(item)}>Mark as Watched</button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Recommendations Section */}
            <section>
                <h2>Movie Suggestions For You</h2>
                <div>
                    {recommendations.length === 0 ? (
                        <div>No recommendations found.</div>
                    ) : (
                        recommendations.map((rec) => (
                            <div key={rec.id}>
                                {rec.poster_path ? (
                                    <img src={`${IMAGE_BASE_URL}${rec.poster_path}`} alt={rec.title} />
                                ) : (
                                    <div>No Image</div>
                                )}
                                <div>Rating: {rec.vote_average}/10</div>
                                <div>{rec.title}</div>
                                <div>{rec.release_date}</div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default FavoriteWatchlistRecommendations; 
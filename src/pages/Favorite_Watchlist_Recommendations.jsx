import React, { useEffect, useState } from 'react';

const API_KEY = 'c9f30a7b1101b3b3521afa24010174f3';

// Create a function to get the most-watched genre from localStorage (since we don't have a database)
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

// Examples test (create 2 just to test if it's working, will erase this part later)
const FavoriteWatchlistRecommendations = () => {
    const [favorites, setFavorites] = useState([
        { id: 101, title: 'Inception', genre_ids: [28, 878] },
        { id: 102, title: 'Interstellar', genre_ids: [12, 18, 878] },
    ]);

    const [watchlist, setWatchlist] = useState([
        { id: 201, title: 'Jumanji', genre_ids: [12, 35] },
        { id: 202, title: 'The Matrix', genre_ids: [28, 878] },
    ]);

    const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
        const fetchRecommendations = async () => {
        const genre = getMostWatchedGenre() || 28; // default to Action
        try {
            const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`
            );
            const data = await res.json();
            setRecommendations(data.results.slice(0, 4)); // take first 4 results
        } catch (err) {
            console.error("Failed to fetch recommendations", err);
            setRecommendations([]);
        }
        };

    fetchRecommendations();
  }, [watchlist]);

    const handleMarkAsWatched = (movie) => {
        let genreCounts = JSON.parse(localStorage.getItem('genreCounts')) || {};

        movie.genre_ids.forEach((id) => {
        genreCounts = incrementGenreCount(genreCounts, id);
    });

    localStorage.setItem('genreCounts', JSON.stringify(genreCounts));

    // Remove from watchlist
        setWatchlist(watchlist.filter((item) => item.id !== movie.id));
    };

    // TODO: ADD FAVORITES
    // TODO: ADD RECOMMENDATIONS
    // TODO: ADD WATCHLIST
};
export default FavoriteWatchlistRecommendations; 
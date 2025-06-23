import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 
import MovieHero from "../components/movie-tv/MovieHero";
import MovieOverview from "../components/movie-tv/MovieOverview";
import CastSection from "../components/casting/CastSection";
import SimilarMovies from "../components/movie-tv/SimilarMovies";
import { getMovieDetails, getMovieCredits, getMovieVideos, getSimilarMovies } from "../services/api";



function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch movie details
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        // fetch credits
        const creditsData = await getMovieCredits(id);
        setCredits(creditsData);

        // fetch trailer
        const videosData = await getMovieVideos(id);
        const trailer = videosData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer?.key);

        // fetch simlar movies
        const similarData = await getSimilarMovies(id);
        setSimilarMovies(similarData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie || !credits) return <div className="text-center mt-10">Loading...</div>;

  const director = credits.crew.find((person) => person.job === "Director");
  const topCast = credits.cast.slice(0, 10);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <MovieHero movie={movie} trailerKey={trailerKey} />
      <MovieOverview movie={movie} director={director} topCast={topCast} />
      <CastSection cast={topCast} />
      <SimilarMovies movies={similarMovies} />
      
    </div>
  );
}

export default MovieDetails;
import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 
import MovieHero from "../components/MovieHero";
import MovieOverview from "../components/MovieOverview";
import CastSection from "../components/CastSection";
import SimilarMovies from "../components/SimilarMovies";

const API_KEY = "c9f30a7b1101b3b3521afa24010174f3";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, creditsRes, videosRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`),
        ]);

        setMovie(movieRes.data);
        setCredits(creditsRes.data);
        

        const trailer = videosRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer?.key);

        const similarRes = await axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
        setSimilarMovies(similarRes.data.results);


      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie || !credits) return <div className="text-center text-white mt-10">Loading...</div>;

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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TVHero from "../components/movie-tv/TVHero";
import MovieOverview from "../components/movie-tv/MovieOverview";
import CastSection from "../components/casting/CastSection";
import { getTVDetails, getTVCredits, getTVVideos, getSimilarTVShows } from "../services/api";
import SimilarTV from "../components/movie-tv/SimilarTV";


function TVDetails() {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [similarTVShows, setSimilarTV] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvData = await getTVDetails(id);
        setTVShow(tvData);

        const creditsData = await getTVCredits(id);
        setCredits(creditsData);

        const videosData = await getTVVideos(id);
        const trailer = videosData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer?.key);

        const similarData = await getSimilarTVShows(id);
        setSimilarTV(similarData);
      } catch (error) {
        console.error("Error fetching TV show data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!tvShow || !credits) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const director = credits.crew.find((person) => person.job === "Director");
  const topCast = credits.cast.slice(0, 10);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <TVHero tv={tvShow} trailerKey={trailerKey} />
      <MovieOverview movie={tvShow} director={director} topCast={topCast} />
      <CastSection cast={topCast} />
      <SimilarTV shows={similarTVShows} />
    </div>
  );
}

export default TVDetails;

import { useEffect, useState } from "react";
import MediaCard from "../MediaCard";

const SimilarTVShows = ({ tvShowId }) => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      const res = await fetch(
        `https://netflix-gpt-backend-6ayv.onrender.com/api/tv/${tvShowId}/similar`
      );
      const json = await res.json();
      setTvShows(json.results || []);
    };

    fetchSimilar();
  }, [tvShowId]);

  if (!tvShows.length) return null;

  return (
    <div className="relative z-30 px-4 sm:px-6 md:px-12 mt-12 sm:mt-16">
      
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
        Similar TV Shows
      </h2>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-4">
        {tvShows.map(tvShow => (
          <MediaCard
            key={tvShow.id}
            id={tvShow.id}
            posterPath={tvShow.poster_path}
            type="tv"
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarTVShows;

import { useEffect, useState } from "react";
import useFanartLogo from "../hooks/useFanartLogo";

const MovieInfo = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  const { logo } = useFanartLogo(movieId); // 🎬 FANART LOGO

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://netflix-gpt-backend-6ayv.onrender.com/api/movies/${movieId}/details`
      );
      const json = await res.json();
      setMovie(json);
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className="relative z-30 px-4 sm:px-6 md:px-12 -mt-24 sm:-mt-32 md:-mt-40 max-w-5xl">
      {/* 🎥 MOVIE LOGO */}
      {logo ? (
        <img src={logo} alt={movie.title}
          className="max-w-[180px] sm:max-w-[220px] md:max-w-[320px] mb-4 drop-shadow-xl"/>
      ) : (
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3">
          {movie.title}
        </h1>
      )}

      {/* ⭐ META INFO */}
      <p className="text-xs sm:text-sm text-zinc-100 my-3">
        ⭐ {movie.vote_average.toFixed(1)} • {movie.release_date}
      </p>

      {/* 📝 OVERVIEW (HIDDEN ON SMALL SCREENS) */}
      <p
        className="hidden sm:block text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3 md:line-clamp-4 max-w-[60ch] md:max-w-[70ch] mb-6">
        {movie.overview}
      </p>

      {/* ❤️ WATCHLIST BUTTON */}
      <button
        className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold cursor-pointer">
        🤍 Add to Watchlist
      </button>
    </div>
  );
};

export default MovieInfo;

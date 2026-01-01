import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PLAY } from "../../assets/constants";
import useMediaLogo from "../../hooks/useMediaLogo";

const TVShowInfo = ({ tvshowId }) => {
  const [tvshow, setTVShow] = useState(null);

  // 🎬 FANART LOGO (TV)
  const { logo } = useMediaLogo(tvshowId, "tv");

  useEffect(() => {
    if (!tvshowId) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://netflix-gpt-backend-6ayv.onrender.com/api/tv/${tvshowId}/details`
        );
        const json = await res.json();
        setTVShow(json);
      } catch (err) {
        console.error("TV Details fetch failed:", err);
      }
    };

    fetchDetails();
  }, [tvshowId]);

  if (!tvshow) return null;

  return (
    <div className="relative z-30 px-4 sm:px-6 md:px-12 max-w-5xl">
      
      {/* 🎥 TV SHOW LOGO / TITLE */}
      {logo ? (
        <img
          src={logo}
          alt={tvshow.name}
          className="max-w-[180px] sm:max-w-[220px] md:max-w-[320px] mb-8 drop-shadow-xl"
        />
      ) : (
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 text-white">
          {tvshow.name}
        </h1>
      )}

      {/* ⭐ META INFO */}
      <p className="text-xs sm:text-sm text-zinc-100 my-3">
        ⭐ {tvshow.vote_average?.toFixed(1)} •{" "}
        {tvshow.first_air_date}
        {tvshow.number_of_seasons
          ? ` • ${tvshow.number_of_seasons} Season${tvshow.number_of_seasons > 1 ? "s" : ""}`
          : ""}
      </p>

      {/* 📝 OVERVIEW */}
      <p
        className="
          hidden sm:block text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3 md:line-clamp-4 max-w-[60ch] md:max-w-[70ch] mb-6">
        {tvshow.overview}
      </p>
        <div className="flex gap-4 mt-6">
          <Link to={`/player/tv/${tvshowId}`}>
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 cursor-pointer rounded-md font-semibold hover:bg-gray-200 transition">
              <img src={PLAY} className="w-6" />
              Play
            </button>
          </Link>
      {/* ❤️ WATCHLIST */}
      <button
        className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold cursor-pointer">
        🤍 Add to Watchlist
      </button>
        </div>

    </div>
  );
};

export default TVShowInfo;

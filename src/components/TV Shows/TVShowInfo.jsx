import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PLAY } from "../../assets/constants";
import useMediaLogo from "../../hooks/useMediaLogo";

const TVShowInfo = ({ tvshowId }) => {
  const tvshow = useSelector(
    (store) => store.tvShows.detailsTV[tvshowId]
  );

  const { logo } = useMediaLogo(tvshowId, "tv");

  if (!tvshow) return null;

  return (
    <div className="relative z-30 px-4 sm:px-6 md:px-12 max-w-5xl">
      {logo ? (
        <img
          src={logo}
          alt={tvshow.name}
          className="max-w-[180px] sm:max-w-[220px] md:max-w-[320px] mb-8 drop-shadow-xl"
        />
      ) : (
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8">
          {tvshow.name}
        </h1>
      )}

      <p className="text-xs sm:text-sm text-zinc-100 my-3 flex flex-wrap items-center gap-x-3 gap-y-1">
  <span className="flex items-center gap-1">
    ⭐ {tvshow.vote_average?.toFixed(1)}
  </span>

  <span className="opacity-70">•</span>

  <span>{tvshow.first_air_date}</span>

  <span className="opacity-70">•</span>

  <span>
    {tvshow.number_of_seasons} Season
    {tvshow.number_of_seasons > 1 ? "s" : ""}
  </span>
</p>

      <p className="hidden sm:block text-sm sm:text-base text-gray-300 line-clamp-3 max-w-[65ch] mb-6">
        {tvshow.overview}
      </p>

      <div className="flex gap-4 mt-6">
        <Link to={`/player/tv/${tvshowId}/1/1`}>
          <button className="flex items-center gap-2 bg-white text-black px-6 py-3 cursor-pointer rounded-md font-semibold hover:bg-gray-200 transition">
            <img src={PLAY} className="w-6" />
            Play
          </button>
        </Link>

        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 cursor-pointer rounded-lg font-semibold">
          🤍 Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default TVShowInfo;



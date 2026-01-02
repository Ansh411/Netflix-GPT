import { useEffect, useState } from "react";

const MetaInfoTV = ({ tvShowId }) => {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchMeta = async () => {
      const res = await fetch(
        `https://netflix-gpt-backend-6ayv.onrender.com/api/tv/${tvShowId}/meta`
      );
      const json = await res.json();
      setMeta(json);
    };

    fetchMeta();
  }, [tvShowId]);

  if (!meta) return null;

  const { episode_runtime, first_air_date, last_air_date, seasons, episodes, vote_average, adult, genres } = meta;

  return (
    <div className="relative z-30 px-4 sm:px-6 md:px-12 mt-6">
      {/* MAIN META ROW */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-300">

        {/* ⭐ RATING */}
        <span className="flex items-center gap-1 font-medium text-white">
          ⭐ {vote_average?.toFixed(1)}
        </span>

        <span className="text-gray-500">•</span>

        {/* 📺 SEASONS */}
        <span>
          {seasons} Season{seasons > 1 ? "s" : ""}
        </span>

        <span className="text-gray-500">•</span>

        {/* 🎞 EPISODES */}
        <span>{episodes} Episodes</span>

        <span className="text-gray-500">•</span>

        {/* ⏱ EP RUNTIME */}
        {episode_runtime && (
          <span>{episode_runtime} min / ep</span>
        )}

        {episode_runtime && (<span className="text-gray-500">•</span>)}

        {/* 📅 AIR DATES */}
        <span>
          {first_air_date}{" "}
          {last_air_date ? `– ${last_air_date}` : ""}
        </span>

        {/* 🔞 CERTIFICATION */}
        <span className="ml-2 px-2 py-0.5 border border-white/30 rounded text-[11px] text-white">
          {adult ? "18+" : "U/A"}
        </span>
      </div>

      {/* GENRES */}
      <div className="mt-4 flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre}
            className="px-3 py-1 rounded-full cursor-pointer bg-white/10 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-gray-200 hover:bg-white/20 transition"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MetaInfoTV;

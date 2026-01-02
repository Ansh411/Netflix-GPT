import { useEffect, useState } from "react";

const MetaInfoRow = ({ movieId }) => {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchMeta = async () => {
      const res = await fetch(
        `https://netflix-gpt-backend-6ayv.onrender.com/api/movies/${movieId}/meta`
      );
      const json = await res.json();
      setMeta(json);
    };

    fetchMeta();
  }, [movieId]);

  if (!meta) return null;

  const runtime = meta.runtime
    ? `${Math.floor(meta.runtime / 60)}h ${meta.runtime % 60}m`
    : "—";

  return (
    <div className="relative z-30 px-4 sm:px-6 md:px-12 mt-6 flex flex-wrap gap-3 text-xs sm:text-sm text-gray-300">
      <span className="px-3 py-1 bg-zinc-800 rounded-full">
        ⏱ {runtime}
      </span>

      {meta.genres.map((genre) => (
        <span
          key={genre}
          className="px-3 py-1 rounded-full cursor-pointer bg-white/10 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-gray-200 hover:bg-white/20 transition"
        >
          {genre}
        </span>
      ))}

      <span className="px-3 py-1 rounded-full cursor-pointer bg-white/10 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-gray-200 hover:bg-white/20 transition">
        {meta.adult ? "18+" : "PG-13"}
      </span>

      <span className="px-3 py-1 rounded-full cursor-pointer bg-white/10 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-gray-200 hover:bg-white/20 transition">
        ⭐ {meta.vote_average?.toFixed(1)}
      </span>
    </div>
  );
};

export default MetaInfoRow;

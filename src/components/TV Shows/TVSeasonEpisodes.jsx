import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../../assets/constants";
import { useNavigate } from "react-router-dom";

import { BACKEND_API } from "../../assets/constants";

const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png";

const TVSeasonEpisodes = ({ tvShowId, totalSeasons }) => {
  const [season, setSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tvShowId) return;

    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BACKEND_API}/api/tv/${tvShowId}/season/${season}`
        );
        const json = await res.json();
        setEpisodes(json.episodes || []);
      } catch (err) {
        console.error("Episodes fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [tvShowId, season]);

  return (
    <div className="px-4 sm:px-6 md:px-12 mt-12">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Episodes</h2>

        {/* SEASON SELECT */}
        <select
          value={season}
          onChange={(e) => setSeason(Number(e.target.value))}
          className="bg-zinc-900 text-white px-3 py-2 rounded-md cursor-pointer text-sm outline-none"
        >
          {Array.from({ length: totalSeasons }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Season {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* EPISODES LIST */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading episodes...</p>
      ) : (
        <div className="flex flex-col gap-6">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              onClick={() => navigate(`/player/tv/${tvShowId}/${season}/${ep.episode_number}`)}
              className="flex gap-4 items-start hover:bg-white/5 p-3 cursor-pointer rounded-lg transition"
            >
              {/* THUMBNAIL */}
              <img
                src={ep.still_path ? IMG_CDN_URL + ep.still_path : FALLBACK_IMAGE}
                alt={ep.name}
                className="w-40 sm:w-[200px] aspect-video object-contain rounded-md"
              />

              {/* INFO */}
              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold">
                  {ep.episode_number}. {ep.name}
                </p>

                <p className="text-xs text-gray-400 my-1">
                  {ep.runtime ? `${ep.runtime} min` : "—"}
                </p>

                <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 max-w-[90ch]">
                  {ep.overview || "No description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TVSeasonEpisodes;

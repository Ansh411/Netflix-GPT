import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../../assets/constants";

const FALLBACK_IMG = "https://i.im.ge/2025/12/31/BKwwSz.istockphoto-1055079680-612x612.jpeg";

const CastCarouselTV = ({ tvShowId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const res = await fetch(
        `https://netflix-gpt-backend-6ayv.onrender.com/api/tv/${tvShowId}/credits`
      );
      const json = await res.json();
      setCast(json.cast || []);
    };

    fetchCast();
  }, [tvShowId]);

  if (!cast.length) return null;

  return (
    <div className="relative z-30 px-4 sm:px-6 md:px-12 mt-14">
      <h2 className="text-lg sm:text-xl font-semibold mb-5">
        Cast & Crew
      </h2>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {cast.slice(0, 15).map((person) => (
          <div
            key={person.id}
            className="shrink-0 w-[110px] sm:w-[130px]">
            {/* IMAGE WRAPPER (important) */}
            <div className="w-full h-40 sm:h-[190px] overflow-hidden rounded-lg">
              <img
                loading="lazy"
                src={person.profile_path ? IMG_CDN_URL + person.profile_path : FALLBACK_IMG}
                alt={person.name}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"/>
            </div>

            <p className="mt-2 text-xs sm:text-sm font-medium truncate">
              {person.name}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 truncate">
              {person.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastCarouselTV;

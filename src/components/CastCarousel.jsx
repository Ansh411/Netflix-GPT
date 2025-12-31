import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../assets/constants";

const CastCarousel = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const res = await fetch(
        `https://netflix-gpt-backend-6ayv.onrender.com/api/movies/${movieId}/credits`
      );
      const json = await res.json();
      setCast(json.cast || []);
    };

    fetchCast();
  }, [movieId]);

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
            className="min-w-[110px] sm:min-w-[130px]"
          >
            <img
              loading="lazy"
              src={person.profile_path ? IMG_CDN_URL + person.profile_path : "https://i.im.ge/2025/12/31/BKwwSz.istockphoto-1055079680-612x612.jpeg"}
              alt={person.name}
              className="w-full h-40 sm:h-[190px] object-cover rounded-lg mb-2 cursor-pointer transition duration-300 hover:scale-105"
            />

            <p className="text-xs sm:text-sm font-medium truncate">
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

export default CastCarousel;

// https://i.ibb.co/LzNm8D37/images.png
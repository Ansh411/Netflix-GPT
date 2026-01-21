import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IMG_CDN_URL } from "../../assets/constants";

const FALLBACK_IMG = "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk="

const CastCarouselTV = ({ tvShowId }) => {
  const [cast, setCast] = useState([]);
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [hover, setHover] = useState(false);

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

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "right" ? 500 : -500,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="relative z-30 px-4 sm:px-6 md:px-12 mt-14 group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-5">Cast & Crew</h2>

      {showLeft && hover && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-xl cursor-pointer
          h-14 w-10 bg-black/10 hover:bg-black/30 text-white flex items-center justify-center"
        >
          <FaChevronLeft size={22} />
        </button>
      )}

      {hover && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-xl cursor-pointer
          h-14 w-10 bg-black/10 hover:bg-black/30 text-white flex items-center justify-center"
        >
          <FaChevronRight size={22} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={() => setShowLeft(scrollRef.current.scrollLeft > 0)}
        className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth"
      >
        {cast.slice(0, 15).map((person) => (
          <div key={person.id} className="shrink-0 w-[110px] sm:w-[130px]">
            <div className="w-full h-40 sm:h-[190px] overflow-hidden rounded-lg">
              <img
                src={
                  person.profile_path
                    ? IMG_CDN_URL + person.profile_path
                    : FALLBACK_IMG
                }
                alt={person.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
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

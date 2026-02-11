import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MediaCard from "../MediaCard";
import { BACKEND_API } from "../../assets/constants";

const SimilarTVShows = ({ tvShowId }) => {
  const [tvShows, setTvShows] = useState([]);
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fetchSimilar = async () => {
      const res = await fetch(
        `${BACKEND_API}/api/tv/${tvShowId}/similar`
      );
      const json = await res.json();
      setTvShows(json.results || []);
    };
    fetchSimilar();
  }, [tvShowId]);

  if (!tvShows.length) return null;

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "right" ? 900 : -900,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="relative z-30 px-4 sm:px-6 md:px-12 mt-16 group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
        Similar TV Shows
      </h2>

      {showLeft && hover && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-xl cursor-pointer
          h-14 w-10 bg-black/10 hover:bg-black/30 text-white flex items-center justify-center"
        >
          <FaChevronLeft size={24} />
        </button>
      )}

      {hover && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-xl cursor-pointer
          h-14 w-10 bg-black/10 hover:bg-black/30 text-white flex items-center justify-center"
        >
          <FaChevronRight size={24} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={() => setShowLeft(scrollRef.current.scrollLeft > 0)}
        className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth pb-4"
      >
        {tvShows.map((tv) => (
          <MediaCard
            key={tv.id}
            id={tv.id}
            posterPath={tv.poster_path}
            type="tv"
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarTVShows;

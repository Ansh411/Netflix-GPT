import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MediaCard from "./MediaCard";

const MediaList = ({ title, items, type }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [isHover, setIsHover] = useState(false);

  if (!items?.length) return null;

  const scroll = (direction) => {
    const scrollAmount = window.innerWidth < 768 ? 400 : 900;
    scrollRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    setShowLeft(scrollRef.current.scrollLeft > 0);
  };

  return (
    <div
      className="relative px-6 md:px-12 py-6 group"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* TITLE */}
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
        {title}
      </h2>

      {/* LEFT ARROW */}
      {showLeft && isHover && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20
          h-14 w-10 bg-black/60 hover:bg-black/80 text-white cursor-pointer
          flex items-center justify-center transition-opacity duration-300"
        >
          <FaChevronLeft size={26} />
        </button>
      )}

      {/* RIGHT ARROW */}
      {isHover && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20
          h-14 w-10 bg-black/60 hover:bg-black/80 text-white cursor-pointer
          flex items-center justify-center transition-opacity duration-300"
        >
          <FaChevronRight size={26} />
        </button>
      )}

      {/* GRADIENT FADE (LEFT & RIGHT) */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-black to-transparent z-10" />

      {/* MEDIA ROW */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth"
      >
        {items.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            posterPath={item.poster_path}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaList;

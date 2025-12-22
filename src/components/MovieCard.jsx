import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../assets/constants";

const MovieCard = ({ posterPath }) => {
  const showGPTSearch = useSelector(store => store.GPT.showGPTSearch);

  if (!posterPath) return null;

  return (
    <>
      {showGPTSearch ? (
        /* 🔍 GPT SEARCH PAGE CARD */
        <div className="w-[140px] sm:w-40 md:w-[180px] lg:w-[200px] rounded-xl overflow-hidden bg-zinc-900 shadow-xl transition-transform duration-300 hover:scale-110 cursor-pointer">
          <img
            src={IMG_CDN_URL + posterPath}
            alt="Movie Poster"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        /* 🎬 BROWSE PAGE CARD (Horizontal scroll) */
        <div
          className=" min-w-40 md:min-w-[200px] lg:min-w-[220px] rounded-lg overflow-hidden shadow-lg transition duration-300 hover:scale-110 hover:z-20 cursor-pointer">
          <img
            src={IMG_CDN_URL + posterPath}
            alt="Movie Poster"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </>
  );
};

export default MovieCard;


import { IMG_CDN_URL } from "../assets/constants";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ posterPath, movieId , isGPTPage = false }) => {
  const navigate = useNavigate();

  if (!posterPath) return null;

  const handleClick = () => {
    navigate(`/movie/${movieId}`)
  }

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transition duration-300 hover:scale-110 ${
        isGPTPage
          ? "w-[140px] sm:w-40 md:w-[180px] lg:w-[200px] rounded-xl bg-zinc-900 shadow-xl"
          : "min-w-40 md:min-w-[200px] lg:min-w-[220px] rounded-lg shadow-lg"
      } overflow-hidden`}
    >
      <img
        src={IMG_CDN_URL + posterPath}
        alt="Movie Poster"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default MovieCard;


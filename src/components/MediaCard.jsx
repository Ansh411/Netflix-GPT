import { IMG_CDN_URL } from "../assets/constants";
import { useNavigate } from "react-router-dom";

const FALLBACK_POSTER = "https://i.im.ge/2025/12/31/BKwwSz.istockphoto-1055079680-612x612.jpeg";

const MediaCard = ({ posterPath, id, type = "movie", isGPTPage = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${id}`);
  }

  if (!posterPath || !id || !type) return null;

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
        src={posterPath ? IMG_CDN_URL + posterPath : FALLBACK_POSTER}
        alt="Poster"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default MediaCard;

import { IMG_CDN_URL } from "../assets/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="min-w-40 md:min-w-[200px] lg:min-w-[220px] rounded-lg overflow-hidden transform transition duration-300 hover:scale-110 hover:z-20 cursor-pointer">
      <img src={IMG_CDN_URL + posterPath} alt="Movie Poster" className="w-full h-full object-cover"/>
    </div>
  );
};

export default MovieCard;


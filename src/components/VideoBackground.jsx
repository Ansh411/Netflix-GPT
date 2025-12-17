import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo?.key) return null;

  return (
    
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
      <iframe
        className="w-screen h-screen object-cover scale-125"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}`}
        allow="autoplay; fullscreen"
      />
     
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/90"></div>
    </div>
  );
};

export default VideoBackground;



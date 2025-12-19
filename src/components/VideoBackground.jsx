import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo?.key) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
     
      <iframe
        className="w-full h-full object-cover scale-110 pointer-events-none"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&vq=720p&controls=0&loop=1&playlist=${trailerVideo.key}`}
        allow="autoplay; fullscreen"
      />

      
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/40 via-black/30 to-black/80" />
    </div>
  );
};

export default VideoBackground;

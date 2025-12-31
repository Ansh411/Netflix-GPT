import { useSelector } from "react-redux";


const VideoBackground = ({ movieId }) => {

  const trailer = useSelector(
    (store) => store.movies.trailersByMovieId?.[movieId]
  );

  const muted = useSelector((store) => store.video.muted);

  if (!trailer?.key) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <iframe
        key={`${trailer.key}-${muted}`} // IMPORTANT: forces reload on mute change
        className="w-full h-full object-cover scale-110 pointer-events-none"
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${
          muted ? 1 : 0
        }&amp;start=6&vq=720p&controls=0&loop=1&playlist=${trailer.key}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/40 via-black/30 to-black/80" />
    </div>
  );
};

export default VideoBackground;

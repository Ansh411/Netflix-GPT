import { useSelector } from "react-redux";

const VideoBackground = ({ id, type }) => {
  const muted = useSelector((store) => store.video.muted);

  // 🔀 Select trailer source based on type
  const trailer = useSelector((store) =>
    type === "movie"
      ? store.movies?.trailersByMovieId?.[id]
      : store.tvShows?.trailersTV?.[id]
  );

  if (!trailer?.key) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <iframe
        key={`${trailer.key}-${muted}`} // 🔑 reload on mute toggle
        className="w-full h-full object-cover scale-110 pointer-events-none"
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${
          muted ? 1 : 0
        }&start=6&vq=720p&controls=0&loop=1&playlist=${trailer.key}`}
        title={`${type === "movie" ? "Movie" : "TV Show"} Trailer`}
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      {/* 🌑 GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/40 via-black/30 to-black/80" />
    </div>
  );
};

export default VideoBackground;

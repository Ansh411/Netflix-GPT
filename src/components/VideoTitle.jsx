import { INFO, PLAY } from "../assets/constants";
import useFanartLogo from "../hooks/useFanartLogo";

const VideoTitle = ({ title, overview, movieId }) => {
  const { logo } = useFanartLogo(movieId);

  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white">

      {/* LEFT FADE */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

      <div className="relative max-w-2xl">

        {/* LOGO OR TITLE */}
        {logo ? (
          <img
            src={logo}
            alt={title}
            className="mb-6 drop-shadow-2xl transition-all duration-300 ease-out 
            max-w-[180px] translate-x-0 
            min-[400px]:max-w-[260px] min-[400px]:-translate-x-5
            md:max-w-[420px] md:-translate-x-12"/>
        ) : (
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
            {title}
          </h1>
        )}

        {/* Overview (desktop only) */}
        <p className="hidden lg:block mt-6 text-gray-200 line-clamp-4">
          {overview}
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 bg-white text-black cursor-pointer px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
            <img src={PLAY} className="w-6" />
            Play
          </button>

          <button className="flex items-center gap-2 bg-gray-600/60 cursor-pointer text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition">
            <img src={INFO} className="w-6" />
            More Info
          </button>
        </div>

      </div>
    </div>
  );
};

export default VideoTitle;

import { INFO, PLAY } from "../assets/constants";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white">
      
      {/* LEFT FADE */}
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />

      <div className="relative max-w-2xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
          {title}
        </h1>

        {/* Overview only on large screens */}
        <p className="hidden lg:block mt-6 text-gray-200 line-clamp-4">
          {overview}
        </p>

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

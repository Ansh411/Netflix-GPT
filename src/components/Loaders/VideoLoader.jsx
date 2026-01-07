const VideoLoader = () => {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">

      {/* Animated gradient pulse */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-gray-900/40 to-black animate-pulse" />

      {/* Play icon shimmer */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-white/10 via-red-400 to-rose-700 flex items-center justify-center animate-bounce">
          <div className="w-0 h-0 border-l-18p border-l-white border-y-12 border-y-transparent ml-1" />
        </div>

        <p className="text-lg tracking-wide text-gray-300 animate-pulse">
          Preparing your preview…
        </p>
      </div>
    </div>
  );
};

export default VideoLoader;

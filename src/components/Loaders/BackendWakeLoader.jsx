const BackendWakeLoader = ({
  title = "Getting things ready",
  subtitle = "Waking up servers. This may take a few seconds…",
}) => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">

        {/* Netflix-style pulse logo */}
        <div className="relative">
          <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-white text-lg font-semibold">
            {title}
          </p>
          <p className="text-gray-400 text-sm mt-1 max-w-[260px]">
            {subtitle}
          </p>
        </div>

        {/* Subtle shimmer bar */}
        <div className="w-52 h-1 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-1/3 bg-linear-to-r from-zinc-800 via-zinc-500 to-zinc-800 animate-[shimmer_1.5s_infinite]" />
        </div>

      </div>
    </div>
  );
};

export default BackendWakeLoader;

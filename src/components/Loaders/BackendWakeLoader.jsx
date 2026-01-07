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
        
      </div>
    </div>
  );
};

export default BackendWakeLoader;

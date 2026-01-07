const LoaderGPT = ({text = "Finding the best picks for you…"}) => {
  return (
    <div className="flex items-center gap-3 text-white text-lg font-medium">
      <div className="sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-red-600 rounded-full animate-bounce" />
      <div className="sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-red-600 rounded-full animate-bounce [animation-delay:-.2s]" />
      <div className="sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-red-600 rounded-full animate-bounce [animation-delay:-.4s]" />
      <span className="ml-4 text-gray-300 animate-pulse">{text}</span>
    </div>
  );
};

export default LoaderGPT;

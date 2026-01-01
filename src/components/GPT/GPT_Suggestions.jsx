import { useSelector } from "react-redux";
import MediaCard from "../MediaCard";
import capitialize from "../../utils/capitalizeWords";
import Loader from "../Loader";

const GPT_Suggestions = () => {
  const { results, GPTSearchText, isLoading, searchType } = useSelector(store => store.GPT);

  const loaderTextMap = {
    movie: "Finding movies for you…",
    tv: "Finding TV shows for you…",
    both: "Finding the best picks for you…",
  };

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <Loader text={loaderTextMap[searchType]} />
      </div>
    );
  }

  if (!results || results.length === 0) return null;

  return (
    <div className="w-full mt-16 px-6 md:px-12">
      {/* HEADER */}
      <h2 className="text-white text-lg md:text-2xl font-semibold mb-10">
        Showing results for:{" "}
        <span className="text-red-500">
          {capitialize(GPTSearchText)}
        </span>
      </h2>

      {/* MOVIE GRID */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 justify-items-center animate fadeIn">
        {results.map(item => {
          const resolvedType = item.media_type || (item.title ? "movie" : "tv");
          return(
            <MediaCard key={`${resolvedType}-${item.id}`} id={item.id} posterPath={item.poster_path} type={resolvedType} isGPTPage={true} />
          ); 
        })}
      </div>
    </div>
  );
};

export default GPT_Suggestions;

import { useSelector } from "react-redux";
import MovieCard from "../MovieCard";
import capitialize from "../../utils/capitalizeWords";
import Loader from "../Loader";

const GPT_MovieSuggestions = () => {
  const { movieResults, GPTSearchText, isLoading } = useSelector(store => store.GPT);

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!movieResults || movieResults.length === 0) return null;

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
        {movieResults.map(movie => (
          <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} isGPTPage={true} />
        ))}
      </div>
    </div>
  );
};

export default GPT_MovieSuggestions;

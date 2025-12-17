import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-6 md:px-12 py-6">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;


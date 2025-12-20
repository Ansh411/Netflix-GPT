import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  if (!movies) return null;

  return (
    <div className="relative z-30 -mt-[35vh]">
      
      {/* 🌫 FADE ZONE */}
      <div className="h-[20vh] bg-linear-to-b from-transparent via-black/50 to-black pointer-events-none" />

      {/* 🎬 CONTENT ZONE */}
      <div className="bg-black px-4 md:px-8 pb-24">
        <MoviesList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MoviesList title="Top Rated" movies={movies.topRatedMovies} />
        <MoviesList title="Classics" movies={movies.classicMovies} />
        <MoviesList title="Horror" movies={movies.horrorMovies} />
        <MoviesList title="Upcoming" movies={movies.upcomingMovies} />
        <MoviesList title="Comedy" movies={movies.comedyMovies} />
        <MoviesList title="Anime & Fantasy" movies={movies.fantasyMovies} />
        <MoviesList title="Popular" movies={movies.popularMovies} />
      </div>

    </div>
  );
};

export default SecondaryContainer;

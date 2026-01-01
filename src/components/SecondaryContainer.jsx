import { useSelector } from "react-redux";
import MediaList from "./MediaList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const tv = useSelector((store) => store.tvShows);

  if (!movies && !tv) return null;

  return (
    <div className="relative z-30 -mt-[35vh]">
      
      {/* 🌫 FADE ZONE */}
      <div className="h-[20vh] bg-linear-to-b from-transparent via-black/50 to-black pointer-events-none" />

      {/* 🎬 CONTENT ZONE */}
      <div className="bg-black px-4 md:px-8 pb-24">
        {/* 🎬 MOVIES */}
        <MediaList title="Now Playing" items={movies.nowPlayingMovies} type="movie"  />
        <MediaList title="Popular TV" items={tv.popularTV} type="tv" />
        <MediaList title="Top Rated" items={movies.topRatedMovies} type="movie" />
        <MediaList title="Top Rated TV" items={tv.topRatedTV} type="tv" />
        <MediaList title="Classics" items={movies.classicMovies} type="movie" />
        <MediaList title="On The Air" items={tv.onTheAir} type="tv" /> 
        <MediaList title="Horror" items={movies.horrorMovies} type="movie" />  
        <MediaList title="Upcoming" items={movies.upcomingMovies} type="movie" />
        <MediaList title="Crime" items={movies.crimeMovies}type="movie"  />
        <MediaList title="Anime & Fantasy" items={movies.fantasyMovies}type="movie"  />
        <MediaList title="Documentary" items={movies.documentaries} type="movie" />
        <MediaList title="Romance" items={movies.romanceMovies} type="movie" />
        <MediaList title="Comedy" items={movies.comedyMovies} type="movie" />
        <MediaList title="Popular" items={movies.popularMovies} type="movie" />     
      </div>

    </div>
  );
};

export default SecondaryContainer;


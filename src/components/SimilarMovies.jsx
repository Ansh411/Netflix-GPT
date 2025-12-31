// import { useEffect, useState } from "react";
// import MovieCard from "./MovieCard";

// const SimilarMovies = ({ movieId }) => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchSimilar = async () => {
//       const res = await fetch(
//         `https://netflix-gpt-backend-6ayv.onrender.com/api/movies/${movieId}/similar`
//       );
//       const json = await res.json();
//       setMovies(json.results || []);
//     };

//     fetchSimilar();
//   }, [movieId]);

//   if (!movies.length) return null;

//   return (
//     <div className="relative z-30 px-6 md:px-12 mt-16">
//       <h2 className="text-xl md:text-2xl font-semibold mb-6">
//         Similar Movies
//       </h2>

//       <div className="flex gap-4 overflow-x-auto no-scrollbar">
//         {movies.map(movie => (
//           <MovieCard
//             key={movie.id}
//             movieId={movie.id}
//             posterPath={movie.poster_path}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SimilarMovies;

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const SimilarMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      const res = await fetch(
        `https://netflix-gpt-backend-6ayv.onrender.com/api/movies/${movieId}/similar`
      );
      const json = await res.json();
      setMovies(json.results || []);
    };

    fetchSimilar();
  }, [movieId]);

  if (!movies.length) return null;

  return (
    <div className="relative z-30 px-4 sm:px-6 md:px-12 mt-12 sm:mt-16">
      
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
        Similar Movies
      </h2>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-4">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;

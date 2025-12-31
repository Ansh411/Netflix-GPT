import { useDispatch, useSelector } from "react-redux";
import { addTrailerForMovie } from "../store/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const cachedTrailer = useSelector(
    (store) => store.movies.trailersByMovieId[movieId]
  );

  useEffect(() => {
    if (!movieId || cachedTrailer) return;

    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://netflix-gpt-backend-6ayv.onrender.com/api/movies/${movieId}/trailer`
        );

        if (!res.ok) throw new Error("Trailer fetch failed");

        const trailer = await res.json();

        dispatch(
          addTrailerForMovie({
            movieId,
            trailer: trailer || null,
          })
        );
      } catch (err) {
        console.error("Trailer fetch error:", err);
        dispatch(
          addTrailerForMovie({
            movieId,
            trailer: null,
          })
        );
      }
    };

    fetchTrailer();
  }, [movieId, cachedTrailer, dispatch]);
};

export default useMovieTrailer;

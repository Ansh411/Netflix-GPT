import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../store/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const trailerVideo = useSelector(store => store.movies.trailerVideo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId || trailerVideo) return;

    const getMovieTrailer = async () => {
      try {
        const res = await fetch(
          `https://netflix-gpt-backend-6ayv.onrender.com/api/movies/${movieId}/trailer`
        );

        if (!res.ok) throw new Error("Trailer fetch failed");

        const trailer = await res.json();

        if (!trailer?.key) return;

        dispatch(addTrailerVideo(trailer));
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
    };

    getMovieTrailer();
  }, [movieId, dispatch, trailerVideo]);
};

export default useMovieTrailer;

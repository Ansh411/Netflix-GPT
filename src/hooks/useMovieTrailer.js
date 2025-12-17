import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../assets/constants";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;

    const getMovieVideos = async () => {
      try {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",API_OPTIONS);

        const json = await data.json();

        if (!json?.results?.length) return;

        const trailers = json.results.filter((video) => video.type === "Trailer" && video.site === "YouTube");

        const trailer = trailers.length? trailers[0] : json.results[0];

        dispatch(addTrailerVideo(trailer));
      } catch (err) {
        console.error("Failed to fetch trailer", err);
      }
    };
    
    getMovieVideos();
  }, [movieId, dispatch]);
};

export default useMovieTrailer;

import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../store/moviesSlice";
import { useEffect } from "react";


const useNowPlayingMovies = () => {

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
    const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/now-playing");

    const json = await data.json();

    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  },[]);

}

export default useNowPlayingMovies;


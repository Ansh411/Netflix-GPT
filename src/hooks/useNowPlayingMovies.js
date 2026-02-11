import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies, setLoading } from "../store/moviesSlice";
import { useEffect } from "react";
import { BACKEND_API } from "../assets/constants";


const useNowPlayingMovies = () => {

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
    const data = await fetch(BACKEND_API + "/api/movies/now-playing");

    const json = await data.json();

    dispatch(addNowPlayingMovies(json.results));
    dispatch(setLoading(false));
  }

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  },[]);

}

export default useNowPlayingMovies;


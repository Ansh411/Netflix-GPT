import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../store/moviesSlice";
import { useEffect } from "react";
import { BACKEND_API } from "../assets/constants";


const usePopularMovies = () => {

    const popularMovies = useSelector(store => store.movies.popularMovies);

    const dispatch = useDispatch();

    const getPopularMovies = async () => {
    const data = await fetch(BACKEND_API + "/api/movies/popular");

    const json = await data.json();

    dispatch(addPopularMovies(json.results));
  }

  useEffect(() => {
    !popularMovies && getPopularMovies();
  },[]);

}

export default usePopularMovies;


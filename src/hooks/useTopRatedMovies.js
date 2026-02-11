import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../store/moviesSlice";
import { useEffect } from "react";
import { BACKEND_API } from "../assets/constants";


const useTopRatedMovies = () => {

    const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

    const dispatch = useDispatch();

    const getTopRatedMovies = async () => {
    const data = await fetch(BACKEND_API + "/api/movies/top-rated");
    

    const json = await data.json();

    dispatch(addTopRatedMovies(json.results));
  }

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  },[]);

}

export default useTopRatedMovies;

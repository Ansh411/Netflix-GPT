import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../store/moviesSlice";
import { useEffect } from "react";


const useTopRatedMovies = () => {

    const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

    const dispatch = useDispatch();

    const getTopRatedMovies = async () => {
    const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/top-rated");
    

    const json = await data.json();

    dispatch(addTopRatedMovies(json.results));
  }

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  },[]);

}

export default useTopRatedMovies;

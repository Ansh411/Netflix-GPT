import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../store/moviesSlice";
import { useEffect } from "react";
import { BACKEND_API } from "../assets/constants";

const useUpcomingMovies = () => {

    const upcomingMovies = useSelector(store => store.movies.upcomingMovies)

    const dispatch = useDispatch();

    const getUpcomingMovies = async () => {
    const data = await fetch(BACKEND_API + "/api/movies/upcoming");
    

    const json = await data.json();

    dispatch(addUpcomingMovies(json.results));
  }

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  },[]);

}

export default useUpcomingMovies;
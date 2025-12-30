import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../store/moviesSlice";
import { useEffect } from "react";


const useUpcomingMovies = () => {

    const upcomingMovies = useSelector(store => store.movies.upcomingMovies)

    const dispatch = useDispatch();

    const getUpcomingMovies = async () => {
    const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/upcoming");
    

    const json = await data.json();

    dispatch(addUpcomingMovies(json.results));
  }

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  },[]);

}

export default useUpcomingMovies;
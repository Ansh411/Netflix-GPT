import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addComedyMovies } from '../store/moviesSlice';


const useComedyMovies = () => {

    const comedyMovies = useSelector(store => store.movies.comedyMovies);

    const dispatch = useDispatch();

    const getComedyMovies = async () => {
        const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/comedy");

        const json = await data.json();

        dispatch(addComedyMovies(json.results));
    }

    useEffect(() => {
        !comedyMovies && getComedyMovies();
    }, []);
}

export default useComedyMovies;


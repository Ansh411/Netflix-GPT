import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addClassicMovies } from '../store/moviesSlice';


const useClassicMovies = () => {

    const classicMovies = useSelector(store => store.movies.classicMovies);

    const dispatch = useDispatch();

    const getClassicMovies = async () => {
        const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/classic");

        const json = await data.json();

        dispatch(addClassicMovies(json.results));
    }

    useEffect(() => {
        !classicMovies && getClassicMovies();
    }, []);
}

export default useClassicMovies;


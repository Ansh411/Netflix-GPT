import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addClassicMovies } from '../store/moviesSlice';
import { BACKEND_API } from '../assets/constants';


const useClassicMovies = () => {

    const classicMovies = useSelector(store => store.movies.classicMovies);

    const dispatch = useDispatch();

    const getClassicMovies = async () => {
        const data = await fetch(BACKEND_API + "/api/movies/classic");

        const json = await data.json();

        dispatch(addClassicMovies(json.results));
    }

    useEffect(() => {
        !classicMovies && getClassicMovies();
    }, []);
}

export default useClassicMovies;


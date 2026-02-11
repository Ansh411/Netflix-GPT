import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addRomanceMovies } from '../store/moviesSlice';
import { BACKEND_API } from '../assets/constants';

const useRomanceMovies = () => {

    const romanceMovies = useSelector(store => store.movies.romanceMovies);

    const dispatch = useDispatch();

    const getRomanceMovies = async () => {
        const data = await fetch(BACKEND_API + "/api/movies/romance");

        const json = await data.json();

        dispatch(addRomanceMovies(json.results));
    }

    useEffect(() => {
        !romanceMovies && getRomanceMovies();
    }, []);
}

export default useRomanceMovies;
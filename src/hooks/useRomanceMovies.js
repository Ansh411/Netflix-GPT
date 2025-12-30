import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addRomanceMovies } from '../store/moviesSlice';

const useRomanceMovies = () => {

    const romanceMovies = useSelector(store => store.movies.romanceMovies);

    const dispatch = useDispatch();

    const getRomanceMovies = async () => {
        const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/romance");

        const json = await data.json();

        dispatch(addRomanceMovies(json.results));
    }

    useEffect(() => {
        !romanceMovies && getRomanceMovies();
    }, []);
}

export default useRomanceMovies;
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addHorrorMovies } from '../store/moviesSlice';
import { API_OPTIONS } from '../assets/constants';

const useHorrorMovies = () => {

    const horrorMovies = useSelector(store => store.movies.horrorMovies);

    const dispatch = useDispatch();

    const getHorrorMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/138843/similar?language=en-US&page=1", API_OPTIONS);

        const json = await data.json();

        dispatch(addHorrorMovies(json.results));
    }

    useEffect(() => {
        !horrorMovies && getHorrorMovies();
    }, []);
}

export default useHorrorMovies;

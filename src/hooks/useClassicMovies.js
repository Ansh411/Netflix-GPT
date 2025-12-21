import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addClassicMovies } from '../store/moviesSlice';
import { API_OPTIONS } from '../assets/constants';

const useClassicMovies = () => {

    const classicMovies = useSelector(store => store.movies.classicMovies);

    const dispatch = useDispatch();

    const getClassicMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/680/similar?language=en-US&page=1", API_OPTIONS);

        const json = await data.json();

        dispatch(addClassicMovies(json.results));
    }

    useEffect(() => {
        !classicMovies && getClassicMovies();
    }, []);
}

export default useClassicMovies;

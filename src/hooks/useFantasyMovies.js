import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addFantasyMovies } from '../store/moviesSlice';
import { API_OPTIONS } from '../assets/constants';

const useFantasyMovies = () => {

    const fantasyMovies = useSelector(store => store.movies.fantasyMovies);

    const dispatch = useDispatch();

    const getFantasyMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/129/similar?language=en-US&page=1", API_OPTIONS);

        const json = await data.json();

        dispatch(addFantasyMovies(json.results));
    }

    useEffect(() => {
        !fantasyMovies && getFantasyMovies();
    }, []);
}

export default useFantasyMovies;

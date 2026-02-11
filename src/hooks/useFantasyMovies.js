import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addFantasyMovies } from '../store/moviesSlice';
import { BACKEND_API } from '../assets/constants';


const useFantasyMovies = () => {

    const fantasyMovies = useSelector(store => store.movies.fantasyMovies);

    const dispatch = useDispatch();

    const getFantasyMovies = async () => {
        const data = await fetch(BACKEND_API + "/api/movies/fantasy");

        const json = await data.json();

        dispatch(addFantasyMovies(json.results));
    }

    useEffect(() => {
        !fantasyMovies && getFantasyMovies();
    }, []);
}

export default useFantasyMovies;

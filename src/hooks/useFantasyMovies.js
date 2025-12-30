import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addFantasyMovies } from '../store/moviesSlice';


const useFantasyMovies = () => {

    const fantasyMovies = useSelector(store => store.movies.fantasyMovies);

    const dispatch = useDispatch();

    const getFantasyMovies = async () => {
        const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/fantasy");

        const json = await data.json();

        dispatch(addFantasyMovies(json.results));
    }

    useEffect(() => {
        !fantasyMovies && getFantasyMovies();
    }, []);
}

export default useFantasyMovies;

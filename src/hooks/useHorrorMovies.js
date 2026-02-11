import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addHorrorMovies } from '../store/moviesSlice';
import { BACKEND_API } from '../assets/constants';


const useHorrorMovies = () => {

    const horrorMovies = useSelector(store => store.movies.horrorMovies);

    const dispatch = useDispatch();

    const getHorrorMovies = async () => {
        const data = await fetch(BACKEND_API + "/api/movies/horror");

        const json = await data.json();

        dispatch(addHorrorMovies(json.results));
    }

    useEffect(() => {
        !horrorMovies && getHorrorMovies();
    }, []);
}

export default useHorrorMovies;

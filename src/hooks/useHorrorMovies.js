import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addHorrorMovies } from '../store/moviesSlice';


const useHorrorMovies = () => {

    const horrorMovies = useSelector(store => store.movies.horrorMovies);

    const dispatch = useDispatch();

    const getHorrorMovies = async () => {
        const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/horror");

        const json = await data.json();

        dispatch(addHorrorMovies(json.results));
    }

    useEffect(() => {
        !horrorMovies && getHorrorMovies();
    }, []);
}

export default useHorrorMovies;

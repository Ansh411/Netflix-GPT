import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addCrimeMovies } from '../store/moviesSlice';


const useCrimeMovies = () => {

    const crimeMovies = useSelector(store => store.movies.crimeMovies);

    const dispatch = useDispatch();

    const getCrimeMovies = async () => {
        const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/crime");

        const json = await data.json();

        dispatch(addCrimeMovies(json.results));
    }

    useEffect(() => {
        !crimeMovies && getCrimeMovies();
    }, []);
}

export default useCrimeMovies;


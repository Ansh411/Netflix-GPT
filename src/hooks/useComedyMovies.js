import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addComedyMovies } from '../store/moviesSlice';
import { BACKEND_API } from '../assets/constants';


const useComedyMovies = () => {

    const comedyMovies = useSelector(store => store.movies.comedyMovies);

    const dispatch = useDispatch();

    const getComedyMovies = async () => {
        const data = await fetch(BACKEND_API + "/api/movies/comedy");

        const json = await data.json();

        dispatch(addComedyMovies(json.results));
    }

    useEffect(() => {
        !comedyMovies && getComedyMovies();
    }, []);
}

export default useComedyMovies;


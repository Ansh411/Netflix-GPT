import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { addComedyMovies } from '../store/moviesSlice';
import { API_OPTIONS } from '../assets/constants';

const useComedyMovies = () => {
    const dispatch = useDispatch();

    const getComedyMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/18785/similar?language=en-US&page=1", API_OPTIONS);

        const json = await data.json();

        dispatch(addComedyMovies(json.results));
    }

    useEffect(() => {
        getComedyMovies();
    }, []);
}

export default useComedyMovies;

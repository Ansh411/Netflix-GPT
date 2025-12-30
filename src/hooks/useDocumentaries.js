import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addDocumentaries } from '../store/moviesSlice';


const useDocumentaries = () => {

    const documentaries = useSelector(store => store.movies.documentaries);

    const dispatch = useDispatch();

    const getDocumentaries = async () => {
        const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/movies/documentary");

        const json = await data.json();

        dispatch(addDocumentaries(json.results));
    }

    useEffect(() => {
        !documentaries && getDocumentaries();
    }, []);
}

export default useDocumentaries;
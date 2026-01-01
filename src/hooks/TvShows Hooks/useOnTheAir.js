import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addOnTheAir } from "../../store/tvShowsSlice";


const useOnTheAir = () => {

    const onTheAir = useSelector(store => store.tvShows.onTheAir);

    const dispatch = useDispatch();

    const getOnTheAir = async () => {
    const data = await fetch("https://netflix-gpt-backend-6ayv.onrender.com/api/tv/on-the-air");

    const json = await data.json();

    dispatch(addOnTheAir(json.results));
  }

  useEffect(() => {
    if(!onTheAir.length) {
      getOnTheAir();
    } 
  },[]);

}

export default useOnTheAir;
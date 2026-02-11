import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addOnTheAir } from "../../store/tvShowsSlice";
import { BACKEND_API } from "../../assets/constants";


const useOnTheAir = () => {

    const onTheAir = useSelector(store => store.tvShows.onTheAir);

    const dispatch = useDispatch();

    const getOnTheAir = async () => {
    const data = await fetch(BACKEND_API + "/api/tv/on-the-air");

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
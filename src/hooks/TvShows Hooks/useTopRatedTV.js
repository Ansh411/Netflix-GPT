import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addTopRatedTV } from "../../store/tvShowsSlice";
import { BACKEND_API } from "../../assets/constants";


const useTopRatedTV = () => {

    const topRatedTV = useSelector(store => store.tvShows.topRatedTV);

    const dispatch = useDispatch();

    const getTopRatedTV = async () => {
    const data = await fetch(BACKEND_API + "/api/tv/top-rated");

    const json = await data.json();

    dispatch(addTopRatedTV(json.results));
  }

  useEffect(() => {
    if(!topRatedTV.length) {
      getTopRatedTV();
    } 
  },[]);

}

export default useTopRatedTV;
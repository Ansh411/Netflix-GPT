import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addPopularTV } from "../../store/tvShowsSlice";
import { BACKEND_API } from "../../assets/constants";


const usePopularTV = () => {

    const popularTV = useSelector(store => store.tvShows.popularTV);

    const dispatch = useDispatch();

    const getPopularTV = async () => {
    const data = await fetch(BACKEND_API + "/api/tv/popular");

    const json = await data.json();

    dispatch(addPopularTV(json.results));
  }

  useEffect(() => {
    if(!popularTV.length) {
      getPopularTV();
    } 
  },[]);

}

export default usePopularTV;
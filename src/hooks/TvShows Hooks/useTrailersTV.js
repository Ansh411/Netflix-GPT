import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addTVTrailer } from "../../store/tvShowsSlice";
import { BACKEND_API } from "../../assets/constants";

const useTrailersTV = (tvShowId) => {
  const dispatch = useDispatch();

  const cachedTrailer = useSelector((store) => store.tvShows.trailersTV[tvShowId]);

  useEffect(() => {
    if (!tvShowId || cachedTrailer) return;

    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `${BACKEND_API}/api/tv/${tvShowId}/trailer`
        );

        if (!res.ok) throw new Error("Trailer fetch failed");

        const trailer = await res.json();

        dispatch(
          addTVTrailer({
            id : tvShowId,
            trailer: trailer || null,
          })
        );
      } catch (err) {
        console.error("Trailer fetch error:", err);
        dispatch(
          addTVTrailer({
            id : tvShowId,
            trailer: null,
          })
        );
      }
    };

    fetchTrailer();
  }, [tvShowId, cachedTrailer, dispatch]);
};

export default useTrailersTV;

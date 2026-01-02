import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Header from "../components/Header";
import VideoBackground from "../components/VideoBackground";
import VideoLoader from "../components/VideoLoader";
import TVShowInfo from "../components/TV Shows/TVShowInfo";
import SimilarTVShows from "../components/TV Shows/SimilarTVShows";
import CastCarouselTV from "../components/TV Shows/CastCarouselTV";
import MetaInfoTV from "../components/TV Shows/MetaInfoTV";
import TVSeasonEpisodes from "../components/TV Shows/TVSeasonEpisodes";

import useTrailersTV from "../hooks/TvShows Hooks/useTrailersTV";
import { setMuted } from "../store/videoSlice";
import { addTVDetails } from "../store/tvShowsSlice";

const BACKEND_URL = "https://netflix-gpt-backend-6ayv.onrender.com";

const TVShowDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const trailer = useSelector((store) => store.tvShows.trailersTV[id]);
  const tvDetails = useSelector((store) => store.tvShows.detailsTV[id]);

  // 🎯 Sound ON
  useEffect(() => {
    dispatch(setMuted(false));
  }, [dispatch]);

  // 🎬 Fetch trailer
  useTrailersTV(id);

  // ✅ FETCH TV DETAILS AT PAGE LEVEL
  useEffect(() => {
    if (!id || tvDetails) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/tv/${id}/details`
        );
        const json = await res.json();
        dispatch(addTVDetails(json));
      } catch (err) {
        console.error("TV Details fetch failed:", err);
      }
    };

    fetchDetails();
  }, [id, tvDetails, dispatch]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />

      {/* VIDEO HERO */}
      <div className="relative h-[55vh] sm:h-[65vh] md:h-[75vh]">
        {!trailer?.key ? (
          <VideoLoader />
        ) : (
          <VideoBackground id={id} type="tv" />
        )}
      </div>

      {/* INFO */}
      <div className="relative z-30 -mt-[18vh] sm:-mt-[22vh] md:-mt-[28vh]">
        <TVShowInfo tvshowId={id} />

        <div className="pb-4 border-b border-white/10">
          <MetaInfoTV tvShowId={id} />
        </div>
      </div>

      {/* ✅ EPISODES */}
      {tvDetails && tvDetails.number_of_seasons > 0 && (
        <div className="relative z-30 mt-12">
          <TVSeasonEpisodes
            tvShowId={id}
            totalSeasons={tvDetails.number_of_seasons}/>
        </div>
      )}


      {/* CAST */}
      <CastCarouselTV tvShowId={id} />

      {/* SIMILAR */}
      <div className="relative z-30 mt-12">
        <SimilarTVShows tvShowId={id} />
      </div>
    </div>
  );
};

export default TVShowDetails;

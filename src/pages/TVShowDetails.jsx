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

import useTrailersTV from "../hooks/TvShows Hooks/useTrailersTV";
import { setMuted } from "../store/videoSlice";


const TVShowDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 🎯 Movie Details → sound ON
  useEffect(() => {
    dispatch(setMuted(false));
  }, [dispatch]);

  // 🎬 Fetch trailer
  useTrailersTV(id);

  const trailer = useSelector((store) => store.tvShows?.trailersTV?.[id]);


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
      <div className="relative z-30 -mt-[18vh] sm:-mt-[22vh] md:-mt-[28vh]">
      {/* MOVIE DESCRIPTION */}
        <div className="mb-6">
          <TVShowInfo tvshowId={id} />
        </div>

      {/* META INFO */}
        <div className="pb-4 border-b border-white/10">
          <MetaInfoTV tvShowId={id} />
        </div>
    </div>

       {/* CAST */}
      <div className="mt-10">
        <CastCarouselTV tvShowId={id} />
      </div>

      {/* SIMILAR */}
      <div className="relative z-30 mt-12">
        <SimilarTVShows tvShowId={id} />
      </div>
  </div>
  );
};

export default TVShowDetails;

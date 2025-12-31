import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Header from "../components/Header";
import VideoBackground from "../components/VideoBackground";
import VideoLoader from "../components/VideoLoader";
import MovieInfo from "../components/MovieInfo";
import SimilarMovies from "../components/SimilarMovies";
import CastCarousel from "../components/CastCarousel";
import MetaInfoRow from "../components/MetaInfoRow";

import useMovieTrailer from "../hooks/useMovieTrailer";
import { setMuted } from "../store/videoSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 🎯 Movie Details → sound ON
  useEffect(() => {
    dispatch(setMuted(false));
  }, [dispatch]);

  // 🎬 Fetch trailer
  useMovieTrailer(id);

  const trailer = useSelector(
    (store) => store.movies?.trailersByMovieId?.[id]
  );


  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />

      {/* VIDEO HERO */}
      <div className="relative h-[55vh] sm:h-[65vh] md:h-[75vh]">
        {!trailer?.key ? (
          <VideoLoader />
        ) : (
          <VideoBackground movieId={id} />
        )}
      </div>
      <div className="-mt-24 sm:-mt-32 md:-mt-40 px-4 relative z-30">
      {/* MOVIE DESCRIPTION */}
        <div className="mb-6">
          <MovieInfo movieId={id} />
        </div>

      {/* META INFO */}
        <div className="pb-4 border-b border-white/10">
          <MetaInfoRow movieId={id} />
        </div>
    </div>

       {/* CAST */}
      <div className="mt-10">
        <CastCarousel movieId={id} />
      </div>

      {/* SIMILAR */}
      <div className="relative z-30 mt-12">
        <SimilarMovies movieId={id} />
      </div>
  </div>
  );
};

export default MovieDetails;

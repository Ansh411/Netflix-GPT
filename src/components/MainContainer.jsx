import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import useMovieTrailer from "../hooks/useMovieTrailer";
import VideoLoader from "./Loaders/VideoLoader";
import { setMuted } from "../store/videoSlice";

const MainContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMuted(true));
  }, [dispatch]);

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const tvShows = useSelector((store) => store.tv?.onTheAir);

  const trailersById = useSelector(
    (store) => store.movies?.trailersByMovieId
  );

  const [hero, setHero] = useState(null);
  const [type, setType] = useState("movie");

  useEffect(() => {
    if (!movies?.length && !tvShows?.length) return;

    const isTV = Math.random() > 0.5 && tvShows?.length;
    const list = isTV ? tvShows : movies;

    setHero(list[Math.floor(Math.random() * list.length)]);
    setType(isTV ? "tv" : "movie");
  }, [movies, tvShows]);

  useMovieTrailer(hero?.id, type);

  if (!hero) return null;

  const trailer = trailersById?.[hero.id];

  if (!trailer?.key) {
    return <VideoLoader />;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <VideoBackground id={hero.id} type={type} />
      <VideoTitle media={hero} type={type} />
    </div>
  );
};

export default MainContainer;


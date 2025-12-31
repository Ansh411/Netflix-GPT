import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import useMovieTrailer from "../hooks/useMovieTrailer";
import VideoLoader from "./VideoLoader";
import { setMuted } from "../store/videoSlice";

const MainContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMuted(true));
  },[dispatch]);

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const trailersByMovieId = useSelector(
    (store) => store.movies?.trailersByMovieId
  );

  const [mainMovie, setMainMovie] = useState(null);

  useEffect(() => {
    if (!movies?.length) return;

    const randomIndex = Math.floor(Math.random() * movies.length);
    setMainMovie(movies[randomIndex]);
  }, [movies]);

  // ⬅️ FETCH TRAILER HERE
  useMovieTrailer(mainMovie?.id);

  if (!mainMovie) return null;

  const trailer = trailersByMovieId?.[mainMovie.id];

  // ✅ Loader now works correctly
  if (!trailer?.key) {
    return <VideoLoader />;
  }

  const { title, overview, id } = mainMovie;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <VideoBackground movieId={id} />
      <VideoTitle title={title} overview={overview} movieId={id} />
    </div>
  );
};

export default MainContainer;

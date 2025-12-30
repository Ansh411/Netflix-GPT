import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [mainMovie, setMainMovie] = useState(null);

  useEffect(() => {
    if (!movies?.length) return;

    const randomIndex = Math.floor(Math.random() * movies.length);
    setMainMovie(movies[randomIndex]);
  }, [movies]);

  if (!mainMovie) return null;

  const { title, overview, id } = mainMovie;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <VideoBackground movieId={id} />
      <VideoTitle title={title} movieId={id} overview={overview} />
    </div>
  );
};

export default MainContainer;

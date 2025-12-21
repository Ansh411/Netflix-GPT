import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies?.length) return null;

  const mainMovie = movies[9];
  const { title, overview, id } = mainMovie;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <VideoBackground movieId={id} />
      <VideoTitle title={title} overview={overview} />
    </div>
  );
};

export default MainContainer;


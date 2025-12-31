import Header from "../components/Header";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useCrimeMovies from "../hooks/useCrimeMovies";
import useFantasyMovies from "../hooks/useFantasyMovies";
import useClassicMovies from "../hooks/useClassicMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useRomanceMovies from "../hooks/useRomanceMovies";
import useDocumentaries from "../hooks/useDocumentaries";
import useComedyMovies from "../hooks/useComedyMovies";

const Browse = () => {
  useNowPlayingMovies();
  useTopRatedMovies();
  useClassicMovies();
  useHorrorMovies();
  usePopularMovies();
  useCrimeMovies();
  useUpcomingMovies();
  useFantasyMovies();
  useComedyMovies();
  useRomanceMovies();
  useDocumentaries();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;

import Header from "../components/Header";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useComedyMovies from "../hooks/useComedyMovies";
import useFantasyMovies from "../hooks/useFantasyMovies";
import useClassicMovies from "../hooks/useClassicMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";


const Browse = () => {

  useNowPlayingMovies();
  useTopRatedMovies();
  useClassicMovies();
  useHorrorMovies();
  usePopularMovies();
  useComedyMovies();
  useUpcomingMovies();
  useFantasyMovies();
  

  return (
    <div>
      <Header/>
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse;
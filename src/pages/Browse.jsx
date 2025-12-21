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
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";


const Browse = () => {

  const showGPTSearch = useSelector(store => store.GPT.showGPTSearch);

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
      {showGPTSearch ? <GPTSearch /> :
       <>      
        <MainContainer />
        <SecondaryContainer />
      </>}
      

    </div>
  )
}

export default Browse;
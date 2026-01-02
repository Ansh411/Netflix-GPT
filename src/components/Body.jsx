import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import Browse from "../pages/Browse.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import PublicRoute from "../auth/PublicRoute.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";
import GPTSearch from "../pages/GPTSearch.jsx";
import Player from "../pages/Player.jsx";
import TVShowDetails from "../pages/TVShowDetails.jsx";
import SearchResults from "../pages/SearchResults.jsx";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute><Login /></PublicRoute>,
    },
    {
      path: "/signup",
      element: <PublicRoute><SignUp /></PublicRoute>,
    },
    {
      path: "/browse",
      element: <ProtectedRoute><Browse /></ProtectedRoute>,
    },
    {
      path: "/gpt-search",
      element: <ProtectedRoute><GPTSearch /></ProtectedRoute>,
    },
    {
      path: "/movie/:id",
      element: <ProtectedRoute><MovieDetails /></ProtectedRoute>,
    },
    {
      path: "/tv/:id",
      element: <ProtectedRoute><TVShowDetails /></ProtectedRoute>
    },
    {
      path: "/search",
      element: <ProtectedRoute><SearchResults /></ProtectedRoute>,
    },
    {
      path: "/player/movie/:id",
      element: <ProtectedRoute><Player type="movie" /></ProtectedRoute>,
    },
    {
      path: "/player/tv/:id",
      element: <ProtectedRoute><Player type="tv" /></ProtectedRoute>,
    },
]);
  return <RouterProvider router={appRouter} />;
};

export default Body;

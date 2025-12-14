import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import Browse from "../pages/Browse.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import PublicRoute from "../auth/PublicRoute.jsx";

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
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignInLoader from "../components/Loaders/SignInLoader";

const PublicRoute = ({ children }) => {

  const {data: user, loading} = useSelector((store) => store.user);

  if(loading) {
    return <SignInLoader />;
  }

  if(user) {
    return <Navigate to="/browse" replace />;
  }

  return children;

};

export default PublicRoute;

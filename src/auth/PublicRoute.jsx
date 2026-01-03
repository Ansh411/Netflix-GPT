import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const PublicRoute = ({ children }) => {

  const {data: user, loading} = useSelector((store) => store.user);

  if(loading) {
    return <Loader />;
  }

  if(user) {
    return <Navigate to="/browse" replace />;
  }

  return children;

};

export default PublicRoute;

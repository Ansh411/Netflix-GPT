import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }) => {

  const {data : user, loading} = useSelector((store) => store.user);
  
  if(loading) {
    return <Loader />;
  }

  if(!user) {
    return <Navigate to="/" replace />;
  }

  return children;

};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader_Browse from "../components/Loader_Browse";

const ProtectedRoute = ({ children }) => {

  const {data : user, loading} = useSelector((store) => store.user);
  
  if(loading) {
    return <Loader_Browse />;
  }

  if(!user) {
    return <Navigate to="/" replace />;
  }

  return children;

};

export default ProtectedRoute;

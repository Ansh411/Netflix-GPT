import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignInLoader from "../components/Loaders/SignInLoader";

const ProtectedRoute = ({ children }) => {

  const {data : user, loading} = useSelector((store) => store.user);
  
  if(loading) {
    return <SignInLoader />;
  }

  if(!user) {
    return <Navigate to="/" replace />;
  }

  return children;

};

export default ProtectedRoute;

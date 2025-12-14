import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  return user ? <Navigate to="/browse" replace /> : children;
};

export default PublicRoute;

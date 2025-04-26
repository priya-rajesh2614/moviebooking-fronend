import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "./usercontext/usercontext";

const ProtectedRoute = () => {

 const {user}= useContext(UserContext)
  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

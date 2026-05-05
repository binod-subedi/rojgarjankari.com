import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner";

export const EmployerRoute = () => {
  const { currentUser, userData, loading } = useAuth();


  if (loading) return <Spinner />;

  if (currentUser && userData.role === "user") return <Navigate to='/' />;

  return <Outlet />;
};

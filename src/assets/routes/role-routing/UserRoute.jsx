import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner";

export const UserRoute = () => {
    const { currentUser, userData, loading } = useAuth();


    if (loading) return <Spinner />;

    if (currentUser && userData.role === "employer") return <Navigate to='/employer/dashboard' />;

    return <Outlet />;
};

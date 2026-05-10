import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner";

export const UserRoute = () => {
    const { userData, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!userData) return <Spinner />;

    if (userData && userData.role === "employer") return <Navigate to='/employer/dashboard' />;

    return <Outlet />;
};

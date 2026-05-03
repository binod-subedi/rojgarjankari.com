import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Spinner from "../components/Spinner";

export const ProtectedRoutes = () => {
    const { currentUser, loading } = useAuth();

    if (loading) return <Spinner />;

    if (!currentUser) return <Navigate to="/login" />;

    if (!currentUser.emailVerified) return <Navigate to="/verifyemail" />;

    return <Outlet />;
}
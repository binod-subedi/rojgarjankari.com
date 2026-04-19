import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const EmployerDashboard = () => {
    const currentUser = useAuth();
    if (currentUser.userData.role === 'user') {
        return <Navigate to='/' />
    }
    return (
        <div><span>EmployerDashboard - Under Construction</span>
        </div>
    )
}
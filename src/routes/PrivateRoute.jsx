import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth(); // এখানে object destructuring
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/";

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }

    if (!user) {
        return (
            <Navigate state={{ from: location.pathname }} to="/login" replace />
        );
    }

    return children;
};

export default PrivateRoute;

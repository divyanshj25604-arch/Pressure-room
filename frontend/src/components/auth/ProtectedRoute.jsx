import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { token, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
  
export default ProtectedRoute;

import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const { login, logout } = useAuth();
    const navigate = useNavigate();
    function handleLogin() {
        const dummyToken = "dummy-token";
        const dummyUser = { name: "Test User" };
        login(dummyToken, dummyUser);
        navigate("/dashboard");
    }
    function handleLogout() {
        logout();
        navigate("/login");
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <button
                onClick={handleLogin}
                className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Login
            </button>
            <h1 className="text-2xl font-bold mt-10">logout</h1>
            <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
            
        </div>
    );
}

export default AuthPage;
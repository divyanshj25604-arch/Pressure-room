import useAuth from "../hooks/useAuth";
import AuthForm from "../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");

    function handleLogin(email, password) {
        const dummyToken = "dummy-token";
        const dummyUser = { name: email };
        login(dummyToken, dummyUser);
        navigate("/dashboard");
    }
    function handleLogout() {
        logout();
        navigate("/login");
    }
    function handleSignup(name, email, password) {
        const dummyToken = "dummy-token";
        const dummyUser = { name };
        login(dummyToken, dummyUser);
        navigate("/dashboard");
    }
    function handleToggleMode() {
        setMode(mode === "login" ? "signup" : "login");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
            <AuthForm mode={mode} onLogin={handleLogin} onSignup={handleSignup} onToggleMode={handleToggleMode} />
        </div>
    );
}

export default AuthPage;
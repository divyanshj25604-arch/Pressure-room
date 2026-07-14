import useAuth from "../hooks/useAuth";
import AuthForm from "../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";

function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [error, setError] = useState("");

    async function handleLogin(email, password) {
        try {
            setError("");
            const data = await loginUser(email, password);

            login(data.access_token, data.user);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError(err.message || "Login failed");
        }
    }
    async function handleSignup(name, email, password) {
        try {
            setError("");
            await registerUser(name, email, password);

            // optional: auto login after signup
            const data = await loginUser(email, password);

            login(data.access_token, data.user);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError(err.message || "Signup failed");
        }
    }
    function handleToggleMode() {
        setMode(mode === "login" ? "signup" : "login");
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] px-4">
            {error && <p role="alert" className="mb-4 text-sm text-red-400">{error}</p>}
            <AuthForm key={mode} mode={mode} onLogin={handleLogin} onSignup={handleSignup} onToggleMode={handleToggleMode} />
        </div>
    );
}

export default AuthPage;

import useAuth from "../hooks/useAuth";
import AuthForm from "../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";

function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");

    async function handleLogin(email, password) {
        try {
            const data = await loginUser(email, password);

            login(data.access_token, { email });

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    }
    async function handleSignup(name, email, password) {
        try {
            await registerUser(name, email, password);

            // optional: auto login after signup
            const data = await loginUser(email, password);

            login(data.access_token, { name, email });

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Signup failed");
        }
    }
    function handleToggleMode() {
        setMode(mode === "login" ? "signup" : "login");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
            <AuthForm key={mode} mode={mode} onLogin={handleLogin} onSignup={handleSignup} onToggleMode={handleToggleMode} />
        </div>
    );
}

export default AuthPage;

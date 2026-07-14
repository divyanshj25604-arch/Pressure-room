import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function normalizeUser(data) {
    if (!data) return null;

    return {
        ...data,
        name: data.name || data.email,
    };
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("token")));

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            return;
        }

        async function verify() {
            try {
                const res = await fetch(`${API_URL}/me`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (!res.ok) throw new Error("Invalid token");

                const data = await res.json();

                setToken(storedToken);
                setUser(normalizeUser(data));

            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        }

        verify();
    }, []);

    function login(token, user) {
        setToken(token);
        setUser(normalizeUser(user));
        localStorage.setItem("token", token);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

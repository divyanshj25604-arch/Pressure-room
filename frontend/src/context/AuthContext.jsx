import React from "react";
import { useState, useEffect } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            setLoading(false);
            return;
        }

        async function verify() {
            try {
                const res = await fetch("http://localhost:8000/me", {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (!res.ok) throw new Error("Invalid token");

                const data = await res.json();

                setToken(storedToken);
                setUser({ name: data.sub });

            } catch (err) {
                logout();
            } finally {
                setLoading(false);
            }
        }

        verify();
    }, []);

    function login(token, user) {
        setToken(token);
        setUser(user);
        console.log("Logged in:", user);
        localStorage.setItem("token", token);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
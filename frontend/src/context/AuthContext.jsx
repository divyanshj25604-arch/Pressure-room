import React from "react";
import { useState, useEffect } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setUser({ name: "Test User" });
        }
    }, []);

    function login(token, user) {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
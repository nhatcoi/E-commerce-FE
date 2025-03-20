import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useCart } from "./CartContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const cart = useCart(); // Get the entire cart context
    const syncCartWithServer = cart?.syncCartWithServer || (async () => {});  // Provide fallback

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await axios.get("/auth/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error("Auth error:", error);
                    logout(); // Token invalid, logout
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("/auth/login", { email, password });
            const { token, user } = response.data;
            localStorage.setItem("authToken", token);
            setUser(user);
            if (syncCartWithServer) {
                await syncCartWithServer(); // Merge cart from localStorage with server
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
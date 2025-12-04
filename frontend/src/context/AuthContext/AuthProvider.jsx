import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("session");
            if (saved) {
                const session = JSON.parse(saved);
                setUser(session);
            }
        } catch (error) {
            sessionStorage.removeItem("session");
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (name, password) => {
        if (name === "admin" && password === "1234") {
            const session = { 
                name, 
                role: "admin",
                loginTime: new Date().toISOString() 
            };
            setUser(session);
            sessionStorage.setItem("session", JSON.stringify(session));
            return { success: true, message: "Inicio de sesión exitoso" };
        }
        
        return { success: false, message: "Credenciales incorrectas" };
    };

    const logout = () => {
        try {
            sessionStorage.removeItem("session");
            setUser(null);
            return { success: true, message: "Sesión cerrada correctamente" };
        } catch (error) {
            return { success: false, message: "Error al cerrar sesión" };
        }
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const value = {
        user,
        loading,
        login,
        logout,
        hasRole,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
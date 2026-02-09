import { createContext, useContext, useState, useEffect } from "react";
import { useNotification } from "./NotificationContext.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { showNotification } = useNotification();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    if (confirm("¿Desea cerrar sesión?")) {
      localStorage.removeItem("token");
      setToken(null);
      showNotification("✅ Sesión cerrada", "success");
    }
  };

  const isAuthenticated = !!token && token !== "null";

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
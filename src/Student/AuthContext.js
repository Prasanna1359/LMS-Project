import React, { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));

  useEffect(() => {
    // Check if the access token exists in local storage
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  // Login Function (stores token in localStorage)
  const login = (token) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
  };

  // Logout Function (removes token)
  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access Auth Context
export const useAuth = () => useContext(AuthContext);

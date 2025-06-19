import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // We check if the user is authenticated
  const checkAuthStatus = async () => {
    setLoading(true);

    if (authService.isAuthenticated()) {
      setIsAuthenticated(true);
      try {
        const userDetails = await authService.getUserDetails();
        setUser(userDetails);
      } catch (error) {
        // If getUserDetails fails, logout the user out of the session
        logout();
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setLoading(false);
  };

  // When we do a successful login, we update the state so it's considered as Authenticated
  const login = async () => {
    if (authService.isAuthenticated()) {
      setIsAuthenticated(true);

      try {
        const userDetails = await authService.getUserDetails();
        setUser(userDetails);
      } catch (error) {
        // User details fetch failed, but login still successful
      }
      return true;
    }

    return false;
  };

  const logout = () => {
    // Clear authentication service data
    authService.logout();

    // Clear context state
    setIsAuthenticated(false);
    setUser(null);

    // Clear the localStorage items
    localStorage.removeItem("session_id");
    localStorage.removeItem("request_token");
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

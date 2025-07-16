// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider wraps your app and holds login state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(JSON.stringify(storedUser)));
    }
  }, []);

  // ✅ THIS is the login function you're asking about
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("token", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

import { createContext, useContext, useEffect, useState } from "react";
import { getMeRequest, loginRequest, logoutRequest } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (data) => {
    const result = await loginRequest(data);

    if (!result.success) {
      return result;
    }

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    setUser(result.user);

    return result;
  };

  const logout = async () => {
    await logoutRequest();
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const result = await getMeRequest();

      if (result.success) {
        setUser(result.user);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }

      setIsLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

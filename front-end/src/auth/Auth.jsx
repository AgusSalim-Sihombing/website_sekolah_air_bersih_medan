import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [idAdmin, setIdAdmin] = useState(() => localStorage.getItem("id"));

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const setAuthIdAdmin = (newIdAdmin) => {
    setIdMitra(newIdMitra);
    localStorage.setItem("idAdmin", newIdAdmin);
  };

  return (
    <AuthContext.Provider
      value={{ token, setAuthToken, idAdmin, setAuthIdAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
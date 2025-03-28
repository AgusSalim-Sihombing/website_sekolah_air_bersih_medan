import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(() => localStorage.getItem("token"));
//   const [idAdmin, setIdAdmin] = useState(() => localStorage.getItem("id"));

//   const setAuthToken = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//   };

//   const setAuthIdAdmin = (newIdAdmin) => {
//     setIdAdmin(newIdMitra);
//     localStorage.setItem("idAdmin", newIdAdmin);  
//   };

//   return (
//     <AuthContext.Provider
//       value={{ token, setAuthToken, idAdmin, setAuthIdAdmin }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
export const AuthProvider = ({ children = null }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [idAdmin, setIdAdmin] = useState(() => localStorage.getItem("idAdmin") || "");

  const setAuthToken = (newToken = "") => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const setAuthIdAdmin = (newIdAdmin = "") => {
    setIdAdmin(newIdAdmin);
    localStorage.setItem("idAdmin", newIdAdmin);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, idAdmin, setAuthIdAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
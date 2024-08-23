import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ isOpenLogin, setIsOpenLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

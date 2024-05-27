import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextPriovider = ({ children }) => {
  const [user, seUser] = useState(null);
  const [isAuthenticaded, setIsAuthenticaded] = useState(undefined);

  useEffect(() => {
      setIsAuthenticaded(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth");
  }
  return value;
};

import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextPriovider = ({ children }) => {
  const [user, seUser] = useState(null);
  const [isAuthenticaded, setIsAuthenticaded] = useState(undefined);

  useEffect(() => {
    setIsAuthenticaded(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, senha);
    } catch (err) {}
  };

  const registro = async (nome, email, senha, avatarUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, senha);

      await setDoc(doc(db, "users", response?.user?.uid), {
        nome,
        avatarUrl,
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (err) {
      console.log(err);
      return { success: false, msg: err };
    }
  };

  const logout = async () => {
    try {
      await signOut();
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.messase, error: err };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded, registro, logout }}>
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

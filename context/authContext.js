import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

export const AuthContext = createContext();

export const AuthContextPriovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticaded, setIsAuthenticaded] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticaded(true);
        setUser(user);
      } else {
        setIsAuthenticaded(false);
        setUser(null);
      }
    });
    setIsAuthenticaded(false);

    return unsub;
  }, []);

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
      await signOut(auth);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.message, error: err };
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

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
    return unsub;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message, error };
    }
  };

  const register = async (email, password, usernname, avatarUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("aqui", response?.user);
      // setUser(response?.user);
      // setIsAuthenticaded(true);

      await setDoc(doc(db, "users", response?.user?.uid), {
        usernname,
        avatarUrl,
        userID: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Email inválido";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "Email já cadastrado";
      if (msg.includes("(auth/weak-password)"))
        msg = "A senha deve conter no mínimo 6 caracteres";
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded, register, logout }}>
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

<<<<<<< Updated upstream
import { createContext, useContext, useEffect, useState } from "react";
=======
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { auth, db } from "../firebaseConfig";
>>>>>>> Stashed changes

export const AuthContext = createContext();

export const AuthContextPriovider = ({ children }) => {
<<<<<<< Updated upstream
  const [user, seUser] = useState(null);
  const [isAuthenticaded, setIsAuthenticaded] = useState(undefined);

  useEffect(() => {
      setIsAuthenticaded(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded }}>
=======
  const [user, setUser] = useState(null);
  const [isAuthenticaded, setIsAuthenticaded] = useState(false);

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

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded, registro }}>
>>>>>>> Stashed changes
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

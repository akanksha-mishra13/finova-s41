import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../config/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // EMAIL SIGNUP
  const signup = async (
    name,
    email,
    password
  ) => {
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    if (name) {
      await updateProfile(result.user, {
        displayName: name,
      });
    }

    return result.user;
  };

  // EMAIL LOGIN
  const login = async (
    email,
    password
  ) => {
    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return result.user;
  };

  // GOOGLE LOGIN / SIGNUP
  const loginWithGoogle = async () => {
    const result =
      await signInWithPopup(
        auth,
        googleProvider
      );

    return result.user;
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
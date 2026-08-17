import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
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

let googleLoginInProgress = false;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const initializeAuth = async () => {
      try {
        await setPersistence(
          auth,
          browserLocalPersistence
        );

        unsubscribe = onAuthStateChanged(
          auth,
          (currentUser) => {
            setUser(currentUser);
            setLoading(false);
          }
        );

      } catch (error) {
        console.error(
          "AUTH INITIALIZATION ERROR:",
          error
        );

        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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

  const loginWithGoogle = async () => {
    if (googleLoginInProgress) {
      throw new Error(
        "Google sign-in is already in progress."
      );
    }

    googleLoginInProgress = true;

    try {
      await setPersistence(
        auth,
        browserLocalPersistence
      );

      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      return result.user;

    } finally {
      googleLoginInProgress = false;
    }
  };

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


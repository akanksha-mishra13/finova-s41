import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("finova_user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "finova_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("finova_user");
    }
  }, [user]);

  const login = (email, password) => {
    // Temporary frontend authentication.
    // Backend authentication will replace this later.

    const savedUsers =
      JSON.parse(
        localStorage.getItem("finova_users")
      ) || [];

    const existingUser = savedUsers.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      name: existingUser.name,
      email: existingUser.email,
    };

    setUser(loggedInUser);

    return {
      success: true,
    };
  };

  const signup = (name, email, password) => {
    const savedUsers =
      JSON.parse(
        localStorage.getItem("finova_users")
      ) || [];

    const alreadyExists = savedUsers.some(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      name,
      email,
      password,
    };

    savedUsers.push(newUser);

    localStorage.setItem(
      "finova_users",
      JSON.stringify(savedUsers)
    );

    setUser({
      name,
      email,
    });

    return {
      success: true,
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
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
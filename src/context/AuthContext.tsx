"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserTypes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  occupation?: string;
  dateOfBirth?: string;
}

interface AuthState {
  loggedIn: boolean;
  user: UserTypes | null;
}

interface UserContextType {
  user: UserTypes | null;
  loggedIn: boolean;
  login: (response: UserTypes, token: string) => Promise<void>;
  updateProfile: (response: UserTypes) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<AuthState>({
    loggedIn: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (response: UserTypes, token: string) => {
    const newState = { user: response, loggedIn: true };
    setUser(newState);
    localStorage.setItem("auth", JSON.stringify(newState));
    localStorage.setItem("token", token);
  };

  // Logout function
  const logout = () => {
    const newState = { user: null, loggedIn: false };
    setUser(newState);
    localStorage.removeItem("auth");
  };

  const updateProfile = (response: UserTypes) => {
    const newState = { user: response, loggedIn: true };
    setUser(newState);
    localStorage.setItem("auth", JSON.stringify(newState));
  };

  return (
    <AuthContext.Provider
      value={{
        user: user.user,
        loggedIn: user.loggedIn,
        login,
        logout,
        loading,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

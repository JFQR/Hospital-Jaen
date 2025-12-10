// context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import type {ReactNode} from 'react'

interface AuthState {
  access: string | null;
  refresh: string | null;
  userId: string | null;
  is_active: string | null;
}

interface AuthContextType {
  auth: AuthState;
  login: (data: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => ({
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
    userId: localStorage.getItem("user_id"),
    is_active: localStorage.getItem("is_active"),
  }));  
  
  const login = ({ access, refresh, userId, is_active }: AuthState) => {
    localStorage.setItem("access_token", access ?? "");
    localStorage.setItem("refresh_token", refresh ?? "");
    localStorage.setItem("user_id", userId ?? "");
    localStorage.setItem("is_active", is_active ?? "");
    setAuth({ access, refresh, userId, is_active });
  };  
  
  const logout = () => {
    localStorage.clear()
    setAuth({ access: null, refresh: null, userId: null, is_active:null });
  };  
  
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


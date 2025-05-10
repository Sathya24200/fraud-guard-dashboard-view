
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

type UserRole = "admin" | "user" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for users
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user" as UserRole
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // This is a mock implementation - in production, validate against a real backend
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      toast.success("Login successful");
      return true;
    }
    
    toast.error("Invalid credentials");
    return false;
  };

  const logout = () => {
    setUser(null);
    toast.info("You've been logged out");
  };

  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


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
  login: (email: string, password: string, adminOnly?: boolean) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  getAllUsers: () => User[];
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
  const [users, setUsers] = useState(MOCK_USERS);

  const login = async (email: string, password: string, adminOnly = false) => {
    // This is a mock implementation - in production, validate against a real backend
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // If adminOnly is true, only allow admin users
      if (adminOnly && foundUser.role !== "admin") {
        toast.error("Access denied. Admin privileges required.");
        return false;
      }
      
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      toast.success("Login successful");
      return true;
    }
    
    toast.error("Invalid credentials");
    return false;
  };

  const register = async (email: string, password: string, name: string) => {
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      toast.error("Email already in use");
      return false;
    }
    
    // Create new user (with auto-incremented ID)
    const newUser = {
      id: String(users.length + 1),
      email,
      password,
      name,
      role: "user" as UserRole
    };
    
    // Add to users array
    setUsers([...users, newUser]);
    toast.success("Account created successfully");
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.info("You've been logged out");
  };

  const isAdmin = () => user?.role === "admin";

  // Function to get all users (for admin panel)
  const getAllUsers = () => {
    // Return users without passwords for security reasons
    return users.map(({ password, ...rest }) => rest);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, getAllUsers }}>
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

import { createContext, useContext, useState, useEffect } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

// Default admin password - can be changed in localStorage
const DEFAULT_ADMIN_PASSWORD = "HopeServices2024";

export function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    const authToken = localStorage.getItem("adminAuthToken");
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    // Get admin password from localStorage or use default
    const adminPassword = localStorage.getItem("adminPassword") || DEFAULT_ADMIN_PASSWORD;

    if (password === adminPassword) {
      // Create a simple token (timestamp + random)
      const token = `${Date.now()}-${Math.random()}`;
      localStorage.setItem("adminAuthToken", token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminAuthToken");
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}

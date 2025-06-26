import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  fullName: string;
  email: string;
  phone?: string;
  credits: number;
  referralCode: string;
  avatar?: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  // Add other product properties you need
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    referralCode?: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => void;
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const addToCompare = (product: Product) => {
    setCompareItems((prev) => {
      // Prevent duplicates
      if (prev.some((item) => item.id === product.id)) return prev;
      // Max 2 items
      if (prev.length >= 2) return [prev[1], product];
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };
  const login = async (email: string, password: string) => {
    // In a real app, you would call your API here
    console.log("Login attempt with:", email, password);
    // Mock user for demo
    setUser({
      fullName: "John Doe",
      email,
      phone: "+1234567890",
      credits: 100,
      referralCode: "Wethenticate123",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    });
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    referralCode?: string;
  }) => {
    // In a real app, you would call your API here
    console.log("Signup with:", userData);
    // Mock user creation for demo
    setUser({
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      credits: 100, // Default credits
      referralCode: generateReferralCode(),
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 50)}.jpg`,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedUser: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedUser });
    }
  };

  const generateReferralCode = () => {
    return (
      "Wethenticate" + Math.random().toString(36).substring(2, 8).toUpperCase()
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
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

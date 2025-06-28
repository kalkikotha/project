import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  username: string;
  email: string;
  phone?: string;
  subscriptionActive: 0 | 1;
  credits: string;
  referralCode?: string;
  referrerCode?: string;
  avatar?: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  nutrition?: {
    "MUFA+PUFA"?: string;
    "Saturated Fat"?: string;
    "Trans Fat"?: string;
    "Butryic Acid"?: string;
    "Caproic Acid"?: string;
  };
  price?: string;
  // Add other product properties you need
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    message?: string;
    user?: any;
    token?: string;
  }>;
  signup: (userData: {
    username: string;
    email: string;
    password: string;
    phone: string;
    otp: string;
    subscriptionActive: 0 | 1;
    credits: string;
    referrerCode: string;
    avatar?: string;
  }) => Promise<{
    success: boolean;
    message?: string;
    user?: any;
    token?: string;
  }>;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => void;
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string, category: string) => void;
  clearCompare: () => void;
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string, category: string) => void;
  clearWishlist: () => void;
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string, category: string) => void;
  clearCart: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCompare = (product: Product) => {
    setCompareItems((prev) => {
      // Prevent duplicates
      if (
        prev.some(
          (item) => item.id === product.id && item.category === product.category
        )
      )
        return prev;
      // Max 2 items
      if (prev.length >= 2) return [prev[1], product];
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string, category: string) => {
    setCompareItems((prev) =>
      prev.filter(
        (item) => !(item.category === category && item.id === productId)
      )
    );
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      // Prevent duplicates
      if (
        prev.some(
          (item) => item.id === product.id && item.category === product.category
        )
      ) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productId: string, category: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.category === category && item.id === productId)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      // Prevent duplicates
      if (
        prev.some(
          (item) => item.id === product.id && item.category === product.category
        )
      ) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string, category: string) => {
    setWishlistItems((prev) =>
      prev.filter(
        (item) => !(item.category === category && item.id === productId)
      )
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  useEffect(() => {
    if (!user) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, [user]);

  const login = async (
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message?: string;
    user?: any;
    token?: string;
  }> => {
    // In a real app, you would call your API here
    console.log("Login attempt with:", email, password);
    // Mock user for demo
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_API}/signin`,
        {
          email: email,
          password: password,
        }
      );
      const userData = response.data;
      if (userData.success) {
        console.log(userData);
        const userinfo = userData.user;
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: userinfo.username,
            email: userinfo.email,
            phone: userinfo?.phone,
            subscriptionActive: userinfo?.subscriptionActive,
            credits: userinfo.credits,
            referralCode: userinfo?.referralCode,
            avatar: userData?.avatar,
          })
        );
        localStorage.setItem("token", JSON.stringify(userData.token));
        setUser({
          username: userinfo.username,
          email: userinfo.email,
          phone: userinfo?.phone,
          subscriptionActive: userinfo?.subscriptionActive,
          credits: userinfo.credits,
          referralCode: userinfo?.referralCode,
          avatar: userData?.avatar,
        });
      }
      return userData;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return {
        success: false,
        message: `"Error fetching user details:", ${error}`,
      };
    }
  };

  const signup = async (userData: {
    username: string;
    email: string;
    password: string;
    phone: string;
    otp: string;
    subscriptionActive: 0 | 1;
    credits: string;
    referrerCode: string;
    avatar?: string;
  }) => {
    // In a real app, you would call your API here
    console.log("Signup with:", userData);
    // Mock user creation for demo

    const payload = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      otp: userData.otp,
      subscriptionActive: userData.subscriptionActive,
      credits: userData.credits,
      referralCode: generateReferralCode(),
      referrerCode: userData.referrerCode,
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 50)}.jpg`,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_API}/signup`,
        payload
      );
      if (response.data.success) {
        console.log(response.data);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            subscriptionActive: userData.subscriptionActive,
            credits: userData.credits,
            referralCode: generateReferralCode(),
            referrerCode: userData.referrerCode,
            avatar: `https://randomuser.me/api/portraits/${
              Math.random() > 0.5 ? "men" : "women"
            }/${Math.floor(Math.random() * 50)}.jpg`,
          })
        );

        setUser({
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          subscriptionActive: userData.subscriptionActive,
          credits: userData.credits,
          referralCode: generateReferralCode(),
          referrerCode: userData.referrerCode,
          avatar: `https://randomuser.me/api/portraits/${
            Math.random() > 0.5 ? "men" : "women"
          }/${Math.floor(Math.random() * 50)}.jpg`,
        });
      }
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("user", JSON.stringify(null));
  };

  const updateProfile = (updatedUser: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedUser });
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));
    }
  };

  const generateReferralCode = () => {
    return "IngView" + Math.random().toString(36).substring(2, 8).toUpperCase();
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
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
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

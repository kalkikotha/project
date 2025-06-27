// ModalContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  showLogin: boolean;
  setShowLogin: (val: boolean) => void;
  showSignup: boolean;
  setShowSignup: (val: boolean) => void;
  showProfile: boolean;
  setShowProfile: (val: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <ModalContext.Provider
      value={{ showLogin, setShowLogin, showSignup, setShowSignup, showProfile, setShowProfile }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

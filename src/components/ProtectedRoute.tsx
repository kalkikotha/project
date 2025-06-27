import { useAuth } from "./AuthContext";
import { useModal } from "./ModalContext";
import { useEffect } from "react";
import { Lock } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const { setShowLogin, setShowSignup } = useModal();

  useEffect(() => {
    console.log(user);
    if (!user) {
      setShowLogin(true);
      setShowSignup(false);
    }
  }, [user]);

  return user ? (
    children
  ) : (
    <div className="flex flex-col items-center justify-center p-8 bg-bg-light rounded-lg shadow-card">
      <Lock className="text-brand-400 mb-4" size={32} />
      <h3 className="text-lg font-medium text-text-primary mb-2">
        Authentication Required
      </h3>
      <p className="text-text-secondary mb-6 text-center">
        Please login to access this content
      </p>
      <button
        onClick={() => setShowLogin(true)}
        className="bg-brand hover:bg-brand-dark text-text-inverted px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Login Now
      </button>
    </div>
  ); // You could return a loading spinner if desired
};

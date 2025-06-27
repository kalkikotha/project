import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginCard = ({
  onSwitchToSignup,
  onSucess,
}: {
  onSwitchToSignup: () => void;
  onSucess: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login(email, password);

      if (!response.success) {
        setError(response.message || "Login failed");
        return;
      } else {
        onSucess(); // Call the success callback
        navigate("/profile"); // Navigate to profile page
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-text-inverted rounded-3xl shadow-xl overflow-hidden w-full min-w-[400px] max-w-md">
      <div className="bg-gradient-to-r from-brand to-brand-dark p-6 text-center">
        <h2 className="text-2xl font-bold text-text-inverted">Welcome Back!</h2>
        <p className="text-text-inverted/90 mt-1">Login to your account</p>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-4 p-3 bg-ui-error/10 text-ui-error rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-primary"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-text-secondary" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-ui-gray rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-primary"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-text-secondary" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-ui-gray rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    className="text-text-secondary hover:text-text-primary"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-text-secondary hover:text-text-primary"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-brand focus:ring-brand border-ui-gray rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-text-primary"
              >
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm text-brand hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-brand-100 to-brand text-text-inverted py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity ${
              isLoading ? "opacity-80" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-brand font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default LoginCard;

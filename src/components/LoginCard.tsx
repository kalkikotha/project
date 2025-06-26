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
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-md">
      <div className="bg-gradient-to-r from-primary-100 to-primary-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
        <p className="text-white/90 mt-1">Login to your account</p>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                    className="text-gray-400 hover:text-gray-600"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-gray-400 hover:text-gray-600"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-primary-100 to-primary-200 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity ${
              isLoading ? "opacity-80" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-primary font-medium hover:underline"
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

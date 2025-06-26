import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { User, Mail, Lock, Phone, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignupCard = ({
  onSwitchToLogin,
  onSucess,
}: {
  onSwitchToLogin: () => void;
  onSucess: () => void;
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
    subscriptionActive: 0,
    credits: "100",
    referrerCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [showOTP, setShowOPT] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    if (
      !formData.email ||
      !formData.password ||
      !formData.password ||
      !formData.otp
    ) {
      setError("Please enter all fields");
      console.log(showOTP);
      return;
    }
    try {
      const response = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        otp: formData.otp,
        subscriptionActive: 0,
        credits: formData.credits,
        referrerCode: formData.referrerCode,
      });

      if (!response.success) {
        setError(response.message || "User registration failed");
        return;
      } else {
        onSucess(); // Call the success callback
        navigate("/profile"); // Navigate to profile page
      }
    } catch (err) {
      setError("Error creating account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtp = async (e: any) => {
    e.preventDefault();
    console.log("handleOTP");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_API}/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }), // Include email in the request body
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        setShowOPT(true);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-md">
      <div className="bg-gradient-to-r from-primary-100 to-primary-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <p className="text-white/90 mt-1">Join Wethenticate today</p>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Lock
                    size={18}
                    className="text-gray-400 hover:text-gray-600"
                  />
                ) : (
                  <Lock
                    size={18}
                    className="text-gray-400 hover:text-gray-600"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="referrerCode"
              className="block text-sm font-medium text-gray-700"
            >
              Referral Code (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Gift size={18} className="text-gray-400" />
              </div>
              <input
                id="referralCode"
                name="referralCode"
                type="text"
                value={formData.referrerCode}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Wethenticate123"
              />
            </div>
          </div>

          {showOTP && (
            <div className="space-y-1">
              <label
                htmlFor="OTP"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div> */}
                <input
                  id="otp"
                  name="otp"
                  type="tel"
                  value={formData.otp}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  // placeholder="123456"
                />
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {showOTP == true ? (
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-primary-100 to-primary-200 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity ${
                isLoading ? "opacity-80" : ""
              }`}
              onClick={handleSubmit}
            >
              {isLoading ? "Creating account..." : "Submit"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-primary-100 to-primary-200 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity ${
                isLoading ? "opacity-80" : ""
              }`}
              onClick={handleOtp}
            >
              {isLoading ? "Creating account..." : "Request OTP"}
            </button>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-primary font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;

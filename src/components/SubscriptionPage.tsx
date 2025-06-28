import { useState } from "react";
import { Check, Mail, Clock, Calendar } from "lucide-react";

const SubscriptionPage = () => {
  const [billingCycle, setBillingCycle] = useState(null); // 'monthly' or 'yearly'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState("");

  const pricing = {
    monthly: 300,
    yearly: 999,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      if (!verificationSent) {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_API}/subscription-send-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }), // Include email in the request body
          }
        );
        const data = await response.json();
        console.log(data);
        if (data) {
          setVerificationSent(true);
          setIsProcessing(false);
          return;
        }
      }

      // Verify OTP and activate subscription
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_API}/verify-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            billingCycle,
            amount: pricing[billingCycle],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }

      setSubscriptionSuccess(true);
    } catch (error) {
      console.error("Subscription error:", error);
      setError(
        "There was an error processing your subscription. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (subscriptionSuccess) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-bg-light rounded-lg shadow-card text-center">
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-brand-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2 font-heading">
          Subscription Activated!
        </h2>
        <p className="text-text-secondary mb-4">
          Your {billingCycle} plan for ₹{pricing[billingCycle]} has been
          activated.
        </p>
        <p className="text-text-secondary mb-6">
          A confirmation has been sent to {email}.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-brand hover:bg-brand-dark text-text-inverted py-3 rounded-lg font-medium transition-colors"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gradient-hero-start to-gradient-hero-end py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-text-primary sm:text-4xl font-heading">
            Subscribe Now
          </h1>
          <p className="mt-3 text-lg text-text-secondary">
            Choose your billing cycle and verify your email
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`p-6 rounded-lg border-2 transition-all ${
              billingCycle === "monthly"
                ? "border-brand-400 bg-brand-100"
                : "border-ui-gray hover:border-brand-300"
            }`}
          >
            <div className="flex flex-col items-center">
              <Clock className="text-brand-400 mb-2" size={24} />
              <span className="font-medium text-text-primary">Monthly</span>
              <span className="text-2xl font-bold mt-2">₹300</span>
              <span className="text-text-secondary text-sm mt-1">
                per month
              </span>
            </div>
          </button>

          <button
            onClick={() => setBillingCycle("yearly")}
            className={`p-6 rounded-lg border-2 transition-all ${
              billingCycle === "yearly"
                ? "border-brand-400 bg-brand-100"
                : "border-ui-gray hover:border-brand-300"
            }`}
          >
            <div className="flex flex-col items-center">
              <Calendar className="text-brand-400 mb-2" size={24} />
              <span className="font-medium text-text-primary">Yearly</span>
              <span className="text-2xl font-bold mt-2">₹999</span>
              <span className="text-text-secondary text-sm mt-1">per year</span>
              <span className="text-ui-success text-xs mt-1">Save ₹2600</span>
            </div>
          </button>
        </div>

        {billingCycle && (
          <div className="bg-bg-light rounded-lg shadow-card p-6">
            <form onSubmit={handleSubmit}>
              {!verificationSent ? (
                <>
                  <h2 className="text-xl font-bold text-text-primary mb-4 font-heading">
                    Enter Your Email
                  </h2>
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="text-text-secondary" size={18} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 px-4 py-3 border border-ui-gray rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-text-primary mb-4 font-heading">
                    Verify Your Email
                  </h2>
                  <div className="mb-4">
                    <p className="text-text-secondary mb-4">
                      We've sent a 6-digit OTP to {email}. Please enter it
                      below:
                    </p>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full px-4 py-3 border border-ui-gray rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-center text-lg"
                      maxLength={6}
                      required
                    />
                  </div>
                </>
              )}

              {error && (
                <div className="mb-4 p-3 bg-ui-error/10 text-ui-error rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="border-t border-ui-gray pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-text-secondary">Plan</span>
                  <span className="font-medium text-text-primary">
                    {billingCycle === "monthly" ? "Monthly" : "Yearly"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-text-secondary">Amount</span>
                  <span className="font-bold text-lg text-text-primary">
                    ₹{pricing[billingCycle]}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full bg-brand hover:bg-brand-dark text-text-inverted py-3 rounded-lg font-medium transition-colors ${
                    isProcessing ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isProcessing
                    ? "Processing..."
                    : verificationSent
                    ? "Activate Subscription"
                    : "Send OTP"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;

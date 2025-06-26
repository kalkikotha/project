import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import TrendingProducts from "./components/TrendingProducts";
import DiscountSection from "./archieve/DiscountSection";
import JustArrived from "./archieve/JustArrived";
import BlogSection from "./archieve/BlogSection";
import AppSection from "./archieve/AppSection";
import SearchTags from "./components/SearchTags";
import Features from "./components/Features";
import Footer from "./components/Footer";
import LoginCard from "./components/LoginCard";
import SignupCard from "./components/SignupCard";
import ProfilePage from "./components/ProfilePage";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ComparePage from "./components/ComparePage";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const MainContent = () => (
    <>
      <HeroSection />
      <CategorySection />
      {/* <BrandSection /> */}
      <TrendingProducts />
      {/* <DiscountSection /> */}
      {/* <JustArrived /> */}
      {/* <BlogSection /> */}
      {/* <AppSection /> */}
      <SearchTags />
      <Features />
    </>
  );

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white w-full">
          <Header
            onLoginClick={() => {
              setShowLogin(true);
              setShowSignup(false);
              setShowProfile(false);
            }}
            onProfileClick={() => {
              setShowProfile(true);
              setShowLogin(false);
              setShowSignup(false);
            }}
          />

          <main>
            {/* Auth Modals */}
            {(showLogin || showSignup) && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowLogin(false);
                      setShowSignup(false);
                    }}
                    className="absolute -top-10 right-0 text-white hover:text-gray-200"
                  >
                    <span>X</span>
                  </button>
                  {showLogin && (
                    <LoginCard
                      onSwitchToSignup={() => {
                        setShowLogin(false);
                        setShowSignup(true);
                      }}
                    />
                  )}
                  {showSignup && (
                    <SignupCard
                      onSwitchToLogin={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                      }}
                    />
                  )}
                </div>
              </div>
            )}

            <Routes>
              <Route
                path="/"
                element={showProfile ? <ProfilePage /> : <MainContent />}
              />
              <Route path="/products/:category" element={<ProductsPage />} />
              <Route
                path="/products/:category/:productId"
                element={<ProductDetailPage />}
              />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TrendingProducts from "./components/TrendingProducts";
import SearchTags from "./components/SearchTags";
import Features from "./components/Features";
import Footer from "./components/Footer";
import LoginCard from "./components/LoginCard";
import SignupCard from "./components/SignupCard";
import ProfilePage from "./components/ProfilePage";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ComparePage from "./components/ComparePage";
import ScrollToTop from "./components/ScrollToTop";
import CategorySection from "./components/CategorySection";
import WishlistPage from "./components/WishlistPage";
import SubscriptionPage from "./components/SubscriptionPage";
import { useModal } from "./components/ModalContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const {
    showLogin,
    setShowLogin,
    showSignup,
    setShowSignup,
    showProfile,
    setShowProfile,
  } = useModal();

  const MainContent = () => (
    <>
      <HeroSection />
      <CategorySection />
      <TrendingProducts />
      <SearchTags />
      <Features />
    </>
  );

  return (
    <AuthProvider>
      <Router>
        <div className="bg-bg-light">
          <div className="min-h-screen w-full max-w-[1024px] mx-auto bg-gradient-to-br from-gradient-hero-start to-gradient-hero-end">
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
              {(showLogin || showSignup) && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start p-4 overflow-y-auto">
                  <div className="relative">
                    {showLogin && (
                      <LoginCard
                        onSwitchToSignup={() => {
                          setShowLogin(false);
                          setShowSignup(true);
                        }}
                        onSucess={() => {
                          setShowLogin(false);
                          setShowSignup(false);
                        }}
                        onClose={() => {
                          setShowLogin(false);
                          setShowSignup(false);
                        }}
                      />
                    )}
                    {showSignup && (
                      <SignupCard
                        onSwitchToLogin={() => {
                          setShowSignup(false);
                          setShowLogin(true);
                        }}
                        onSucess={() => {
                          setShowLogin(false);
                          setShowSignup(false);
                        }}
                        onClose={() => {
                          setShowLogin(false);
                          setShowSignup(false);
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
              <ScrollToTop />
              <Routes>
                <Route
                  path="/"
                  element={showProfile ? <ProfilePage /> : <MainContent />}
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/products/:category" element={<ProductsPage />} />
                <Route
                  path="/products/:category/:productId"
                  element={
                    <ProtectedRoute>
                      <ProductDetailPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/compare"
                  element={
                    <ProtectedRoute>
                      <ComparePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subscription"
                  element={
                    <ProtectedRoute>
                      <SubscriptionPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

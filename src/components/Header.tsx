import { useState } from "react";
import { User, Heart, BarChart2, X, Menu } from "lucide-react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { SearchWithRecommendations } from "./SearchWithRecommendations";
import Infobanner from "./Infobanner";

interface HeaderProps {
  onLoginClick: () => void;
  onProfileClick: () => void;
}

const Header = ({ onLoginClick, onProfileClick }: HeaderProps) => {
  const { user, compareItems, wishlistItems } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Handle navigation for profile/login and close mobile menu
  const handleProfileClick = () => {
    if (user && Object.keys(user).length > 0) {
      navigate("/profile");
    } else {
      onLoginClick();
    }
    closeMobileMenu();
  };

  return (
    <>
      <header className="bg-transparent w-full">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center cursor-pointer">
                <svg
                  className="w-8 h-8 mr-2 text-brand"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M9 3V17M9 17C7.34315 17 6 18.3431 6 20C6 21.6569 7.34315 23 9 23C10.6569 23 12 21.6569 12 20C12 18.3431 10.6569 17 9 17ZM15 3V12M15 12C13.3431 12 12 13.3431 12 15C12 16.6569 13.3431 18 15 18C16.6569 18 18 16.6569 18 15C18 13.3431 16.6569 12 15 12Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-3xl font-bold text-brand">IngView</span>
                <sup className="ml-1 text-xs font-medium text-text-secondary">
                  LAB
                </sup>
              </a>
            </div>

            {/* Desktop Icons (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-4">
              {/* <Link
                to="/compare"
                state={{
                  product1: compareItems[0],
                  product2: compareItems[1],
                }}
                className="relative flex items-center gap-2 px-3 py-2 rounded-full hover:bg-brand bg-bg-dark hover:shadow-md transition-all"
              >
                <BarChart2 size={20} className="text-text-primary" />
                {compareItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs font-bold bg-ui-warning text-black rounded-full px-2 py-0.5 border border-bg-DEFAULT shadow-sm">
                    {compareItems.length}
                  </span>
                )}
              </Link> */}
              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => navigate("/compare")}
              >
                <button className="relative p-2 rounded-full transition-colors">
                  <BarChart2 size={20} className="text-text-primary" />
                  {compareItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs font-bold text-black px-2 py-0.5 shadow-sm">
                      {compareItems.length}
                    </span>
                  )}{" "}
                </button>
                <span>Compare</span>
              </div>
              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <button className="p-2 rounded-full transition-colors">
                  <User size={20} />
                </button>
                <span>Profile</span>
              </div>
              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => navigate("/wishlist")}
              >
                <button className="relative flex items-center gap-2 px-3 py-2 rounded-full transition-all cursor-pointer">
                  <Heart size={20} className="text-text-primary" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs font-bold bg-ui-warning text-black rounded-full px-2 py-0.5 border border-bg-DEFAULT shadow-sm">
                      {wishlistItems.length}
                    </span>
                  )}{" "}
                </button>{" "}
                <span>Wishlist</span>
              </div>
            </div>

            {/* Mobile Menu Button (visible only on mobile) */}
            <button
              className="md:hidden p-2 rounded-full bg-bg-dark hover:bg-brand-DEFAULT transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <Infobanner />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3 mx-auto">
            <SearchWithRecommendations />
          </div>
        </div>
      </header>

      {/* Mobile Menu (Slide-in from right) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-brand-light shadow-lg p-6 transform transition-transform">
            <div className="flex flex-col items-end gap-6 mt-10">
              <Link
                to="/compare"
                state={{
                  product1: compareItems[0],
                  product2: compareItems[1],
                }}
                className="relative flex items-center gap-3 px-4 py-3 rounded-full hover:shadow-md transition-all w-full"
                onClick={closeMobileMenu}
              >
                <BarChart2 size={24} />
                <span>Compare</span>
                {compareItems.length > 0 && (
                  <span className="ml-auto text-sm font-bold bg-ui-warning text-black rounded-full px-2 py-0.5">
                    {compareItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={handleProfileClick}
                className="flex items-center gap-3 px-4 py-3 rounded-full  hover:shadow-md transition-all w-full"
              >
                <User size={24} />
                <span>{user ? "Profile" : "Login"}</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 rounded-full  hover:shadow-md transition-all w-full">
                <Heart size={24} />
                <span>Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

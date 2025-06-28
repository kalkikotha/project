import { useState } from "react";
import { User, Heart, BarChart2, X, Menu, ShoppingCart } from "lucide-react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { SearchWithRecommendations } from "./SearchWithRecommendations";
import Infobanner from "./Infobanner";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onLoginClick: () => void;
  onProfileClick: () => void;
}

const SEARCH_VISIBLE_PATHS = ["/", "/products", "/products/*"];

const Header = ({ onLoginClick, onProfileClick }: HeaderProps) => {
  const { user, compareItems, wishlistItems, cartItems } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const { pathname } = useLocation();
  const showSearch = SEARCH_VISIBLE_PATHS.some((path) => {
    if (path.endsWith("/*")) {
      const basePath = path.replace("/*", "");
      return pathname.startsWith(basePath);
    }
    return pathname === path;
  });
  // Handle navigation for profile/login and close mobile menu
  const handleProfileClick = () => {
    if (user && Object.keys(user).length > 0) {
      navigate("/profile");
    } else {
      onLoginClick();
    }
    closeMobileMenu();
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price || 99),
      0
    );
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
              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => navigate("/compare")}
              >
                <button className="relative p-2 rounded-full transition-colors">
                  <BarChart2 size={20} className="text-text-primary" />
                  {compareItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs font-bold bg-ui-warning text-black rounded-full px-2 py-0.5 border border-bg-DEFAULT shadow-sm">
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
              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => setIsCartOpen(true)}
              >
                <button className="relative flex items-center gap-2 px-3 py-2 rounded-full transition-all cursor-pointer">
                  <ShoppingCart size={20} className="text-text-primary" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs font-bold bg-ui-warning text-black rounded-full px-2 py-0.5 border border-bg-DEFAULT shadow-sm">
                      {cartItems.length}
                    </span>
                  )}{" "}
                </button>{" "}
                <span>Cart</span>
              </div>
            </div>

            {/* cart menu */}
            <>
              {isCartOpen && (
                <div className="absolute inset-0 z-50 ">
                  {/* Backdrop */}
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={() => setIsCartOpen(false)}
                  />

                  {/* Cart Panel */}
                  <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pb-2 border-b">
                      <h3 className="text-xl font-bold">
                        Your Cart ({cartItems.length})
                      </h3>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X size={20} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Cart Items - Scrollable Area */}
                    {cartItems.length > 0 ? (
                      <>
                        <div className="flex-1 overflow-y-auto py-2 space-y-4">
                          {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                              <ShoppingCart size={48} className="mb-4" />
                              <p>Your cart is empty</p>
                            </div>
                          ) : (
                            cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-4 py-3 border-b"
                              >
                                {/* Product Image */}
                                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <h6 className="font-medium text-gray-900">
                                        {item.name}
                                      </h6>
                                      <span className="font-medium text-gray-900">
                                        ₹{Number(item.price || 99) * 1}
                                      </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                      {item.category}
                                    </p>
                                  </div>

                                  {/* Quantity Controls */}
                                  {/* <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2">
                                      <button className="w-7 h-7 flex items-center justify-center border rounded-md hover:bg-gray-50">
                                        -
                                      </button>
                                      <span className="w-8 text-center">
                                        {item.quantity}
                                      </span>
                                      <button className="w-7 h-7 flex items-center justify-center border rounded-md hover:bg-gray-50">
                                        +
                                      </button>
                                    </div>
                                    <button className="text-sm text-red-500 hover:text-red-700">
                                      Remove
                                    </button>
                                  </div> */}
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Footer */}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">
                              ₹{Number(calculateTotal())}
                            </span>
                          </div>
                          {/* <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium">Free</span>
                          </div> */}

                          <div className="flex justify-between items-center py-3 border-t border-b font-bold text-lg">
                            <span>Total</span>
                            <span> ₹{Number(calculateTotal())}</span>
                          </div>

                          <button
                            className="w-full bg-brand hover:bg-brand-dark text-white py-3 rounded-lg font-medium mt-4 transition-colors disabled:opacity-50"
                            disabled={cartItems.length === 0}
                          >
                            Proceed to Checkout
                          </button>
                        </div>
                      </>
                    ) : (
                      <p>No items in the cart</p>
                    )}
                  </div>
                </div>
              )}
            </>

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

        {!(user && user.subscriptionActive) && <Infobanner />}

        {showSearch && (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-around py-3 mx-auto">
              <SearchWithRecommendations />
            </div>
          </div>
        )}
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
            <div className="flex flex-col items-start gap-6 mt-10">
              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => {
                  navigate("/compare");
                  setIsMobileMenuOpen(false);
                }}
              >
                <button className="relative p-2 rounded-full transition-colors">
                  <BarChart2 size={20} className="text-text-primary" />
                  {compareItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs font-bold bg-ui-warning text-black rounded-full px-2 py-0.5 border border-bg-DEFAULT shadow-sm">
                      {compareItems.length}
                    </span>
                  )}{" "}
                </button>
                <span>Compare</span>
              </div>

              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
              >
                <button className="p-2 rounded-full transition-colors">
                  <User size={20} />
                </button>
                <span>Profile</span>
              </div>

              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => {
                  navigate("/wishlist");
                  setIsMobileMenuOpen(false);
                }}
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

              <div
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <button className="relative flex items-center gap-2 px-3 py-2 rounded-full transition-all cursor-pointer">
                  <ShoppingCart size={20} className="text-text-primary" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs font-bold bg-ui-warning text-black rounded-full px-2 py-0.5 border border-bg-DEFAULT shadow-sm">
                      {cartItems.length}
                    </span>
                  )}{" "}
                </button>{" "}
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

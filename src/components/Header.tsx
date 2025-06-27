import { useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  BarChart2,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { SearchWithRecommendations } from "./SearchWithRecommendations";
import Infobanner from "./Infobanner";
interface HeaderProps {
  onLoginClick: () => void;
  onProfileClick: () => void;
}

const Header = ({ onLoginClick, onProfileClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, compareItems } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-transparent border-b border-gray-100 w-full">
        {/* Top Header */}
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            {/* Logo */}
            {/* Logo */}
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                {/* Test tube icon as visual element */}
                <svg
                  className="w-8 h-8 mr-2 text-primary"
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

                {/* Text with scientific styling */}
                <span className="text-3xl font-bold text-primary">IngView</span>

                {/* Optional subscript */}
                <sup className="ml-1 text-xs font-medium text-gray-500">
                  LAB
                </sup>
              </a>
            </div>

            {/* Search Bar - Desktop */}
            {/* <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="flex w-full bg-gray-50 rounded-2xl p-2">
                <select className="bg-transparent border-0 px-4 text-sm text-gray-600 focus:outline-none">
                  <option value="all">All Categories</option>
                  <option value="Serums">Serums</option>
                  <option value="Lotions">Lotions</option>
                  <option value="Shampoos">Shampoos</option>
                  <option value="Soaps">Soaps</option>
                  <option value="Creams">Creams</option>
                </select>
                <div className="flex-1 px-4">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full bg-transparent border-0 text-sm focus:outline-none"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div> */}

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Support - Desktop */}
              {/* <div className="hidden xl:block text-right">
                <span className="text-sm text-gray-500">For Support?</span>
                <h5 className="font-semibold text-dark">+980-34984089</h5>
              </div> */}

              {/* Action Icons */}
              <div className="flex items-center gap-2">
                <Link
                  to="/compare"
                  state={{
                    product1: compareItems[0],
                    product2: compareItems[1],
                  }}
                  className="relative flex items-center gap-2 px-3 py-2 rounded-full hover:bg-primary bg-gray-100 hover:shadow-md transition-all"
                >
                  <BarChart2 size={20} className="text-gray-700" />
                  {compareItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs font-bold bg-[#FFC43F] text-black rounded-full px-2 py-0.5 border border-white shadow-sm">
                      {compareItems.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={
                    user && Object.keys(user).length > 0
                      ? () => navigate("/profile")
                      : onLoginClick
                  }
                  className="p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  <User size={20} />
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors">
                  <Heart size={20} />
                </button>
                {/* <button
                  className="lg:hidden p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart size={20} />
                </button> */}
                <button
                  className="lg:hidden p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={20} />
                </button>
              </div>

              {/* Cart - Desktop */}
              {/* <div className="hidden lg:block">
                <button
                  className="text-right"
                  onClick={() => setIsCartOpen(true)}
                >
                  <span className="text-sm text-gray-500">Your Cart</span>
                  <div className="font-bold text-lg">$1290.00</div>
                </button>
              </div> */}
            </div>
          </div>
        </div>
        
        {/* Info banner */}
        <Infobanner />

        {/* Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3 mx-auto">
            <SearchWithRecommendations />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-4">
              <a
                href="#"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Women
              </a>
              <a
                href="#"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Men
              </a>
              <a
                href="#"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Kids
              </a>
              <a
                href="#"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Accessories
              </a>
              <a
                href="#"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Brand
              </a>
              <a
                href="#"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Sale
              </a>
              <a
                href="#"
                className="block py-2 text-dark hover:text-primary transition-colors"
              >
                Blog
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-96 bg-white p-6 shadow-xl">
            {/* <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div> */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-primary bg-primary-50 px-2 py-1 rounded-full text-sm">
                  3
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <h6 className="font-medium">Growers cider</h6>
                    <small className="text-gray-500">Brief description</small>
                  </div>
                  <span className="text-gray-600">$12</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h6 className="font-medium">Fresh grapes</h6>
                    <small className="text-gray-500">Brief description</small>
                  </div>
                  <span className="text-gray-600">$8</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h6 className="font-medium">Heinz tomato ketchup</h6>
                    <small className="text-gray-500">Brief description</small>
                  </div>
                  <span className="text-gray-600">$5</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total (USD)</span>
                  <strong>$25</strong>
                </div>
              </div>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Continue to checkout
            </button>
          </div>
        </div>
      )}

      {/* Search Sidebar */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-primary">Search</h3>
              <button onClick={() => setIsSearchOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex gap-0">
              <input
                className="flex-1 px-4 py-3 bg-gray-50 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                placeholder="What are you looking for?"
              />
              <button className="px-6 py-3 bg-dark text-white rounded-r-lg hover:bg-gray-800 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

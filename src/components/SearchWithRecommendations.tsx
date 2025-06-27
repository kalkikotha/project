import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { productsData } from "./data";
import { useNavigate } from "react-router-dom";

export const SearchWithRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  // Flatten all products into one array
  const allProducts = Object.values(productsData).flat();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allProducts.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
      setFilteredProducts(filtered.slice(0, 5)); // Show max 5 suggestions
      setShowSuggestions(true);
    } else {
      setFilteredProducts([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, selectedCategory]);

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name);
    // Immediately close the suggestions
    setShowSuggestions(false);
    // Navigate in the next tick to allow state update to render
    setTimeout(() => {
      navigate(`/products/${product.category}/${product.productId}`);
    }, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search submission here
    console.log("Searching for:", searchTerm, "in category:", selectedCategory);
    setShowSuggestions(false);
  };

  return (
    <div className="hidden lg:flex flex-1 mx-8 relative w-full" ref={searchRef}>
      <form
        className="flex w-full bg-bg-light rounded-2xl p-2"
        onSubmit={handleSearch}
      >
        <select
          className="bg-transparent border-0 px-4 text-sm text-text-secondary focus:outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Serums">Serums</option>
          <option value="Lotions">Lotions</option>
          <option value="Shampoos">Shampoos</option>
          <option value="Soaps">Soaps</option>
          <option value="Creams">Creams</option>
        </select>
        <div className="flex-1 px-4 relative content-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent border-0 text-sm focus:outline-none text-text-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
          />
          {showSuggestions && filteredProducts.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-text-inverted border border-ui-gray rounded-lg shadow-lg z-20">
              {filteredProducts.map((product) => (
                <div
                  key={`${product.category}-${product.productId}`}
                  className="p-3 hover:bg-bg-light cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover mr-3"
                  />
                  <div>
                    <div className="font-medium text-sm text-text-primary">
                      {product.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {product.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="p-2 text-text-secondary hover:text-brand transition-colors"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

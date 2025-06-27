import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { productsData } from "./data";

export const SearchWithRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);

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

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search submission here
    console.log("Searching for:", searchTerm, "in category:", selectedCategory);
    setShowSuggestions(false);
  };

  return (
    <div
      className="hidden lg:flex flex-1 mx-8 relative w-full"
      ref={searchRef}
    >
      <form
        className="flex w-full bg-gray-50 rounded-2xl p-2"
        onSubmit={handleSearch}
      >
        <select
          className="bg-transparent border-0 px-4 text-sm text-gray-600 focus:outline-none"
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
            className="w-full bg-transparent border-0 text-sm focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
          />
          {showSuggestions && filteredProducts.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {filteredProducts.map((product) => (
                <div
                  key={`${product.category}-${product.productId}`}
                  className="p-3 hover:bg-gray-50 cursor-pointer flex items-center"
                  onClick={() => {
                    setSearchTerm(product.name);
                    setShowSuggestions(false);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover mr-3"
                  />
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-gray-500">
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
          className="p-2 text-gray-600 hover:text-primary transition-colors"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

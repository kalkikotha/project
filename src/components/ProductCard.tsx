import { Heart, BarChart2, ShoppingCart, Check, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useModal } from "./ModalContext";
import { useEffect, useState } from "react";

interface ProductCardProps {
  productId: string;
  category: string;
  image: string;
  name: string;
  rating: string;
  description: string;
  price?: string;
}

const ProductCard = ({
  productId,
  category,
  image,
  name,
  rating,
  description,
  price,
}: ProductCardProps) => {
  const {
    user,
    compareItems,
    addToCompare,
    removeFromCompare,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    cartItems,
    addToCart,
    removeFromCart,
  } = useAuth();
  const { setShowLogin } = useModal();
  const isInCompare = compareItems.some(
    (item) => item.id === productId && item.category === category
  );

  const isInwishlist = wishlistItems.some(
    (item) => item.id === productId && item.category === category
  );

  const isIncart = cartItems.some(
    (item) => item.id === productId && item.category === category
  );

  const [info, setInfo] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const navigate = useNavigate();
  const discount = "33";

  const handleCompareClick = (e) => {
    e.preventDefault();
    setInfo("");
    if (isInCompare) {
      removeFromCompare(productId, category);
    } else {
      if (compareItems.length == 0 || compareItems[0].category == category) {
        addToCompare({
          id: productId,
          name: name,
          image: image,
          category: category,
        });
        if (compareItems.length == 1) {
          navigate("/compare");
        }
      } else {
        setInfo("Please select items from the same category to compare.");
        setSnackbar(true);
      }
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (isInwishlist) {
      removeFromWishlist(productId, category);
    } else {
      addToWishlist({
        id: productId,
        name: name,
        image: image,
        category: category,
      });
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (isIncart) {
      removeFromCart(productId, category);
    } else {
      addToCart({
        id: productId,
        name: name,
        image: image,
        category: category,
        price: "99",
      });
    }
  };

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        setSnackbar(false);
        if (info == "Please select items from the same category to compare.") {
          navigate(`/products/${compareItems[0].category}`);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snackbar, info]);

  const ratingColors = {
    A: "bg-ui-success text-ui-success-dark",
    B: "bg-brand-light text-brand-dark",
    C: "bg-ui-warning text-ui-warning-dark",
    D: "bg-ui-error/20 text-ui-error",
    F: "bg-ui-error text-text-inverted",
  };

  return (
    <div className="bg-text-inverted rounded-lg shadow-md overflow-hidden border border-ui-gray hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${category}/${productId}`}>
        <div className="flex flex-col xxl:flex-row">
          <div className="w-full xxl:w-1/2 h-60 xxl:h-auto bg-bg-light relative overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-[240px] object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Combined Price & Discount Badge */}
            <div className="absolute top-2 right-2 flex items-end gap-1">
              {discount && (
                <div
                  className="bg-ui-error text-white px-2 py-1 rounded-md font-bold text-sm 
              animate-bounce hover:animate-none transition-all duration-300 origin-bottom"
                >
                  {discount}% OFF
                </div>
              )}
              <div
                className={`bg-brand-400 text-text-inverted px-3 py-1 rounded-md font-bold 
            ${
              discount
                ? "scale-110 group-hover:scale-125"
                : "group-hover:scale-110"
            } 
            transition-all duration-300 shadow-md`}
              >
                ₹{price || 99}
                {discount && (
                  <span className="line-through text-xs opacity-80 ml-1">
                    ₹{Math.round((price || 99) / (1 - discount / 100))}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full xxl:w-1/2 p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-text-primary">
                {name}
              </h3>
            </div>

            <div className="flex justify-between items-center mb-2 relative">
              {/* Always show rating but blur if not logged in */}
              <div
                className={`px-2 py-1 rounded-md text-md font-medium ${
                  ratingColors[rating]
                } ${!user && "filter blur-md"}`}
              >
                Rating: {rating}
              </div>

              {/* "Get Rating" overlay for non-logged-in users */}
              {!user && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLogin(true);
                  }}
                  className="absolute inset-0 flex items-center justify-center gap-1 bg-black/5 rounded-md hover:bg-black/10 transition-colors"
                >
                  <Lock size={14} />
                  <span className="text-brand-600 font-large">
                    Unlock Rating
                  </span>
                </button>
              )}
            </div>

            <p className="text-text-secondary text-sm mb-4 line-clamp-3">
              {description}
            </p>

            <div className="mt-auto flex flex-wrap gap-3 justify-around">
              {/* Compare Button */}
              <button
                onClick={handleCompareClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                  isInCompare
                    ? "bg-brand-100 border border-brand-400 text-brand-600"
                    : "border border-ui-gray hover:bg-bg-light text-text-primary"
                }`}
              >
                <BarChart2
                  size={16}
                  className={
                    isInCompare ? "text-brand-600" : "text-text-secondary"
                  }
                />
                {isInCompare ? "Remove" : "Compare"}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                  isInwishlist
                    ? "bg-ui-red-light border border-ui-red-medium text-ui-red-darker"
                    : "border border-ui-gray hover:bg-ui-red-light/50 text-text-primary"
                }`}
              >
                <Heart
                  size={16}
                  className={
                    isInwishlist
                      ? "text-ui-red-darker fill-current"
                      : "text-text-secondary"
                  }
                />
                {isInwishlist ? "Saved" : "Save"}
              </button>

              {/* Cart Button */}
              <button
                onClick={handleCartClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm text-text-inverted transition-colors ${
                  isIncart
                    ? "bg-brand-cart hover:bg-brand-cart/90"
                    : "bg-brand-400 hover:bg-brand-600"
                }`}
              >
                <ShoppingCart size={16} />
                {isIncart ? "Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </Link>
      {info && snackbar && (
        <div
          id="snackbar"
          className={`bg-brand-dark text-white p-4 rounded-md fixed top-4 right-4 flex justify-between items-center transition-opacity duration-300 ${
            snackbar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {info}
          <button
            onClick={() => setSnackbar(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

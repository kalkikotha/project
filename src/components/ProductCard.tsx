import { Heart, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProductCardProps {
  productId: string;
  category: string;
  image: string;
  name: string;
  rating: string;
  description: string;
}

const ProductCard = ({
  productId,
  category,
  image,
  name,
  rating,
  description,
}: ProductCardProps) => {
  const {
    compareItems,
    addToCompare,
    removeFromCompare,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  } = useAuth();
  const isInCompare = compareItems.some(
    (item) => item.id === productId && item.category === category
  );

  const isInwishlist = wishlistItems.some(
    (item) => item.id === productId && item.category === category
  );

  const handleCompareClick = (e) => {
    e.preventDefault();
    if (isInCompare) {
      removeFromCompare(productId, category);
    } else {
      addToCompare({
        id: productId,
        name: name,
        image: image,
        category: category,
      });
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
          <div className="w-full xxl:w-1/2 h-60 xxl:h-auto bg-bg-light">
            <img
              src={image}
              alt={name}
              className="w-full h-[240px] object-cover"
            />
          </div>

          <div className="w-full xxl:w-1/2 p-4 flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
            <div className="flex justify-between items-start mb-2">
              <span
                className={`px-2 py-1 rounded-md text-md font-medium ${ratingColors[rating]}`}
              >
                Rating: {rating}
              </span>
            </div>

            <p className="text-text-secondary text-sm mb-4 line-clamp-3">
              {description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 justify-around">
              <button
                onClick={handleCompareClick}
                className="flex items-center gap-2 px-4 py-2 border border-ui-gray rounded-md hover:bg-bg-light transition-colors"
              >
                <BarChart2 size={14} />{" "}
                {isInCompare ? "Remove from Compare" : "Add to Compare"}
              </button>
              <button
                onClick={handleWishlistClick}
                className={`flex items-center gap-1 ${
                  isInwishlist ? "bg-brand-dark" : "bg-brand"
                } text-text-inverted px-3 py-2 rounded-md text-sm hover:bg-brand-dark transition-colors`}
              >
                <Heart size={14} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

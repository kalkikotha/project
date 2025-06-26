import { Heart, BarChart2, ShoppingCart } from "lucide-react";
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
  const { compareItems, addToCompare, removeFromCompare } = useAuth();
  const isInCompare = compareItems.some((item) => item.id === productId);

  const handleCompareClick = () => {
    if (isInCompare) {
      removeFromCompare(productId);
    } else {
      addToCompare({
        id: productId,
        name: name,
        image: image,
        category: category,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${category}/${productId}`}>
        {" "}
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/3 h-48 md:h-auto">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-2/3 p-4 flex flex-col">
            {/* Name and Rating */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rating === "A"
                    ? "bg-green-100 text-green-800"
                    : rating === "B"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                Rating: {rating}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-wrap gap-2">
              <button
                onClick={handleCompareClick}
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors"
              >
                <BarChart2 size={14} />{" "}
                {isInCompare ? "Remove from Compare" : "Add to Compare"}
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors">
                <Heart size={14} /> Wishlist
              </button>
              <button className="ml-auto flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors">
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

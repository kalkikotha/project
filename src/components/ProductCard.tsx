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
  const isInCompare = compareItems.some(
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${category}/${productId}`}>
        {" "}
        <div className="flex flex-col xxl:flex-row">
          {/* Product Image */}
          <div className="w-full xxl:w-1/2 h-60 xxl:h-auto">
            <img
              src={image}
              alt={name}
              className="w-full h-[240px] object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="w-full xxl:w-1/2 p-4 flex flex-col gap-3">
            {/* Name and Rating */}
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <div className="flex justify-between items-start mb-2">
              <span
                className={`px-2 py-1 rounded-md text-md font-medium ${
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
            <div className="mt-auto flex flex-wrap gap-2 justify-around">
              <button
                onClick={handleCompareClick}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <BarChart2 size={14} />{" "}
                {isInCompare ? "Remove from Compare" : "Add to Compare"}
              </button>
              {/* <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors">
                <Heart size={14} /> Wishlist
              </button>
              <button className="ml-auto flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors">
                <ShoppingCart size={16} /> Add to Cart
              </button> */}
              <button className=" flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors">
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

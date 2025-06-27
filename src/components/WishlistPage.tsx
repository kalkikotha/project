import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { productsData } from "./data";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "./AuthContext";

const WishlistPage = () => {
  const { wishlistItems } = useAuth();

  const currentProducts = wishlistItems.map((wishlistItem) => {
    return productsData[wishlistItem.category]?.find(
      (item) => item.productId === wishlistItem.id
    );
  });

  console.log(currentProducts);

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <Link
          to={`/`}
          className="flex items-center text-brand mb-6 hover:underline cursor-pointer"
        >
          <ChevronLeft className="mr-1" size={20} />
          Back
        </Link>
        <h2 className="text-2xl font-bold text-text-primary mb-8 capitalize">
          Wishlist Items
        </h2>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {currentProducts.map((product, index) => (
              <ProductCard
                key={index}
                productId={product.productId}
                category={product.category || ""}
                image={product.image}
                name={product.name}
                rating={product.rating}
                description={product.description}
              />
            ))}
          </div>
        ) : (
          <h2 className="text-xl text-text-secondary mb-8">
            No items wishlisted
          </h2>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;

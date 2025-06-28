import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { productsData } from "./data";
import { ChevronLeft } from "lucide-react";

const ProductsPage = () => {
  const { category } = useParams();

  const currentProducts =
    category === "all"
      ? Object.values(productsData).flatMap(
          (categoryProducts) => categoryProducts
        )
      : productsData[category] || [];

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <Link
          to={`/`}
          className="flex items-center text-brand mb-6 hover:underline"
        >
          <ChevronLeft className="mr-1" size={20} />
          Back
        </Link>
        <h2 className="text-2xl font-bold text-text-primary mb-8 capitalize">{category}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product, index) => (
            <ProductCard
              key={index}
              productId={product.productId}
              category={category || ""}
              image={product.image}
              name={product.name}
              rating={product.rating}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productsData } from "./data";

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const displayProducts =
      activeTab === "all"
        ? Object.values(productsData).flatMap(
            (categoryProducts) => categoryProducts
          )
        : productsData[activeTab] || [];
    setfilteredProducts(displayProducts);
  }, [activeTab]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-12 border-b border-gray-200 pb-6">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark">
            Trending Products
          </h2>

          <nav className="flex gap-8">
            <button
              onClick={() => {
                setActiveTab("all");
                // navigate("/products/all");
              }}
              className={`text-sm font-medium uppercase tracking-wider pb-2 border-b-2 transition-colors ${
                activeTab === "all"
                  ? "text-dark border-primary"
                  : "text-gray-500 border-transparent hover:text-dark"
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setActiveTab("Serums");
                // navigate("/products/Serums");
              }}
              className={`text-sm font-medium uppercase tracking-wider pb-2 border-b-2 transition-colors ${
                activeTab === "fruits"
                  ? "text-dark border-primary"
                  : "text-gray-500 border-transparent hover:text-dark"
              }`}
            >
              Serums
            </button>
            <button
              onClick={() => {
                setActiveTab("Lotions");
                // navigate("/products/Lotions");
              }}
              className={`text-sm font-medium uppercase tracking-wider pb-2 border-b-2 transition-colors ${
                activeTab === "juices"
                  ? "text-dark border-primary"
                  : "text-gray-500 border-transparent hover:text-dark"
              }`}
            >
              Lotions
            </button>
          </nav>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.length > 0 &&
            filteredProducts
              .slice(0, 5)
              .map((product, index) => (
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
      </div>
    </section>
  );
};

export default TrendingProducts;

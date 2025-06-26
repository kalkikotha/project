import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, BarChart2, ShoppingCart, ChevronLeft } from "lucide-react";
import { productsData } from "./data";

const ProductDetailPage = () => {
  const { category, productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the current product
  const currentProduct = productsData[category]?.find(
    (product, index) => product.productId === parseInt(productId)
  );

  // Get related products (same category, excluding current)
  const relatedProducts = productsData[category]?.filter(
    (product, index) => product.productId !== parseInt(productId)
  );

  if (!currentProduct) return <div>Product not found</div>;

  // Generate multiple image URLs (in a real app these would be actual product images)
  const productImages = [
    currentProduct.image,
    `https://via.placeholder.com/600x600?text=${encodeURIComponent(
      currentProduct.name
    )}+1`,
    `https://via.placeholder.com/600x600?text=${encodeURIComponent(
      currentProduct.name
    )}+2`,
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to={`/products/${category}`}
        className="flex items-center text-primary mb-6 hover:underline"
      >
        <ChevronLeft className="mr-1" size={20} />
        Back to {category}
      </Link>

      {/* Section 1: Product Details */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Left Column - Images */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Thumbnail Gallery */}
          <div className="md:col-span-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${currentProduct.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="md:col-span-4 bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={productImages[selectedImage]}
              alt={currentProduct.name}
              className="w-full h-full max-h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {currentProduct.name}
            </h1>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                currentProduct.rating === "A"
                  ? "bg-green-100 text-green-800"
                  : currentProduct.rating === "B"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              Rating: {currentProduct.rating}
            </div>
          </div>

          <p className="text-gray-700 text-lg">{currentProduct.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                Rating Explanation
              </h3>
              <p className="text-gray-600">
                {currentProduct.rating_explanation}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Category Notes</h3>
              <p className="text-gray-600">{currentProduct.category_notes}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <BarChart2 size={18} />
              <span>Add to Compare</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Heart size={18} />
              <span>Add to Wishlist</span>
            </button>
            <button className="flex-1 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Compare Products */}
      <section className="border-t pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Compare Similar {category}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link to={`/products/${category}/${product.productId}`}>
                <div className="h-48 bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <div
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      product.rating === "A"
                        ? "bg-green-100 text-green-800"
                        : product.rating === "B"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    Rating: {product.rating}
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;

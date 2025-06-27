import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, BarChart2, ChevronLeft } from "lucide-react";
import { productsData } from "./data";
import { useAuth } from "./AuthContext";
import Modal from "./Modal";
import "./ProductDetailPage.css";
import dropdown from "../assets/dropdown.svg";
import pdfIcon from "../assets/pdfIcon.svg";

const ProductDetailPage = () => {
  const { category, productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { user, compareItems, addToCompare, removeFromCompare } = useAuth();
  const isInCompare = compareItems.some(
    (item) => item.id == productId && item.category == category
  );

  // Find the current product
  const currentProduct = productsData[category]?.find(
    (product, index) => product.productId === parseInt(productId)
  );

  // Get related products (same category, excluding current)
  const relatedProducts = productsData[category]?.filter(
    (product, index) => product.productId !== parseInt(productId)
  );

  if (!currentProduct) return <div>Product not found</div>;

  const [ratingExpanded1, setRatingExpanded1] = useState(false);
  const [ratingExpanded2, setRatingExpanded2] = useState(false);
  const [ratingValue1] = useState(5.53); // Example rating value out of 10
  const [ratingValue2] = useState(10); // Example rating value out of 10

  const toggleRatingDescription1 = () => {
    setRatingExpanded1(!ratingExpanded1);
  };

  const toggleRatingDescription2 = () => {
    setRatingExpanded2(!ratingExpanded2);
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    if (isInCompare) {
      removeFromCompare(productId, category);
    } else {
      addToCompare({
        id: currentProduct.productId,
        name: currentProduct.name,
        image: currentProduct.image,
        category: currentProduct.category,
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const getDoc = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_API}/doc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user?.username,
            email: user?.email,
          }),
        }
      );

      if (!response.ok) {
        setError("Failed to fetch PDF");
        setTimeout(() => setError(""), 10000); // Clear the error after 10 seconds
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const pdfBytes = await response.arrayBuffer();

      // Create a Blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a Blob URL
      const url = URL.createObjectURL(blob);

      // Open the Blob URL in a new tab
      // window.open(url, "_blank");
      setPdfUrl(url);
      setIsModalOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch PDF:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Generate multiple image URLs (in a real app these would be actual product images)
  const productImages = [
    currentProduct.image,
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dml0YW1pbiUyMGMlMjBzZXJ1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", // Vitamin C serum (orange-toned bottle)
    ,
    "https://images.pexels.com/photos/4202924/pexels-photo-4202924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Hyaluronic serum (clear bottle with dropper)
    ,
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
              <Heart size={14} /> Wishlist
            </button>
          </div>
        </div>
      </section>

      {/* section 2 */}
      <div className=" max-w-4xl flex flex-col mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          RATING DETAILS
        </h2>
        <div className="flex flex-col gap-4">
          {/* Label Accuracy Score */}
          <div className="flex flex-col items-center rounded-lg cursor-pointer  p-4">
            <div className="flex w-full">
              <div className="flex flex-col flex-1 items-center gap-1">
                <div className="flex items-center w-full justify-between">
                  <div className="text-gray-800 text-sm font-medium">
                    Label Accuracy Score
                  </div>
                  <div className="w-9 pl-1 text-right text-sm font-semibold text-gray-800">
                    {ratingValue1}
                  </div>
                </div>
                <div
                  className="w-full h-5 bg-gray-300 cursor-pointer relative"
                  onClick={toggleRatingDescription1}
                >
                  <div
                    className="h-full bg-teal-500"
                    style={{ width: `${(ratingValue1 / 10) * 100}%` }}
                  />
                </div>
                {ratingExpanded1 && (
                  <div className="mt-2 w-full border border-gray-300 rounded-md p-3 text-gray-700 text-base leading-6">
                    Label Accuracy Score (LAS) is calculated on a 0-10 scale -
                    higher is better. It is a measure of how accurately a
                    product's nutritional label matches what Unbox Health found
                    in lab tests. This product's LAS was calculated using a
                    weighted average of the following derived values - DHA
                    Accuracy: 1.00, EPA Accuracy: 0.11.
                  </div>
                )}
              </div>
              <div className="pl-4 pt-4">
                <img
                  alt="collapsible"
                  loading="lazy"
                  width="13"
                  height="22"
                  src={dropdown}
                  style={{
                    color: "transparent",
                    transform: `rotate(${
                      ratingExpanded1 ? "90deg" : "-90deg"
                    })`,
                    height: "14px",
                  }}
                  className="cursor-pointer"
                  onClick={toggleRatingDescription1}
                />
              </div>
            </div>
          </div>

          {/* Non-Toxicity Score */}
          <div className="flex flex-col items-center rounded-lg cursor-pointer  p-4">
            <div className="flex w-full">
              <div className="flex flex-col flex-1 items-center gap-1">
                <div className="flex items-center w-full justify-between">
                  <div className="text-gray-800 text-sm font-medium">
                    Non-Toxicity Score
                  </div>
                  <div className="w-9 pl-1 text-right text-sm font-semibold text-gray-800">
                    {ratingValue2}
                  </div>
                </div>
                <div
                  className="w-full h-5 bg-gray-300 cursor-pointer relative"
                  onClick={toggleRatingDescription2}
                >
                  <div
                    className="h-full bg-teal-500"
                    style={{ width: `${(ratingValue2 / 10) * 100}%` }}
                  />
                </div>
                {ratingExpanded2 && (
                  <div className="mt-2 w-full border border-gray-300 rounded-md p-3 text-gray-700 text-base leading-6">
                    Label Accuracy Score (LAS) is calculated on a 0-10 scale -
                    higher is better. It is a measure of how accurately a
                    product's nutritional label matches what Unbox Health found
                    in lab tests. This product's LAS was calculated using a
                    weighted average of the following derived values - DHA
                    Accuracy: 1.00, EPA Accuracy: 0.11.
                  </div>
                )}
              </div>
              <div className="pl-4 pt-4">
                <img
                  alt="collapsible"
                  loading="lazy"
                  width="13"
                  height="22"
                  src={dropdown}
                  style={{
                    color: "transparent",
                    transform: `rotate(${
                      ratingExpanded2 ? "90deg" : "-90deg"
                    })`,
                    height: "14px",
                  }}
                  className="cursor-pointer"
                  onClick={toggleRatingDescription2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            LAB TEST RESULTS & METHODOLOGY
          </h2>
          <a
            rel="noopener noreferrer"
            onClick={getDoc}
            className="flex items-center border border-dashed border-gray-400 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-100 w-fit gap-2"
          >
            {/* PDF icon - use emoji or SVG */}
            <img src={pdfIcon} alt="pdfIcon" width="52px" />

            {/* File name */}
            <span className="text-gray-800 font-medium">
              Lab_report_{currentProduct.name}.pdf
            </span>
          </a>

          {loading && "Fetching the report..."}
          {error && <span>{error}</span>}
        </div>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal} content={pdfUrl} />
        )}
      </section>

      {/* Section 4: Compare Products */}
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

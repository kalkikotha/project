import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  BarChart2,
  ChevronLeft,
  ShoppingCart,
  Check,
} from "lucide-react";
import { productsData } from "./data";
import { useAuth } from "./AuthContext";
import Modal from "./Modal";
import dropdown from "../assets/dropdown.svg";
import pdfIcon from "../assets/pdfIcon.svg";

const ProductDetailPage = () => {
  const { category, productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
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
  const [snackbar, setSnackbar] = useState(false);
  const currentProduct = productsData[category]?.find(
    (product) => product.productId == parseInt(productId)
  );

  const relatedProducts = productsData[category]?.filter(
    (product) => product.productId != parseInt(productId)
  );

  const isInCompare = compareItems.some(
    (item) =>
      item.id === currentProduct.productId &&
      item.category === currentProduct.category
  );

  const isInwishlist = wishlistItems.some(
    (item) =>
      item.id === currentProduct.productId &&
      item.category === currentProduct.category
  );

  const isIncart = cartItems.some(
    (item) =>
      item.id === currentProduct.productId &&
      item.category === currentProduct.category
  );

  if (!currentProduct)
    return (
      <div className="text-center py-12 text-text-primary">
        Product not found
      </div>
    );

  const [ratingExpanded1, setRatingExpanded1] = useState(false);
  const [ratingExpanded2, setRatingExpanded2] = useState(false);
  const [ratingValue1] = useState(5.53);
  const [ratingValue2] = useState(10);

  const toggleRatingDescription1 = () => setRatingExpanded1(!ratingExpanded1);
  const toggleRatingDescription2 = () => setRatingExpanded2(!ratingExpanded2);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    console.log(isInwishlist);
    if (isInwishlist) {
      removeFromWishlist(currentProduct.productId, currentProduct.category);
    } else {
      addToWishlist({
        id: currentProduct.productId,
        name: currentProduct.name,
        image: currentProduct.image,
        category: currentProduct.category,
      });
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (isIncart) {
      removeFromCart(currentProduct.productId, currentProduct.category);
    } else {
      addToCart({
        id: currentProduct.productId,
        name: currentProduct.name,
        image: currentProduct.image,
        category: currentProduct.category,
        price: "99",
      });
    }
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    setInfo("");
    if (isInCompare) {
      removeFromCompare(currentProduct.productId, currentProduct.category);
    } else {
      if (compareItems.length == 0 || compareItems[0].category == category) {
        addToCompare({
          id: currentProduct.productId,
          name: currentProduct.name,
          image: currentProduct.image,
          category: currentProduct.category,
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const getDoc = async () => {
    setLoading(true);
    setInfo("");
    setError("");
    if (!user) {
      setInfo("Please login to access the document");
      setSnackbar(true);
      setLoading(false);
      return;
    }
    try {
      setInfo("Fetching the document...");
      setSnackbar(true);

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
        setSnackbar(true);
        const timer = setTimeout(() => {
          setSnackbar(false);
        }, 3000);

        // Clear the timer when the component unmounts or error changes
        return () => clearTimeout(timer);
        // throw new Error(`HTTP error! status: ${response.status}`);
      }

      const pdfBytes = await response.arrayBuffer();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setIsModalOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch PDF:", error);
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
  }, [snackbar, info, error]);

  const closeModal = () => setIsModalOpen(false);

  const productImages = [
    currentProduct.image,
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dml0YW1pbiUyMGMlMjBzZXJ1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.pexels.com/photos/4202924/pexels-photo-4202924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const ratingColors = {
    A: "bg-ui-success text-ui-success-dark",
    B: "bg-brand-light text-brand-dark",
    C: "bg-ui-warning text-ui-warning-dark",
    D: "bg-ui-error/20 text-ui-error",
    F: "bg-ui-error text-text-inverted",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to={`/products/${category}`}
        className="flex items-center text-brand mb-6 hover:underline"
      >
        <ChevronLeft className="mr-1" size={20} />
        Back to {category}
      </Link>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? "border-brand"
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

          <div className="md:col-span-4 bg-bg-light rounded-lg overflow-hidden">
            <img
              src={productImages[selectedImage]}
              alt={currentProduct.name}
              className="w-full h-full max-h-[500px] object-contain"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              {currentProduct.name}
            </h1>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                ratingColors[currentProduct.rating]
              }`}
            >
              Rating: {currentProduct.rating}
            </div>
          </div>

          <p className="text-text-secondary text-lg">
            {currentProduct.description}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-text-primary">
                Rating Explanation
              </h3>
              <p className="text-text-secondary">
                {currentProduct.rating_explanation}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-text-primary">
                Category Notes
              </h3>
              <p className="text-text-secondary">
                {currentProduct.category_notes}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {/* Compare Button - Analytical Action */}
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

            {/* Wishlist Button - Emotional Action */}
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

            {/* Cart Button - Primary Action */}
            <button
              onClick={handleCartClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm text-text-inverted transition-colors ${
                isIncart
                  ? "bg-brand-cart hover:bg-brand-cart/90"
                  : "bg-brand-400 hover:bg-brand-600"
              }`}
            >
              <ShoppingCart size={16} />
              {isIncart ? (
                <span className="flex items-center gap-1">
                  <Check size={14} /> Added
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl flex flex-col mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          RATING DETAILS
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center rounded-lg cursor-pointer p-4">
            <div className="flex w-full">
              <div className="flex flex-col flex-1 items-center gap-1">
                <div className="flex items-center w-full justify-between">
                  <div className="text-text-primary text-sm font-medium">
                    Label Accuracy Score
                  </div>
                  <div className="w-9 pl-1 text-right text-sm font-semibold text-text-primary">
                    {ratingValue1}
                  </div>
                </div>
                <div
                  className="w-full h-5 bg-ui-gray cursor-pointer relative"
                  onClick={toggleRatingDescription1}
                >
                  <div
                    className="h-full bg-brand"
                    style={{ width: `${(ratingValue1 / 10) * 100}%` }}
                  />
                </div>
                {ratingExpanded1 && (
                  <div className="mt-2 w-full border border-ui-gray rounded-md p-3 text-text-secondary text-base leading-6">
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

          <div className="flex flex-col items-center rounded-lg cursor-pointer p-4">
            <div className="flex w-full">
              <div className="flex flex-col flex-1 items-center gap-1">
                <div className="flex items-center w-full justify-between">
                  <div className="text-text-primary text-sm font-medium">
                    Non-Toxicity Score
                  </div>
                  <div className="w-9 pl-1 text-right text-sm font-semibold text-text-primary">
                    {ratingValue2}
                  </div>
                </div>
                <div
                  className="w-full h-5 bg-ui-gray cursor-pointer relative"
                  onClick={toggleRatingDescription2}
                >
                  <div
                    className="h-full bg-brand"
                    style={{ width: `${(ratingValue2 / 10) * 100}%` }}
                  />
                </div>
                {ratingExpanded2 && (
                  <div className="mt-2 w-full border border-ui-gray rounded-md p-3 text-text-secondary text-base leading-6">
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

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            LAB TEST RESULTS & METHODOLOGY
          </h2>
          <button
            onClick={getDoc}
            className="flex items-center border border-dashed border-ui-gray rounded-md px-4 py-2 cursor-pointer hover:bg-bg-light w-fit gap-2"
            disabled={loading}
          >
            <img src={pdfIcon} alt="pdfIcon" width="52px" />
            <span className="text-text-primary font-medium">
              Lab_report_{currentProduct.name}.pdf
            </span>
          </button>
        </div>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal} content={pdfUrl} />
        )}
      </section>

      <section className="border-t border-ui-gray pt-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Compare Similar {category}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <div
              key={index}
              className="border border-ui-gray rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link to={`/products/${category}/${product.productId}`}>
                <div className="h-48 bg-bg-light">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-text-primary">
                    {product.name}
                  </h3>
                  <div
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      ratingColors[product.rating]
                    }`}
                  >
                    Rating: {product.rating}
                  </div>
                  <p className="text-text-secondary text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {(info || error) && snackbar && (
          <div
            id="snackbar"
            className={`bg-brand-dark text-white p-4 rounded-md fixed top-4 right-4 flex justify-between items-center transition-opacity duration-300 ${
              snackbar ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {info || error}
            <button
              onClick={() => setSnackbar(false)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetailPage;

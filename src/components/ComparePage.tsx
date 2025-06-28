import { Link } from "react-router-dom";
import { Plus, ChevronLeft, X } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const ComparePage = () => {
  const { compareItems, removeFromCompare } = useAuth();
  useEffect(() => {
    if (compareItems.length == 2) {
      compareItems[0].nutrition = {
        "MUFA+PUFA": "30.2",
        "Saturated Fat": "69.5",
        "Trans Fat": "0",
        "Butryic Acid": "2.36",
        "Caproic Acid": "1.42",
      };

      compareItems[1].nutrition = {
        "MUFA+PUFA": "31.74",
        "Saturated Fat": "68.15",
        "Trans Fat": "0",
        "Butryic Acid": "2",
        "Caproic Acid": "1.24",
      };
    }
  }, compareItems);
  const comparisonFields = [
    {
      label: "Description",
      key: "description",
    },
    { label: "Rating", key: "rating" },
    { label: "Rating Explanation", key: "rating_explanation" },
    { label: "Category Notes", key: "category_notes" },
    {
      label: "Nutition",
      key: "nutrition",
      values: [
        "MUFA+PUFA",
        "Saturated Fat",
        "Trans Fat",
        "Butryic Acid",
        "Caproic Acid",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-[968px]">
      <div className="flex flex-col gap-2 mb-4 md:mb-8">
        <Link
          to="/products/Serums"
          className="flex  text-brand hover:underline justify-self-start"
        >
          <ChevronLeft className="mr-1" size={20} />
          Back
        </Link>
        <h1 className="text-2xl md:text-3xl  font-bold text-center text-text-primary justify-self-center">
          Product Comparison
        </h1>
        {/* Empty State CTA */}
        {compareItems.length < 2 && (
          <div className="text-center">
            <h3 className="text-sm md:text-xl font-medium text-text-primary mb-2">
              {compareItems.length === 0
                ? "Add two products in same category to compare"
                : "Add another product to compare"}
            </h3>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product 1 Slot */}
        <div
          className={`relative rounded-lg p-6 h-full sm:max-h-[200px] md:max-h-[300px] flex flex-col ${
            compareItems[0]
              ? "border border-ui-gray"
              : "border-2 border-dashed border-ui-gray"
          }`}
        >
          {compareItems[0] ? (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCompare(
                    compareItems[0].id,
                    compareItems[0].category
                  );
                }}
                className="absolute top-1 right-1 p-1 rounded-full hover:bg-ui-gray/20 transition-colors"
                aria-label="Remove product from comparison"
              >
                <X size={18} className="text-ui-success-dark" />
              </button>
              <Link
                to={`/products/${compareItems[0].category}/${compareItems[0].id}`}
              >
                {" "}
                <div className="h-64 mb-4 bg-bg-light flex items-center justify-center">
                  <img
                    src={compareItems[0].image}
                    alt={compareItems[0].name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-xl font-bold mb-2 text-text-primary">
                    {compareItems[0].name}
                  </h2>
                </div>
              </Link>
            </>
          ) : (
            <Link
              to="/products/Serums"
              className="flex flex-col items-center justify-center h-full text-center group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-bg-light flex items-center justify-center mb-4 group-hover:bg-bg-dark transition-colors">
                <Plus size={32} className="text-text-secondary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary">
                Add Product
              </h3>
              <p className="text-text-secondary mt-2">
                Click to browse products
              </p>
              <div className="flex space-x-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-ui-gray"
                  ></div>
                ))}
              </div>
            </Link>
          )}
        </div>

        {/* Product 2 Slot */}
        <div
          className={`relative rounded-lg p-6 h-full sm:max-h-[200px] md:max-h-[300px] flex flex-col ${
            compareItems[1]
              ? "border border-ui-gray"
              : "border-2 border-dashed border-ui-gray"
          }`}
        >
          {compareItems[1] ? (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCompare(
                    compareItems[1].id,
                    compareItems[1].category
                  );
                }}
                className="absolute top-1 right-1 p-1 rounded-full hover:bg-ui-gray/20 transition-colors"
                aria-label="Remove product from comparison"
              >
                <X size={18} className="text-ui-success-dark" />
              </button>
              <Link
                to={`/products/${compareItems[1].category}/${compareItems[1].id}`}
              >
                <div className="h-64 mb-4 bg-bg-light flex items-center justify-center">
                  <img
                    src={compareItems[1].image}
                    alt={compareItems[1].name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-xl font-bold mb-2 text-text-primary">
                    {compareItems[1].name}
                  </h2>
                </div>
              </Link>
            </>
          ) : (
            <Link
              to="/products/Serums"
              className="flex flex-col items-center justify-center h-full text-center group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-bg-light flex items-center justify-center mb-4 group-hover:bg-bg-dark transition-colors">
                <Plus size={32} className="text-text-secondary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary">
                Add Product
              </h3>
              <p className="text-text-secondary mt-2">
                Click to browse products
              </p>
              <div className="flex space-x-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-ui-gray"
                  ></div>
                ))}
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {compareItems.length === 2 && (
        <div className="mt-12 border border-ui-gray rounded-lg overflow-hidden divide-y divide-ui-gray">
          {comparisonFields.map((field, index) => (
            <div key={index}>
              {/* Main field label */}
              <div className="bg-bg-light px-4 py-2 font-semibold text-center text-text-primary">
                {field.label}
              </div>

              {/* Nutrition sub-values */}
              {field.values ? (
                field.values.map((subKey, subIndex) => (
                  <div
                    key={subIndex}
                    className="grid grid-cols-3 text-sm px-4 py-2 border-t border-ui-gray"
                  >
                    <div className="text-center text-text-primary">
                      {compareItems[0][field.key]?.[subKey] ?? "-"}
                    </div>
                    <div className="text-center font-medium text-text-primary">
                      {subKey}
                    </div>
                    <div className="text-center text-text-primary">
                      {compareItems[1][field.key]?.[subKey] ?? "-"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-3 text-sm px-4 py-4 border-t border-ui-gray">
                  <div className="text-center text-text-primary">
                    {compareItems[0][field.key] ?? "-"}
                  </div>
                  <div className="text-center font-medium text-text-primary">
                    {field.label}
                  </div>
                  <div className="text-center text-text-primary">
                    {compareItems[1][field.key] ?? "-"}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComparePage;

import { Link } from "react-router-dom";
import { Plus, ChevronLeft } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const ComparePage = () => {
  const { compareItems } = useAuth();
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
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/products/Serums"
          className="flex items-center text-brand hover:underline"
        >
          <ChevronLeft className="mr-1" size={20} />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-center text-text-primary">
          Product Comparison
        </h1>
        <div className="w-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product 1 Slot */}
        <div
          className={`rounded-lg p-6 min-h-[400px] flex flex-col ${
            compareItems[0]
              ? "border border-ui-gray"
              : "border-2 border-dashed border-ui-gray"
          }`}
        >
          {compareItems[0] ? (
            <>
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
            </>
          ) : (
            <Link
              to="/products/Serums"
              className="flex flex-col items-center justify-center h-full text-center group"
            >
              <div className="w-32 h-32 rounded-full bg-bg-light flex items-center justify-center mb-4 group-hover:bg-bg-dark transition-colors">
                <Plus size={48} className="text-text-secondary" />
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
          className={`rounded-lg p-6 min-h-[400px] flex flex-col ${
            compareItems[1]
              ? "border border-ui-gray"
              : "border-2 border-dashed border-ui-gray"
          }`}
        >
          {compareItems[1] ? (
            <>
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
            </>
          ) : (
            <Link
              to="/products/Serums"
              className="flex flex-col items-center justify-center h-full text-center group"
            >
              <div className="w-32 h-32 rounded-full bg-bg-light flex items-center justify-center mb-4 group-hover:bg-bg-dark transition-colors">
                <Plus size={48} className="text-text-secondary" />
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

      {/* Empty State CTA */}
      {compareItems.length < 2 && (
        <div className="text-center mt-12">
          <h3 className="text-xl font-medium text-text-primary mb-2">
            {compareItems.length === 0
              ? "Add two products in same category to compare"
              : "Add another product to compare"}
          </h3>
          <Link
            to="/products/Serums"
            className="inline-flex items-center px-6 py-3 bg-brand text-text-inverted rounded-lg hover:bg-brand-dark transition-colors"
          >
            <Plus className="mr-2" size={20} />
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default ComparePage;

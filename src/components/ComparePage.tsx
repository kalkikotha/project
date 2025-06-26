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
          className="flex items-center text-primary hover:underline"
        >
          <ChevronLeft className="mr-1" size={20} />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-center">Product Comparison</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product 1 Slot */}
        <div
          className={`rounded-lg p-6 min-h-[400px] flex flex-col ${
            compareItems[0] ? "border" : "border-2 border-dashed"
          }`}
        >
          {compareItems[0] ? (
            <>
              <div className="h-64 mb-4 bg-gray-50 flex items-center justify-center">
                <img
                  src={compareItems[0].image}
                  alt={compareItems[0].name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold mb-2">
                  {compareItems[0].name}
                </h2>
              </div>
            </>
          ) : (
            <Link
              to="/products/Serums"
              className="flex flex-col items-center justify-center h-full text-center group"
            >
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <Plus size={48} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">Add Product</h3>
              <p className="text-gray-500 mt-2">Click to browse products</p>
              <div className="flex space-x-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-300"
                  ></div>
                ))}
              </div>
            </Link>
          )}
        </div>

        {/* Product 2 Slot */}
        <div
          className={`rounded-lg p-6 min-h-[400px] flex flex-col ${
            compareItems[1] ? "border" : "border-2 border-dashed"
          }`}
        >
          {compareItems[1] ? (
            <>
              <div className="h-64 mb-4 bg-gray-50 flex items-center justify-center">
                <img
                  src={compareItems[1].image}
                  alt={compareItems[1].name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold mb-2">
                  {compareItems[1].name}
                </h2>
              </div>
            </>
          ) : (
            <Link
              to="/products/Serums"
              className="flex flex-col items-center justify-center h-full text-center group"
            >
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <Plus size={48} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">Add Product</h3>
              <p className="text-gray-500 mt-2">Click to browse products</p>
              <div className="flex space-x-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-300"
                  ></div>
                ))}
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Comparison Table - Only shown when both products exist */}
      {compareItems.length === 2 && (
        <div className="mt-12 border rounded-lg overflow-hidden divide-y divide-gray-200">
          {comparisonFields.map((field, index) => (
            <div key={index}>
              {/* Main field label */}
              <div className="bg-gray-100 px-4 py-2 font-semibold text-center">
                {field.label}
              </div>

              {/* If it's a nested nutrition field with multiple sub-values */}
              {field.values ? (
                field.values.map((subKey, subIndex) => (
                  <div
                    key={subIndex}
                    className="grid grid-cols-3 text-sm px-4 py-2 border-t "
                  >
                    <div className="text-center text-gray-800">
                      {compareItems[0][field.key]?.[subKey] ?? "-"}
                    </div>
                    <div className="text-center font-medium">{subKey}</div>
                    <div className="text-center text-gray-800">
                      {compareItems[1][field.key]?.[subKey] ?? "-"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-3 text-sm px-4 py-4 border-t">
                  <div className="text-center text-gray-800">
                    {compareItems[0][field.key] ?? "-"}
                  </div>
                  <div className="text-center font-medium">{field.label}</div>
                  <div className="text-center text-gray-800">
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
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {compareItems.length === 0
              ? "Add two products in same category to compare"
              : "Add another product to compare"}
          </h3>
          <Link
            to="/products/Serums"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
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

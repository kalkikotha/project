import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import { categories } from "./data";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { productsData } from "./data";

const CategorySection = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark">
            Our Skincare Categories
          </h2>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              View All Categories{" "}
              <ArrowRight className="inline ml-1" size={16} />
            </a>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          <div className="flex gap-4 md:gap-6 flex-nowrap">
            {categories.map((category, index) => (
              <Link
                to={`/products/${category.name}`}
                key={index}
                className="group bg-white border border-gray-100 rounded-2xl p-4 md:p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 flex-shrink-0"
                style={{
                  // width: "calc(50% - 0.5rem)",
                  width: "100%",
                  maxWidth: "300px",
                  scrollSnapAlign: "start",
                }}
              >
                <div className="w-24 h-24 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-base font-semibold text-dark group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {productsData[category.name].length} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
